---
tags:
  - JAVA
  - 테스트
  - TestContainer
aliases: null
title: Junit5와 TestContainer를 이용한 생명주기 관리
created: 2024-11-04T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-11-04
작성 시간: 18:13


----
## 내용(Content)

### 의존성 추가

Junit5 와 TestContainer를 연동에서 사용하려면 의존성 추가가 필요하다.

```gradle
testImplementation("org.testcontainers:testcontainers") // test container
testImplementation("org.testcontainers:junit-jupiter") // JUnit5
```

그 외에는 제공하는 모듈에 따라 의존성을 추가해주면 된다. DB같은 경우 실제 드라이버 의존성도 추가해주어야 한다.

### TestContainer 라이프사이클

JUnit과 함께 제공하는 TestContainer 라이프 사이클을 관리하는 방법은 다음과 같다.

`@TestContainers와 @Container를 이용하는 방법`
- 모든 테스트 메서드에 대해서 다시 시작하는 컨테이너
- 모든 테스트 메서드 간에 공유되는 컨테이너

`Custom 하게 라이프 사이클 조절`
- withReuse()
- 추상클래스 + 싱글톤 패턴
- Gradle로 직접 생명 주기 관리

#### @TestContainers

해당 어노테이션은 `@Container` 가 달린 모든 필드를 찾아서 해당 컨테이너의 수명 주기 메서드(Startable Interface)를 호출한다. static으로 선언된 경우 컨테이너는 테스트 클래스 단위로 컨테이너 생명 주기를 가지며, 인스턴스 필드의 경우, 메서드 단위로 생명 주기를 가진다.

>[!caution]
>해당 어노테이션을 이용한 Junit 테스트는 병렬 테스트에 대해서는 테스트를 진행하지 않았기 때문에 제대로 동작할 것을 보장하지 않는다.

#### 메서드 단위의 생명 주기를 가진 container

```java
@TestContainers
class ContainterTest {

	@Container
	private JdbcDatabaseContainer<?> databaseContainer = // db container 모듈 초기화
}
```

static을 사용하지 않고 초기화하는 방법이다. 이 코드는 내부적으로 다음과 같은 코드이다.

```java

class ContainerTest {

	private JdbcDatabaseContainer<?> databaseContainer = //~~~~

	@beforeEach
	void beforeEach() {
		databaseContainer.start(); // 컨테이너 생성
	}

	@afterEach
	void afterEach() {
		databaseContainer.stop(); // 소멸
	}

}
```

![[메서드 기반 테스트 컨테이너 (draw).svg]]

이렇게 메서드 단위로 컨테이너 인스턴스를 생성하는 경우, 클래스 단위나 메서드 단위나 완벽하게 독립성이 보장되기 때문에 병렬로 안전하게 테스트 가능하다. 그러나 매 번 인스턴스를 생성하기 때문에 DB 모듈과 같이 메모리를 많이 사용하는 컨테이너의 경우 메모리 문제가 발생할 가능성이 매우 크다.
그리고 메서드 테스트 케이스마다 생성하기 때문에 속도 또한 많이 느리다.

#### 클래스 단위를 생명 주기를 가진 TestContainer

```java
@TestContainers
class ContainterTest {

	@Container
	private static JdbcDatabaseContainer<?> databaseContainer = // db container 모듈 초기화
}
```

static이기 때문에 모든 메서드에 대해서 공유가 가능하며, 클래스 단위로 병렬 실행시 안전하다.

```java
class ContainerTest {

	private static JdbcDatabaseContainer<?> databaseContainer = //~~~~

	@beforeAll
	static void setUp() {
		databaseContainer.start(); // 컨테이너 생성
	}

	@afterAll
	static void setDown {
		databaseContainer.stop(); // 소멸
	}

}
```

![[클래스 단위 클래스 컨테이너 (draw).svg]]

클래스 단위로 인스턴스를 생성하며, 안전하게 활용 가능하다. 공식 사이트의 예제를 봐도 static을 활용한 예제를 보여주는 것 보면 이 방식이 가장 무난하다. 다만 이 방법도 비슷한 테스트 클래스가 많아진다면, 메서드 단위 컨테이너처럼 많은 메모리를 잡아먹을 가능성이 크다.

이 방식의 경우, 메서드 단위로 병렬 실행은 피해야 한다. 테스트 메서드 쓰레드가 동시에 접근하면, 동시성 문제가 발생할 수 있기 때문이다.

#### withReuse(true)

이 방식은 매우 위험하고, 실험적이라 사용할 때 매우 신중해야 한다. 서로 다른 JVM 해당 컨테이너를 공유해서 사용하기 때문이다. 어떻게 동작할지 예측하기 쉽지 않기 때문에 잘 사용해야 한다.

#### Abstract + 싱글턴 패턴

static하게 컨테이너를 설계한 후, static 블럭을 이용해 클래스 로드시 초기화한다. 그 이후, 모든 테스트가 종료되면 JVM이 종료되고 그 이후, [Ryuk 컨테이너](https://github.com/testcontainers/moby-ryuk)을 통해 자동으로 컨테이너를 정리한다.

>[!tip]
>Ryuk 컨테이너는 지정된 지연 후 지정된 필터에 따라 컨테이너, 네트워크, 볼륨 및 이미지를 제거할 수 있도록 도와준다.

```java
public abstract class AbstractSigletonContainerTest {
    private static JdbcDatabaseContainer<?> databaseContainer;

    static {
        databaseContainer = new PostgreSQLContainer<>("postgres:16.1");
        databaseContainer.start();
    }
}
```

![[Abstract + 싱글턴 패턴 테스트 컨테이너 (draw).svg]]

Ryuk 컨테이너가 자동으로 컨테이너를 정리해주기 때문에 따로 stop()을 호출하지 않는다.
이 코드의 장점은 이것을 상속받아 활용하는 테스트들은 container 하나를 공유해서 테스트가 가능하다는 점이다. 이를 통해 메모리를 효율적으로 처리할 수 있지만, 병렬로 실행하는 경우, 순서 문제로 테스트 결과가 잘못 될 수 있기 때문에 테이블을 잘 분리해서 진행해야 병렬 처리 시 안전하다.

[[싱글턴 컨테이너 패턴과 JOOQ를 활용해서 안전한 테스트 코드 설계하기]] 참고해보자.

#### Gradle로 관리하기

Gradle의 경우는 조금 복잡하다. 해당 블로그를 참고해보자.

https://flex.team/blog/2024/07/29/tech-testcontainers/



## 질문 & 확장

 [해당 블로그](https://flex.team/blog/2024/07/29/tech-testcontainers/)에서 사용하는 방식은 이미 짜여진 Integration code가 많고, 코드 수정 없이 어떻게 해야 효율적으로 테스트 컨테이너 라이프 사이클을 관리할 지 고민한 것 같다. 아직 제대로 이해 하진 못했다.

## 출처(링크)

- https://java.testcontainers.org/test_framework_integration/junit_5/#adding-testcontainers-junit-5-support-to-your-project-dependencies
- https://flex.team/blog/2024/07/29/tech-testcontainers/

## 연결 노트

- [[CPU의 작업 처리 방식 (병렬성과 동시성)|병렬성과 동시성]]
- [[race condition]]
- [[싱글턴 컨테이너 패턴과 JOOQ를 활용해서 안전한 테스트 코드 설계하기]]


