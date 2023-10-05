작성 날짜: 2023-10-05
작성 시간: 17:55

## 주제: #미완 #IT #Gradle 

----
## 원문
### Gradle이란
2012년에 출시된 Groovy 기반의 오픈소스  빌드 도구로(최근엔 Kotlin도 지원), 거의 대부분 타입의 소프트웨어를 빌드할 수 있는 빌드 자동화 시스템이다. 

### 빌드 자동화 도구 필요성
- 많은 라이브러리를 자동으로 추가하고 관리
- 손쉬운 라이브러리 버전 동기화 필요성
- jar를 직접 다운로드 받는 것의 보안상 위험성

### 왜 Gradle 인가
- 풍부한 커뮤니티 플러그인 생태계를 가지고 있다.
- Groovy, Kotlin 언어를 활용해 손쉽게 빌드 스크립트를 쓸 수 있다.
- Custom Task를 쉽게 작성할 수 있다.
- 손쉽게 확장 가능하다.
- incremental builds, 빌드 캐시, 병렬 실행과 같은 최적화의 이점을 활용할 수 있다.

이 중에 크게 3가지로 간략하게 요약하면 3가지 이유로 쓰인다고 할 수 있다.

1. 프로젝트 설정 주입(Configuration Injection)
2. 멀티 프로젝트 빌드
3. 빠른 빌드 속도

#### 1. 프로젝트 설정 주입
```groovy
dependencies {
	implementation 'org.springframework.boot::spring-boot-starter'
	testImplementation 'org.springframework.boot::spring-boot-starter-test'
}
```

project별로 주입되는 설정을 다르게 할 수 있는 장점이 있음

### 지원되는 언어 및 프레임워크
![[Pasted image 20231005181313.png]]


### 호환되는 IDE
![[Pasted image 20231005181345.png]]




## 질문 & 확장

- Gradle이 JVM용으로 널리 사용된다는 말이 무슨 의미인지 잘 모르겠네

## 출처(링크)
- https://gradle.org/
- https://docs.gradle.org/current/userguide/userguide.html?_gl=1*15v27hw*_ga*MTk1ODI1ODcyMy4xNjk2NDk2MDgx*_ga_7W7NC6YNPT*MTY5NjQ5NjA4MS4xLjEuMTY5NjQ5NjM3Ni4xOS4wLjA.#why_gradle
- https://www.youtube.com/watch?v=ntOH2bWLWQs

## 연결 노트








