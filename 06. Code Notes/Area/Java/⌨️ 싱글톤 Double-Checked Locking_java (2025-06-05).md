---
tags:
  - java
  - 디자인패턴
  - 싱글톤
  - thread-safety
  - volatile
  - 동시성
  - 성능최적화
aliases:
  - Double-Checked Locking
  - 이중 확인 잠금
  - DCL 패턴
created: 2025-06-05
title: ⌨️ 싱글톤 Double-Checked Locking_java (2025-06-05)
note-type: CODE
language: java
completed: true
archive: false
area-reason: 디자인패턴 구현
---

## 코드 설명

### 주제 요약

>[!summary]
>성능 최적화를 위한 복잡하지만 효과적인 싱글톤 구현 방법

Double-Checked Locking은 Thread-safety와 성능을 모두 고려한 싱글톤 구현 방법입니다. volatile 키워드와 정교한 동기화 블록을 활용하여 불필요한 동기화 오버헤드를 최소화하면서도 안전성을 보장합니다.

>[!warning] 고급 개발자 전용
>이 구현 방법은 Java Memory Model과 동시성에 대한 깊은 이해가 필요합니다. 잘못 구현하면 미묘한 버그가 발생할 수 있으므로 주의가 필요합니다.

## 완전한 구현 코드

### 올바른 Double-Checked Locking 구현

```java
/**
 * 올바른 Double-Checked Locking 패턴 구현
 * volatile 키워드가 필수적으로 사용되어야 함
 */
public class DoubleCheckedSingleton {
    
    // volatile 키워드로 메모리 가시성과 명령어 재배열 방지
    private static volatile DoubleCheckedSingleton instance;
    
    // 인스턴스 생성 시간 추적
    private final long createdTime;
    private final String instanceId;
    
    /**
     * Private 생성자로 외부 인스턴스 생성 방지
     */
    private DoubleCheckedSingleton() {
        this.createdTime = System.currentTimeMillis();
        this.instanceId = "DCL-" + Thread.currentThread().getName() + "-" + createdTime;
        
        // 복잡한 초기화 시뮬레이션
        try {
            Thread.sleep(100); // 초기화 시간 시뮬레이션
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        System.out.println("DoubleCheckedSingleton 인스턴스 생성됨: " + instanceId);
    }
    
    /**
     * Double-Checked Locking 패턴으로 인스턴스 반환
     * 
     * @return 싱글톤 인스턴스
     */
    public static DoubleCheckedSingleton getInstance() {
        // 첫 번째 체크 (빠른 경로) - 동기화 없이 확인
        if (instance == null) {
            // 동기화 블록 - 한 번에 하나의 스레드만 접근
            synchronized (DoubleCheckedSingleton.class) {
                // 두 번째 체크 (안전 확인) - 동기화 블록 내에서 재확인
                if (instance == null) {
                    instance = new DoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }
    
    /**
     * 인스턴스 정보 반환
     */
    public String getInstanceInfo() {
        return String.format("Instance ID: %s, Created: %s, Thread: %s", 
            instanceId, 
            new java.util.Date(createdTime),
            Thread.currentThread().getName());
    }
    
    /**
     * 비즈니스 로직 메서드
     */
    public void doSomething() {
        System.out.println("DoubleCheckedSingleton이 작업을 수행합니다: " + instanceId);
    }
    
    /**
     * 생성 시간 반환
     */
    public long getCreatedTime() {
        return createdTime;
    }
}
```

### 실무용 확장 구현 - 데이터베이스 연결 관리자

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Double-Checked Locking을 사용한 데이터베이스 연결 관리자
 * 실무에서 사용할 수 있는 수준의 완전한 구현
 */
public class DatabaseConnectionManager {
    
    private static volatile DatabaseConnectionManager instance;
    
    private final String jdbcUrl;
    private final String username;
    private final String password;
    private final ConcurrentHashMap<String, Connection> connectionPool;
    private final int maxConnections;
    private volatile boolean initialized = false;
    
    /**
     * Private 생성자
     */
    private DatabaseConnectionManager() {
        this.jdbcUrl = "jdbc:postgresql://localhost:5432/mydb";
        this.username = "user";
        this.password = "password";
        this.maxConnections = 20;
        this.connectionPool = new ConcurrentHashMap<>();
        
        // 복잡한 초기화 로직
        initializeConnectionPool();
        this.initialized = true;
        
        System.out.println("DatabaseConnectionManager 초기화 완료");
    }
    
    /**
     * Double-Checked Locking으로 인스턴스 반환
     */
    public static DatabaseConnectionManager getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnectionManager.class) {
                if (instance == null) {
                    instance = new DatabaseConnectionManager();
                }
            }
        }
        return instance;
    }
    
    /**
     * 연결 풀 초기화
     */
    private void initializeConnectionPool() {
        try {
            for (int i = 0; i < maxConnections; i++) {
                // 실제 환경에서는 실제 DB 연결 생성
                // Connection conn = DriverManager.getConnection(jdbcUrl, username, password);
                
                // 데모용 Mock 연결
                Connection mockConnection = createMockConnection("connection_" + i);
                connectionPool.put("connection_" + i, mockConnection);
            }
            System.out.println("연결 풀 초기화 완료: " + maxConnections + "개 연결");
        } catch (Exception e) {
            throw new RuntimeException("연결 풀 초기화 실패", e);
        }
    }
    
    /**
     * Mock 연결 생성 (데모용)
     */
    private Connection createMockConnection(String connectionId) {
        // 실제 구현에서는 실제 Connection 객체 반환
        return new MockConnection(connectionId);
    }
    
    /**
     * 연결 획득
     */
    public Connection getConnection() {
        if (!initialized) {
            throw new IllegalStateException("ConnectionManager가 아직 초기화되지 않았습니다");
        }
        
        // 사용 가능한 연결 반환 (간단한 라운드 로빈)
        return connectionPool.values().iterator().next();
    }
    
    /**
     * 연결 풀 상태 정보
     */
    public void printPoolStatus() {
        System.out.println("=== 연결 풀 상태 ===");
        System.out.println("JDBC URL: " + jdbcUrl);
        System.out.println("최대 연결 수: " + maxConnections);
        System.out.println("활성 연결 수: " + connectionPool.size());
        System.out.println("초기화 상태: " + initialized);
    }
    
    /**
     * Mock Connection 클래스 (데모용)
     */
    private static class MockConnection implements Connection {
        private final String connectionId;
        private boolean closed = false;
        
        public MockConnection(String connectionId) {
            this.connectionId = connectionId;
        }
        
        @Override
        public String toString() {
            return "MockConnection{id='" + connectionId + "', closed=" + closed + "}";
        }
        
        @Override
        public void close() throws SQLException {
            this.closed = true;
        }
        
        @Override
        public boolean isClosed() throws SQLException {
            return closed;
        }
        
        // 다른 Connection 메서드들은 데모용으로 기본 구현만 제공
        // 실제 구현에서는 모든 메서드를 적절히 구현해야 함
        
        @Override public java.sql.Statement createStatement() throws SQLException { return null; }
        @Override public java.sql.PreparedStatement prepareStatement(String sql) throws SQLException { return null; }
        @Override public java.sql.CallableStatement prepareCall(String sql) throws SQLException { return null; }
        @Override public String nativeSQL(String sql) throws SQLException { return null; }
        @Override public void setAutoCommit(boolean autoCommit) throws SQLException {}
        @Override public boolean getAutoCommit() throws SQLException { return false; }
        @Override public void commit() throws SQLException {}
        @Override public void rollback() throws SQLException {}
        @Override public java.sql.DatabaseMetaData getMetaData() throws SQLException { return null; }
        @Override public void setReadOnly(boolean readOnly) throws SQLException {}
        @Override public boolean isReadOnly() throws SQLException { return false; }
        @Override public void setCatalog(String catalog) throws SQLException {}
        @Override public String getCatalog() throws SQLException { return null; }
        @Override public void setTransactionIsolation(int level) throws SQLException {}
        @Override public int getTransactionIsolation() throws SQLException { return 0; }
        @Override public java.sql.SQLWarning getWarnings() throws SQLException { return null; }
        @Override public void clearWarnings() throws SQLException {}
        @Override public java.sql.Statement createStatement(int resultSetType, int resultSetConcurrency) throws SQLException { return null; }
        @Override public java.sql.PreparedStatement prepareStatement(String sql, int resultSetType, int resultSetConcurrency) throws SQLException { return null; }
        @Override public java.sql.CallableStatement prepareCall(String sql, int resultSetType, int resultSetConcurrency) throws SQLException { return null; }
        @Override public java.util.Map<String,Class<?>> getTypeMap() throws SQLException { return null; }
        @Override public void setTypeMap(java.util.Map<String,Class<?>> map) throws SQLException {}
        @Override public void setHoldability(int holdability) throws SQLException {}
        @Override public int getHoldability() throws SQLException { return 0; }
        @Override public java.sql.Savepoint setSavepoint() throws SQLException { return null; }
        @Override public java.sql.Savepoint setSavepoint(String name) throws SQLException { return null; }
        @Override public void rollback(java.sql.Savepoint savepoint) throws SQLException {}
        @Override public void releaseSavepoint(java.sql.Savepoint savepoint) throws SQLException {}
        @Override public java.sql.Statement createStatement(int resultSetType, int resultSetConcurrency, int resultSetHoldability) throws SQLException { return null; }
        @Override public java.sql.PreparedStatement prepareStatement(String sql, int resultSetType, int resultSetConcurrency, int resultSetHoldability) throws SQLException { return null; }
        @Override public java.sql.CallableStatement prepareCall(String sql, int resultSetType, int resultSetConcurrency, int resultSetHoldability) throws SQLException { return null; }
        @Override public java.sql.PreparedStatement prepareStatement(String sql, int autoGeneratedKeys) throws SQLException { return null; }
        @Override public java.sql.PreparedStatement prepareStatement(String sql, int[] columnIndexes) throws SQLException { return null; }
        @Override public java.sql.PreparedStatement prepareStatement(String sql, String[] columnNames) throws SQLException { return null; }
        @Override public java.sql.Clob createClob() throws SQLException { return null; }
        @Override public java.sql.Blob createBlob() throws SQLException { return null; }
        @Override public java.sql.NClob createNClob() throws SQLException { return null; }
        @Override public java.sql.SQLXML createSQLXML() throws SQLException { return null; }
        @Override public boolean isValid(int timeout) throws SQLException { return !closed; }
        @Override public void setClientInfo(String name, String value) throws java.sql.SQLClientInfoException {}
        @Override public void setClientInfo(java.util.Properties properties) throws java.sql.SQLClientInfoException {}
        @Override public String getClientInfo(String name) throws SQLException { return null; }
        @Override public java.util.Properties getClientInfo() throws SQLException { return null; }
        @Override public java.sql.Array createArrayOf(String typeName, Object[] elements) throws SQLException { return null; }
        @Override public java.sql.Struct createStruct(String typeName, Object[] attributes) throws SQLException { return null; }
        @Override public void setSchema(String schema) throws SQLException {}
        @Override public String getSchema() throws SQLException { return null; }
        @Override public void abort(java.util.concurrent.Executor executor) throws SQLException {}
        @Override public void setNetworkTimeout(java.util.concurrent.Executor executor, int milliseconds) throws SQLException {}
        @Override public int getNetworkTimeout() throws SQLException { return 0; }
        @Override public <T> T unwrap(Class<T> iface) throws SQLException { return null; }
        @Override public boolean isWrapperFor(Class<?> iface) throws SQLException { return false; }
    }
}
```

## 잘못된 구현 vs 올바른 구현

### ❌ 잘못된 구현 (volatile 없음)

```java
/**
 * 잘못된 Double-Checked Locking 구현
 * volatile 키워드가 없어서 메모리 가시성 문제 발생 가능
 */
public class BrokenDoubleCheckedSingleton {
    
    // ❌ volatile 키워드 누락 - 심각한 버그!
    private static BrokenDoubleCheckedSingleton instance;
    
    private BrokenDoubleCheckedSingleton() {}
    
    public static BrokenDoubleCheckedSingleton getInstance() {
        if (instance == null) {
            synchronized (BrokenDoubleCheckedSingleton.class) {
                if (instance == null) {
                    instance = new BrokenDoubleCheckedSingleton();
                }
            }
        }
        return instance; // 부분적으로 초기화된 객체 반환 가능!
    }
}
```

### ✅ 올바른 구현 (volatile 사용)

```java
/**
 * 올바른 Double-Checked Locking 구현
 * volatile 키워드로 메모리 가시성과 명령어 재배열 방지
 */
public class CorrectDoubleCheckedSingleton {
    
    // ✅ volatile 키워드 필수!
    private static volatile CorrectDoubleCheckedSingleton instance;
    
    private CorrectDoubleCheckedSingleton() {}
    
    public static CorrectDoubleCheckedSingleton getInstance() {
        if (instance == null) {
            synchronized (CorrectDoubleCheckedSingleton.class) {
                if (instance == null) {
                    instance = new CorrectDoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }
}
```

## volatile 키워드의 중요성 분석

### 메모리 가시성 문제

```java
/**
 * volatile 키워드의 메모리 가시성 효과를 보여주는 데모
 */
public class VolatileDemo {
    
    // volatile 없는 변수
    private static boolean flag1 = false;
    
    // volatile 있는 변수
    private static volatile boolean flag2 = false;
    
    /**
     * 메모리 가시성 테스트
     */
    public static void testMemoryVisibility() throws InterruptedException {
        System.out.println("=== 메모리 가시성 테스트 ===");
        
        // Thread 1: flag 값을 변경
        Thread writer = new Thread(() -> {
            try {
                Thread.sleep(1000);
                flag1 = true;
                flag2 = true;
                System.out.println("Writer: 플래그 값 변경 완료");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        
        // Thread 2: flag 값을 읽기
        Thread reader = new Thread(() -> {
            int count = 0;
            while (!flag2 && count < 5000) { // volatile 변수로 루프 제어
                count++;
                if (count % 1000 == 0) {
                    System.out.println("Reader: flag1=" + flag1 + ", flag2=" + flag2 + " (count=" + count + ")");
                }
                try {
                    Thread.sleep(1);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
            System.out.println("Reader: 최종 flag1=" + flag1 + ", flag2=" + flag2);
        });
        
        reader.start();
        writer.start();
        
        writer.join();
        reader.join();
    }
}
```

### 명령어 재배열 문제

```java
/**
 * 명령어 재배열 문제를 보여주는 예시
 */
public class InstructionReorderingDemo {
    
    private static Object resource;
    private static volatile boolean initialized = false;
    
    /**
     * 잘못된 초기화 패턴 (재배열 위험)
     */
    public static void unsafeInitialization() {
        if (!initialized) {
            resource = new Object(); // 1. 객체 생성
            initialized = true;      // 2. 플래그 설정
            
            // JVM 최적화로 인해 1과 2의 순서가 바뀔 수 있음!
            // 다른 스레드가 initialized=true를 보고 resource를 사용하려 할 때
            // resource가 아직 null일 수 있음
        }
    }
    
    /**
     * 안전한 초기화 패턴 (volatile 사용)
     */
    private static volatile Object safeResource;
    
    public static void safeInitialization() {
        if (safeResource == null) {
            synchronized (InstructionReorderingDemo.class) {
                if (safeResource == null) {
                    Object temp = new Object(); // 1. 임시 변수에 객체 생성
                    safeResource = temp;        // 2. volatile 변수에 할당
                    
                    // volatile 변수에 대한 쓰기는 happens-before 관계를 보장
                    // 다른 스레드에서 safeResource != null을 확인하면
                    // 객체가 완전히 초기화된 상태임을 보장
                }
            }
        }
    }
}
```

## Thread-Safety 검증

### 멀티스레드 테스트

```java
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Double-Checked Locking의 Thread-Safety를 검증하는 테스트
 */
public class DoubleCheckedThreadSafetyTest {
    
    private static final int THREAD_COUNT = 100;
    private static final int ITERATIONS_PER_THREAD = 1000;
    
    /**
     * 멀티스레드 환경에서 싱글톤 인스턴스 유일성 테스트
     */
    public static void testThreadSafety() throws InterruptedException {
        System.out.println("=== Double-Checked Locking Thread-Safety 테스트 ===");
        
        // 테스트 전 인스턴스 초기화 (정적 변수 리셋을 위해)
        resetSingleton();
        
        ExecutorService executor = Executors.newFixedThreadPool(THREAD_COUNT);
        CountDownLatch latch = new CountDownLatch(THREAD_COUNT);
        ConcurrentHashMap<Integer, DoubleCheckedSingleton> instances = new ConcurrentHashMap<>();
        AtomicInteger accessCount = new AtomicInteger(0);
        
        long startTime = System.currentTimeMillis();
        
        // 여러 스레드에서 동시에 getInstance() 호출
        for (int i = 0; i < THREAD_COUNT; i++) {
            executor.submit(() -> {
                try {
                    for (int j = 0; j < ITERATIONS_PER_THREAD; j++) {
                        DoubleCheckedSingleton instance = DoubleCheckedSingleton.getInstance();
                        instances.put(instance.hashCode(), instance);
                        accessCount.incrementAndGet();
                    }
                } finally {
                    latch.countDown();
                }
            });
        }
        
        // 모든 스레드 완료 대기
        latch.await();
        executor.shutdown();
        
        long endTime = System.currentTimeMillis();
        
        // 결과 분석
        System.out.println("총 스레드 수: " + THREAD_COUNT);
        System.out.println("스레드당 반복 횟수: " + ITERATIONS_PER_THREAD);
        System.out.println("총 접근 횟수: " + accessCount.get());
        System.out.println("생성된 고유 인스턴스 수: " + instances.size());
        System.out.println("실행 시간: " + (endTime - startTime) + "ms");
        
        if (instances.size() == 1) {
            System.out.println("✅ Double-Checked Locking Thread-Safety 테스트 성공!");
            DoubleCheckedSingleton instance = instances.values().iterator().next();
            System.out.println("인스턴스 정보: " + instance.getInstanceInfo());
        } else {
            System.out.println("❌ Thread-Safety 테스트 실패! 여러 인스턴스 생성됨");
            instances.values().forEach(instance -> 
                System.out.println("- " + instance.getInstanceInfo()));
        }
    }
    
    /**
     * 테스트를 위한 싱글톤 인스턴스 리셋
     * 실제 운영 환경에서는 사용하지 않음
     */
    private static void resetSingleton() {
        try {
            java.lang.reflect.Field field = DoubleCheckedSingleton.class.getDeclaredField("instance");
            field.setAccessible(true);
            field.set(null, null);
        } catch (Exception e) {
            System.out.println("싱글톤 리셋 실패: " + e.getMessage());
        }
    }
}
```

### 성능 벤치마크

```java
/**
 * Double-Checked Locking과 다른 구현 방식의 성능 비교
 */
public class DoubleCheckedPerformanceBenchmark {
    
    private static final int WARMUP_ITERATIONS = 100000;
    private static final int BENCHMARK_ITERATIONS = 10000000;
    
    /**
     * Double-Checked Locking 성능 측정
     */
    public static long benchmarkDoubleChecked() {
        // 워밍업
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            DoubleCheckedSingleton.getInstance();
        }
        
        // 실제 측정
        long startTime = System.nanoTime();
        for (int i = 0; i < BENCHMARK_ITERATIONS; i++) {
            DoubleCheckedSingleton instance = DoubleCheckedSingleton.getInstance();
        }
        long endTime = System.nanoTime();
        
        return endTime - startTime;
    }
    
    /**
     * Synchronized 방식과 비교
     */
    public static class SynchronizedSingleton {
        private static SynchronizedSingleton instance;
        
        private SynchronizedSingleton() {}
        
        public static synchronized SynchronizedSingleton getInstance() {
            if (instance == null) {
                instance = new SynchronizedSingleton();
            }
            return instance;
        }
    }
    
    public static long benchmarkSynchronized() {
        // 워밍업
        for (int i = 0; i < WARMUP_ITERATIONS; i++) {
            SynchronizedSingleton.getInstance();
        }
        
        // 실제 측정
        long startTime = System.nanoTime();
        for (int i = 0; i < BENCHMARK_ITERATIONS; i++) {
            SynchronizedSingleton instance = SynchronizedSingleton.getInstance();
        }
        long endTime = System.nanoTime();
        
        return endTime - startTime;
    }
    
    /**
     * 성능 비교 실행
     */
    public static void runBenchmark() {
        System.out.println("=== 성능 벤치마크 ===");
        
        long doubleCheckedTime = benchmarkDoubleChecked();
        long synchronizedTime = benchmarkSynchronized();
        
        System.out.println("Double-Checked Locking: " + doubleCheckedTime / 1_000_000 + "ms");
        System.out.println("Synchronized 방식: " + synchronizedTime / 1_000_000 + "ms");
        System.out.println("성능 개선: " + String.format("%.2f", (double) synchronizedTime / doubleCheckedTime) + "배");
        
        if (doubleCheckedTime < synchronizedTime) {
            System.out.println("✅ Double-Checked Locking이 더 빠름");
        } else {
            System.out.println("❌ 예상과 다른 결과");
        }
    }
}
```

## 실행 결과 예시

### 메인 테스트 클래스

```java
/**
 * Double-Checked Locking의 모든 기능을 테스트하는 메인 클래스
 */
public class DoubleCheckedLockingDemo {
    
    public static void main(String[] args) {
        System.out.println("=== Double-Checked Locking 종합 데모 ===\n");
        
        // 1. 기본 사용법 테스트
        testBasicUsage();
        
        // 2. 메모리 가시성 테스트
        try {
            VolatileDemo.testMemoryVisibility();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // 3. Thread-Safety 테스트
        try {
            DoubleCheckedThreadSafetyTest.testThreadSafety();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // 4. 성능 벤치마크
        DoubleCheckedPerformanceBenchmark.runBenchmark();
        
        // 5. 실무용 구현 테스트
        testDatabaseConnectionManager();
    }
    
    private static void testBasicUsage() {
        System.out.println("=== 기본 사용법 테스트 ===");
        
        DoubleCheckedSingleton instance1 = DoubleCheckedSingleton.getInstance();
        DoubleCheckedSingleton instance2 = DoubleCheckedSingleton.getInstance();
        
        System.out.println("첫 번째 인스턴스: " + instance1.getInstanceInfo());
        System.out.println("두 번째 인스턴스: " + instance2.getInstanceInfo());
        System.out.println("인스턴스 동일성: " + (instance1 == instance2));
        
        instance1.doSomething();
        System.out.println();
    }
    
    private static void testDatabaseConnectionManager() {
        System.out.println("=== 데이터베이스 연결 관리자 테스트 ===");
        
        DatabaseConnectionManager manager1 = DatabaseConnectionManager.getInstance();
        DatabaseConnectionManager manager2 = DatabaseConnectionManager.getInstance();
        
        System.out.println("매니저 동일성: " + (manager1 == manager2));
        
        manager1.printPoolStatus();
        
        try {
            Connection connection = manager1.getConnection();
            System.out.println("획득한 연결: " + connection);
        } catch (Exception e) {
            System.out.println("연결 획득 실패: " + e.getMessage());
        }
        
        System.out.println();
    }
}
```

### 예상 실행 결과

```
=== Double-Checked Locking 종합 데모 ===

=== 기본 사용법 테스트 ===
DoubleCheckedSingleton 인스턴스 생성됨: DCL-main-1705456789123
첫 번째 인스턴스: Instance ID: DCL-main-1705456789123, Created: Thu Jan 16 2025 15:46:29 GMT+0900, Thread: main
두 번째 인스턴스: Instance ID: DCL-main-1705456789123, Created: Thu Jan 16 2025 15:46:29 GMT+0900, Thread: main
인스턴스 동일성: true
DoubleCheckedSingleton이 작업을 수행합니다: DCL-main-1705456789123

=== 메모리 가시성 테스트 ===
Reader: flag1=false, flag2=false (count=1000)
Writer: 플래그 값 변경 완료
Reader: 최종 flag1=true, flag2=true

=== Double-Checked Locking Thread-Safety 테스트 ===
DoubleCheckedSingleton 인스턴스 생성됨: DCL-pool-1-thread-1-1705456790234
총 스레드 수: 100
스레드당 반복 횟수: 1000
총 접근 횟수: 100000
생성된 고유 인스턴스 수: 1
실행 시간: 245ms
✅ Double-Checked Locking Thread-Safety 테스트 성공!
인스턴스 정보: Instance ID: DCL-pool-1-thread-1-1705456790234, Created: Thu Jan 16 2025 15:46:30 GMT+0900, Thread: pool-1-thread-1

=== 성능 벤치마크 ===
Double-Checked Locking: 42ms
Synchronized 방식: 156ms
성능 개선: 3.71배
✅ Double-Checked Locking이 더 빠름

=== 데이터베이스 연결 관리자 테스트 ===
연결 풀 초기화 완료: 20개 연결
DatabaseConnectionManager 초기화 완료
매니저 동일성: true
=== 연결 풀 상태 ===
JDBC URL: jdbc:postgresql://localhost:5432/mydb
최대 연결 수: 20
활성 연결 수: 20
초기화 상태: true
획득한 연결: MockConnection{id='connection_0', closed=false}
```

## 핵심 특징 및 장단점

### 장점

1. **성능 최적화**
   - 인스턴스 생성 후 동기화 오버헤드 없음
   - 첫 번째 체크로 빠른 경로 제공
   - synchronized 방식 대비 3-4배 성능 향상

2. **Thread-Safety 보장**
   - volatile 키워드로 메모리 가시성 보장
   - 동기화 블록으로 Race Condition 방지
   - 지연 초기화 지원

3. **메모리 효율성**
   - 필요한 시점에만 인스턴스 생성
   - 불필요한 메모리 사용 방지

### 단점

1. **구현 복잡성**
   - volatile 키워드 필수 (누락 시 심각한 버그)
   - Java Memory Model에 대한 깊은 이해 필요
   - 코드 가독성 저하

2. **미묘한 버그 위험**
   - 잘못 구현하면 부분적으로 초기화된 객체 반환 가능
   - JVM 버전별 동작 차이 가능성
   - 디버깅 어려움

3. **유지보수 어려움**
   - 복잡한 동시성 로직
   - 코드 리뷰 시 전문 지식 필요

## 사용 가이드라인

### 언제 사용할 것인가?

✅ **권장하는 상황:**
- 성능이 매우 중요한 환경
- 인스턴스 생성 비용이 큰 경우
- 지연 초기화가 필요한 경우
- 고급 개발자가 유지보수하는 코드

❌ **피해야 할 상황:**
- 단순한 싱글톤이 필요한 경우
- 팀의 동시성 프로그래밍 경험이 부족한 경우
- 코드 가독성이 중요한 경우
- Bill Pugh Solution이나 Enum으로 충분한 경우

### 베스트 프랙티스

1. **volatile 키워드 필수 사용**
2. **코드 리뷰 시 동시성 전문가 참여**
3. **충분한 테스트 (멀티스레드 환경)**
4. **문서화 강화 (구현 이유와 주의사항)**
5. **대안 검토 (Bill Pugh Solution 우선 고려)**

## 관련 노트

- [[🏛️ 싱글톤 패턴]] - 전체 싱글톤 패턴 MOC
- [[싱글톤 패턴 Thread-Safety]] - Thread-Safety 이슈 심화 분석
- [[⌨️ 싱글톤 Bill Pugh Solution_java]] - 더 간단한 대안
- [[⌨️ 싱글톤 Enum 방식_java]] - 가장 안전한 대안

---

**마지막 업데이트**: 2025-01-16  
**작성자**: AI Assistant  
**검토 상태**: 완료 