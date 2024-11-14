---
tags:
  - 완성
  - Gradle
aliases: 
title: Gradle Plugin 사용하기
date: 2023-10-06
---
작성 날짜: 2023-10-06
작성 시간: 19:13


----
## 내용(Content)

### 플러그인의 기능

플러그인을 사용하면 프로젝트의 기능을 확장할 수 있다. 예를 들면 다음과 같은 작업을 수행 가능하다.

- Gradle 모델 확장
- 규칙에 따른 프로젝트 구성
- 특정 configuration 적용(add organizational repositories or enforce standards)

프로젝트 빌드 스크립트 대신에 플러그인을 사용하면 여러 이점을 또한 얻을 수 있다.

- 스크립트의` 재사용성`을 높이고 여러 프로젝트에 **유사한 로직을 짜야 하는 불필요함**을 줄일 수 있다.
- 보다 높은 수준의 `모듈화`를 통해 유지/보수를 더 간단히 할 수 있다.
- command logic을 `캡슐화`하고 빌드 스크립트를 보다 명확하게 설계 가능하다.

### 배포된 플러그인 종류

#### Core Plugins

>[!summary]
>Gradle 개발 및 유지 보수를 위한 Core 플러그인 종류

Core Plugin에 대한 Task나 Property와 같은 구체적인 것들이 궁금하다면 [Gradle Core Plugin Reference](https://docs.gradle.org/current/userguide/plugin_reference.html#plugin_reference) 참고하자.

Core Plugin으로 가장 유명한 플러그인은 JVM Language & Framework 중 [Java](https://docs.gradle.org/current/userguide/java_plugin.html#java_plugin) 플러그인을 들 수 있다.

```kotlin
plugins {
	java
}
```

plugins로 java를 등록하면 compileJava, processResources, test, build, clean 등 여러 gradle task들이 생기는 것을 알 수 있다.

![[Pasted image 20241114153022.png|Java Plugin Task 의존성 그래프]]

위 그래프를 보면 build는 수많은 task들을 의존한다. 의존한다는 것은 해당 task가 동작해야 동작할 수 있다는 것이다.

![[Pasted image 20241114153305.png]]

#### Community Plugins

>[!summary]
>core gradle distribution을 제외한 gradle community에서 개발된 플러그인으로 특정한 사용자들을 위한 usecase나 기술들이 포함되어 있다.

[Gradle Community Plugins](https://plugins.gradle.org/)에서 Community Gradle plugin을 찾아 볼 수 있다.

가장 유명한 예는 Spring boot Gradle Plugin이 있다.

쉬운 예시로 `TaskInfo`를 보기 위한 플러그인을 등록하고 사용해보자.

![[Pasted image 20241114153928.png]]

taskInfo를 검색하면 나오는 화면이다. source에서 자세한 사용 방법을 확인해보자.

![[Pasted image 20241114154437.png]]

사이트에서 나온 정보대로 사용해보면

![[Pasted image 20241114154415.png]]

위와 같이 build로 실험을 해봤는데 이를 의존하는 task들을 모두 검색해서 Task 정보들을 보여준다.

#### Local Plugins

직접 플러그인 코드를 작성해서 build한다.

### 플러그인 적용하기

| #                                                                                            | To                                                   | Use                                                                                                                                                                         | For example:                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1](https://docs.gradle.org/current/userguide/plugins.html#sec:plugins_block)                | Apply a plugin to a project.                         | [The `plugins` block in the build file](https://docs.gradle.org/current/userguide/plugins.html#sec:plugins_block)                                                           | plugins {<br>  id("org.barfuin.gradle.taskinfo") version "2.1.0"<br>}                                                                                                                                                 |
| [2](https://docs.gradle.org/current/userguide/plugins.html#sec:subprojects_plugins_dsl)      | Apply a plugin to multiple subprojects.              | [The `subprojects` or `allprojects` blocks in the root build file](https://docs.gradle.org/current/userguide/plugins.html#sec:subprojects_plugins_dsl). **Not Recommended** | plugins {<br>    id("org.barfuin.gradle.taskinfo") version "2.1.0"<br>}<br>allprojects {<br>    apply(plugin = "org.barfuin.gradle.taskinfo")<br>    repositories {<br>        mavenCentral()<br>    }<br>}           |
| [3](https://docs.gradle.org/current/userguide/plugins.html#sec:buildsrc_plugins_dsl)         | Apply a plugin to multiple subprojects.              | [A convention plugin in the `buildSrc` directory](https://docs.gradle.org/current/userguide/plugins.html#sec:buildsrc_plugins_dsl) **Recommended**.                         | plugins {<br>    id("my-convention.gradle.taskinfo")<br>}                                                                                                                                                             |
| [4](https://docs.gradle.org/current/userguide/plugins.html#sec:applying_plugins_buildscript) | Apply a plugin needed _for the build script itself_. | [The `buildscript` block in the build file itself](https://docs.gradle.org/current/userguide/plugins.html#sec:applying_plugins_buildscript). **Legacy**.                    | buildscript {<br>  repositories {<br>    mavenCentral()<br>  }<br>  dependencies {<br>    classpath("org.barfuin.gradle.taskinfo:gradle-taskinfo:2.1.0")<br>  }<br>}<br>apply(plugin = "org.barfuin.gradle.taskinfo") |
| [5](https://docs.gradle.org/current/userguide/plugins.html#sec:script_plugins)               | Apply a script plugins.                              | [The legacy `apply()` method in the build file](https://docs.gradle.org/current/userguide/plugins.html#sec:script_plugins). **Not Recommended**. **Legacy**.                | apply<MyCustomBarfuinTaskInfoPlugin>()                                                                                                                                                                                |

## 질문 & 확장

(없음)

## 출처(링크)

- [Plugin Basics](https://docs.gradle.org/current/userguide/plugin_basics.html#plugin_distribution)
- https://docs.gradle.org/current/userguide/plugins.html

## 연결 노트
- [[Intellij와 Kotlin DSL과 함께하는 멀티 모듈 빌드해보기]]


