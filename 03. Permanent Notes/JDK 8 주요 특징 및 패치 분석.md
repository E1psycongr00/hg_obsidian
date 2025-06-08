---
tags:
  - JAVA
aliases: 
title: JDK 8 주요 특징 및 패치 분석
note-type: COMMON
created: 2025-06-04
completed: true
---

### JDK 8 주요 변경 사항 요약

| 기능 분야        | 주요 변경 사항                                  | 개발자 관점 핵심                                                                 |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------------------ |
| **언어 기능**      | 람다 표현식(Lambda Expressions) 도입            | 함수형 프로그래밍 지원, 코드 간결화, 익명 클래스 대체, 이벤트 처리 등 다양한 활용              |
|                  | 스트림 API (`java.util.stream`)                 | 컬렉션 데이터의 함수형 처리(필터, 맵, 리듀스 등) 가능, 병렬 처리 지원으로 성능 향상 가능성        |
|                  | 디폴트 메서드 (인터페이스)                      | 기존 인터페이스에 새로운 메서드 추가 용이 (하위 호환성 유지)                                |
|                  | 새로운 날짜/시간 API (`java.time`)              | 기존 `Date`, `Calendar` 문제점 해결, 불변(Immutable) 객체 기반의 직관적이고 안전한 API 제공   |
| **보안**         | TLS 1.2 기본 활성화 (클라이언트 측)             | 네트워크 통신 보안 강화                                                            |
|                  | AES/GCM/NoPadding 등 암호화 기능 강화           | 더 강력하고 효율적인 암호화 지원                                                     |
| **성능/JVM**     | PermGen 영역 제거 (Metaspace로 대체)            | `OutOfMemoryError: PermGen space` 문제 해결, 클래스 메타데이터 동적 관리                      |
|                  | AES 하드웨어 인트린직 지원                      | 특정 하드웨어에서 AES 암호화 성능 대폭 향상                                          |
|                  | HashMap 키 충돌 성능 개선                       | HashMap의 특정 상황에서의 성능 저하 방지                                               |
| **제거/변경**    | JDBC-ODBC Bridge 제거                           | ODBC 드라이버 직접 연결 방식 사용 불가, JDBC 드라이버 사용 권장                               |
|                  | Rhino JavaScript 엔진 Nashorn으로 대체          | JavaScript 엔진 변경으로 인한 스크립트 호환성 검토 필요                                |

### 버전 개요

JDK 8은 2014년 3월에 출시된 자바 플랫폼의 주요 기능 릴리즈로, 자바 역사상 가장 중요한 변화 중 하나를 가져온 버전이다. Oracle에서 제공하는 첫 번째 LTS(Long Term Support) 버전으로, 2030년까지 상업적 지원이 제공된다. 현재까지도 많은 기업에서 안정성을 이유로 사용하고 있는 핵심 버전이다.

### 개발자 관점의 주요 기능 심층 분석

#### 람다 표현식과 스트림 API: 함수형 프로그래밍의 도입

JDK 8의 가장 큰 변화는 람다 표현식과 스트림 API의 도입으로, 자바 개발 패러다임에 큰 영향을 미쳤다.

*   **람다 표현식**: 익명 클래스의 사용을 간결하게 대체하며, 특히 함수형 인터페이스(하나의 추상 메서드만 가진 인터페이스)와 함께 사용되어 코드의 가독성을 높인다. 이벤트 리스너, 스레드 생성, 컬렉션 처리 등 다양한 곳에서 활용된다.
*   **스트림 API**: 컬렉션이나 배열 등의 데이터 소스를 함수형 연산(filter, map, reduce 등)을 통해 선언적으로 처리할 수 있게 한다. 데이터 처리 로직을 간결하게 표현하고, 내부적으로 병렬 처리를 지원하여 멀티코어 환경에서 성능 이점을 얻을 수 있다.

```java
import java.util.Arrays;
import java.util.List;

// 람다 표현식과 스트림 API 예시
List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// 이름이 "C"로 시작하는 사람 필터링 후 대문자로 변환하여 출력
names.stream()
     .filter(name -> name.startsWith("C"))
     .map(String::toUpperCase)
     .forEach(System.out::println); // 메서드 참조 사용

// 병렬 스트림 예시 (간단한 작업에는 오버헤드가 있을 수 있음)
long count = names.parallelStream()
                  .filter(name -> name.length() > 5)
                  .count();
```

#### 새로운 날짜/시간 API (`java.time`): 기존 문제 해결 및 사용성 개선

기존 `java.util.Date`와 `java.util.Calendar` 클래스는 가변성, 복잡한 API, 스레드 불안전성 등의 문제를 안고 있었다. JDK 8에서는 이를 대체하기 위해 Joda-Time 라이브러리에 기반한 새로운 `java.time` 패키지를 도입했다.

*   **핵심 이점**: `LocalDate`, `LocalTime`, `LocalDateTime`, `ZonedDateTime`, `Duration`, `Period` 등 명확한 역할을 가진 불변(immutable) 클래스들을 제공하여 날짜와 시간 관련 작업을 훨씬 직관적이고 안전하게 수행할 수 있다.
*   **개발자 영향**: 날짜/시간 계산, 포매팅, 파싱 등의 작업이 용이해지고, 스레드 동기화 문제에서 자유로워진다.

#### 디폴트 메서드: 인터페이스 진화의 유연성 확보

인터페이스에 `default` 키워드를 사용하여 메서드의 기본 구현을 제공할 수 있게 되었다. 이는 기존 인터페이스를 구현한 수많은 클래스들을 수정하지 않고도 인터페이스에 새로운 기능을 추가할 수 있게 해준다 (예: `Collection` 인터페이스의 `stream()` 메서드).

*   **활용 방안**: 라이브러리나 프레임워크 개발 시 API 확장을 용이하게 하며, 하위 호환성을 유지하는 데 중요한 역할을 한다.

#### PermGen 제거와 Metaspace 도입: JVM 메모리 관리 개선

HotSpot JVM에서 클래스 메타데이터와 정적 변수 등을 저장하던 PermGen(Permanent Generation) 영역이 제거되고, 대신 네이티브 메모리를 사용하는 Metaspace 영역이 도입되었다.

*   **주요 개선점**: 고정된 크기의 PermGen으로 인해 발생하던 `OutOfMemoryError: PermGen space` 문제가 해결되었다. Metaspace는 필요에 따라 동적으로 크기가 조절되므로 클래스 로딩이 많은 애플리케이션의 안정성이 향상되었다.
*   **주의사항**: JVM 튜닝 시 PermGen 관련 옵션(`-XX:PermSize`, `-XX:MaxPermSize`) 대신 Metaspace 관련 옵션(`-XX:MetaspaceSize`, `-XX:MaxMetaspaceSize`)을 사용해야 한다.

### 호환성 및 마이그레이션 주의사항

JDK 7 이하에서 JDK 8로 마이그레이션할 때는 몇 가지 주요 변경 사항을 고려해야 한다. JDBC-ODBC Bridge가 제거되어 ODBC 드라이버를 사용하던 애플리케이션은 JDBC 드라이버로 전환해야 한다. 또한, JavaScript 엔진이 Rhino에서 Nashorn으로 변경되어 관련 스크립트의 호환성 검토가 필요할 수 있다.

>[!note] LTS 버전의 특징
>JDK 8은 Oracle의 첫 번째 LTS 버전으로, 장기간 안정적인 지원을 받을 수 있어 많은 기업에서 선호하는 버전이다. 새로운 기능보다는 안정성과 호환성을 중시하는 환경에서 여전히 널리 사용되고 있다.

### 질문 & 확장

- JDK 8의 람다 표현식과 스트림 API가 가져온 가장 큰 설계상의 변화는 무엇이라고 생각하는가?
- `java.time` API를 사용할 때 기존 `Date`/`Calendar` 코드와의 상호 운용성은 어떻게 해결하는 것이 좋은가?
- Metaspace 도입으로 인해 JVM 메모리 튜닝 전략은 어떻게 바뀌어야 하는가?
- JDK 8에서 이후 LTS 버전(JDK 11, 17, 21)으로 마이그레이션할 때 가장 먼저 고려해야 할 점은 무엇인가?

### 출처

- [[05. Reference Notes/Web/📚 Oracle JDK 8 공식 문서|📚 Oracle JDK 8 공식 문서]]
- Oracle JDK 8 공식 릴리즈 노트 및 기술 문서

>[!note] LTS 버전의 특징
>JDK 8은 Oracle의 첫 번째 LTS 버전으로, 장기간 안정적인 지원을 받을 수 있어 많은 기업에서 선호하는 버전이다. 새로운 기능보다는 안정성과 호환성을 중시하는 환경에서 여전히 널리 사용되고 있다. 