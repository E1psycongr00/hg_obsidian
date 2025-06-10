---
tags:
  - JAVA
  - Spring
aliases: null
title: IOC & DI
created: 2024-10-26T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-10-26
작성 시간: 19:02


----
## 내용(Content)

### IOC (Inversion Of Controll, 제어의 역전)

>[!summary]
>개발자가 작성한 코드는 보통 개발자가 작성한 코드의 흐름에 따라 애플리케이션의 동작을 제어한다. 그러나 IOC의 경우 동작의 흐름과 제어를 프레임워크에게 넘긴다.

**주요 특징**
- 객체의 생성과 주기 관리는 개발자가 아닌 외부에서 담당
- 프로그램의 흐름을 프레임워크가 주도
- 개발자는 비즈니스 로직에 집중할 수 있음

### DI(Dependency Injection)

>[!summary]
>DI는 IoC를 구현하는 패턴중 하나로, 객체간의 의존성을 줄이기 위해 외부에서 객체를 주입하는 방식을 활용한다.

**주요 특징**
- 결합도 감소: 객체 간의 의존성 감소
- 재사용성 향상: 외부에서 주입되기 때문에 재사용 용이
- 테스트 간편함: 의존성을 쉽게 Mock으로 대체 가능하기 때문에 테스트가 쉬워짐

>[!caution]
>DI 와 DIP은 둘이 밀접한 관련이 있지만 차이점이 있다. DIP는 SOLID의 개발 원칙 중 하나이고 DI는 개발 방법 중 하나이다. DIP는 고수준 모듈이 저수준 모듈을 의존하지 않아야 하며, 이를 해결하기 위한 개발 방법중 하나로 의존성을 주입(DI)하는 것이다.

### Spring IOC & DI 필요성

IOC & DI가 왜 Spring의 POJO 개발을 위한 핵심 요소가 되었는지 알아보자.

예를 들어 카페에 아메리카노 커피를 제공하는 서비스를 애플리케이션으로 제공해보려고 한다. 서비스의 흐름은 다음과 같다.

![[간단한 카페 서비스 기획 (draw).svg]]

Employee는 Water Purifier와 CoffeeMachine, Calculator와 소통하는 객체이다. 이 3개의 객체와의 소통을 통해 Employee는 아메리카노 서비스를 제공하게 된다.

```java
public class Employee {
	private final WaterPurifier;
	private final CoffeeMachine;
	private final Calculator;

	public Employee(WaterPurifier waterPurifier, CoffeeMachine coffeeMachine, Calculator calculator) {
		// 필드 초기화
	}

	public Coffee orderCoffee(UserOrder userOrder) {
		//
	}
}
```

자 객체 지향적으로 Employee 서비스를 설계했다. 이렇게 객체를 주입하면, 특정 모듈에 의존하지 않고, 사용 가능하다. 하지만 필드를 초기화할 때 외부 객체를 받지 않고 new를 이용해 초기화해버리면 어떻게 될까?

new를 이용해 특정 구현체를 생성하면, 해당 구현체에 종속하게 된다. Interface의 경우 다형성을 이용해 WaterPurifier와 같은 주입 객체를 다양하게 조합 가능하지만, 객체를 생성해서 인스턴스를 만들어버리면 상황이 달라진다. 그렇다고 생성자에 객체를 인자로 받자고 하니, 매번 인스턴스를 초기화하고 객체의 lifeCycle를 개발자가 관리하는 것은 엄청 피곤한 일이다.

IOC/DI는 IOC 컨테이너에 Bean 형태로 인스턴스를 보관하고 의존성 주입을 이용해 위와 같은 문제를 쉽게 해결하고, 더욱 객체지향적으로 설계할 수 있다.

![[WAS 전체적인 구조 (draw).svg]]

WAS 구조를 보면, IOC Container에서 우리 개발자 로직 외에도 ServletWebApplicationContext에서DispatcherServlet과 소통할 객체들을 Bean으로 관리하는 것을 알 수 있다.

이렇게 IOC/DI는 Spring의 핵심 기술이라 할 수 있다.

## 질문 & 확장

(없음)

## 출처(링크)

- https://www.codestates.com/blog/content/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8
- https://www.youtube.com/watch?v=8lp_nHicYd4

## 연결 노트










