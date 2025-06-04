---
title: "JDK 21 주요 특징 및 패치 분석"
note-type: "COMMON"
created: "2025-01-04"
completed: true
---

### 버전 개요

JDK 21은 2023년 9월에 출시된 Oracle의 네 번째 LTS(Long Term Support) 버전으로, JDK 17 이후 2년 만에 나온 장기 지원 버전이다. Oracle에서 2031년까지 상업적 지원을 제공하며, 현재 가장 최신의 LTS 버전으로 많은 기업들이 마이그레이션을 고려한다. 특히 Virtual Threads(Project Loom)라는 혁신적인 기능이 포함되어 현대적인 고성능 애플리케이션 개발의 새로운 기준을 제시하며, 자바 플랫폼의 패러다임 변화를 가져온 중요한 릴리즈이다.

### 주요 기능 변경사항

#### Virtual Threads (Project Loom)

JDK 21의 가장 혁신적인 기능은 Virtual Threads의 정식 도입이다. 기존의 플랫폼 스레드(OS 스레드)보다 훨씬 가벼운 가상 스레드를 통해 수백만 개의 동시 작업을 효율적으로 처리할 수 있다. Virtual Threads는 JVM에서 관리되며, 플랫폼 스레드 위에서 실행되어 컨텍스트 스위칭 비용을 크게 줄인다. 이는 I/O 집약적인 애플리케이션의 성능을 크게 향상시키며, 기존의 Thread API와 완전히 호환되어 기존 코드의 수정 없이도 성능 개선을 얻을 수 있다.

##### Virtual Threads 예시

웹 서버가 수많은 동시 사용자의 요청을 처리하는 상황을 가정해 보자. 각 요청이 데이터베이스 조회나 외부 API 호출과 같은 I/O 작업을 포함한다면, 기존 플랫폼 스레드 방식에서는 각 요청당 하나의 스레드가 할당되고 I/O 대기 시간에 스레드가 블록된다. 이는 제한된 플랫폼 스레드 자원을 비효율적으로 사용하게 만든다. Virtual Threads를 사용하면, I/O 대기 중인 가상 스레드는 플랫폼 스레드를 점유하지 않고 해당 플랫폼 스레드는 다른 가상 스레드를 실행할 수 있게 된다. 따라서 동일한 하드웨어 자원으로 훨씬 많은 동시 요청을 처리할 수 있다.

```java
// 기존 코드 (JDK 21에서도 Virtual Thread로 자동 실행될 수 있음)
new Thread(() -> {
    // I/O 작업 (네트워크 호출, DB 쿼리 등)
    performIOOperation();
}).start();

// Virtual Thread를 명시적으로 사용하는 방식
Thread.ofVirtual().start(() -> {
    // I/O 작업 (I/O 대기 시 플랫폼 스레드를 점유하지 않음)
    performIOOperation();
});
```
[AI 이미지 제안: 개념도 - 플랫폼 스레드와 Virtual Threads가 I/O 대기 시 어떻게 플랫폼 스레드를 공유하는지 보여주는 다이어그램]

#### 패턴 매칭과 Switch 표현식 강화

`switch` 표현식에서 패턴 매칭이 정식 지원되어 더욱 강력하고 표현력 있는 코드 작성이 가능해졌다. Record 패턴과 함께 사용하여 복잡한 데이터 구조를 간결하게 분해하고 처리할 수 있다. 가드 조건(`when`)도 지원되어 패턴 매칭의 유연성이 크게 향상되었다. 이를 통해 함수형 프로그래밍 스타일이 더욱 자연스럽게 자바에 통합되었다.

##### 패턴 매칭 코드 예시

도형 객체(원, 사각형 등)를 처리하는 코드를 생각해 보자.

```java
// 기존 if-else if 방식
Object shape = getShape();
if (shape instanceof Circle) {
    Circle c = (Circle) shape;
    System.out.println("원 면적: " + Math.PI * c.radius() * c.radius());
} else if (shape instanceof Rectangle) {
    Rectangle r = (Rectangle) shape;
    System.out.println("사각형 면적: " + r.width() * r.height());
} else {
    System.out.println("알 수 없는 도형");
}

// JDK 21 switch 패턴 매칭 방식
Object shape = getShape();
switch (shape) {
    case Circle c -> System.out.println("원 면적: " + Math.PI * c.radius() * c.radius());
    case Rectangle r -> System.out.println("사각형 면적: " + r.width() * r.height());
    default -> System.out.println("알 수 없는 도형");
}

// Record 패턴과 가드 조건(when) 사용 예시
record Point(int x, int y) {}
record Line(Point start, Point end) {}

Object obj = getData();
switch (obj) {
    case String s -> System.out.println("문자열: " + s.toUpperCase());
    case Point p when p.x() == p.y() -> System.out.println("대각선 상의 점: " + p);
    case Line l -> System.out.println("선분: " + l.start() + " to " + l.end());
    default -> System.out.println("알 수 없는 타입");
}
```
위 예시에서 보듯이, `switch` 문에서 바로 객체의 타입을 확인하고 변수를 바인딩하여 사용할 수 있으며, `when` 절로 추가 조건을 붙일 수 있어 코드가 훨씬 간결하고 가독성이 높아진다.

#### String Templates (Preview)

문자열 템플릿 기능이 프리뷰로 도입되어 문자열 보간을 더욱 안전하고 효율적으로 수행할 수 있다. 기존의 `String.format()`이나 `StringBuilder`보다 가독성이 높고, SQL 인젝션과 같은 보안 취약점을 방지할 수 있는 타입 안전한 문자열 생성이 가능하다. 컴파일 타임에 검증되어 런타임 오류를 줄일 수 있다.

##### String Templates 코드 예시

변수의 값을 포함하는 문자열을 만들 때 유용하다.

```java
// 기존 방식
String name = "World";
int version = 21;
String message = "Hello, " + name + "! JDK version is " + version + ".";
String formattedMessage = String.format("Hello, %s! JDK version is %d.", name, version);

// JDK 21 String Templates 방식 (PREVIEW)
String name = "World";
int version = 21;
String message = STR."Hello, \{name}! JDK version is \{version}."; // STR 템플릿 프로세서 사용
```
`STR`과 같은 템플릿 프로세서를 사용하여 백틱(`` ` ``) 대신 점(.) 뒤에 템플릿 프로세서 이름을 쓰고 중괄호(`{}`) 안에 변수나 표현식을 직접 넣어 문자열을 생성한다. 이는 가독성을 크게 향상시킨다. SQL 쿼리 생성 시 악의적인 입력값 삽입을 막는 `SQL`과 같은 템플릿 프로세서를 사용하면 보안 위험을 줄일 수 있다.

#### Sequenced Collections

`List`, `Set`, `Map`에 대한 순서가 있는 컬렉션 인터페이스가 도입되어 첫 번째와 마지막 요소에 대한 일관된 접근 방법을 제공한다. `addFirst()`, `addLast()`, `getFirst()`, `getLast()`, `removeFirst()`, `removeLast()` 등의 메서드를 통해 양방향 접근이 가능하다.

##### Sequenced Collections 코드 예시

`ArrayList`와 같은 기존 순서가 있는 컬렉션에서 첫/마지막 요소에 접근하는 코드를 생각해 보자.

```java
import java.util.List;
import java.util.ArrayList;
import java.util.SequencedCollection;

// 기존 방식 (List의 경우)
List<String> list = new ArrayList<>();
list.add("apple");
list.add("banana");
// 첫 요소: list.get(0)
// 마지막 요소: list.get(list.size() - 1)
// 첫 요소 제거: list.remove(0)
// 마지막 요소 제거: list.remove(list.size() - 1)

// JDK 21 SequencedCollection 인터페이스 사용
SequencedCollection<String> sequencedList = new ArrayList<>(); // ArrayList는 SequencedCollection 구현
sequencedList.addFirst("cherry"); // 이제 List에서도 addFirst 사용 가능
sequencedList.addLast("date");
String first = sequencedList.getFirst(); // 첫 요소 가져오기
String last = sequencedList.getLast(); // 마지막 요소 가져오기
String removedFirst = sequencedList.removeFirst(); // 첫 요소 제거
String removedLast = sequencedList.removeLast(); // 마지막 요소 제거
```
`SequencedCollection` 인터페이스와 그 하위 인터페이스(`SequencedSet`, `SequencedMap`)를 통해 컬렉션의 첫/마지막 요소에 대한 접근 및 조작이 통일된 메서드 이름으로 가능해져 코드의 일관성과 가독성이 향상된다. 기존의 `List`, `Deque`, `LinkedHashSet`, `LinkedHashMap` 등이 이 인터페이스를 구현하도록 변경되었다.

### 보안 패치 내역

#### 암호화 및 보안 강화

JDK 21에서는 최신 암호화 표준과 보안 프로토콜이 지원된다. EdDSA(Edwards-curve Digital Signature Algorithm) 지원이 강화되었으며, TLS 1.3의 성능이 더욱 최적화되었다. 또한 정기적인 보안 업데이트를 통해 새로운 보안 취약점에 대한 패치가 지속적으로 제공된다.

#### 메모리 보안 개선

Virtual Threads와 함께 메모리 관리 보안이 강화되었다. 스택 오버플로우 공격에 대한 보호가 개선되었으며, 가상 스레드의 스택 크기가 동적으로 관리되어 메모리 사용량을 최적화한다.

### 성능 개선사항

#### Generational ZGC

Generational ZGC가 정식 도입되어 가비지 컬렉션 성능이 크게 향상되었다. 특히 대용량 힙 메모리(수 테라바이트)를 사용하는 애플리케이션에서 일시 정지 시간을 10ms 이하로 유지할 수 있다. 젊은 세대와 오래된 세대를 분리하여 관리함으로써 GC 효율성이 크게 개선된다.

[AI 이미지 제안: 개념도 - Generational ZGC의 힙 메모리 구조(젊은 세대/오래된 세대)와 GC 과정 플로우차트]

#### 벡터 API 발전

벡터 API가 더욱 발전하여 SIMD(Single Instruction, Multiple Data) 연산을 통한 수치 계산 성능이 개선되었다. 머신러닝, 과학 계산, 이미지 처리 등의 분야에서 상당한 성능 향상을 기대할 수 있다.

#### Virtual Threads 성능 최적화

Virtual Threads는 기존 플랫폼 스레드 대비 메모리 사용량을 1/1000 수준으로 줄이면서도 동일한 성능을 제공한다. 특히 I/O 대기 시간이 긴 애플리케이션에서 처리량이 크게 향상된다.

### 호환성 이슈

#### 기존 코드와의 호환성

JDK 21은 대부분의 기존 코드와 호환되지만, 일부 deprecated API들이 제거되었다. 특히 보안 관리자(Security Manager)가 완전히 제거되어 관련 코드는 수정이 필요하다. 또한 일부 내부 API에 대한 접근이 더욱 제한된다.

#### Virtual Threads 마이그레이션 고려사항

Virtual Threads를 사용할 때는 ThreadLocal 사용을 최소화하고, 동기화 블록보다는 `ReentrantLock` 등의 명시적 락을 사용하는 것이 권장된다. 기존의 스레드 풀 기반 코드는 Virtual Threads로 마이그레이션할 때 성능 특성이 달라질 수 있어 충분한 테스트가 필요하다.

#### 플랫폼별 개선사항

Windows, Linux, macOS 모든 플랫폼에서 Virtual Threads가 지원되며, 각 플랫폼의 네이티브 기능을 활용한 최적화가 적용되었다. 특히 Linux에서는 io_uring을 활용한 비동기 I/O 성능이 크게 향상되었다.

### 관련 자료

- [[06. Reference Notes/Web/📚 Oracle JDK 21 공식 문서|📚 Oracle JDK 21 공식 문서]] - 공식 문서 및 릴리즈 노트
- [[03. Permanent Notes/JDK 17 주요 특징 및 패치 분석|JDK 17 주요 특징 및 패치 분석]] - 이전 LTS 버전과의 비교
- [[03. Permanent Notes/JDK 11 주요 특징 및 패치 분석|JDK 11 주요 특징 및 패치 분석]] - LTS 버전 진화 과정

### 질문 & 확장

- Virtual Threads는 어떤 상황에서 가장 큰 성능 향상을 보이는가?
- 기존 스레드 풀 기반 애플리케이션을 Virtual Threads로 마이그레이션할 때 주의사항은?
- Generational ZGC와 기존 G1GC의 성능 차이는 어느 정도인가?
- 패턴 매칭의 도입이 기존 if-else 체인과 비교해 어떤 장점을 제공하는가?

> [!tip] 마이그레이션 전략
> JDK 21로의 마이그레이션 시에는 Virtual Threads의 도입을 단계적으로 진행하는 것이 권장된다. 먼저 I/O 집약적인 부분부터 Virtual Threads를 적용하고, 성능 테스트를 통해 효과를 검증한 후 점진적으로 확대하는 것이 안전하다.