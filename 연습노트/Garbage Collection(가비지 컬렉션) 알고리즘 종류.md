
작성 날짜: 2023-10-11
작성 시간: 18:12

## 주제: #미완 #IT #JAVA #GC 

----
## 원문

### Serial GC
Mark and Sweep 이라는 과정으로 진행된다. Old Generation에는 Mark Sweep Compact 라는 알고리즘이 사용된다.  해당 알고리즘은 Mark Sweep에 Compact라는 작업이 추가된 것이다. Compact란 Heap 영역을 정리하기 위한 단계로 유효한 객체들이 연속되게 쌓이도록 앞 부분부터 채워서 객체가 존재하는 부분과 존재하지 않는 부분으로 나누는 것이다. 

Serial GC는 CPU 코어가 하나일 때 설계된 GC로 모든 가비지 컬렉션 일을 처리하기 위해 하나의 쓰레드만을 이용한다. 여러 CPU를 운영하는 서버의 경우에는 Serial GC는 적합하지 않다.

```
java -XX:+UseSerialGC -jar Application.java
```

### Parallel GC
Thoughtput GC로 불리기도 한다. 기본 처리 과정은 Serial GC와 동일하나 여러 쓰레드를 활용해 병렬로 GC를 처리할 수 있다는 점이 다르다. 이로써 GC의 오버헤드를 줄일 수 있다.

```
java -XX:+UseParallelGC -jar Application.java

// 사용할 쓰레드의 갯수
-XX:ParallelGCThreads=<N>

// 최대 지연 시간 
-XX:MaxGCPauseMillis=<N>
```

### Parallel Old GC

Parallel GC와 Old Generation에서 사용하는 알고리즘만 차이점이 있다. Mark And Sweep이 아닌 Mark Summary Compaction을 사용한다. sweep 보다 조금 더 복잡한 단계를 거친다고 한다.


### CMS GC (Concurrent Mark Sweep)

여러 개의 쓰레드를 활용한다. 기존의 Parallel이나 Serial GC와는 다르게 Mark Sweep 알고리즘을 Concurrent하게 수행한다.

![[Pasted image 20231016141453.png]]

Parallel의 경우 모든 쓰레드가 멈추고 병렬 쓰레드를 활용해 GC를 빠르게 처리하는 방식이라면 CMS GC는 동시에 처리하기 때문에 Application이 intial Mark 동안만 짧게 멈추고 나머지는 application thread가 정상적으로 동작하며 다흔 하나면 marking하기 위해 쓰인다. 이런 과정을 거치기 때문에 stop the world 시간이 짧아지는 장점이 있다.

그러나 단점이 있다.


## 질문 & 확장

(없음)

## 출처(링크)
- https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html
- https://mangkyu.tistory.com/118
- https://mangkyu.tistory.com/119
- https://d2.naver.com/helloworld/329631
- https://d2.naver.com/helloworld/1329

## 연결 노트










