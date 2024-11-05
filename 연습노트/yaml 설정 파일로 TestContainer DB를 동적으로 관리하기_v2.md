---
tags:
  - 미완
  - 솔루션
aliases: 
date: 2024-11-05
title: yaml 설정 파일로 TestContainer DB를 동적으로 관리하기_v2
---
작성 날짜: 2024-11-05
작성 시간: 19:45


----

## 문제 & 원인

[[yaml 설정 파일로 TestContainer DB를 동적으로 관리하기]] 의 문제점은 직접 `YamlPropertiesFactoryBean`을 static 블록에서 생성해서 임의로 property를 초기화해서 사용한다는 점이다. 하드코딩해서 코드가 길어지고, Spring을 잘 활용하지 못한 코드여서 개선이 필요했다.

## 해결 방안

static 단계가 아닌 Spring에서 ConfigurationProperties를 불러오고 bean을 활용해 싱글턴으로 활용하면 쉽게 테스트를 수행할 수 있다. 이것의 장점은 온전히 Spring을 사용해서 코드 수를 줄일 수 있고, bean을 활용하기 때문에 싱글턴을 보장하면서도, db 뿐만 아니라 container를 확장해서 쓸 수 있다.그리고 상속할 필요도 없다.

#### ConfigurationProperties 정의하기

```java
@ConfigurationProperties(prefix = "db")
public record TestDatabaseProperties(String type, String version, String databaseName, String username,
        String password) {
}

```

record로 간단하게 ConfigurationProperties를 정의한다.

#### 팩토리 정의하기

```java
public interface DbTestContainerFactory {

    JdbcDatabaseContainer<?> createDbContainer(TestDatabaseProperties dbProperties);
}

```

```java
public class DbTestContainerSimpleFactory implements DbTestContainerFactory {

    @Override
    public JdbcDatabaseContainer<?> createDbContainer(TestDatabaseProperties dbProperties) {
        Objects.requireNonNull(dbProperties);
        String imageName = dbProperties.type() + ":" + dbProperties.version();
        return switch (dbProperties.type()) {
            case "mysql" -> new MySQLContainer<>(imageName);
            case "postgres" -> new PostgreSQLContainer<>(imageName);
            default -> throw new IllegalArgumentException("Unsupported database type: " + dbProperties.type());
        };
    }

}

```

#### bean으로 정의하기

```java
@TestConfiguration
public class TestDbContainerConfig {

    @Bean
    JdbcDatabaseContainer<?> dbContainer(TestDatabaseProperties dbProperties) {
        DbTestContainerFactory factory = new DbTestContainerSimpleFactory();
        JdbcDatabaseContainer<?> container = factory.createDbContainer(dbProperties);
        container.start();
        return container;
    }
}

```

bean으로 properties를 활용해 동적으로 container를 정의한후 start()를 실행한다. bean은 싱글턴을 보장하기 때문에 한번만 start()를 실행하게 된다.

#### Test Code

```java

```

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
