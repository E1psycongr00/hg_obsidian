---
tags:
  - 완성
  - Gradle
aliases:
  - precompiled script plugin
  - buildSrc Gradle
title: Gradle Logic 공유 및 분리
created: 2024-11-15T00:00:00.000Z
---
작성 날짜: 2024-11-15
작성 시간: 16:22


----
## 내용(Content)

![[Pasted image 20241115163037.png]]

### buildSrc를 이용한 로직 공유

>[!summary]
>각 하위 프로젝트에 Java 버전과 라이브러리를 붙여 넣을 필요 없이 전체 하위 프로젝트에 자동으로 적용할 수 있는 공유 빌드 로직을 제공할 수 있다.

#### BuildSrc로 로직 공유시 이점

1. 재사용 가능한 빌드 로직
2. 메인 빌드와의 격리
3. 자동 컴파일 및 클래스 경로
4. 테스트 용이성
5. Gradle 플러그인 개발

>[!tip] Tip: 자세한 정보
>>[!info]- Info: 재사용 가능한 빌드 로직
>> 공통 빌드 로직을 작성하고 모두 공유되기 때문에 유지 보수 편리
>
>>[!info]- Info: 메인 빌드와의 격리
>> 다른 빌드 스크립트와 격리되기 때문에 다른 서브 프로젝트들은 깔끔하게 관리 가능
>
>>[!info]- Info: 자동 컴파일 및 클래스 경로
>> 자동으로 컴파일되어 메인 build의 클래스 경로에 포함된다. buildSrc에서 정의한 클래스와 플러그인은 추가 구성 없이 매우 쉽게 이용 가능
>
>>[!info]- Info: Gradle 플러그인 개발
>>프로젝트에 대한 사용자 정의 플러그인을 만드는 경우 buildSrc에서 쉽게 만들고 액세스 가능하다.

### PreCompiled Script Plugin

BuildSrc와 Convention 네이밍을 이용해 Plugin을 만드는 과정을 PreCompile Build Script Plugin이라고 한다. buildSrc 디렉토리 내의 gradle 모듈은 Composite build로 gradle 컴파일 이전에 미리 컴파일된다.

PreCompiled Script Plugin을 사용하면, 로컬에서 커스텀 플러그인을 정의하고 매우 쉽게 사용 가능하다. 

간략한 사용법은 다음과 같다.

![[Pasted image 20241118121141.png]]

buildSrc 패키지 내부에 <플러그이름>.gradle.kts로 정의한다.

![[Pasted image 20241118121156.png]]

kotlin을 사용할 수 있게 kotlin-dsl를 plugins에 추가한다.

![[Pasted image 20241118121205.png]]

kotlin 네이밍이 자동으로 등록되기때문에 id(플러그 네임)을 입력하면 precompile된 플러그인이 들어간다. 재밌는 점은 이 때 project를 이용한 태스크 설계시 project는 plugin id를 넣은 시점인 api,shared,person-service 모듈이 프로젝트 시작점이다.

위 예시만 봐도 다음과 같은 장점을 알 수 있다.

- 별도의 복잡한 Task또는 변수 로직을 플러그인으로 뺄 수 있음.
- 별도의 등록 없이 자동으로 플러그인이 등록됨.
- 간단하게 사용 가능.

## 질문 & 확장

(없음)

## 출처(링크)

- [Sharing Build Logic between Subprojects](https://docs.gradle.org/current/userguide/sharing_build_logic_between_subprojects.html)

## 연결 노트










