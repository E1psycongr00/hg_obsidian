---
tags:
  - JAVA
  - 테스트
  - BenchMark
aliases:
  - Java MicroBenchmark Harness
  - Java Micro Benchmark
date: 2024-05-03
title: JMH
---
작성 날짜: 2024-05-03
작성 시간: 19:33

#미완 #JAVA #테스트 #BenchMark

----
## 내용(Content)

### JMH

>[!summary]
>Java 및 JVM을 대상으로 하는 기타 언어로 작성된 벤치마크를 구축하고, 실행 및 분석을 위한 Java 하네스다.

보통 API를 테스트할 때 NGrinder나 Locust, K6와 같은  부하 테스트 도구를 많이 사용한다. 그러나 학습 또는 내가 구현한 코드들이 성능이 좋은지 안 좋은지 class 또는 메서드 단위로 테스트하고 싶은데 매번 API를 호출해서 테스트하는 것은 조금 귀찮을 수 있다. JMH(Java Micro Benchmark Harness)는 보다 간편하게 벤치마크 수 있기 때문에 단위 성능 테스트를 원한다면 JMH는 좋은 선택이 될 수 있다.  

>[!info] 하네스
>하네스란 문맥에 따라 2가지 의미를 지원한다.
>1. Test Harness: 소프트웨어 테스트를 자동화하기 위한 프레임워크. 테스트 케이스를 실행하고 보고하는 역할을 한다. 따라서 테스트 하네스는 테스트를 더 쉽고 효율적이게 만들어주는 도구라 할 수 있다.
>2. Harness in the context of framework or libraries: 프레임워크나 라이브러리 에서 하네스란 특정 기능이나 서비스를 돕는 코드 또는 도구를 의미한다. 종종 복잡한 시스템을 더 쉽게 사용할 수 있도록 도와주는 역할을 수행한다.

### JMH 설치 방법

Gradle 기준으로 테스트해봤기 때문에 Gradle 기준으로 진행하겠다.

```kotlin
// build.gradle.kts
plugins {
	id("java")
	id("me.champeau.jmh") version "0.7.2" // id 플러그인 추가
}

dependencies {
	// ~~~~ 테스트 의존성 추가
	jmh ("org.openjdk.jmh:jmh-core:1.36")  
	jmh ("org.openjdk.jmh:jmh-generator-annprocess:1.36")  

	// this is the line that solves the missing /META-INF/BenchmarkList error  
	jmhAnnotationProcessor("org.openjdk.jmh:jmh-generator-annprocess:1.36")
}

// JMH Gradle Task 옵션 설정
jmh {  
    iterations = 3  
    warmupIterations = 3  
    fork = 1  
}
```

version이나 설정의 자세한 정보는 https://github.com/melix/jmh-gradle-plugin 를 참고하자.

### JMH 디렉토리 구성하기

JMH는 src/main이 아닌 src/jmh/java, src/jmh/resources로 구성한다. 

## 질문 & 확장

(없음)

## 출처(링크)


- https://www.baeldung.com/java-microbenchmark-harness
- https://pompitzz.github.io/blog/Java/jmh_and_asyncProfiler.html#jmh-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC
- https://stackoverflow.com/questions/38056899/jmh-unable-to-find-the-resource-meta-inf-benchmarklist

## 연결 노트










