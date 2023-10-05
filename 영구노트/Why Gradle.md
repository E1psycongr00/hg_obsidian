작성 날짜: 2023-10-05
작성 시간: 17:55

## 주제: #완성  #IT #Gradle 

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

#### 2. 멀티 프로젝트 빌드
프로젝트를 진행하다보면 하나의 repository에 여러개의 하위 프로젝트를 진행하는 경우가 있을 수 있다.
만약 따로 프로젝트를 구성한다면 중복되는 코드가 많아질 수 있다. 그러나 gradle의 멀티 프로젝트를 활용하면 공통 프로젝트는 같이 쓰고 다른 부분만 구현해서 빌드가 가능하다.


#### 3. 빠른 빌드 속도
**점진적 빌드**
- Gradle은 빌드 실행 중에 마지막 빌드 호출 후에 task의 입출력이 구현됬는지 확인
- 최신 상태로 간주되지 않으면 실행 X

**빌드 캐시**
- 하나의 빌드에서 사용되는 파일들이 다른 빌드에서 사용한다면 빌드 캐시를 이용해 이전의 빌드를 재사용할 수 있다. Gradle 비교에서 주장하는 최대 100배 까지 빌드 속도가 차이난다는 주장은 바로 이 빌드 캐시에 있다.

**데몬 프로세스**
- Gradle로 빌드한 결과물을 메모리에 보관한다
- 이로 인해 한번 빌드된 프로젝트는 다음에 빌드될 때 매우 적은 시간이 소요된다.


### 지원되는 언어 및 프레임워크
![[Pasted image 20231005181313.png]]


### 호환되는 IDE
![[Pasted image 20231005181345.png]]




## 질문 & 확장

- 데몬 프로세스는 백그라운드 프로세스로 forward 프로세스와 다르게 background에서 실행되는 프로세스이다. gradle의 데몬 프로세스는 결국엔  빌드 캐싱의 용도로 사용되는 것 같다.
## 출처(링크)
- https://gradle.org/
- https://docs.gradle.org/current/userguide/userguide.html?_gl=1*15v27hw*_ga*MTk1ODI1ODcyMy4xNjk2NDk2MDgx*_ga_7W7NC6YNPT*MTY5NjQ5NjA4MS4xLjEuMTY5NjQ5NjM3Ni4xOS4wLjA.#why_gradle
- https://www.youtube.com/watch?v=ntOH2bWLWQs

## 연결 노트








