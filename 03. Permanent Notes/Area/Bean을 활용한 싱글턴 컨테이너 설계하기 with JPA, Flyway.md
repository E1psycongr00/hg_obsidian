---
tags:
  - 솔루션
  - Gradle
aliases: null
title: 'Bean을 활용한 싱글턴 컨테이너 설계하기 with JPA, Flyway'
created: 2024-11-20T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-11-20
작성 시간: 21:24


----

## 문제 & 원인

테스트 컨테이너를 사용 시 고려해야 할 점이 있다.

1. 단순 인스턴스로 테스트 실행 시 매 테스트 매서드마다 컨테이너를 새로 생성한다.
2. static 으로 컨테이너를 생성해도 테스트 클래스가 많다면 병렬 실행 시 많은 컨테이너가 생성된다.
3. 테스트 상속을 활용해도 유동적으로 필요한 컨테이너를 생성하기 쉽지 않다.

공식 문서에 따르면 `@TestContainers`와 static의 경우 테스트 클래스만큼 life cycle을 가지고, static이 아닌 경우 테스트 메서드 케이스만큼 life cycle을 가진다고 한다. 1번의 경우 가장 안전한 테스트를 보장하지만, docker 컨테이너를 매번 생성하는 것은 테스트를 느리게 만들고 메모리가 터질 가능성이 있다.

편의성 측면에서도 문제가 있다. Abstract를 이용해서 컨테이너 틀을 구성하고, 상속해서 테스트를 구성하면 편리하게 테스트를 구성할 수 있다. 하지만, JAVA 언어의 경우 여러 클래스를 상속 불가능하기 때문에 원하는 컨테이너를 활용하는 것도 쉽지 않다는 점이 있다.

## 해결 방안

### Bean으로 등록하기

Container를 Bean으로 등록하면, 한 개임을 보장하고, 쉽게 Import해서 적용할 수 있다. 이것의 가장 큰 장점은 코드가 간단하면서, Import으로 Configuration을 주입하면 컨테이너에 접근할 수 있는 구조이다.

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

주입할 TestConfiguration을 작성한다.

```java
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(TestcontainersConfig.class)
@ActiveProfiles("test")
@Transactional
class MemberRepositoryTest2 {
    @Autowired
    private MemberRepository memberRepository;

	// test code
}

```

`@DataJpaTest` 대신 `@SpringBootTest`를 써도 된다.

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        format_sql: true
    show-sql: true
  flyway:
    enabled: true

```

>[!caution]
>다른 곳에서 import해야 하기 때문에 public으로 선언해야 한다.!!


## 질문 & 확장

단점은 Spring과 lifecycle을 같이 하기 때문에 test 동안 지속적으로 메모리를 차지한다.

## 출처(링크)


## 연결 노트

- [[03. Permanent Notes/Area/@ServiceConnection]]
