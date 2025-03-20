---
tags:
  - 완성
  - JAVA
  - Spring
  - AOP
aliases:
  - AOP
date: 2024-10-28
title: Aspect Oriented Programming
---
작성 날짜: 2024-10-28
작성 시간: 15:57


----
## 내용(Content)

### AOP (관점 지향 프로그래밍)

>[!summary]
> 여러 모듈에서 반복되는 기능을 하나의 모듈로 분리해서 재사용 가능한 모듈로 만드는 것으로, 반복되는 비즈니스 로직을 분리하여 개발하는 방법

AOP는 여러 모듈에서 공통적으로 사용되는 기능을 관점 측면으로 모듈화하는 방식이다. Aspect는 사전적 의미로는 "측면", "관점" 등을 의미한다. 비즈니스 로직 사이에 보조 역할인 관심사(Concern)을 분리해서 개발한다.

### OOP와 비교

#### OOP 특징

OOP는 객체 지향 프로그래밍으로 모듈을 클래스 단위로 분류하여, 소프트웨어를 개발하는 방법이다. 상속, 캡술화, 다형성과 같은 OOP 특징을 이용해서 유연하고 확장 가능한 소프트웨어를 개발하는데 사용되는 패러다임이라 할 수 있다.

#### OOP의 한계

```java
@Service
public class DemoService {

    public User getUser(User user) {
        if (!user.isAuthenticated()) {
            throw new RuntimeException("login failed");
        }
        // business logic
        return user;
    }
}
```

여기서 인증 체크를 하고 비즈니스 로직을 수행하는 부분이 있다고 가정하자. 인증 체크는 권한 문제로 어떤 곳에서든 활용할 수 있는 로직이다. DemoService의 getUser의 비즈니스 로직을 분석해보자

getUser의 비즈니스 로직 -> 권한을 체크하고 권한이 있다면 User 정보를 가져온다.

이 로직을 2개로 분리할 수 있다.

1. 권한을 체크하고 문제가 있다면 오류 반환
2. User 정보를 가져오는 로직

여기서 핵심 로직은 2번이고 1번의 경우 공통적으로 다른 메서드에서도 사용할 수도 있는 로직이다.
OOP적으로 해결하고 싶다면 IsAuthenticated()가 중복되기 때문에 클래스로 만들어서 주입하는 방법이 있다.

```java
public class UserAuthChecker {
	public check(User user) {
		if (!user.isAuthenticated()) {
			throw new RuntimeException("login failed");
		}
	}
}
```

```java
@Service
public class DemoService {
	private final UserAuthChecker userAuthChecker;

	public DemoService(UserAuthChecker userAuthChecker) {
		this.userAuthChecker = userAuthChecker;
	}

    public User getUser(User user) {
		userAuthChecker.check(user);
        // business logic
        return user;
    }
}
```

굉장히 객체지향적이고 좋은 코드다. 하지만, 만약 이런 공통 모듈이 비즈니스 로직에 여러개 들어있다면 어떻게 될까?
보안, 로깅, 트랜잭션, 유효성 검사 등등 이 모든 것을 Mocking해야 하고 테스트시 수많은 Mocking 코드를 작성해야 할 수도 있다.

#### AOP를 사용한다면?

AOP를 사용하면 공통 모듈을 따로 분리하고, 프록시 객체를 활용해서 aop를 구현하게 된다. 이것의 장점은 현재 코드에 `핵심 비즈니스 로직`만 코드에 남기고 나머지 공통 로직은 따로 모듈화해서 프록시 객체에 붙이기 때문에 굉장히 효율적인 테스트 코드를 짤 수 있다. 예시를 보자

```java
@Service
public class DemoService {

    public User getUser(User user) {
        // business logic
        return user;
    }
}
```

```java
@Aspect
@Component
public class AuthenticationAspect {
    
    @Before("@annotation(com.example.spring_test.annotation.RequireAuthentication)")
    public void checkAuthentication(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            if (arg instanceof User) {
                User user = (User) arg;
                if (!user.isAuthenticated()) {
                    throw new RuntimeException("login failed");
                }
                return;
            }
        }
    }
}
```

위 코드는 AspectJ를 활용했다. JoinPoint를 활용해서 어노테이션이 기입된 메서드의 인자에 User타입이 있다면 권한 검사를 진행한다. AOP Proxy를 활용하면 Service 테스트는 핵심로직만 테스트하면 되기 때문에 테스트가 매우 쉬워진다. 그러면서 Annotation을 활용해 Service는 권한 검사를 수행함을 또한 알 수 있게 된다.

### AOP의 원리

AOP는 프록시 객체를 생성해서 해당 객체을 덮어서 사용한다. Spring의 경우 JDK에서 제공하는 JDK Proxy(interface)와 CGLIB(class)을 이용해서 Proxy를 생성한다.

![[Pasted image 20241028193526.png]]

위 그림을 보면 일반 Plain Object에서 함수를 호출하는 과정을 매우 간단하다. pojo.foo()를 object 내부의 메서드 foo()에서 호출하는 것이다.

![[Pasted image 20241028193607.png]]

프록시를 적용한다면 동작이 바뀐다.

Proxy객체가 Plain Object를 감싸기 때문에 foo()를 호출시 proxy에서 감싼 foo()가 동작하고 그 이후 내부의 Plain Object의 foo()가 동작한다. 이 때 상황에 따라 Proxy는 foo() 전, 후에 코드를 호출할 지 결정한다.


## 질문 & 확장

(없음)

## 출처(링크)

- https://docs.spring.io/spring-framework/reference/core/aop.html
- https://blog.leaphop.co.kr/blogs/53/Spring_Core_Technolohies_2__AOP__1__AOP%EC%9D%98_%EA%B0%9C%EB%85%90_%EC%9D%B4%ED%95%B4
- https://blog.leaphop.co.kr/blogs/54

## 연결 노트

- [[Spring AspectJ]]








