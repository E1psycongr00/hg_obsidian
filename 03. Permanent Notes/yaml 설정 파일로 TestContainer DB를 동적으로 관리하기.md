---
tags:
  - 솔루션
  - JAVA
  - Spring
  - JOOQ
  - 테스트
aliases: null
title: yaml 설정 파일로 TestContainer DB를 동적으로 관리하기
created: 2024-11-04T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-11-04
작성 시간: 21:17


----

## 문제 & 원인

프로젝트를 하다보면 DB를 마이그레이션할 때도 있고, 특정 DB에 의존되지 않는 Application을 설계하고 싶을 때도 있다. 이런 경우 DB와 관련된 IntegrationTest에서 특별한 코드 변경 없이, Application.yml의 설정 파일 수정만으로 DB를 바꿔서 테스트하고 싶을 수 있다.

static 컨테이너를 생성하면서 메모리 효율은 높이고, 특별한 코드 수정 없이 DB 를 수정하는 방법을 생각해보자.


## 해결 방안

해결하기 위해 해야 할 일은 다음과 같다.

- static 블록을 통해 클래스 로드 타임에 컨테이너를 초기화한다.
- 컨테이너를 초기화하기 위해 application.yml에서 정보를 직접 추출해서 등록한다.
-  여러 DB 컨테이너 인스턴스 초기화를 위한 심플 팩토리를 만든다.

#### 테스트 컨테이너 프로퍼티 만들기

```java
@ConfigurationProperties(prefix = "db")
@Getter
public class TestDatabaseProperties {
    private final String type;
    private final String version;
    private final String databaseName;
    private final String username;
    private final String password;

    @ConstructorBinding
    public TestDatabaseProperties(String type, String version, String databaseName, String username,
            String password) {
        this.type = type;
        this.version = version;
        this.databaseName = databaseName;
        this.username = username;
        this.password = password;
    }
}

```

TestContainer 인스턴스 생성을 위한 프로퍼티 객체를 만들어준다.

#### 테스트 컨테이너 팩토리 만들기

```java
public class TestContainerSimpleFactory {

    @SuppressWarnings("resource")
    public static JdbcDatabaseContainer<?> createContainer(TestDatabaseProperties properties) {
        JdbcDatabaseContainer<?> container = switch (properties.getType()) {
            case "postgres" -> new PostgreSQLContainer<>(String.format("postgres:%s", properties.getVersion()));
            case "mysql" -> new MySQLContainer<>(String.format("mysql:%s", properties.getVersion()));
            default -> throw new IllegalArgumentException("Unsupported database type: " + properties.getType());
        };

        return container.withDatabaseName(properties.getDatabaseName())
                .withUsername(properties.getUsername())
                .withPassword(properties.getPassword());
    }
}

```

테스트 컨테이너 팩토리를 만들어서 Factory 생성을 하도록 한다. 이렇게 코드를 짜면 의존성은 커지긴 하지만, 코드 관리가 쉽다는 장점이 있다.

#### Abstract 싱글턴 컨테이너 만들기

```java
@Slf4j
abstract class AbstractDbContainerTest {

    private static final String DB_PROPERTIES_FILE = "application-db.yml";

    private static TestDatabaseProperties dbProperties;
    protected static JdbcDatabaseContainer<?> databaseContainer;

    static {
        Properties properties = loadTestProperties();

        dbProperties = new TestDatabaseProperties(
                properties.getProperty("db.type"),
                properties.getProperty("db.version"),
                properties.getProperty("db.database-name"),
                properties.getProperty("db.username"),
                properties.getProperty("db.password"));

        databaseContainer = TestContainerSimpleFactory.createContainer(dbProperties);

        try {
            databaseContainer.start();
            configureSystemProperties();
            log.info("Database container started successfully");
        } catch (Exception e) {
            log.error("Failed to start database container", e);
            throw new RuntimeException("Container startup failed", e);
        }
    }

    private static Properties loadTestProperties() {
        try {
            YamlPropertiesFactoryBean yaml = new YamlPropertiesFactoryBean();
            yaml.setResources(new ClassPathResource(DB_PROPERTIES_FILE));
            Properties properties = yaml.getObject();

            if (properties == null) {
                throw new IllegalStateException("Failed to load " + DB_PROPERTIES_FILE);
            }

            return properties;
        } catch (Exception e) {
            log.error("Error loading " + DB_PROPERTIES_FILE, e);
            throw new RuntimeException("Failed to load test properties", e);
        }
    }

    private static void configureSystemProperties() {
        System.setProperty("spring.datasource.driver-class-name", databaseContainer.getDriverClassName());
        System.setProperty("spring.datasource.url", databaseContainer.getJdbcUrl());
        System.setProperty("spring.datasource.username", databaseContainer.getUsername());
        System.setProperty("spring.datasource.password", databaseContainer.getPassword());
    }

}

```

YamlPropertiesFactoryBean 을 이용해 직접 yaml 파일을 로드해서 property 정보를 이용해 static 컨테이너를 생성하는 방법이다. 그리고 이렇게 선언된 Container가 포함된 테스트 클래스를 상속하여, 보다 편하게 사용 가능하다.

```java
@Slf4j
@JooqTest
class ContainerTest extends AbstractDbContainerTest {

    private static final Table<Record> USERS = makeTable("users");

    private static final class Users {
        private static final Field<Long> ID = makeField("id", Long.class);
        private static final Field<String> NAME = makeField("name", String.class);
        private static final Field<String> EMAIL = makeField("email", String.class);
    }

    @Autowired
    DSLContext dslContext;

    @BeforeEach
    void setUp(@Autowired DSLContext dslContext) {
        dslContext.createTableIfNotExists(USERS)
                .column(Users.ID, SQLDataType.BIGINT.nullable(false))
                .column(Users.NAME, SQLDataType.VARCHAR(255))
                .column(Users.EMAIL, SQLDataType.VARCHAR(255))
                .constraint(constraint("users_pk").primaryKey(Users.ID))
                .execute();
        dslContext.insertInto(USERS).columns(Users.ID, Users.NAME, Users.EMAIL).values(1L, "John", "abs@naver.com")
                .execute();
        dslContext.insertInto(USERS).columns(Users.ID, Users.NAME, Users.EMAIL).values(2L, "Jane", "jane@naver.com")
                .execute();
    }

    @Test
    void test() {
        List<Map<String, Object>> users = dslContext.selectFrom(USERS).fetchMaps();
        log.info("users: {}", users);
        assertThat(users).hasSize(2);
        log.info("databaseContainer: {}", databaseContainer.getJdbcUrl());
    }

}
```

![[Pasted image 20241105170020.png]]

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트

- [[yaml 설정 파일로 TestContainer DB를 동적으로 관리하기_v2| Spring bean을 이용해 DB를 동적으로 관리하는 개선된 코드]]
