---
tags:
  - 완성
  - JAVA
  - Spring
  - AOP
aliases: null
title: Spring AspectJ
created: 2024-10-28T00:00:00.000Z
---
작성 날짜: 2024-10-28
작성 시간: 19:41


----
## 내용(Content)

### AspectJ

>[!summary]
>AspectJ 전용 컴파일러를 활용하여 런타임이 아닌 컴파일 및 클래스 로드시 Weaving을 진행한다.

AspectJ의 Weaving 시점은 다음과 같다.

- 컴파일 시점 Weaving: 소스 코드 컴파일 시 수행
- 컴파일 후 Weaving: 이미 컴파일된 클래스 파일에 대해 수행
- 로드 시점 Weaving: 클래스가 JVM에 로드될 때 수행

Weaving을 잘 활용하면, 횡단 관심사(cross-cutting concerns)를 효과적으로 관리하고, 코드의 모듈성을 향상시킬 수 있다.

>[!help]
>`Weaving`이란 Aspect에 정의된 Advice(구현 코드)를 애플리케이션의 적절한 지점(JoinPoint)에 삽입하는 프로세스이다. Weaving을 통해 AspectJ 컴파일러가 Aspect 코드와 애플리케이션 코드를 결합하여 새로운 바이트 코드를 생성한다.


### Spring AOP vs AspectJ

#### 성능

[벤치마크](https://web.archive.org/web/20150520175004/https://docs.codehaus.org/display/AW/AOP+Benchmark)에 따르면 AspectJ는 런타임에 동작하는 Spring AOP보다 8~35배 정도의 속도 차이를 보인다.

#### 범용성

Spring AOP는 Spring에서만 사용가능하고 Bean에만 적용한다. AspectJ는 Java에서도 사용가능하며 여러 객체에 적용 가능하다.

#### JoinPoint 위치

Spring AOP는 메서드 실행에 대해서만 JoinPoint가 가능하다. 그러나 AspectJ의 경우 훨씬 강력하다.

AspectJ가 JoinPoint 가능한 목록은 다음과 같다.
- 메서드 호출
- 메서드 실행
- 생성자 호출
- 생성자 실행
- 정적 초기화 실행
- 객체 초기화
- 필드 참조
- 필드 할당
- 핸들러 실행
- 어드바이스 실행

### Spring에서 AspectJ 사용하기

Spring에서 @Aspect 를 이용하면, AspectJ 문법을 활용하지만, 내부적으로는 Spring AOP로 동작한다.

#### 환경 설정

```gradle
implementation 'org.springframework.boot:spring-boot-starter-aop'
```

```java
@Configuration
@EnableAspectJAutoProxy
public class AppConfig {
    
}

```

`@EnableAspectJAutoProxy`은 Aspect 모듈이 Spring AOP로 동작하도록 자동 환경 설정을 하는 것이다.

#### Aspect 선언하기

```java

@Aspect
@Component
public class HelloAspect {

}
```

이렇게 어노테이션을 쓰면 HelloAspect 클래스는 Aspect 모듈이 된다.

#### PointCut 선언하기

pointcut은 원하는 Joinpoint를 결정하여 Advice가 실행되는 시기를 결정한다. 

>[!caution]
>Spring AOP는 메서드 실행에 관련해서만 JoinPoint를 지원한다

Pointcut 어노테이션을 활용하면 메서드에 Pointcut를 할당할 수 있다.

자세한 포인트 컷 사용은 [[Spring AspectJ PointCut|PointCut]] 을 참고하자

```java

@Aspect
@Component
public class AuthenticationAspect {
    
    // Pointcut 정의
    @Pointcut("@annotation(com.example.spring_test.annotation.RequireAuthentication)")
    public void authenticatedOperation() {}
}
```

#### Advice 선언하기

```java

@Aspect
@Component
public class AuthenticationAspect {
    
    // Pointcut 정의
    @Pointcut("@annotation(com.example.spring_test.annotation.RequireAuthentication)")
    public void authenticatedOperation() {}
    
    // Before 어드바이스에서 Pointcut 참조
    @Before("authenticatedOperation()")
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

AspectJ에서는 advice를 다섯 가지 유형으로 나눈다.

|**유형**|**실행 시점**|
|---|---|
|Before|조인 포인트 실행 전|
|AfterReturning|조인 포인트가 성공적으로 실행된 후|
|AfterThrowing|조인 포인트에서 예외가 발생한 후|
|AfterAdvice|(성공/예외 상관없이) 조인 포인트 실행 후|
|AroundAdvice|조인 포인트 실행 전과 후에 실행 (조인 포인트를 감싸는 코드 블록)|

#### Aspect 순서 정하기

Aspect 모듈은 클래스에 @Order(Number)를 이용해서 순서를 정해줄 수 있다. Order은 프록시가 감싸는 순서이다.

![[AspectJ Order 순서 (draw).svg]]

그래서 Before, After 관계도 Proxy 감싼 경우를 생각해봐야 한다.

```text
클라이언트 호출
-> @Order(2) Before 어드바이스
-> @Order(1) Before 어드바이스
-> 타겟 메소드 실행
-> @Order(1) After 어드바이스
-> @Order(2) After 어드바이스
-> 클라이언트에 결과 반환
```

>[!tip]
>- 우선순위 : @Around, @Before, @After, @AfterReturning, @AfterThrowing.
>    - 단 실제 실행 순서는 @Around, @Before, (@AfterThrowing, @AfterReturning,) @After 이다.

## 질문 & 확장

(없음)

## 출처(링크)

- https://velog.io/@tidavid1/AOP-%EB%A8%B9%EB%8A%94%EA%B1%B4%EA%B0%80-Spring-AOP%EC%99%80-AspectJ%EB%A5%BC-%EB%B9%84%EA%B5%90%ED%95%B4%EB%B3%B4%EC%9E%90
- https://blog.leaphop.co.kr/blogs/54/Spring_Core_Technolohies_2__AOP__2___AspectJ%EB%A5%BC_%EC%9D%B4%EC%9A%A9%ED%95%B4_Aspect_%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
- https://velog.io/@smc2315/spring-aop#33-aspect%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-aop-%EC%82%AC%EC%9A%A9
- https://www.baeldung.com/spring-aop-vs-aspectj


## 연결 노트

- [[Spring AspectJ PointCut|PointCut]]








