---
tags:
  - JAVA
  - Spring
aliases: null
title: record로 configuration property 생성하기
created: 2024-11-05T00:00:00.000Z
---
작성 날짜: 2024-11-05
작성 시간: 17:48


----
## 내용(Content)

### Record를 이용해서 Properties를 만드는 이유

record는 기본적으로 data class 객체 (VO)이기 때문에 생성자나 final, constructbinding,  등 코드를 줄일 수 있어서, 짧고 간결하게 구성할 수 있다.


### ConfigurationProperties 만들기

```java
@ConfigurationProperties(prefix = "db")
public record TestDatabaseProperties(
		String type,
		String version, 
		String databaseName, 
		String username,
        String password) {
}

```

### 클래스에서 Property bean 인식시키기

```java
@SpringBootTest
@EnableConfigurationProperties(TestDatabaseProperties.class)
@ActiveProfiles("db-test")
public class ContainerTest {
    
    @Autowired
    private TestDatabaseProperties dbProperties;

    @Test
    void test() {
        System.out.println(dbProperties);
    }
}
```

만약 테스트를 가볍게 하기 위해서 `@SpringBoot`가 아닌 `@ExtendWith`를 사용하는 경우 다음과 같이 선언하면 된다.


```java
@ExtendWith(SpringExtension.class)
@ContextConfiguration(initializers = ConfigDataApplicationContextInitializer.class)
@ActiveProfiles("test")
@EnableConfigurationProperties(TestDatabaseProperties.class)
public class ContainerTest {
    
    @Autowired
    private TestDatabaseProperties dbProperties;

    @Test
    void test() {
        System.out.println(dbProperties);
    }
}
```
## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










