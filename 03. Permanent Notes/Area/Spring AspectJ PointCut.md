---
tags:
  - JAVA
  - Spring
  - AOP
aliases:
  - PointCut
title: Spring AspectJ PointCut
created: 2024-10-30T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-10-30
작성 시간: 12:34


----
## 내용(Content)

### PointCut

>[!summary]
>pointcut은 표현식을 통해 원하는 Joinpoint를 결정하여 Advice가 실행되는 시기를 결정

![[PointCut의 역할 (draw).svg]]

PointCut의 역할은 Advice를 적용할 다른 패키지 모듈의 메서드를 탐색하는 것이다. 탐색이 끝나면 프록시 객체를 만들어서 해당 메서드에 Advice를 적용한다.


### PCD (PointCut Designators)

pointcut expression을 위해 AspectJ의 다양한 포인트컷 지시자를 지원한다.

**execution** : 메서드 실행 join point와 일치시킴

```text
execution(접근제한자? 반환타입? 클래스이름?메서드이름(매개변수))
```

1. 접근 제한자는 public만 지원하고 생략 가능
2. 반환타입은 메서드의 반환타입이다
3. 패키지를 포함한 클래스 이름을 입력한다
4. 메서드의 이름을 입력한다
5. 매개변수 목록

>[!example]
>1. `execution(void com.example.TestBean.method1())`
>	- void 반환 타입에 TestBean 클래스의 method1 메서드이고 매개변수는 없음
>2. `execution(* com.example.*.*(..))`
>	- 모든 반환 타입, com.example 패키지 내의 모든 클래스, 모든 메서드, 모든 매개변수
>3. `execution(* *.*(..)`
>	- 모든 반환 타입, 모든 패키지 클래스, 모든 메서드, 모든 매개변수
>4. `execution(* *(String, ..))`
>	- 모든 반환 타입, 첫번째 매개변수가 String이고, 그 뒤에 0개 이상의 매개변수
>5. `execution(int hello.aop.member.MemberServiceImpl.*(..)`
>	- int 반환 타입, MemberServiceImpl 클래스의 모든 메서드, 모든 매개변수

>[!tip]
>execution은 인터페이스에도 적용 가능하며, 인터페이스에 적용시 모든 구현체에 대해 적용한다.

**within**: 특정 타입 내의 메소드 실행 join point와 일치시킴

within은 execution보다 기능은 덜 지원하지만, 간결하게 작성 가능하다.

```text
# 특정 서비스 내 모든 메서드 매칭
within(com.example.service.UserService)

# 특정 패키지 내의 모든 클래스 모든 메서드 매칭
within(com.example.service.*)

# 특정 패키지 및 하위 패키지 내 모든 클래스의 모든 메서드 매칭
within(com.example.service..*)
```

**args**: 특정 인자가 포함된 메서드에 적용하고자 할 때 사용

```text
args(java.lang.String)
```

**@annotation**: 지정된 annotation에 aop를 적용하고자 할 때 사용된다.

```text
@annotation(com.example.CustomAnnotation)
```

어노테이션 패키지 경로까지 입력해주면 된다. @annotation은 간단하면서도 무궁무진하게 쓸 수 있으므로 잘 알아두는 것이 좋다.

### PointCut의 조합

pointcut을 조합할 때는 다음과 같은 특징을 지닌다.

1. &&, ||, ! 으로 합성하기
2. 네임드 포인트컷 재사용

#### Pointcut 조합 예시

```java
@Pointcut("execution(* com.example.repository.*.*(..))")
public void repositoryLayer() {}

@Pointcut("execution(* com.example.service.*.*(..))")
public void serviceLayer() {}

@Pointcut("repositoryLayer() || serviceLayer()")
public void dataAccessLayer() {}
```

네임드 포인트 컷이란 pointcut을 정의한 메서드를 표현식에서 위와 같이 활용할 수 있다. 그리고 제한적인 조합을 만들고 싶다면 `&&`, 더 포괄적인 PointCut 조합을 만들고 싶다면 `||` 을 쓰면 된다.



## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










