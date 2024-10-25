---
tags:
  - 미완
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

### Spring MVC 내부 요청 처리 과정

![[Spring MVC 내부 요청 처리 과정 (draw).svg]]

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


![[WAS 전체적인 구조 (draw).svg]]


### 웹서버와 함께 전체적인 동작 처리

![[Pasted image 20241025214957.png]]

1. 클라이언트가 HTTP 요청을 보낸다.
2. 웹 서버(예: Apache Tomcat)가 요청을 받아 서블릿 컨테이너로 전달.
3. 서블릿 컨테이너는 요청을 DispatcherServlet으로 위임.
4. DispatcherServlet은 HandlerMapping을 사용해 적절한 컨트롤러 찾기.
5. 요청은 선택된 컨트롤러로 전달됨.
6. 컨트롤러는 필요한 비즈니스 로직을 처리하기 위해 서비스 계층을 호출.
7. 서비스 계층은 필요한 경우 데이터 접근 계층을 통해 데이터를 조회하거나 수정.
8. 처리된 결과는 역순으로 반환되어 컨트롤러에 도달.
9. 컨트롤러는 ModelAndView 객체를 DispatcherServlet에 반환.
10. DispatcherServlet은 ViewResolver를 사용해 적절한 뷰를 결정.
11. 최종 응답이 서블릿 컨테이너를 거쳐 웹 서버로 전달.
12. 웹 서버는 HTTP 응답을 클라이언트에게 보냄.

## 질문 & 확장

(없음)

## 출처(링크)

- https://velog.io/@dbrjs4594283/Spring-MVC-%EC%9A%94%EC%B2%AD-%EC%B2%98%EB%A6%AC-%EA%B3%BC%EC%A0%95feat.-Servlet-Container#41-%EC%84%9C%EB%B2%84-%EC%8B%A4%ED%96%89
- https://programmer-may.tistory.com/161
- https://12bme.tistory.com/555
- https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/context-hierarchy.html
## 연결 노트

- [[DispatcherServlet]]








