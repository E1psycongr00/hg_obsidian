---
tags:
  - 완성
  - Gradle
aliases: null
title: Gradle Build Life Cycle
created: 2023-10-17T00:00:00.000Z
---
작성 날짜: 2023-10-17
작성 시간: 20:22


----
## 내용(Content)

Gradle의 핵심은 의존성 기반의 프로그래밍 언어이다. Gradle의 용어로 이것은 작업과 작업 간의 종속성을 정의 할 수 있음을 의미한다.

Gradle은  종속성 순서대로 작업을 수행하고 단 한번만 작업이 수행함을 보장한다. 작업을 실행하기 이전에 종속성 그래프가 빌드된다.

이 때 빌드 스크립트는 종속성 그래프를 구현하게 된다. 

![[Pasted image 20241114171155.png]]

> **Initialization**
> Gradle은 멀티 프로젝트를 빌드를 지원한다. 초기화 단계에서 Gradle은 참여할 프로젝트를 찾아서 결정하고 이러한 각 프로젝트들에 대한 Project 인스턴스를 생성한다.

> **Configuration**
> 초기화 단계에서 생성된 Project 인스턴스를 구성한다. 빌드에 참여하게 된 모든 프로젝트의 빌드 스크립트가 실행된다.

> **Execution**
> 구성 단계에서 생성된 Task의 하위 집합을 결정한다. 하위 집합은 현재 디렉토리와 Gradle 명령어에 넘겨진 인수에 의해 결정된다. 그리고 선택된 Task를 실행하게 된다.

### Life Cycle 예시

![[Pasted image 20241114183104.png|settings.gradle.kts]]

![[Pasted image 20241114183421.png]]

이렇게 설정한 경우 task1을 실행해보자.

![[Pasted image 20241114183452.png]]


#### 1. settings.gradle -> Initial Phase 단계

gradle의 설정 파일 역할을 한다. 이 설정 파일은 build의 초기화 단계에서 실행된다. 멀티 프로젝트의 경우 빌드에 참여할 프로젝트를 정의해야 하기 때문에 root 프로젝트에 settings.gradle 파일이 반드시 있어야 한다. 반면 단일 프로젝트의 경우 이 설정 파일은 선택사항이 된다.

#### 2. task -> Configuration Phase 단계

`register`의 경우, Configuration Avoidance API를 사용하기 때문에 Task 의존성(dependsOn)이 없거나 Task 실행이 되지 않는 경우 실행되지 않는다. create로 task를 등록하는 경우에는 Configuration 단계에서 무조껀 실행한다. 그리고 `named`를 이용해서 Task를 재정의하는 경우, 똑같이 Configuration Phase에서 먼저 호출된다.

그래서 Configuration Phase에 실행되는 것은 보통 property 초기화를 일반적으로 하고, doLast() 와 같은 함수를 이용해서 정의된 configuration 함수를 execution phase에서 실행하도록 task를 짠다.

#### doLast(), doFirst() -> Execution Phase 단계

task를 정의할 때 doLast, doFirst를 한번쯤 본 사람들이 있을 것이다. doLast와 doFirst는 블럭 내부의 로직이 execution phase에 동작하도록 보장해준다. 

주로 Configuration Phase에서 정의된 Property를 활용해서 Execution Phase 단계에서 실행하도록 작성한다.

## 질문 & 확장

(없음)

## 출처(링크)

- https://monny.tistory.com/237
- [Build Lifecycle](https://docs.gradle.org/current/userguide/build_lifecycle.html)
- [Part 2: The Build Lifecycle](https://docs.gradle.org/current/userguide/partr2_build_lifecycle.html)
## 연결 노트
- [[Gradle의 doLast()를 언제 써야 할까]]









