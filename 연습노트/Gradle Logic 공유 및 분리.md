---
tags:
  - 미완
  - Gradle
aliases: 
date: 2024-11-15
title: Gradle Logic 공유 및 분리
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

```
├── buildSrc
│   ├── src
│   │   └──main
│   │      └──kotlin
│   │         └──MyCustomTask.kt    
│   ├── shared.gradle.kts   
│   └── build.gradle.kts
├── api
│   ├── src
│   │   └──...
│   └── build.gradle.kts    
├── services
│   └── person-service
│       ├── src
│       │   └──...
│       └── build.gradle.kts    
├── shared
│   ├── src
│   │   └──...
│   └── build.gradle.kts
└── settings.gradle.kts
```



## 질문 & 확장

(없음)

## 출처(링크)

- [Sharing Build Logic between Subprojects](https://docs.gradle.org/current/userguide/sharing_build_logic_between_subprojects.html)

## 연결 노트










