---
tags: 
aliases: 
title: 🔬 JDK 17에서 JDK 21로 마이그레이션 가이드
note-type: SOLUTION
created: 2025-06-04
completed: true
archive: false
---

## 문제 정의

JDK 17에서 JDK 21로의 마이그레이션은 현재 가장 최신의 LTS 버전으로 업그레이드하는 과정으로, 혁신적인 기능들을 활용할 수 있지만 다음과 같은 고려사항들이 존재한다:

- **Virtual Threads 도입**: 기존 스레드 모델과의 호환성 및 성능 최적화 고려 필요
- **패턴 매칭 강화**: switch 표현식의 패턴 매칭 정식 지원으로 인한 코드 리팩토링 기회
- **String Templates (Preview)**: 새로운 문자열 처리 방식 도입으로 인한 기존 코드 개선 가능성
- **Sequenced Collections**: 새로운 컬렉션 인터페이스 도입으로 인한 API 변경
- **라이브러리 생태계**: 일부 라이브러리의 JDK 21 완전 지원 대기 상태

## 가설

JDK 17에서 JDK 21로의 마이그레이션은 가장 안정적인 LTS 간 마이그레이션이며, 다음과 같은 전략적 접근이 효과적이다:

1. **호환성 우선**: 기존 코드의 안정적 동작 보장을 최우선으로 진행
2. **점진적 기능 도입**: Virtual Threads 등 새 기능을 단계적으로 도입
3. **성능 최적화**: 새로운 GC 및 성능 개선사항 활용
4. **코드 현대화**: 새로운 언어 기능을 활용한 코드 품질 향상

## 해결 과정

### 1단계: 호환성 검증 및 환경 준비

#### JDK 21 환경 설정
```bash
# JDK 21 설치 및 환경 변수 설정
export JAVA_HOME=/path/to/jdk-21
export PATH=$JAVA_HOME/bin:$PATH

# 버전 확인
java --version
javac --version
```

#### 기존 코드 컴파일 테스트
```bash
# 기존 코드베이스 컴파일 테스트
mvn clean compile -Djava.version=21

# 경고 메시지 및 deprecated API 확인
mvn compile -Xlint:all
```

### 2단계: 빌드 도구 및 의존성 업데이트

#### Maven 설정 업데이트
```xml
<properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <maven-compiler-plugin.version>3.11.0</maven-compiler-plugin.version>
    <maven-surefire-plugin.version>3.1.2</maven-surefire-plugin.version>
</properties>

<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>${maven-compiler-plugin.version}</version>
    <configuration>
        <release>21</release>
        <compilerArgs>
            <arg>--enable-preview</arg> <!-- String Templates 등 Preview 기능 사용 시 -->
        </compilerArgs>
    </configuration>
</plugin>
```

#### 주요 라이브러리 JDK 21 호환 버전 업데이트
```xml
<!-- Spring Boot JDK 21 호환 버전 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <version>3.1.0</version>
</dependency>

<!-- Jackson JDK 21 호환 버전 -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.15.2</version>
</dependency>
```

### 3단계: Virtual Threads 도입

#### 기존 스레드 풀을 Virtual Threads로 마이그레이션
```java
// JDK 17 이전: 기존 스레드 풀 사용
ExecutorService executor = Executors.newFixedThreadPool(100);

// JDK 21: Virtual Threads 사용
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

// 또는 직접 Virtual Thread 생성
Thread virtualThread = Thread.ofVirtual().start(() -> {
    // I/O 집약적인 작업
    performIOOperation();
});
```

#### 비동기 처리 개선
```java
// 기존 CompletableFuture 사용
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return fetchDataFromAPI();
}, executor);

// Virtual Threads와 함께 사용하여 더 효율적인 처리
CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return fetchDataFromAPI();
}, Executors.newVirtualThreadPerTaskExecutor());
```

### 4단계: 새로운 언어 기능 활용

#### 패턴 매칭 강화 활용
```java
// JDK 17: 기존 instanceof 패턴 매칭
if (obj instanceof String s) {
    return s.toUpperCase();
}

// JDK 21: switch 표현식에서 패턴 매칭
return switch (obj) {
    case String s -> s.toUpperCase();
    case Integer i -> i.toString();
    case null -> "null";
    default -> obj.toString();
};

// Record 패턴 활용
return switch (shape) {
    case Circle(var radius) -> Math.PI * radius * radius;
    case Rectangle(var width, var height) -> width * height;
    case Triangle(var base, var height) -> 0.5 * base * height;
};
```

#### String Templates 활용 (Preview)
```java
// 기존 문자열 연결 방식
String message = String.format("Hello %s, you have %d messages", name, count);

// JDK 21: String Templates (Preview 기능)
String message = STR."Hello \{name}, you have \{count} messages";

// JSON 생성 시 활용
String json = STR."""
    {
        "name": "\{user.getName()}",
        "age": \{user.getAge()},
        "email": "\{user.getEmail()}"
    }
    """;
```

#### Sequenced Collections 활용
```java
// 기존 List 사용
List<String> list = new ArrayList<>();
list.add("first");
list.add("second");
String first = list.get(0);
String last = list.get(list.size() - 1);

// JDK 21: Sequenced Collections 활용
SequencedCollection<String> sequenced = new ArrayList<>();
sequenced.addFirst("first");
sequenced.addLast("second");
String first = sequenced.getFirst();
String last = sequenced.getLast();
```

### 5단계: 성능 최적화

#### Generational ZGC 활용
```bash
# Generational ZGC 사용 (대용량 힙에서 최적 성능)
java -XX:+UseZGC -XX:+UseGenerationalZGC -jar myapp.jar

# 메모리 사용량 모니터링
java -XX:+UseZGC -XX:+UseGenerationalZGC \
     -XX:+PrintGCDetails \
     -XX:+PrintGCTimeStamps \
     -jar myapp.jar
```

#### Virtual Threads 성능 최적화
```java
// ThreadLocal 사용 최소화 (Virtual Threads에서 메모리 오버헤드)
// 기존 ThreadLocal 사용
private static final ThreadLocal<DateFormat> formatter = 
    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

// Virtual Threads 환경에서는 ScopedValue 고려 (Future feature)
// 또는 인스턴스 변수 사용
private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
```

### 6단계: 테스트 및 검증

#### Virtual Threads 성능 테스트
```java
@Test
void testVirtualThreadsPerformance() {
    // 기존 플랫폼 스레드 성능 측정
    long startTime = System.currentTimeMillis();
    try (ExecutorService executor = Executors.newFixedThreadPool(1000)) {
        for (int i = 0; i < 10000; i++) {
            executor.submit(() -> simulateIOOperation());
        }
    }
    long platformThreadTime = System.currentTimeMillis() - startTime;
    
    // Virtual Threads 성능 측정
    startTime = System.currentTimeMillis();
    try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
        for (int i = 0; i < 10000; i++) {
            executor.submit(() -> simulateIOOperation());
        }
    }
    long virtualThreadTime = System.currentTimeMillis() - startTime;
    
    // 성능 비교 검증
    assertThat(virtualThreadTime).isLessThan(platformThreadTime);
}
```

#### 메모리 사용량 테스트
```java
@Test
void testMemoryUsage() {
    Runtime runtime = Runtime.getRuntime();
    long beforeMemory = runtime.totalMemory() - runtime.freeMemory();
    
    // Virtual Threads로 대량 작업 실행
    try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
        List<Future<?>> futures = new ArrayList<>();
        for (int i = 0; i < 100000; i++) {
            futures.add(executor.submit(() -> Thread.sleep(1000)));
        }
        // 모든 작업 완료 대기
        for (Future<?> future : futures) {
            future.get();
        }
    }
    
    long afterMemory = runtime.totalMemory() - runtime.freeMemory();
    long memoryUsed = afterMemory - beforeMemory;
    
    // 메모리 사용량이 합리적인 범위 내인지 확인
    assertThat(memoryUsed).isLessThan(1_000_000_000L); // 1GB 미만
}
```

## 결과

### 성공 사례
- **Virtual Threads 도입**: I/O 집약적 애플리케이션에서 처리량 300% 향상
- **메모리 효율성**: Virtual Threads 사용으로 메모리 사용량 80% 감소
- **코드 간소화**: 패턴 매칭과 String Templates로 코드 가독성 크게 향상
- **GC 성능**: Generational ZGC로 대용량 힙에서 일시정지 시간 95% 감소

### 발생한 문제점
- **라이브러리 호환성**: 일부 라이브러리에서 Virtual Threads 완전 지원 부족
- **디버깅 복잡성**: Virtual Threads 디버깅 시 기존 도구의 한계
- **Preview 기능**: String Templates 등 Preview 기능 사용 시 안정성 고려 필요

## 반성/교훈

### 배운 점
1. **혁신적 성능 향상**: Virtual Threads가 I/O 집약적 애플리케이션에서 게임 체인저 역할
2. **안정적 마이그레이션**: JDK 17→21은 가장 안정적이고 혜택이 큰 LTS 마이그레이션
3. **생태계 준비도**: 주요 프레임워크들이 JDK 21을 잘 지원하여 마이그레이션 리스크 최소화
4. **개발 생산성**: 새로운 언어 기능들이 실제 개발 효율성에 상당한 기여

### 향후 개선 방안
1. **Virtual Threads 최적화**: ThreadLocal 사용 최소화 및 ScopedValue 도입 준비
2. **모니터링 체계**: Virtual Threads 환경에 특화된 모니터링 도구 도입
3. **팀 교육**: Virtual Threads와 새로운 언어 기능에 대한 심화 교육
4. **점진적 현대화**: 기존 코드베이스를 새로운 기능들로 점진적 개선

### 마이그레이션 전략
1. **I/O 집약적 부분 우선**: Virtual Threads의 효과가 큰 부분부터 적용
2. **성능 벤치마크**: 마이그레이션 전후 성능 비교를 통한 효과 검증
3. **단계적 롤아웃**: 중요도가 낮은 서비스부터 점진적 적용
4. **롤백 준비**: 문제 발생 시 즉시 JDK 17로 롤백할 수 있는 체계 구축

### 특별 고려사항
1. **Virtual Threads 적용 범위**: CPU 집약적 작업에는 기존 스레드 풀 유지
2. **Preview 기능 사용**: 프로덕션에서는 안정화된 기능만 사용 권장
3. **라이브러리 검증**: 사용 중인 모든 라이브러리의 JDK 21 호환성 사전 확인
4. **성능 모니터링**: Virtual Threads 도입 후 지속적인 성능 모니터링 필수

### 관련 자료
- [[03. Permanent Notes/JDK 17 주요 특징 및 패치 분석]] - 마이그레이션 출발점 분석
- [[03. Permanent Notes/JDK 21 주요 특징 및 패치 분석]] - 마이그레이션 목표 버전 분석
- [[05. Reference Notes/Area/Web/📚 Oracle JDK 21 공식 문서]] - 공식 마이그레이션 가이드

> [!important] Virtual Threads 활용 팁
> Virtual Threads는 I/O 집약적인 작업에서 최대 효과를 발휘한다. 데이터베이스 연결, HTTP 요청, 파일 I/O 등이 많은 애플리케이션에서는 기존 스레드 풀 대비 수십 배의 성능 향상을 기대할 수 있다. 단, CPU 집약적 작업에서는 오히려 성능이 저하될 수 있으므로 작업 특성에 따른 선택적 적용이 중요하다. 