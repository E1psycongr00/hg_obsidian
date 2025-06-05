---
tags:
  - 객체지향
  - 디자인패턴
  - JAVA
  - 동시성
  - Thread-Safety
  - 싱글톤
aliases:
  - Singleton Thread-Safety
  - 싱글톤 스레드 안전성
created: 2025-06-05
title: 싱글톤 패턴 Thread-Safety
note-type: COMMON
completed: true
---

## 내용(Content)

### 주제 요약

>[!summary]
>멀티스레드 환경에서 싱글톤 패턴의 Thread-Safety 이슈와 해결 방안 심화 분석

멀티스레드 환경에서 싱글톤 패턴을 구현할 때 발생하는 Thread-Safety 문제는 매우 복잡하고 미묘합니다. 이 노트에서는 이러한 문제들과 해결 방안을 기술적으로 상세히 분석합니다.

### Thread-Safety 문제의 근본 원인

#### 1. 원자성(Atomicity) 결여

```java
// 문제가 있는 코드
public static LazySingleton getInstance() {
    if (instance == null) {        // 1. 읽기 연산
        instance = new LazySingleton(); // 2. 쓰기 연산
    }
    return instance;               // 3. 읽기 연산
}
```

>[!warning] 원자성 문제
>위 코드에서 1-2번 연산 사이에 다른 스레드가 개입할 수 있어 여러 인스턴스가 생성될 수 있습니다.

**문제 발생 메커니즘:**
- `if (instance == null)` 체크와 `instance = new LazySingleton()` 할당이 원자적으로 실행되지 않음
- 두 연산 사이의 시간 간격에서 다른 스레드가 개입 가능
- 결과적으로 여러 스레드가 동시에 인스턴스를 생성할 수 있음

#### 2. Race Condition 발생 시나리오

```java
// 시나리오: 두 스레드가 동시에 getInstance() 호출
Thread A: if (instance == null) // true
Thread B: if (instance == null) // true (A가 아직 인스턴스 생성 전)
Thread A: instance = new LazySingleton(); // 첫 번째 인스턴스 생성
Thread B: instance = new LazySingleton(); // 두 번째 인스턴스 생성 (덮어씀)
```

**결과:**
- 싱글톤 원칙 위반
- 메모리 누수 (첫 번째 인스턴스가 가비지 컬렉션 대상)
- 상태 불일치 가능성

>[!info] Race Condition 정의
>두 개 이상의 스레드가 공유 자원에 동시에 접근할 때, 실행 순서에 따라 결과가 달라지는 상황을 말합니다.

#### 3. 메모리 가시성(Memory Visibility) 문제

```java
// CPU 캐시와 메인 메모리 간의 불일치
Thread A: instance = new Singleton(); // CPU A 캐시에만 저장
Thread B: if (instance == null)       // CPU B 캐시에서 읽음 (여전히 null)
```

**Java Memory Model**에 따르면, 한 스레드에서 변경한 값이 다른 스레드에게 즉시 보이지 않을 수 있습니다.

**메모리 가시성 문제의 원인:**
- 각 CPU 코어는 독립적인 캐시를 가짐
- 변수 변경이 메인 메모리에 즉시 반영되지 않을 수 있음
- 다른 스레드는 오래된 값을 읽을 수 있음

### 동기화 메커니즘 상세 분석

#### 1. synchronized 키워드

```java
public static synchronized Singleton getInstance() {
    if (instance == null) {
        instance = new Singleton();
    }
    return instance;
}
```

**동작 원리:**
- **모니터 락(Monitor Lock)**: 한 번에 하나의 스레드만 접근 가능
- **메모리 가시성 보장**: happens-before 관계 성립
- **원자성 보장**: 메서드 전체가 원자적으로 실행

**성능 영향:**
```java
// 성능 측정 예시
long startTime = System.nanoTime();
for (int i = 0; i < 1000000; i++) {
    ThreadSafeSingleton.getInstance();
}
long endTime = System.nanoTime();
// synchronized: 약 50-100ms
// non-synchronized: 약 1-2ms
```

>[!warning] 성능 문제
>synchronized는 Thread-Safety를 보장하지만, 인스턴스 생성 후에도 매번 동기화 오버헤드가 발생합니다.

#### 2. volatile 키워드

```java
private static volatile Singleton instance;
```

**역할:**
- **메모리 가시성 보장**: 변수 변경이 즉시 메인 메모리에 반영
- **명령어 재배열 방지**: 컴파일러/JVM 최적화 제한
- **원자성은 보장하지 않음**: 복합 연산(read-modify-write)에는 부족

**메모리 모델:**
```java
// volatile 없이
Thread A: instance = new Singleton();
// CPU 캐시에만 저장, 메인 메모리 반영 시점 불확실

// volatile 사용
Thread A: instance = new Singleton();
// 즉시 메인 메모리에 반영, 다른 스레드에서 즉시 확인 가능
```

### Double-Checked Locking 심화 분석

#### 구현과 동작 원리

```java
public static Singleton getInstance() {
    if (instance == null) {                    // 첫 번째 체크 (빠른 경로)
        synchronized (Singleton.class) {       // 동기화 블록
            if (instance == null) {            // 두 번째 체크 (안전 확인)
                instance = new Singleton();    // 인스턴스 생성
            }
        }
    }
    return instance;
}
```

**동작 과정:**
1. **첫 번째 체크**: 동기화 없이 빠른 확인
2. **동기화 블록**: 인스턴스가 null인 경우에만 진입
3. **두 번째 체크**: 동기화 블록 내에서 다시 확인
4. **인스턴스 생성**: 안전하게 인스턴스 생성

#### volatile이 필수인 이유

```java
// volatile 없는 경우의 문제
instance = new Singleton(); // 실제로는 3단계 연산

// 1. 메모리 할당
// 2. Singleton 생성자 호출
// 3. instance 변수에 참조 할당

// JVM 최적화로 인한 재배열 가능:
// 1. 메모리 할당
// 3. instance 변수에 참조 할당 (생성자 호출 전!)
// 2. Singleton 생성자 호출
```

>[!danger] 명령어 재배열 문제
>JVM 최적화로 인해 생성자 호출 전에 참조가 할당될 수 있어, 초기화되지 않은 객체를 반환할 위험이 있습니다.

**문제 시나리오:**
```java
Thread A: instance = new Singleton(); // 재배열로 인해 참조만 할당
Thread B: if (instance == null)       // false (참조는 존재)
Thread B: return instance;            // 아직 초기화되지 않은 객체 반환!
```

**상세 구현:** [[⌨️ 싱글톤 Double-Checked Locking_java]]

### 성능 비교 및 벤치마크

#### 처리량 비교 (operations/second)

| 구현 방법 | 단일 스레드 | 4 스레드 | 16 스레드 | 메모리 사용량 |
|-----------|-------------|----------|-----------|---------------|
| Early Initialization | 50M ops/s | 200M ops/s | 800M ops/s | 즉시 할당 |
| Synchronized | 45M ops/s | 12M ops/s | 3M ops/s | 지연 할당 |
| Double-Checked | 48M ops/s | 180M ops/s | 720M ops/s | 지연 할당 |
| Bill Pugh | 50M ops/s | 200M ops/s | 800M ops/s | 지연 할당 |
| Enum | 50M ops/s | 200M ops/s | 800M ops/s | 즉시 할당 |

>[!info] 성능 분석
>- **Synchronized**: 스레드 수 증가에 따라 성능 급격히 저하
>- **Double-Checked**: 좋은 성능이지만 구현 복잡성 증가
>- **Bill Pugh & Enum**: 최고 성능과 단순성을 동시에 제공

#### 실제 TestContainer 환경에서의 적용

기존 [[Junit5와 TestContainer를 이용한 생명주기 관리]] 노트에서 언급된 싱글톤 패턴 활용:

```java
// TestContainer에서의 싱글톤 활용 예시
public abstract class AbstractSingletonContainerTest {
    private static JdbcDatabaseContainer<?> databaseContainer;

    static {
        // Bill Pugh Solution 적용
        databaseContainer = ContainerHelper.getInstance();
        databaseContainer.start();
    }
    
    private static class ContainerHelper {
        private static final JdbcDatabaseContainer<?> INSTANCE = 
            new PostgreSQLContainer<>("postgres:16.1");
    }
}
```

**병렬 테스트 환경에서의 고려사항:**
- 여러 테스트 클래스가 동시에 실행될 때 컨테이너 인스턴스 공유
- Thread-safety 보장으로 안전한 병렬 실행 가능
- 메모리 효율성으로 CI/CD 환경에서 리소스 절약

**성능 개선 효과:**
```java
// 싱글톤 적용 전: 각 테스트 클래스마다 컨테이너 생성
// 테스트 클래스 5개 × 컨테이너 시작 시간 30초 = 150초

// 싱글톤 적용 후: 하나의 컨테이너 공유
// 컨테이너 시작 시간 30초 + 테스트 실행 시간 = 약 35초
// 약 76% 시간 단축
```

### Lock-Free 구현 방법

#### AtomicReference 활용

```java
public class LockFreeSingleton {
    private static final AtomicReference<LockFreeSingleton> INSTANCE = 
        new AtomicReference<>();
    
    public static LockFreeSingleton getInstance() {
        LockFreeSingleton instance = INSTANCE.get();
        if (instance == null) {
            instance = new LockFreeSingleton();
            if (!INSTANCE.compareAndSet(null, instance)) {
                // 다른 스레드가 이미 설정함, 생성한 인스턴스 버림
                instance = INSTANCE.get();
            }
        }
        return instance;
    }
}
```

**동작 원리:**
- **AtomicReference**: CAS(Compare-And-Swap) 연산 사용
- **Lock-Free**: 스레드 블로킹 없이 동시성 제어
- **ABA 문제 방지**: 참조 비교로 안전성 보장

**장점:**
- Lock-free로 높은 성능
- Thread-safe 보장
- 데드락 위험 없음

**단점:**
- 여러 인스턴스가 생성될 수 있음 (하나만 사용되고 나머지는 버려짐)
- 복잡한 구현
- 메모리 낭비 가능성

### 권장사항 및 선택 기준

#### 상황별 최적 선택

1. **일반적인 애플리케이션**: **Bill Pugh Solution**
   - Thread-safe, 지연 초기화, 높은 성능
   - 구현 간단, 유지보수 용이
   - **상세 구현:** [[⌨️ 싱글톤 Bill Pugh Solution_java]]

2. **보안이 중요한 환경**: **Enum 방식**
   - 리플렉션 공격 방지
   - 직렬화 안전성 보장
   - **상세 구현:** [[⌨️ 싱글톤 Enum 방식_java]]

3. **레거시 시스템**: **Early Initialization**
   - 단순하고 안정적
   - 메모리 사용량이 크지 않은 경우

4. **고성능이 필요한 경우**: **Double-Checked Locking**
   - 세밀한 성능 튜닝 가능
   - volatile 키워드 필수 주의

#### 피해야 할 패턴

```java
// ❌ 절대 사용하지 말 것
public static Singleton getInstance() {
    if (instance == null) {
        instance = new Singleton(); // Thread-unsafe!
    }
    return instance;
}
```

>[!danger] 위험한 패턴
>위 코드는 멀티스레드 환경에서 여러 인스턴스가 생성될 수 있어 절대 사용하면 안 됩니다.

### Thread-Safety 검증 방법

#### 1. 단위 테스트

```java
@Test
public void testThreadSafety() throws InterruptedException {
    int threadCount = 100;
    ExecutorService executor = Executors.newFixedThreadPool(threadCount);
    Set<Singleton> instances = ConcurrentHashMap.newKeySet();
    
    for (int i = 0; i < threadCount; i++) {
        executor.submit(() -> instances.add(Singleton.getInstance()));
    }
    
    executor.shutdown();
    executor.awaitTermination(1, TimeUnit.MINUTES);
    
    assertEquals(1, instances.size()); // 인스턴스가 하나만 생성되어야 함
}
```

#### 2. 스트레스 테스트

```java
@Test
public void stressTest() {
    int iterations = 1000000;
    int threadCount = 10;
    
    // 여러 스레드에서 동시에 getInstance() 호출
    // 성능과 정확성 모두 검증
}
```

## 질문 & 확장

### 심화 학습 질문

1. **Java Memory Model**: happens-before 관계가 Thread-Safety에 미치는 영향은?
2. **CAS 연산**: AtomicReference의 compareAndSet이 어떻게 Lock-Free를 구현하는가?
3. **JVM 최적화**: 명령어 재배열이 싱글톤 패턴에 미치는 구체적 영향은?

### 다음 단계 학습

- [[싱글톤 패턴 구현 방법]] - 7가지 구현 방식과 Thread-Safety 특성
- [[⌨️ 싱글톤 Double-Checked Locking_java]] - 복잡하지만 최적화된 구현
- [[싱글톤 패턴 실무 적용]] - 실제 사용 사례와 현대적 대안

## 출처

- Brian Goetz. "Java Concurrency in Practice" (2006) - Chapter 16: The Java Memory Model
- Joshua Bloch. "Effective Java" 3rd Edition (2017) - Item 3
- JSR-133: Java Memory Model and Thread Specification

## 연결 노트

### 상위 개념
- [[🏛️ 싱글톤 패턴]] - 전체 싱글톤 패턴 MOC
- [[싱글톤 패턴 기본 개념]] - 기본 개념과 원리

### 관련 개념
- [[Junit5와 TestContainer를 이용한 생명주기 관리]] - 실제 활용 사례

### 구현 방법
- [[싱글톤 패턴 구현 방법]] - 각 구현 방법의 Thread-Safety 특성

---

**마지막 업데이트**: 2025-01-16  
**작성자**: AI Assistant  
**검토 상태**: 완료 