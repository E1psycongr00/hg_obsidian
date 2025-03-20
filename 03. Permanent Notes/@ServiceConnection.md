---
tags:
  - 완성
  - Gradle
aliases: 
date: 2024-11-20
title: "@ServiceConnection"
---

## 내용(Content)

### 필요한 의존성

```kotlin
plugins {
	java
	id("org.springframework.boot") version "3.3.5"
	id("io.spring.dependency-management") version "1.1.6"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

dependencies {
	runtimeOnly("com.mysql:mysql-connector-j")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.boot:spring-boot-testcontainers")
	testImplementation("org.testcontainers:junit-jupiter")
	testImplementation("org.testcontainers:mysql")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}
```

Spring Boot 3.1 이상에서 `@DynamicPropertySource` 를 static을 이용해서 container에서 자동으로 생성된 datasource를 등록해야 됬지만, 지금은 그럴 필요가 없어졌다. `@ServiceConnection`을 이용하면 bean 또는 static 자유롭게 datasource 정보를 환경 변수에 등록 가능하다.

### 사용 방법

#### Test Bean으로 등록하는 경우

```java
@TestConfiguration(proxyBeanMethods = false)
public class TestcontainersConfig {

	@Bean
	@ServiceConnection
	MySQLContainer<?> mysqlContainer() {
		return new MySQLContainer<>(DockerImageName.parse("mysql:latest"));
	}
}
```

테스트는 `@SpringBoot`, `@DataJpaTest` 등 다양하게 가능하나, `@Import`를 통해 `TestConfiguration`을 반드시 넣어줘야 한다.

#### 테스트 클래스에서 직접 등록하는 경우

```java
@SpringBootTest
@Testcontainers
class MyIntegrationTests {

    @Container
    @ServiceConnection
    static Neo4jContainer<?> neo4j = new Neo4jContainer<>("neo4j:5");

    @Test
    void myTest() {
        // ...
    }

}
```

## 질문 & 확장

(없음)

## 출처(링크)

- [Improved Testcontainers Support in Spring Boot 3.1](https://spring.io/blog/2023/06/23/improved-testcontainers-support-in-spring-boot-3-1)

## 연결 노트










