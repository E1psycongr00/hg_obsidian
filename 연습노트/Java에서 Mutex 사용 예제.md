---
tags:
  - JAVA
  - OS
  - Process
  - Synchronization
aliases:
---
작성 날짜: 2024-01-16
작성 시간: 20:28

## 주제: #미완 #솔루션 #JAVA #OS #Process #Synchronization 

----

## 문제&원인
### 동시에 여러 쓰레드가 공유 자원에 접근할 때 문제점 예시
```java
public class SequentialGenerator {  
    private int currentValue = 0;  
  
    public int getNextSequence() {  
       currentValue++;  
       return currentValue;  
    }  
}
```

getNextSequence 메서드를 호출할 때마다 내부적으로 공유 자원이 올라가는 클래스를 하나 정의하자. 이것을 이용해 여러 쓰레드가 해당 임계영역을 접근하는 테스트 코드를 짜보자

```java
class SequentialGeneratorTest {  
  
    @RepeatedTest(3)  
    @DisplayName("race condition이 주어졌을 때 안전하지 않은 SequenceGenerator 사용시 예측하지 못한 결과가 나온다")  
    void shouldUnExpectedResultWhenUseUnsafeSequenceGenerator() throws ExecutionException, InterruptedException {  
       SequentialGenerator generator = new SequentialGenerator();  
       Set<Integer> uniqueSequences = getUniqueSequences(generator, 1000);  
       assertEquals(1000, uniqueSequences.size());  
    }  
  
    private Set<Integer> getUniqueSequences(SequentialGenerator generator, int count) throws  
       ExecutionException,  
       InterruptedException {  
       ExecutorService executor = Executors.newFixedThreadPool(3);  
       Set<Integer> uniqueSequences = new LinkedHashSet<>();  
       List<Future<Integer>> futures = new ArrayList<>();  
  
       for (int i = 0; i < count; i++) {  
          futures.add(executor.submit(generator::getNextSequence));  
       }  
  
       for (Future<Integer> future : futures) {  
          uniqueSequences.add(future.get());  
       }  
       executor.awaitTermination(1, TimeUnit.SECONDS);  
       executor.shutdown();  
  
       return uniqueSequences;  
    }  
}
```
## 내용(Content)
### 뮤텍스 기법 사용 이유
[[뮤텍스(Mutex)]] 참고하자

다중 스레드 방식을 사용하다보면 동시에 여러 스레드가 공유 리소스에 액세스하면 안되는 상황이 발생할 수 있다. 이런 경우에 Mutex 기법을 활용할 수 있다.







## 질문 & 확장

(없음)

## 출처(링크)
- https://taeyoungcoding.tistory.com/346#:~:text=Mutex%EB%9E%80%20'Mutual%20Exclusion'%EC%9D%98%20%EC%95%BD%EC%9E%90%EB%A1%9C%2C%20%ED%95%9C%20%EB%B2%88%EC%97%90%20%ED%95%98%EB%82%98%EC%9D%98,%ED%95%A0%20%EB%95%8C%20%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94%20%EA%B2%BD%EC%9F%81%20%EC%A1%B0%EA%B1%B4%EC%9D%84%20%EB%B0%A9%EC%A7%80%ED%95%98%EB%8A%94%EB%8D%B0%20%EC%82%AC%EC%9A%A9%EB%90%9C%EB%8B%A4.
- https://www.baeldung.com/java-mutex#bd-overview
## 연결 노트










