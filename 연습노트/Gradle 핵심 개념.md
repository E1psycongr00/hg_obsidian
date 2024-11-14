---
tags:
  - 미완
  - Gradle
aliases: 
date: 2024-11-14
title: Gradle 핵심 개념
---
작성 날짜: 2024-11-14
작성 시간: 10:38


----
## 내용(Content)

### Gradle 동작 과정

![[Pasted image 20241114104010.png|Gradle Basic]]

`Gradle Project` 구성 요소
- settings.gradle
- build script (build.gradle)
- source code

1. settings.gradle에 여러 서브 모듈의 gradle을 인식하고 설정한다.
2. 내부에 있는 빌드 스크립트와 소스코드를 task 기반으로 build 한다.
	- 상황에 따라 Caching을 수행해서 build 속도를 높인다.
	- 빌드 스크립트에서 정의한 pugin과 의존성을 dependency Manager로 관리하고 불러온다.
3. Task에 따른 결과
	- jar,apk,zip,war와 같이 패키징을 수행
	- 테스트 수행
	- CI/CD(Github Actions, Jenkins 등등)

### Gradle의 핵심 구성 요소

#### Project

Gradle 프로젝트는 애플리케이션이나 라이브러리와 같이 빌드할 수 있는 소프트웨어의 한 조각이다.

**Single Project**: root project로 불리는 하나의 프로젝트를 빌드한다.
**Multi Project**: 여러 sub project를 하나의 root project에 include하여 빌드한다.(Multi Module Project)

#### BuildScript

Gradle Project를 build하기 위해 단계 별로 작성되는 Detail과 같다.

하나의 프로젝트에는 하나 또는 여러 빌드 스크립트를 포함할 수 있다.

#### Dependency Management

프로젝트에 필요한 외부 자원을 명시하고 관리를 자동화하는 기술이다. build.gradle의 dependencies 블록 내에 정의하면 버전과 함께 알아서 관리한다.

#### Tasks

소스 코드 컴파일 또는 테스트 실행과 같은 가장 기본적인 실행 단위이다. Gradle은 Task 기반으로 동작한다.

#### Plugin

Task를 포함하고 있고, Gradle의 기능을 확장시킨다. Task와 함께 build 스크립트를 간단하게 짤 수 있도록 도와준다.

### Gradle 프로젝트의 기본 구조

![[Pasted image 20241114113047.png]]




## 질문 & 확장

(없음)

## 출처(링크)

- [Gradle Basics](https://docs.gradle.org/current/userguide/gradle_basics.html)
- 
## 연결 노트










