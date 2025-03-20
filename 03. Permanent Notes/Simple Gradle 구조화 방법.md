---
tags:
  - 완성
  - Gradle
  - Module
aliases: null
title: Gradle 구조화 방법
created: 2024-11-15T00:00:00.000Z
---
작성 날짜: 2024-11-15
작성 시간: 08:45


----
## 내용(Content)

### 기본적인 Gradle build

![[Pasted image 20241115152123.png]]

Root Project에서는 settings.gradle.kts를 이용해서 다른 subProject들을 관리한다.

```text
.
├── app
│   ...
│   └── build.gradle.kts // app subproject
└── settings.gradle.kts // 여기서 app과 lib subproject 연결
```

```gradle
rootProject.name = "basic-multiproject"
include("app")
```

### sub project 추가하기

```
.
├── app
│   ...
│   └── build.gradle.kts
├── lib
│   ...
│   └── build.gradle.kts
└── settings.gradle.kts
``````

```gradle
rootProject.name = "basic-multiproject"
include("app")
include("lib")
```

폴더를 만들고 내부에 build.gradle.kts를 만든다. 그 이후 include로 등록해주면 된다.

### subproject  컨벤션

subproject의 경우 다음과 같은 규칙을 따른다.

root 디렉토리 기준


```text
include
:<폴더1>:<폴더2>:<build있는 폴더>
```

### subproject 네이밍 경로 수정 방법

```
include(':my-web-module')
project(':my-web-module').projectDir = "subs/web/my-web-module"
```

## 질문 & 확장

(없음)

## 출처(링크)

- [GitHub - gradle/gradle: Adaptable, fast automation for all](https://github.com/gradle/gradle)
- [Structuring Projects with Gradle](https://docs.gradle.org/current/userguide/multi_project_builds.html)

## 연결 노트










