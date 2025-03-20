---
tags:
  - Gradle
  - Plugin
aliases: null
title: Custom Gradle Plugin 이해하기
created: 2024-11-18T00:00:00.000Z
---
작성 날짜: 2024-11-18
작성 시간: 12:20


----
## 내용(Content)

### Custom Gradle Plugin

프로젝트를 진행하다보면 Gradle 로직이 매우 복잡해질 수 있다. 이를 플러그인으로 분리해서 Task나 변수들을 관리할 수 있다.

사용자가 커스텀 플러그인을 작성하는데 크게 3가지가 있다.

- Script Plugins(Local Plugin)
- Precompiled Script Plugins(Convention Plugin)
- Binary Plugins(Shared Plugin)

Script Plugin과 Convention Plugin은 로컬 프로젝트에서 관리 및 편의성을 위해 사용하고, BInary Plugin은 JAR형태로 로컬 및 배포용으로 사용된다.

### Custom Gradle Plugin 비교

![[custom gradle plugin type.png]]

| #                                                                                                        | Type                                                                                                                     | Location:                                                                                                                                                                                                                             | Most likely:        | Benefit:                                                                                    |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| [1](https://docs.gradle.org/current/userguide/custom_plugins.html#sec:build_script_plugins)              | [Script plugins](https://docs.gradle.org/current/userguide/custom_plugins.html#sec:build_script_plugins)                 | A `.gradle(.kts)` script file                                                                                                                                                                                                         | A local plugin      | 플러그인은 자동으로 컴파일되어 빌드 스크립트의 클래스 경로에 포함된다.                                                     |
| [2](https://docs.gradle.org/current/userguide/custom_plugins.html#sec:precompile_script_plugin)          | [Precompiled script plugins](https://docs.gradle.org/current/userguide/custom_plugins.html#sec:precompile_script_plugin) | [`buildSrc`](https://docs.gradle.org/current/userguide/sharing_build_logic_between_subprojects.html#sec:using_buildsrc) folder or [composite](https://docs.gradle.org/current/userguide/composite_builds.html#composite_builds) build | A convention plugin | - 플러그인은 자동으로 컴파일되고 테스트되며 빌드 스크립트의 클래스 경로에서 사용할 수 있다. <br>- 플러그인은 빌드에 사용되는 모든 빌드 스크립트에 표시된다. |
| [3](https://docs.gradle.org/current/userguide/custom_plugins.html#sec:custom_plugins_standalone_project) | [Binary plugins](https://docs.gradle.org/current/userguide/custom_plugins.html#sec:custom_plugins_standalone_project)    | Standalone project                                                                                                                                                                                                                    | A shared plugin     | 플러그인 JAR이 생성되고 게시된다. 플러그인은 여러 빌드에서 사용할 수 있으며 다른 사람들과 공유할 수 있다.                              |

### Script Plugin

>[!summary]
>단일 빌드 프로젝트에서 간단하고 작은 플러그인을 만들고 싶을 때 사용한다.

간단하게 플러그인을 작성해서 활용하고자 할 때 사용된다. 멀티 프로젝트나, 프로젝트가 복잡한 경우에는 추천하지 않지만, 아주 간단하게 Gradle Task 로직을 분리하고 적용할 수 있기 떄문에 간단하고, 작은 프로젝트나, 단일 빌드 프로젝트면 생각해볼만 하다.

많은 플러그인이 이 형태에서 진화되는 아주 기본적인형태이다.

```kotlin
class GreetingPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        project.tasks.register("greeting") {
            doLast {
                println("Hello, World!")
            }
        }
    }
}

apply<GreetingPlugin>()
```

해당 코드를 살펴보면, Plugin을 상속받아서 task를 정의하고, apply를 이용해서 Plugin을 등록한다.

```kotlin
apply(from = "hello.gradle.kts")
```

이렇게 매우 간단하게 Gradle을 분리해서 적용할 수 있다. 하지만 공식 문서에서는 추천하지 않는 방법이다.

### Precompiled Script Plugin

사전 컴파일된 스크립트 플러그인은 클래스 파일로 컴파일되고 실행되기 전에 JAR로 패키징된다. 이 때 플러그인은 `kotlin-dsl` 또는 `groovy-dsl`이 사용된다.

#### DSL에 따른 플러그인 apply

Kotlin-DSL을 사용하는 경우

```kotlin
id("kotlin-dsl")
```

Groovy-DSL을 사용하는 경우

```groovy
id("groovy-gradle-plugin")
```

#### 컨벤션 네임

```text
buildSrc/
├── build.gradle.kts
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── example/
        │           └── gradle/
        │               └── common/
        │                   ├── HelloTask.java
        │                   └── my-cs-plugin.gradle.kts
        └── kotlin/
            └── com/
                └── example/
                    └── gradle/
                        └── default/
                            ├── CustomDefaultTask.kt
                            └── cs-plugin.gradle.kts
```

위의 트리를 보면 kotlin과 java 버전으로 어떻게 컨벤션을 생성하는지 보여준다.

cs-plugin.gradle.kts에서는 cs-plugin이 플러그인이 ID가 되며, java의 경우 my-cs-plugin의 id가 된다. 

컨벤션 규칙은 다음과 같다.

1. gradle.kts 파일 확장자 제거
2. CamelCase -> Kebab-case로 변환
3. Plugin이 접미사인 경우 제거 (2번을 수행한 경우 무시)

>[!example]
>JacocoPlugin.gradle.kts을 예시로 들어보자
>1. JacocoPlugin.gradle.kts -> JacocoPlugin
>2. JacocoPlugin -> jacoco-plugin
>3. 이미 kebab으로 변환되었으므로 그대로 유지
> id ->`jacoco-plugin`



#### Kotlin 패키지의 Task 등록

```kotlin
package com.example.gradle.default

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.TaskAction

open class CustomDefaultTask : DefaultTask() {
    init {
        group = "custom"
        description = "기본 커스텀 태스크 예제"
    }

    @TaskAction
    fun run() {
        println("커스텀 태스크가 실행되었습니다!")
        println("현재 프로젝트: ${project.name}")
    }
} 
```

kotlin언어로 작성한다. init 으로 group과 description을 초기화 가능하다.

```kotiln
import com.example.gradle.default.CustomDefaultTask


plugins {
    `java`
}

repositories {
    mavenCentral()
}

tasks.register<CustomDefaultTask>("helloTask")
```

`src/main/kotlin/com/example/gradle/default/cs-plugin.gradle.kts` 에서 다음과 같이 작성하면 넣고자 하는 Task의 패키지경로를 import하고 tasks.register를 이용해 등록하면 된다.

>[!caution]
>open class로 반드시 작성한다. final의 경우 task 등록이 불가능하다.


#### JAVA 패키지의 Task 등록

```kotlin
tasks.withType<JavaCompile>() {
    options.encoding = "UTF-8"
}

```

java 작성 이전에 JavaCompile의 encoding 타입을 UTF-8로 설정한다.

```java
package com.example.gradle.common;

import org.gradle.api.DefaultTask;
import org.gradle.api.tasks.Input;
import org.gradle.api.tasks.TaskAction;

public class HelloTask extends DefaultTask {

    @Input
    private String message;

    public HelloTask() {
        setGroup("my-custom");
        setDescription("기본 커스텀 태스크 예제입니당!!!");
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @TaskAction
    void hello() {
        System.out.println(message);
    }
}
```

위와 같이 코드를 작성한다. Input Property가 필요한  경우 getter,setter를 구현해야 한다.

group과 description은 생성자에서 정의한다.

```kotlin
import com.example.gradle.common.HelloTask;

plugins {
    `java`
}

repositories {
    mavenCentral()
}

dependencies {

}


tasks.register<HelloTask>("helloMyTask") {
    message = "Hello, World!"
}
```

kts는 kotlin과 비슷하게 작성한다.

>[!tip]- Tip: Group과 Description에 대하여
>- group은 task를 특정 그룹으로 묶을 때 사용한다. 기본은 other
>- ![[Pasted image 20241118160234.png]]
>- description은 task에 대한 기본 설명이다.
>- ![[Pasted image 20241118160323.png]]
>- 모두 IDE에서 Task를 쉽게 관리할 수 있게 해준다.

#### 외부 플러그인을 사용하고 싶은 경우
```kotlin
plugins {
    `kotlin-dsl`
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.bmuschko:gradle-docker-plugin:6.4.0") // 플러그인 의존성 추가
}
```

`buildSrc/build.gradle.kts`에 플러그인이 포함된 의존성을 추가한다.


```kotlin
plugins {
    id("com.bmuschko.docker-remote-api")
}
```

`src/main/kotlin/**/my-plugin.kts`

### Binary Script Plugin

Precompile은 Composite build로 동작하고 gradle 컴파일 이전에 미리 Jar로 생성하기 때문에 배포가 가능하긴 하지만, 추천하지 않는다. PreCompile 방식은 로컬 프로젝트에서 간단하게 로컬 플러그인을 쉽게 제작하는데 목적으로 사용되기 때문이다.

배포 목적으로는 Binary Plugin을 사용한다.

구현 방법은 가장 직관적이다. 자동으로 등록하는 방식이 아닌 gradle.kts에 직접 수동으로 등록한다.

```kotlin
plugins {
    `java-gradle-plugin`
}

gradlePlugin {
    plugins {
        create("simplePlugin") {
            id = "org.example.greeting"
            implementationClass = "org.example.GreetingPlugin"
        }
    }
}
```

id, implementationClass 모두 매우 직관적으로 등록해주면 된다. 이 때 Plugin 코드를 직접 구현해줘야 한다.

```java
import org.gradle.api.Plugin;
import org.gradle.api.Project;

public class MyBasePlugin implements Plugin<Project> {
    public void apply(Project project) {
        // define capabilities
    }
}
```


## 질문 & 확장

(없음)

## 출처(링크)

- [Understanding Plugins](https://docs.gradle.org/current/userguide/custom_plugins.html#sec:convention_plugins)
- [Implementing Pre-compiled Script Plugins](https://docs.gradle.org/current/userguide/implementing_gradle_plugins_precompiled.html)

## 연결 노트

- [[Gradle Plugin]]

