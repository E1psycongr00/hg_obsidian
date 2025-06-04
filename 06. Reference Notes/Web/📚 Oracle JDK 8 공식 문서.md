---
title: "📚 Oracle JDK 8 공식 문서"
note-type: REF
created: 2025-01-04
from: "Oracle JDK 8 Documentation"
---

### 출처

- **Oracle JDK 8 Documentation**: https://docs.oracle.com/javase/8/
- **What's New in JDK 8**: https://www.oracle.com/java/technologies/javase/8-whats-new.html
- **JDK 8 Release Notes**: https://www.oracle.com/java/technologies/javase/8u-relnotes.html
- **JDK 8 Update Release Notes**: https://www.oracle.com/java/technologies/javase/8u-relnotes.html

### 요약

#### JDK 8의 주요 특징

##### Lambda Expressions와 함수형 프로그래밍
JDK 8에서 가장 주목받는 기능으로 Lambda Expressions가 도입되었다. 이는 익명 함수를 간결하게 표현할 수 있게 해주며, 함수형 프로그래밍 패러다임을 Java에 도입했다. Method References와 함께 사용하여 코드의 가독성과 간결성을 크게 향상시켰다.

##### Stream API
컬렉션 데이터를 함수형 스타일로 처리할 수 있는 Stream API가 새롭게 추가되었다. 필터링, 매핑, 리듀싱 등의 연산을 체이닝 방식으로 수행할 수 있어 데이터 처리 코드가 더욱 직관적이고 효율적이 되었다.

##### Default Methods
인터페이스에 기본 구현을 제공할 수 있는 Default Methods가 도입되었다. 이를 통해 기존 인터페이스에 새로운 메서드를 추가하면서도 하위 호환성을 유지할 수 있게 되었다.

##### Date-Time API (JSR 310)
기존의 Date와 Calendar 클래스의 문제점을 해결하기 위해 새로운 Date-Time API가 도입되었다. LocalDate, LocalTime, LocalDateTime 등의 클래스를 통해 더욱 직관적이고 안전한 날짜/시간 처리가 가능해졌다.

##### Nashorn JavaScript Engine
Rhino를 대체하는 새로운 JavaScript 엔진인 Nashorn이 도입되었다. 성능이 크게 향상되었으며, Java와 JavaScript 간의 상호 운용성이 개선되었다.

#### 성능 및 보안 개선사항

##### HotSpot VM 개선
PermGen 영역이 제거되고 Metaspace로 대체되었다. 이로 인해 OutOfMemoryError: PermGen space 오류가 해결되었으며, 메모리 관리가 더욱 효율적이 되었다. 또한 AES 하드웨어 지원이 추가되어 암호화 성능이 향상되었다.

##### 보안 강화
TLS 1.2가 기본적으로 활성화되었으며, 다양한 보안 취약점이 수정되었다. SSL/TLS 프로토콜의 보안성이 강화되어 네트워크 통신의 안전성이 향상되었다.

##### 도구 개선
새로운 명령줄 도구들이 추가되었다. jjs(Nashorn JavaScript 엔진 실행), jdeps(클래스 의존성 분석), jcmd(JVM 진단) 등의 도구를 통해 개발 및 운영 효율성이 향상되었다.

### 코멘트

JDK 8은 Java 역사상 가장 중요한 릴리즈 중 하나로 평가된다. Lambda Expressions와 Stream API의 도입으로 Java가 함수형 프로그래밍 패러다임을 수용하게 되었으며, 이는 현대적인 프로그래밍 스타일로의 전환점이 되었다.

특히 PermGen 제거는 많은 운영 환경에서 겪던 메모리 관련 문제를 근본적으로 해결했다. 또한 새로운 Date-Time API는 기존 API의 스레드 안전성 문제와 복잡한 사용법을 개선하여 개발자 경험을 크게 향상시켰다.

JDK 8은 LTS(Long Term Support) 버전으로 2030년까지 지원될 예정이며, 현재도 많은 기업에서 사용하고 있는 핵심 버전이다. 향후 JDK 11, 17, 21로의 마이그레이션을 고려할 때 JDK 8의 특징을 정확히 이해하는 것이 중요하다.

> [!important] JDK 8 핵심 포인트
> - Lambda Expressions와 Stream API로 함수형 프로그래밍 도입
> - PermGen 제거로 메모리 관리 개선
> - Default Methods로 인터페이스 진화 가능
> - 새로운 Date-Time API로 날짜/시간 처리 개선
> - LTS 버전으로 장기 지원 제공 