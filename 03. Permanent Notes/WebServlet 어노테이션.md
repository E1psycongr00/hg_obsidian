---
tags:
  - JAVA
  - Spring
aliases:
  - '@WebServlet'
title: WebServlet 어노테이션
created: 2024-10-27T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-10-27
작성 시간: 12:38


----
## 내용(Content)

### @WebServlet

>[!summary]
> web.xml 파일에 `<servlet>` 과 `<servlet-mapping>`태그로 서블릿 매핑 등록 및 URL 매핑 작업을 자동화한다.

`@WebServlet`을 사용하면 web.xml에 직접 매핑 작업을 생략할 수 있기 때문에 쉽고 빠르게 서블릿을 생성 및 작업을 수행 가능하다. 

>[!help]
>web.xml은 Java 웹 애플리케이션의 구조 동작을 정의한 파일이다. Spring Boot에서는 Java 코드로 쉽게 처리할 수 있기 떄문에 직접 잘 수정하진 않는다.
>1. 웹 애플리케이션 구성 정보
>	- 서블릿, 필터, 리스너 등을 정의
>	- URL 패턴과 서블릿 간의 매핑 제공
>	- 초기화 파라미터 설정
>2. 위치 형식
>	- WEB-INF 디렉토리 아래에 위치
>	- XML 형식으로 저장
>3. 웹 서버 설정
>	- Tomcat 과 같은 웹 서버가 이 파일을 읽어서 웹 어플리케이션 구조와 동작방식을 파악

### 예시

```java
@WebServlet(name = "frontController", urlPatterns = "/front-controller/v1/*")
public class FrontControllerServlet extends HttpServlet {
	// 생략
}
```

서블릿의 이름은 **frontController**이며 URL은 **/font/controller/v1/*** path로 서블릿을 매핑하라는 뜻이다.

## 질문 & 확장

(없음)

## 출처(링크)

- https://kgvovc.tistory.com/29
- https://ducmanhphan.github.io/2019-02-28-Understanding-configuration-in-web.xml-file/

## 연결 노트










