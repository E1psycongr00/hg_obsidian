---
title: "📚 Oracle JDK 21 공식 문서"
note-type: "REF"
created: "2025-01-04"
from: "Web"
---

### 출처

- [JDK 21 Release Notes](https://www.oracle.com/java/technologies/javase/21-relnotes.html)
- [What's New in JDK 21](https://www.oracle.com/java/technologies/javase/21-whats-new.html)
- [JDK 21 Migration Guide](https://docs.oracle.com/en/java/javase/21/migrate/index.html)
- [OpenJDK 21 Release Notes](https://openjdk.java.net/projects/jdk/21/)

### 요약

#### LTS 버전으로서의 중요성

JDK 21은 2023년 9월에 출시된 네 번째 LTS(Long Term Support) 버전으로, JDK 17 이후 2년 만에 나온 장기 지원 버전이다. Oracle에서 2031년까지 상업적 지원을 제공하며, 현재 가장 최신의 LTS 버전으로 많은 기업들이 마이그레이션을 고려하고 있다. 특히 Virtual Threads와 같은 혁신적인 기능이 포함되어 현대적인 고성능 애플리케이션 개발의 새로운 기준을 제시한다.

#### Virtual Threads (Project Loom)

JDK 21의 가장 혁신적인 기능은 Virtual Threads의 정식 도입이다. 기존의 플랫폼 스레드보다 훨씬 가벼운 가상 스레드를 통해 수백만 개의 동시 작업을 효율적으로 처리할 수 있다. 이는 I/O 집약적인 애플리케이션의 성능을 크게 향상시키며, 기존의 Thread API와 완전히 호환되어 기존 코드의 수정 없이도 성능 개선을 얻을 수 있다.

#### 패턴 매칭과 Switch 표현식 강화

switch 표현식에서 패턴 매칭이 정식 지원되어 더욱 강력하고 표현력 있는 코드 작성이 가능해졌다. Record 패턴과 함께 사용하여 복잡한 데이터 구조를 간결하게 분해하고 처리할 수 있다. 가드 조건(guard conditions)도 지원되어 패턴 매칭의 유연성이 크게 향상되었다.

#### String Templates (Preview)

문자열 템플릿 기능이 프리뷰로 도입되어 문자열 보간을 더욱 안전하고 효율적으로 수행할 수 있다. SQL 인젝션과 같은 보안 취약점을 방지하면서도 가독성 높은 문자열 생성이 가능하다. 기존의 문자열 연결 방식보다 성능과 안전성 면에서 크게 개선되었다.

#### 성능 및 메모리 최적화

Generational ZGC가 도입되어 가비지 컬렉션 성능이 크게 향상되었다. 특히 대용량 힙 메모리를 사용하는 애플리케이션에서 일시 정지 시간을 최소화할 수 있다. 벡터 API가 더욱 발전하여 SIMD 연산을 통한 수치 계산 성능이 개선되었다.

### 코멘트

> [!important] LTS 버전의 중요성
> JDK 21은 현재 가장 최신의 LTS 버전으로, Virtual Threads라는 혁신적인 기능을 포함하고 있어 고성능 애플리케이션 개발에 새로운 가능성을 제시한다. 특히 마이크로서비스 아키텍처와 클라우드 네이티브 애플리케이션에서 큰 성능 향상을 기대할 수 있다.

JDK 21은 단순한 버전 업그레이드를 넘어서 자바 플랫폼의 패러다임 변화를 가져온 중요한 릴리즈다. Virtual Threads의 도입으로 동시성 프로그래밍이 크게 단순화되었으며, 패턴 매칭의 강화로 함수형 프로그래밍 스타일이 더욱 자연스럽게 자바에 통합되었다. 기업에서는 JDK 17에서 JDK 21로의 마이그레이션을 통해 상당한 성능 개선과 개발 생산성 향상을 기대할 수 있다. 