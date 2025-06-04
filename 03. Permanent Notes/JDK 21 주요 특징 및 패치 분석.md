---
title: "JDK 21 주요 특징 및 패치 분석"
note-type: "COMMON"
created: "2025-01-04"
completed: true
---

### 버전 개요

JDK 21은 2023년 9월에 출시된 Oracle의 네 번째 LTS(Long Term Support) 버전으로, JDK 17 이후 2년 만에 나온 장기 지원 버전이다. Oracle에서 2031년까지 상업적 지원을 제공하며, 현재 가장 최신의 LTS 버전으로 많은 기업들이 마이그레이션을 고려하고 있다. 특히 Virtual Threads(Project Loom)라는 혁신적인 기능이 포함되어 현대적인 고성능 애플리케이션 개발의 새로운 기준을 제시하며, 자바 플랫폼의 패러다임 변화를 가져온 중요한 릴리즈다.

### 주요 기능 변경사항

#### Virtual Threads (Project Loom)

JDK 21의 가장 혁신적인 기능은 Virtual Threads의 정식 도입이다. 기존의 플랫폼 스레드(OS 스레드)보다 훨씬 가벼운 가상 스레드를 통해 수백만 개의 동시 작업을 효율적으로 처리할 수 있다. Virtual Threads는 JVM에서 관리되며, 플랫폼 스레드 위에서 실행되어 컨텍스트 스위칭 비용을 크게 줄인다. 이는 I/O 집약적인 애플리케이션의 성능을 크게 향상시키며, 기존의 Thread API와 완전히 호환되어 기존 코드의 수정 없이도 성능 개선을 얻을 수 있다.

#### 패턴 매칭과 Switch 표현식 강화

switch 표현식에서 패턴 매칭이 정식 지원되어 더욱 강력하고 표현력 있는 코드 작성이 가능해졌다. Record 패턴과 함께 사용하여 복잡한 데이터 구조를 간결하게 분해하고 처리할 수 있다. 가드 조건(guard conditions)도 지원되어 패턴 매칭의 유연성이 크게 향상되었다. 이를 통해 함수형 프로그래밍 스타일이 더욱 자연스럽게 자바에 통합되었다.

#### String Templates (Preview)

문자열 템플릿 기능이 프리뷰로 도입되어 문자열 보간을 더욱 안전하고 효율적으로 수행할 수 있다. 기존의 String.format()이나 StringBuilder보다 가독성이 높고, SQL 인젝션과 같은 보안 취약점을 방지할 수 있는 타입 안전한 문자열 생성이 가능하다. 컴파일 타임에 검증되어 런타임 오류를 줄일 수 있다.

#### Sequenced Collections

List, Set, Map에 대한 순서가 있는 컬렉션 인터페이스가 도입되어 첫 번째와 마지막 요소에 대한 일관된 접근 방법을 제공한다. `addFirst()`, `addLast()`, `getFirst()`, `getLast()`, `removeFirst()`, `removeLast()` 등의 메서드를 통해 양방향 접근이 가능하다.

### 보안 패치 내역

#### 암호화 및 보안 강화

JDK 21에서는 최신 암호화 표준과 보안 프로토콜이 지원된다. EdDSA(Edwards-curve Digital Signature Algorithm) 지원이 강화되었으며, TLS 1.3의 성능이 더욱 최적화되었다. 또한 정기적인 보안 업데이트를 통해 새로운 보안 취약점에 대한 패치가 지속적으로 제공된다.

#### 메모리 보안 개선

Virtual Threads와 함께 메모리 관리 보안이 강화되었다. 스택 오버플로우 공격에 대한 보호가 개선되었으며, 가상 스레드의 스택 크기가 동적으로 관리되어 메모리 사용량을 최적화한다.

### 성능 개선사항

#### Generational ZGC

Generational ZGC가 정식 도입되어 가비지 컬렉션 성능이 크게 향상되었다. 특히 대용량 힙 메모리(수 테라바이트)를 사용하는 애플리케이션에서 일시 정지 시간을 10ms 이하로 유지할 수 있다. 젊은 세대와 오래된 세대를 분리하여 관리함으로써 GC 효율성이 크게 개선되었다.

#### 벡터 API 발전

벡터 API가 더욱 발전하여 SIMD(Single Instruction, Multiple Data) 연산을 통한 수치 계산 성능이 개선되었다. 머신러닝, 과학 계산, 이미지 처리 등의 분야에서 상당한 성능 향상을 기대할 수 있다.

#### Virtual Threads 성능 최적화

Virtual Threads는 기존 플랫폼 스레드 대비 메모리 사용량을 1/1000 수준으로 줄이면서도 동일한 성능을 제공한다. 특히 I/O 대기 시간이 긴 애플리케이션에서 처리량이 크게 향상된다.

### 호환성 이슈

#### 기존 코드와의 호환성

JDK 21은 대부분의 기존 코드와 호환되지만, 일부 deprecated API들이 제거되었다. 특히 보안 관리자(Security Manager)가 완전히 제거되어 관련 코드는 수정이 필요하다. 또한 일부 내부 API에 대한 접근이 더욱 제한되었다.

#### Virtual Threads 마이그레이션 고려사항

Virtual Threads를 사용할 때는 ThreadLocal 사용을 최소화하고, 동기화 블록보다는 ReentrantLock 등의 명시적 락을 사용하는 것이 권장된다. 기존의 스레드 풀 기반 코드는 Virtual Threads로 마이그레이션할 때 성능 특성이 달라질 수 있어 충분한 테스트가 필요하다.

#### 플랫폼별 개선사항

Windows, Linux, macOS 모든 플랫폼에서 Virtual Threads가 지원되며, 각 플랫폼의 네이티브 기능을 활용한 최적화가 적용되었다. 특히 Linux에서는 io_uring을 활용한 비동기 I/O 성능이 크게 향상되었다.

### 관련 자료

- [[📚 Oracle JDK 21 공식 문서]] - 공식 문서 및 릴리즈 노트
- [[03. Permanent Notes/JDK 17 주요 특징 및 패치 분석]] - 이전 LTS 버전과의 비교
- [[03. Permanent Notes/JDK 11 주요 특징 및 패치 분석]] - LTS 버전 진화 과정

### 질문 & 확장

- Virtual Threads는 어떤 상황에서 가장 큰 성능 향상을 보이는가?
- 기존 스레드 풀 기반 애플리케이션을 Virtual Threads로 마이그레이션할 때 주의사항은?
- Generational ZGC와 기존 G1GC의 성능 차이는 어느 정도인가?
- 패턴 매칭의 도입이 기존 if-else 체인과 비교해 어떤 장점을 제공하는가?

> [!tip] 마이그레이션 전략
> JDK 21로의 마이그레이션 시에는 Virtual Threads의 도입을 단계적으로 진행하는 것이 권장된다. 먼저 I/O 집약적인 부분부터 Virtual Threads를 적용하고, 성능 테스트를 통해 효과를 검증한 후 점진적으로 확대하는 것이 안전하다. 