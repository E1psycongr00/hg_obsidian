---
tags:
  - 완성
  - JAVA
  - Spring
aliases: 
date: 2024-10-25
title: Spring 요청 처리 과정
---
작성 날짜: 2024-10-25
작성 시간: 16:47


----
## 내용(Content)

### 백엔드 서버 전체적인 구조

![[WAS 전체적인 구조 (draw).svg]]

- 외부 WebServer를 둔다. 들어오는 요청 정보에 대해서 최적화를 수행한다.
- 내부에 TomCat과 Spring MVC에서는 톰캣 자체 내장된 Web Server와 Spring 서비스인 DispatcherServlet을 이용해서 IOC 컨테이너에 있는 Bean들과 소통하고 적절한 응답을 제공한다.

### Spring MVC 내부 요청 처리 과정

![[Spring MVC 내부 요청 처리 과정 (draw).svg]]

Spring MVC 요청 과정은 DIspatcher Servlet의 역할을 이해하면된다. Dispatcher Servlet은 [[프론트 컨트롤러 패턴]]이다.

1. **클라이언트 요청**
	- 클라이언트가 브라우저 또는 모바일 등을 이용해서 특정 URL로 HTTP Request를 보낸다.

2. **핸들러 요청**
	- 요청은 Dispatcher Servlet가 받는다.
	- 요청에 따라 적절한 Handler를 조회한다

3. **Handler에 맞는 Adapter 조회**
	- Handler에 맞는 Handler Adapter를 조회한다.
	- HandlerAdapter는 Controller 메소드를 실제로 호출하는 역할을 수행한다

4. **Controller 호출**
	- HandlerAdapter는 Controller를 통해 정보를 받아온다.


5. **ModelAndView 반환**
	- Controller 호출 이후 ModelAndView 객체를 반환한다.

6. **ViewResolver 호출 및 View 반환**
	- ViewResolver는 여러 구현체가 있고 JSP, Thymeleaf 등 상황에 맞는 View를 리턴한다.

7. **Render**
	- View를 렌더링해서 응답을 제공한다.


## 질문 & 확장

(없음)

## 출처(링크)

- https://velog.io/@dbrjs4594283/Spring-MVC-%EC%9A%94%EC%B2%AD-%EC%B2%98%EB%A6%AC-%EA%B3%BC%EC%A0%95feat.-Servlet-Container#41-%EC%84%9C%EB%B2%84-%EC%8B%A4%ED%96%89
- https://programmer-may.tistory.com/161
- https://12bme.tistory.com/555
- https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/context-hierarchy.html

## 연결 노트

- [[프론트 컨트롤러 패턴]]







