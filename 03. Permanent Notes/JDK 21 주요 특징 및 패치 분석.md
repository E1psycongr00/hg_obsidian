---
title: "JDK 21 주요 특징 및 패치 분석"
note-type: "COMMON"
created: "2025-01-04"
completed: true
---

### JDK 21 주요 변경 사항 요약

| 기능 분야          | 주요 변경 사항                                  | 개발자 관점 핵심                                                                 |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------ |
| **동시성**         | Virtual Threads (Project Loom) 정식 도입        | I/O 집약적 애플리케이션의 혁신적인 성능 향상 및 리소스 효율 증대, 기존 코드 호환성 유지             |
| **언어 기능**      | 패턴 매칭 및 Switch 표현식 강화                 | 복잡한 데이터 구조 처리 시 코드 간결성 및 가독성 대폭 향상, 함수형 프로그래밍 스타일 강화         |
|                    | String Templates (Preview)                    | 타입 안전하고 가독성 높은 문자열 생성, SQL 인젝션 등 보안 취약점 방지 (템플릿 프로세서 활용)       |
| **컬렉션 프레임워크** | Sequenced Collections 도입                      | List, Set, Map에서 첫/마지막 요소 접근 및 조작 일관성 제공 (addFirst, getLast 등)        |
| **보안**           | 암호화 표준 강화 (EdDSA 지원 등), TLS 1.3 최적화 | 최신 보안 프로토콜 적용으로 애플리케이션 보안 수준 향상                                    |
|                    | 메모리 보안 개선 (Virtual Threads 관련)       | 스택 오버플로우 공격 방어 강화 및 가상 스레드 스택 동적 관리                               |
| **성능**           | Generational ZGC 정식 도입                      | 대용량 힙 메모리 환경에서 GC 일시정지 시간 최소화 (10ms 이하 목표)                             |
|                    | 벡터 API 발전 (SIMD 연산)                     | 머신러닝, 과학 계산 등 수치 연산 집약적 작업 성능 개선                                    |

### 버전 개요

JDK 21은 2023년 9월에 출시된 Oracle의 네 번째 LTS(Long Term Support) 버전으로, JDK 17 이후 2년 만에 나온 장기 지원 버전이다. Oracle에서 2031년까지 상업적 지원을 제공하며, 현재 가장 최신의 LTS 버전으로 많은 기업들이 마이그레이션을 고려한다. 특히 Virtual Threads(Project Loom)라는 혁신적인 기능이 포함되어 현대적인 고성능 애플리케이션 개발의 새로운 기준을 제시하며, 자바 플랫폼의 패러다임 변화를 가져온 중요한 릴리즈이다.

### 개발자 관점의 주요 기능 심층 분석

#### Virtual Threads: 동시성 프로그래밍의 혁명

JDK 21의 가장 핵심적인 변화는 단연 Virtual Threads의 정식 도입이다. 이는 기존 플랫폼 스레드의 한계를 극복하고, I/O 바운드 애플리케이션에서 수백만 개의 동시 작업을 최소한의 리소스로 처리할 수 있게 한다.

*   **핵심 이점**: 기존 스레드 API와의 호환성을 유지하면서도, I/O 대기 시 플랫폼 스레드를 점유하지 않아 컨텍스트 스위칭 비용을 대폭 절감한다. 이는 웹 서버, 마이크로서비스 등 동시 요청 처리가 중요한 환경에서 애플리케이션 처리량(Throughput)을 극대화한다.
*   **주의사항**: ThreadLocal 사용 최소화, 동기화 블록 대신 명시적 Lock 사용이 권장된다. 기존 스레드 풀 기반 코드는 마이그레이션 시 성능 특성 변화에 대한 충분한 테스트가 필요하다.

```java
// Virtual Thread를 명시적으로 사용하는 방식
Thread.ofVirtual().start(() -> {
    // I/O 작업 (I/O 대기 시 플랫폼 스레드를 점유하지 않음)
    performIOOperation();
});
```
[AI 이미지 제안: 개념도 - 플랫폼 스레드와 Virtual Threads가 I/O 대기 시 어떻게 플랫폼 스레드를 공유하는지 보여주는 다이어그램]

#### 패턴 매칭 & Switch 표현식: 코드 가독성 및 표현력 증대

`switch` 표현식 내 패턴 매칭이 정식 지원되어, 복잡한 조건 분기 및 데이터 타입에 따른 처리 로직을 훨씬 간결하고 직관적으로 작성할 수 있게 되었다.

*   **주요 개선점**: Record 패턴, 가드 조건(`when`)과 결합하여 이전의 `if-else if` 체인보다 훨씬 읽기 쉽고 오류 발생 가능성이 낮은 코드를 작성할 수 있다. 이는 코드 유지보수성을 향상시키는 데 크게 기여한다.

```java
// Record 패턴과 가드 조건(when) 사용 예시
record Point(int x, int y) {}
Object obj = getData();
switch (obj) {
    case String s -> System.out.println("문자열: " + s.toUpperCase());
    case Point p when p.x() == p.y() -> System.out.println("대각선 상의 점: " + p);
    default -> System.out.println("알 수 없는 타입");
}
```

#### String Templates (Preview): 안전하고 편리한 문자열 구성

문자열 템플릿 기능(프리뷰)은 변수나 표현식을 문자열에 삽입할 때 가독성과 안전성을 높여준다.

*   **기대 효과**: 기존 `String.format()`이나 문자열 접합 방식보다 직관적이며, 특히 SQL 쿼리 등 외부 시스템과 연동되는 문자열 생성 시 `SQL`과 같은 전용 템플릿 프로세서를 사용하면 SQL 인젝션과 같은 보안 공격을 방지하는 데 도움이 된다.

```java
// JDK 21 String Templates 방식 (PREVIEW)
String name = "World";
int version = 21;
String message = STR."Hello, \{name}! JDK version is \{version}."; // STR 템플릿 프로세서 사용
```

#### Sequenced Collections: 컬렉션 API의 일관성 강화

`List`, `Set`, `Map` 인터페이스에 순서 기반 접근을 위한 일관된 API가 추가되었다. `getFirst()`, `getLast()`, `addFirst()`, `removeLast()` 등의 메서드를 통해 컬렉션의 양 끝단 요소에 대한 조작이 표준화되었다. 이는 코드의 명확성을 높이고 특정 구현체에 의존적인 코드를 줄이는 데 기여한다.

```java
import java.util.List;
import java.util.ArrayList;
import java.util.SequencedCollection;

// JDK 21 SequencedCollection 인터페이스 사용
SequencedCollection<String> sequencedList = new ArrayList<>(); // ArrayList는 SequencedCollection 구현
sequencedList.addFirst("cherry");
String first = sequencedList.getFirst();
```

#### Generational ZGC: GC 성능의 비약적 발전

Generational ZGC의 정식 도입은 대용량 힙을 사용하는 애플리케이션의 응답성 개선에 중요한 역할을 한다. 젊은 세대와 오래된 세대를 구분하여 GC를 수행함으로써, 전체 GC에 소요되는 일시 정지 시간을 크게 단축시켜 서비스 지연 시간을 최소화한다.

[AI 이미지 제안: 개념도 - Generational ZGC의 힙 메모리 구조(젊은 세대/오래된 세대)와 GC 과정 플로우차트]

### 호환성 및 마이그레이션 전략

JDK 21은 대부분의 기존 코드와 호환되지만, 보안 관리자(Security Manager) 완전 제거 등 일부 변경 사항에 대한 주의가 필요하다. Virtual Threads 도입은 I/O 집약적인 부분부터 단계적으로 적용하며 성능 테스트를 통해 효과를 검증하는 것이 안전하다.

> [!tip] 마이그레이션 전략
> JDK 21로의 마이그레이션 시에는 Virtual Threads의 도입을 단계적으로 진행하는 것이 권장된다. 먼저 I/O 집약적인 부분부터 Virtual Threads를 적용하고, 성능 테스트를 통해 효과를 검증한 후 점진적으로 확대하는 것이 안전하다.

### 관련 자료

- [[06. Reference Notes/Web/📚 Oracle JDK 21 공식 문서|📚 Oracle JDK 21 공식 문서]] - 공식 문서 및 릴리즈 노트, 상세 기능 설명
- [[03. Permanent Notes/JDK 17 주요 특징 및 패치 분석|JDK 17 주요 특징 및 패치 분석]] - 이전 LTS 버전과의 비교
- [[03. Permanent Notes/JDK 11 주요 특징 및 패치 분석|JDK 11 주요 특징 및 패치 분석]] - LTS 버전 진화 과정

### 질문 & 확장

- Virtual Threads는 어떤 유형의 애플리케이션에서 가장 큰 성능 향상을 기대할 수 있는가?
- 기존 동시성 코드를 Virtual Threads로 전환할 때, 주의해야 할 주요 패턴 변경은 무엇인가?
- Generational ZGC가 특히 유리한 운영 환경은 어떤 조건인가?