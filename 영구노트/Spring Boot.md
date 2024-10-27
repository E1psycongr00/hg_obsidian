---
tags:
  - 완성
  - JAVA
  - Spring
aliases: 
date: 2024-10-26
title: Spring Boot
---
작성 날짜: 2024-10-26
작성 시간: 23:41


----
## 내용(Content)

### Spring Boot

>[!summary]
>Spring Boot는 애플리케이션을 만들 때에 필요한 설정들을 간편하게 처리해주는 프레임워크이다. Spring을 사용하면 이전에 해줘야 하는 많은 설정들을 Spring Boot에서는 쉽게 처리해준다.


![[Pasted image 20241026234140.png]]

기존에 배포할 때, Spring의 경우 별도의 외장 웹 서버를 설치하고, 프로젝트를 War 파일로 별도로 배포했다. 그러나 이러한 방법은 설치 속도가 느리고, 처리하기 귀찮은 단점을 지니고 있다. 반면, Spring Boot의 경우 자체적인 웹 서버(Tomcat)을 내장하고 있어, 빠르고 간편하게 배포가 가능하고, 독립적으로 실행 가능한 JAR 파일로 프로젝트를 빌드할 수 있기 때문에 클라우드 서비스나, Docker 같은 가상 환경에 매우 쉽게 배포가 가능하다.

Spring에 얼마나 간단한지 설정 파일을 비교해보자.

![[Pasted image 20241026234611.png]]

Spring Boot로 바꾸면 다음과 같다.

![[Pasted image 20241026234627.png]]

또한 어노테이션 기반으로 많은 것들을 할 수 있기 때문에 프로젝트 자체 관리도 Spring에 비해 매우 편리하다.

### Spring Boot Initialzr

https://start.spring.io/

위 사이트에 접속하자

![[Pasted image 20241026234812.png]]

- **Project**
	- 빌드 툴을 선택한다. Gradle 또는 Maven을 선택할 수 있다.
- **Language**
	- Java, Kotlin, Groovy 선택 가능
- **Spring Boot**
	- Spring Boot의 버전을 선택한다. 아무것도 붙지 않은 가장 최신 버전을 선택하는 것이 좋다.
	- **SNAPSHOT**: 아직 개발이 완료되지 않은 버전
	- **M(Milestone)**: 개발은 완료되었지만, 기능 개선 중 또는 버그를 수정하고 있는 버전
	- **RC(Release Candidate**): 기능 개선과 버그는 수정이 되었지만, 최종적으로 릴리즈되지 않은 버전
- **Project Metadata**
	- 프로젝트 정보 입력
	- Group: 프로젝트를 만든 그룹의 이름, 보통 기업 도메인의 역순으로 입력
	- Artifact: 빌드 결과물의 네임
	- Name: 프로젝트 이름
	- Description: 프로젝트에 대한 간략한 설명
	- Packaging: 배포를 위한 패키징 방식으로 War와 Jar 방식 지원
	- JAVA: Java 버전 선택
- 

## 질문 & 확장

(없음)

## 출처(링크)

- https://www.codestates.com/blog/content/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8

## 연결 노트










