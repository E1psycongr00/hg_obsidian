---
tags:
  - Gradle
  - Flyway
aliases: null
title: JOOQ와 Flyway로 Codegen하기
created: 2024-11-21T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-11-21
작성 시간: 18:27


----
## 내용(Content)

### JOOQ와 Flyway를 같이 사용하는 이유

Flyway는 db 형상관리를 위한 도구이다. JOOQ는 SQL에 필요한 DDL, DML등 여러 작업들을 쉽게 해주는데 이를 위해서 기반이 되는 코드 Table, Field 등의 정보를 스키마에 맞게 자동으로 생성할 필요가 있다.

JOOQ가 Codegen를 생성하는 방식은 크게 2가지로 나뉜다. 직접 DB에 연결된 Schema 정보를 가져와서 CodeGen하는 방식과 DB 스키마 정보를 기반으로 생성하는 방식이다. Flyway는 .SQL에서 DDL을 작성하기 때문에 그 파일 정보를 이용하면, JOOQ는 DB 연결 없이 간편하게 독립적으로 Code Gen을 할 수 있다.

정리하면 Flyway 기반 JOOQ CodeGen의 특징은 다음과 같다.

**장점**
- DB 연결과 관계 없이 `JOOQ CODE`를 생성할 수 있다.
- 특정 DB에 종속되지 않는다.
- 스키마 이름에 얽매일 필요가 없다.
- 테스트 컨테이너를 띄우고 동일한 스키마를 적용한다면, 생성된 JOOQ 코드를 적용할 수 있다.(유연하다.)

**단점**

- MySQL과 같은 DB는 Table 이름 또는 Column 명의 대소문자를 구분한다.
- JPA, SQL 스키마, JOOQ 코드 간의 설정 동기화 문제
- JPA 연결로 생성하는 경우 JPA 엔티티에 의존하게 되는데, Multi Module 프로젝트를 진행하는 경우 Infra와 Domain간의 의존 관계가 복잡해 질 수 있다. (JPA의 Domain에 인프라 코드가 들어가 있는 고질적인 문제점 ex-> @Entity, @Column etc...)

>[!caution] Caution: JPA, SQL 스키마, JOOQ 코드 동기화 문제
> MySQL과 같은 DB는 table, column 등등 대소문자를 구분한다고 했다. 그래서 JOOQ의 네이밍 생성 전략, JPA 테이블 생성 전략 등 다르면 문제가 발생할 수 있다.
> ![[Pasted image 20241124133440.png]]
> 위 사진을 보면 SQL은 대문자로 설정했는데 JOOQ 테이블 네임은 소문자로 지정했다. SQL 스키마에는 test.MEMBER가 존재하는데 JOOQ 테이블 코드는 test.member니 당연히 맞지 않기 떄문에 문제가 발생한다.
> jpa의 경우에도 column 네임을 아무렇게나 지정하고 validate시 SQL가 맞지 않아 문제가 발생하는데, 수동으로 맞춰주거나, 네이밍 생성 전략을 활용해서 자동으로 변환시켜주는 방법이 있다.

### 의존성 등록하기

```kotlin
plugins {
	java
	id("org.springframework.boot") version "3.3.5"
	id("io.spring.dependency-management") version "1.1.6"
	id("org.jooq.jooq-codegen-gradle") version "3.19.14"
}

dependencies {
	// data jpa
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")

	// flyway
	implementation("org.flywaydb:flyway-core")
	implementation("org.flywaydb:flyway-mysql")

	// jooq implementation은 실제 코드에 활용하는 경우이고, gradle 설정에서
	// 의존성을 등록해야 하는 경우 jooqCodegen에도 주입해준다.
	implementation("org.springframework.boot:spring-boot-starter-jooq")
	implementation("org.jooq:jooq-codegen:3.19.14")
	jooqCodegen("org.jooq:jooq-meta-extensions:3.19.14")
	jooqCodegen("org.jooq:jooq-codegen:3.19.14")

	// mysql 드라이버
	runtimeOnly("com.mysql:mysql-connector-j")

	// 그 외 테스트 의존성
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.boot:spring-boot-testcontainers")
	testImplementation("org.testcontainers:junit-jupiter")
	testImplementation("org.testcontainers:mysql")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")

}
```

### SQL 작성하기

```sql
CREATE TABLE MEMBER (
    ID BIGINT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    EMAIL VARCHAR(255) NOT NULL,
    CONSTRAINT UK_MEMBER_EMAIL UNIQUE (EMAIL)
);

```

간단하게 작성해보았다.

### JPA 엔티티 정의

```java
@Entity
@Table(name = "member")
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;
}

```

>[!caution]
>여기서 주의할 점은 SQL 컬럼 네임과 엔티티 컬럼 네임의 대소문자가 일치하지 않는데 서로 설정이 맞지 않아 문제가 생길 위험이 있다.

### JPA Entity 네이밍 전략 생성 및 적용

```java
public class CustomPhysicalNamingStrategy extends PhysicalNamingStrategyStandardImpl {

    @Override
    public Identifier toPhysicalCatalogName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name);
    }

    @Override
    public Identifier toPhysicalSchemaName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name);
    }

    @Override
    public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name);
    }

    @Override
    public Identifier toPhysicalSequenceName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name);
    }

    @Override
    public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        return apply(name);
    }

    private Identifier apply(Identifier name) {
        if (name == null) {
            return null;
        }
        String text = name.getText();
        String newName = text.replaceAll("([a-z])([A-Z])", "$1_$2").toUpperCase();
        return Identifier.toIdentifier(newName);
    }
}

```

naming 전략을 보면 카멜 케이스에 대해서 스네이크(케밥) 케이스로 바꾸고 모두 대문자로 바꾸는 전략이다.

예를 들면 userName -> USER_NAME

```java
@Configuration
public class JpaConfig {
    
    @Bean
    public CustomPhysicalNamingStrategy customPhysicalNamingStrategy() {
        return new CustomPhysicalNamingStrategy();
    }
}
```

이렇게 bean으로 만들어서 configuration을 설정해주면 된다.

### JOOQ Codegen gradle 작성하기

```kotlin
sourceSets {
	main {
		java {
			val mainDir = "src/main/java"
			val jooqDir = "src/main/generated"
			srcDirs(mainDir, jooqDir)
		}
	}
}
```

sourceSet을 설정하는 이유는  jooq로 생성된 code는 java 코드인데 해당 코드도 컴파일 대상 경로로 등록하는 것이다. 이를 통해서 실제 배포 코드나 테스트 코드에서 해당 java 코드를 사용하고 컴파일 가능하다.

```kotlin
jooq {
	configuration {
		generator {
			database {
				name = "org.jooq.meta.extensions.ddl.DDLDatabase"

				properties {
					property {
						key = "scripts"
						value = "src/main/resources/db/migration"
					}
					property {
						key = "sort"
						value = "flyway"
					}
					property {
						key = "unqualifiedSchema"
						value = "none"
					}
					property {
						key = "defaultNameCase"
						value = "as_is"
					}
				}

			}

			strategy {
				name = "com.example.JPrefixGeneratorStrategy"
				java = """
					package com.example;

					import org.jooq.codegen.DefaultGeneratorStrategy;
					import org.jooq.meta.Definition;

					public class JPrefixGeneratorStrategy extends DefaultGeneratorStrategy {

					    @Override
					    public String getJavaClassName(Definition definition, Mode mode) {
					        if (mode == Mode.RECORD || mode == Mode.POJO || mode == Mode.DEFAULT) {
					            return "J" + super.getJavaClassName(definition, mode);
					        }
					        return super.getJavaClassName(definition, mode);
					    }
					}

				""".trimIndent()
			}

			generate {
				isDeprecated = false
				isRecords = true
				isImmutablePojos = true
				isFluentSetters = true
				isJavaTimeTypes = true
			}

			target {
				packageName = "jooq.jooq_dsl"
				directory = "src/main/generated"
				encoding = "UTF-8"
			}


		}
	}
}
```

jooq 관련 설정이다. 필요하면 조금씩 수정해서 사용하면 된다. 검증된 build script이니 사용하면 된다.

```java
@SpringBootTest
@Testcontainers
public class DslTeset {

    @Container
    @ServiceConnection
    private static MySQLContainer<?> mySqlContainer = new MySQLContainer<>("mysql:8.0.33");

    private static DSLContext dslContext;

    @BeforeAll
    static void beforeAll() {
        Flyway.configure()
                .dataSource(mySqlContainer.getJdbcUrl(), mySqlContainer.getUsername(), mySqlContainer.getPassword())
                .schemas("test")
                .load()
                .migrate();
        dslContext = DSL.using(mySqlContainer.getJdbcUrl(), mySqlContainer.getUsername(), mySqlContainer.getPassword());
    }

    @Test
    void test() {
        List<JMemberRecord> records = dslContext.selectFrom(JMember.MEMBER)
                .fetch();

        assertThat(records).hasSize(0);
    }
}
```

testcontainer를 활용한 간단한 테스트 예시

### 전체 build.kts 코드

```kotlin
plugins {
	java
	id("org.springframework.boot") version "3.3.5"
	id("io.spring.dependency-management") version "1.1.6"
	id("org.jooq.jooq-codegen-gradle") version "3.19.14"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.flywaydb:flyway-core")
	implementation("org.flywaydb:flyway-mysql")
	implementation("org.springframework.boot:spring-boot-starter-jooq")
	implementation("org.jooq:jooq-codegen:3.19.14")
	jooqCodegen("org.jooq:jooq-meta-extensions:3.19.14")
	jooqCodegen("org.jooq:jooq-codegen:3.19.14")
	compileOnly("org.projectlombok:lombok")
	runtimeOnly("com.mysql:mysql-connector-j")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.boot:spring-boot-testcontainers")
	testImplementation("org.testcontainers:junit-jupiter")
	testImplementation("org.testcontainers:mysql")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")

}

tasks.withType<Test> {
	useJUnitPlatform()
}

sourceSets {
	main {
		java {
			val mainDir = "src/main/java"
			val jooqDir = "src/main/generated"
			srcDirs(mainDir, jooqDir)
		}
	}
}



jooq {
	configuration {
		generator {
			database {
				name = "org.jooq.meta.extensions.ddl.DDLDatabase"

				properties {
					property {
						key = "scripts"
						value = "src/main/resources/db/migration"
					}
					property {
						key = "sort"
						value = "flyway"
					}
					property {
						key = "unqualifiedSchema"
						value = "none"
					}
					property {
						key = "defaultNameCase"
						value = "as_is"
					}
				}

			}

			strategy {
				name = "com.example.JPrefixGeneratorStrategy"
				java = """
					package com.example;

					import org.jooq.codegen.DefaultGeneratorStrategy;
					import org.jooq.meta.Definition;

					public class JPrefixGeneratorStrategy extends DefaultGeneratorStrategy {

					    @Override
					    public String getJavaClassName(Definition definition, Mode mode) {
					        if (mode == Mode.RECORD || mode == Mode.POJO || mode == Mode.DEFAULT) {
					            return "J" + super.getJavaClassName(definition, mode);
					        }
					        return super.getJavaClassName(definition, mode);
					    }
					}

				""".trimIndent()
			}

			generate {
				isDeprecated = false
				isRecords = true
				isImmutablePojos = true
				isFluentSetters = true
				isJavaTimeTypes = true
			}

			target {
				packageName = "jooq.jooq_dsl"
				directory = "src/main/generated"
				encoding = "UTF-8"
			}


		}
	}
}



```
## 질문 & 확장

(없음)

## 출처(링크)

- [STUDY\_REFERENCE/java/study\_jooq\_codegen\_with\_flyway\_jpa at main · E1psycongr00/STUDY\_REFERENCE · GitHub](https://github.com/E1psycongr00/STUDY_REFERENCE/tree/main/java/study_jooq_codegen_with_flyway_jpa)
- [jOOQ 사용기 — belljundev](https://belljundev.tistory.com/24)


## 연결 노트










