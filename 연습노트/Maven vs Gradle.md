작성 날짜: 2023-10-05
작성 시간: 20:01

## 주제: #미완 #IT #Gradle

----
## 원문

### 유연성
Google은 Gradle을 Android용 공식 빌드 도구로 채택했다. 빌드 스크립트 코드이기 때문이 아니라 Gradle이 가장 기본적인 방식으로 확장 가능한 방식으로 설계됬기 떄문이다.

Gradle, Maven 모두 Configuration에 대한 Rule을 제공한다. 그러나 Maven은 사용자 정의가 매우 엄격하고 지루하다. 이것은 Maven을 쉽게 이해하는데 도움을 주지만 수많은 자동화 문제에 적합하지 않을 수 있다.

### 성능
![[Pasted image 20231006085122.png]]

평균적으로 Maven이 Gradle에 비해 빌드 시간이 길다. 해당 자료에서는 Gradle의 빌드 시간이 평균 2배 정도 Maven에 비해 빠르다고 한다. 빌드 캐싱의 경우 최대 100배까지 차이날 수도 있다고 설명하고 있다.

### 사용자 경험
Maven이 사용 기간이 길다는 것은 IDE을 통한 지원이 많은 사용자들에게 좋다는 것을 의미할 수 있다.
Gradle은 Maven에 비해서는 역사가 짧지만 많이 개선되고 있다. Groovy의 경우 동적 스크립트이기 때문에 돌려봐야 문제점을 파악할 수 있지만, 최근에 Kotlin DSL이 도입되면서 정적으로 스크립트를 짤 수 있고, 이를 통해 IDE의 도움을 받을 수 있다고 한다.

### 의존성 관리
Maven, Gradle 두 시스템 모두 가능한 저장소의 종속성을 해결하는 기본 기능을 제공한다. 둘 다 종속성을 로컬로 캐싱하고, 병렬로 다운로드 가능하다.

Maven에서는 Dependency를 재정의할 수 있지만 버전별로만 허용된다.

### 검색 트렌드
[구글 트렌드(Maven vs Gradle)](https://trends.google.com/trends/explore?geo=KR&q=maven,gradle&hl=ko) 를 참고했다.

**전세계 기준**
![[Pasted image 20231005200229.png]]
전 세계 기준으로는 Maven이 Gradle보다 훨씬 많다.

**대한민국 기준**
![[Pasted image 20231005200319.png]]
대한민국 기준으로는 둘의 큰 차이가 없고 오히려 최근 들어서는 Gradle의 관심도가 더 높다.

![[Pasted image 20231005200348.png]]
재밌는 점은 서울 수도권은 전부 빨간색으로 Gradle에 더 관심이 많음을 알 수 있다.


## 질문 & 확장

(없음)

## 출처(링크)
- https://www.youtube.com/watch?v=ntOH2bWLWQs
- https://gradle.org/maven-vs-gradle/
- https://gradle.org/gradle-vs-maven-performance/

## 연결 노트










