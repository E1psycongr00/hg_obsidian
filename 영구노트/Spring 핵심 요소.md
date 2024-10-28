---
tags:
  - 완성
  - JAVA
  - Spring
aliases: 
date: 2024-10-25
title: Spring 핵심 요소
---
작성 날짜: 2024-10-25
작성 시간: 17:43


----
## 내용(Content)

### Spring이란 무엇인가?

>[!summary]
>엔터프라이즈용 Java 어플리케이션 개발을 편하게 해주는 오픈소스 경량급 어플리케이션 프레임워크이다.


![[Pasted image 20241026183919.png]]

#### 간편한 개발

Spring 이전에는 웹 애플리케이션을 제작하기 위해  개발자가 구현해야 할 것들이 많았지만, Spring을 이용하면 기술보다 비즈니스 로직에 더 집중을 할 수 있기 때문에 쉽고 빠르게 개발이 가능하다.

>[!help]
> 비즈니스 로직은 기업이 제공하는 서비스를 코드로 구현한 것으로 서비스를 위한 어플리케이션이 요구하는 핵심 로직이라 할 수 있다.

#### 오픈소스

어떤 개인, 또는 기업도 Spring을 사용하여 웹 애플리케이션을 개발 가능하고, 필요한 일부 코드를 수정해서 사용해도 문제가 없다.

보통 오픈소스는 개발 인원이 불안정하고, 문제가 있을 수 있지만, Spring의 경우 SpringSource라는 기업이 관리하고 있고, Spring 소스 코드에 기여하는 인원이 매우 한정적이기 때문에 안정적으로 운영할 수 있다.

#### 경량급

Spring은 엄청나게 많은 기능을 제공하는 프레임워크지만, 사용시 개발자가 개발에 필요한 코드는 매우 줄어든다. Spring을 사용함으로써 불필요한 코드들을 제거하고, 코드의 복잡성을 낮출 수 있다.

### Spring의 핵심 3요소

![[Pasted image 20241026185219.png|[코드 스테잇츠 spring boot](https://www.codestates.com/blog/content/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8)]]


Spring은 POJO 프로그래밍을 지향하며, POJO 프로그래밍을 지원하기 위해 **IOC/DI**, **AOP**, **PSA** 와 같은 기술을 제공한다.

>[!help]
>[[IOC & DI|IOC/DI]]는 (Inversion of Control / Dependency Injection, 제어의 역전 / 의존성 주입으로 결합도를 낮추고, 주입에 필요한 객체의 인스턴스를 bean으로 효과적으로 관리하는 기술이다.

>[!help]
>AOP는 (Aspect Oriented Programming, 관심지향 프로그래밍)으로 로직에는 공통 로직과 핵심 비즈니스 로직이 있는데 이들을 분리하여 효과적으로 코드를 짤 수 있게 해주는 기술이다.

>[!help]
>[[Portable Service Abstraction|PSA]]는 (Portable Service Abstraction, 일관된 서비스 추상화)를 제공하는데 일관된 인터페이스를 활용해 여러 기술들을 쉽게 적용하여 사용할 수 있다.



## 질문 & 확장

(없음)

## 출처(링크)

- https://www.codestates.com/blog/content/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8

## 연결 노트

- [[IOC & DI]]
- [[Portable Service Abstraction|PSA]]
- [[Spring Boot]]

