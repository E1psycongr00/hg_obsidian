작성 날짜: 2023-10-16
작성 시간: 23:48

## 주제: #미완 #IT #Gradle 

----
## 원문
### 빌드 스크립트를 활용한 Custom Task

커스텀 Task를 설계해보자. 커스텀 Task는 Java나 Groovy, kotlin으로 작성할 수도 있고, 간편하게 build script를 이용해 작성할 수도 있다. 여러 가지 방법을 통해 custom Task를 만드는 방법을 알아보자

#### simple task 작성하기

```kotlin
tasks.register("myTask") {  
    description = "나의 태스크"  
    doFirst {  
        println("hello first")  
    }  
    println("run")  
    doLast {  
        println("hello last")  
    }  
}
```

task를 등록하는데는 2가지 방법이 있다. 하나는 **register**, 또 다른 하나는 **create**이다.

Task를 등록할 때 register와 create의 차이는 [[Task create vs register]]를 참고하자

kotlin의 by 문법을 이용해 작성하면 task를 변수로서 사용 가능하다.

```kotlin
val myTask by tasks.register("myTask") {  
    description = "tasktask!!!"  
    doFirst {  
        println("hello first")  
    }  
    println("run")  
    doLast {  
        println("hello last")  
    }  
}
```

#### copy task 작성하기

```kotlin
tasks.register<Copy>("copyTask") {  
    from("src/main")  
    into("tasks")  
}
```


### buildSrc를 활용해 독립적인 Task와 Plugin 구축하기
```java
public class JavaInjectTask extends DefaultTask {  
  
    private final String message;  
  
    @Inject  
    public JavaInjectTask(String message) {  
       this.message = message;  
    }  
  
    @TaskAction  
    void print() {  
       System.out.println(this.message);  
    }  
}
```

DefaultTask를 상속하면 CustomTask를 만들 수 있다. 

@Inject는 생성자에 적용해서 인수를 받도록 설정한다.
@TaskAction은 Task의 동작을 정의한다.

이제 이 Task로 Plugin을 만들어서 등록해보자

## 질문 & 확장

(없음)

## 출처(링크)
- https://docs.gradle.org/current/userguide/custom_plugins.html#custom_plugins
- https://velog.io/@jeongyunsung/Gradle%EB%86%80%EC%9D%B43-Custom-Task#task-1
## 연결 노트
- [[Task create vs register]]









