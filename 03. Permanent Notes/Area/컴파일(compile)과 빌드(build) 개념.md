---
tags:
  - 빌드
aliases: null
title: 컴파일(compile)과 빌드(build) 개념
created: 2023-10-06T00:00:00.000Z
note-type: COMMON
completed: true
---

작성 날짜: 2023-10-06
작성 시간: 15:19


----
## 내용(Content)

### 컴파일이란
컴파일은 인간이 이해할 수 있는 언어로 작성된 소스 코드를 목적에 맞는 언어로 번역하는 작업이다. 이 과정에서 소스 코드 분석 및 오류 분석이 이루어진다.

목적에 맞는 언어는 여기서는 2가지로 표현할 수 있다.

- source code  -> binary code
- source code -> byte code

> **바이너리 코드**
> 바이너리 코드란 0과 1로 이루어진 이진 코드이다. (기계어랑 다르다!!)

> **바이트 코드**
> VM(가상 머신)이 이해할 수 있는 이진 코드이다. 

> **기계어**
> CPU가 사용하는 명령어 집합으로 이루어진 이진 코드. 실제 CPU가 실행할 수 있는 언어이다.
> (많은 사람들이 바이너리 코드와 혼동하기 쉬운데 바이너리 코드는 컴파일의 결과물, 기계어는 빌드의 결과물로 이해하자)


### 빌드
빌드란 소스 코드를 컴퓨터가 실행할 수 있는 파일을 만드는 과정이다. 빌드는 지원하는 언어에 따라 다르지만 큰 틀에서는 2가지로 볼 수 있다. C의 build와 Java의 빌드이다.

### C의 빌드 과정
![[linux C의 build 과정 순서도(draw).svg]]

위 그림은 Linux의 C 빌드 과정이다.

C의 경우에는 실행파일로 만들기 이전에 중간 단계로 object 파일을 생성하는데 이 단계까지가 컴파일이라 할 수 있다. 이렇게 생성된 binary 코드와 라이브러리 코드를 묶어서 실행파일을 생성한다.


### java의 빌드 과정

![[java의 build 과정 순서도(draw).svg]]

자바의 빌드 과정의 경우 C와 다르게 링크 과정이 없다. 그 이유는 소스 코드를 컴파일하고 바이트 코드를 생성시에 해당 코드에 링크 정보가 포함되기 때문이다. 그리고 이는 JVM에서 동적으로 링크된다.

그 이후 생성된 class 파일들과 이미지와 같은 리소스 파일, 그리고 외부의 jar 파일을 패키징해서 하나의 jar를 만든다. 이 때 jar에서 class를 분리하거나 그러진 않고, classpath 정보를 이용해 JVM에서 식별할 수 있기 때문에 그대로 Packaging한다.

## 질문 & 확장

- 목적에 따라 컴파일러가 주는 결과물이 달라지는군
- 바이너리 파일의 경우 기계어에 가깝기는 하지만 기계어는 아니기 때문에 링크 과정에서 실행 파일을 생성하네. 더 구체적인 내용이 궁금하긴 하네
- 빌드 관리 필요성을 알기 전에 필요한 개념이 되겠어

## 출처(링크)
- https://bradbury.tistory.com/226
- https://shrtorznzl.tistory.com/82
- https://junroot.github.io/programming/Java%EC%9D%98-%EB%B9%8C%EB%93%9C%EC%99%80-%EB%B0%B0%ED%8F%AC/
- https://bradbury.tistory.com/226
## 연결 노트
- [[03. Permanent Notes/Area/빌드 관리 도구 필요성]]
- [[03. Permanent Notes/Area/Why Gradle]]
- [[03. Permanent Notes/Area/Maven vs Gradle]]








