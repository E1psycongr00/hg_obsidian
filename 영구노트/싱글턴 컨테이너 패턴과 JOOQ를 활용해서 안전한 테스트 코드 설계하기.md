---
tags:
  - 완성
  - 솔루션
  - JAVA
  - 테스트
  - TestContainer
  - JOOQ
aliases: 
date: 2024-11-04
title: 싱글턴 컨테이너 패턴과 JOOQ를 활용해서 안전한 테스트 코드 설계하기
---
작성 날짜: 2024-11-04
작성 시간: 20:41


----

## 문제 & 원인

테스트 케이스마다, 혹은 클래스마다 컨테이너를 매 번 생성하고 실행하는 것은 테스트의 속도를 떨어뜨리고, 메모리 사용량도 높다.

![[Abstract + 싱글턴 패턴 테스트 컨테이너 (draw).svg]]

그러나 병렬로 처리하는 경우 동시성 문제가 발생할 수 있는데 이를 예방하기 위해서는 클래스별로 다른 테이블을 생성하고, 이를 활용하는 방법이다.


## 해결 방안

#### Abstract + 싱글턴 컨테이너 패턴

```java
public abstract class AbstractSigletonContainerTest {
    private static JdbcDatabaseContainer<?> databaseContainer;

    static {
        databaseContainer = new PostgreSQLContainer<>("postgres:16.1");
        databaseContainer.start();
    }
}

```

#### 유틸 메서드 만들기

```java
public final class JooqTestUtils {

    private static final String ALLOWED_CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789";
    private static final int RANDOM_STRING_LENGTH = 8;
    private static final Random random = new Random();

    public static Table<Record> makeTable(String tableName) {
        return table(tableName + "_" + generateRandomString(RANDOM_STRING_LENGTH));
    }

    public static <T> Field<T> makeField(String fieldName, Class<T> type) {
        return field(fieldName, type);
    }

    private static String generateRandomString(int length) {
        return random.ints(length, 0, ALLOWED_CHARACTERS.length())
                .mapToObj(ALLOWED_CHARACTERS::charAt)
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
    }

}
```

random을 이용해서 table이 겹치지 않도록 만든다.

#### 실제 동작 테스트 코드

```java
@JooqTest
@ActiveProfiles("test")
public class MyJooqTest extends AbstractSigletonContainerTest {

    private static final Table<?> USERS = JooqTestUtils.makeTable("users");
    private static final Field<Long> ID = JooqTestUtils.makeField("id", Long.class);
    private static final Field<String> NAME = JooqTestUtils.makeField("name", String.class);
    private static final Field<String> EMAIL = JooqTestUtils.makeField("email", String.class);

    @Autowired
    DSLContext dslContext;

    @BeforeEach
    void setUp() {
        dslContext.createTableIfNotExists(USERS)
                .column(ID, SQLDataType.BIGINT.nullable(false))
                .column(NAME, SQLDataType.VARCHAR(255))
                .column(EMAIL, SQLDataType.VARCHAR(255))
                .execute();
    }

    @Test
    void test() {
        dslContext.selectFrom(JooqTestUtils.makeTable("users")).fetch();
    }
}
```

>[!caution]
>굳이 유틸 메서드를 안 만들고 매번 테이블 생성 시 테이블 이름과 함께 넣을 수도 있지만, 실수할 우려도 있고, 다른 클래스에서도 공통 메서드를 많이 사용하기 때문에 Util 메서드를 따로 만들었다. 물론 결합도가 높아지는 문제점이 있지만, Jooq DB만을 위한 테스트임으로 큰 문제는 없다.

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
