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

6. **ViewResolver 반환**
	- ㅍ

### 서버 실행

1. Tomcat 내장 서버(Web Server)를 초기화한다.
2. Root WebApplicationContext를 로딩한다.
3. 톰캣 내장 서버를 실행한다.


## 질문 & 확장

(없음)

## 출처(링크)

- https://velog.io/@dbrjs4594283/Spring-MVC-%EC%9A%94%EC%B2%AD-%EC%B2%98%EB%A6%AC-%EA%B3%BC%EC%A0%95feat.-Servlet-Container#41-%EC%84%9C%EB%B2%84-%EC%8B%A4%ED%96%89
- https://programmer-may.tistory.com/161

## 연결 노트

- [[DispatcherServlet]]








