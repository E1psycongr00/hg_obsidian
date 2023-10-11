작성 날짜: 2023-10-11
작성 시간: 09:59

## 주제: #미완 #IT #JAVA 

----
## 원문

### Garbage Collection이란

프로그램을 개발하다 보면 유효하지 않은 메모리인 Garbage가 발생한다. C의 경우에는 직접 해제해주어야 하지만, Java의 경우에는 개발자가 직접 메모리를 해제하지 않는다. 그 이유는 JVM에 내장되어 있는 Garbage Collector가 알아서 불필요한 메모리를 정리해주기 때문이다. 

이런 GC를 공부하고 이해해야 하는 이유는, GC가 돌아갈 때는 GC 쓰레드 이외에 모든 쓰레드가 멈추기 때문이다. 이를 'stop the world'라고 부르기도 한다.

이러한 이유 때문에 GC를 최대한 적게 호출하고, 적당한 GC를 선택하는것이 stop the world 시간을 줄일 수 있고, 이는 application의 성능 향상을 기대할 수 있다.


> **GC 개발자 직접 호출 X**
> Java는 프로그램 코드에서 명시적으로 메모리를 해제하지 않는다. 가끔 명시적으로 해제하기 위해 null을 활용하는 경우가 있다. 이는 문제가 되지 않는다. 하지만 직접 GC를 호출하는 System.gc()는 시스템 성능에 직접적인 악영향을 끼칠 우려가 있다.


### Major GC와 Minor GC

JVM의 Heap 영역에는 처음 설계될 때, 다음의 2가지를 전제(Weak Generation Hypothesis)로 설계되었다.

- 대부분의 객체는 금방 접근 불가능한 상태(Unreachable)가 된다.
- 오래된 객체에서 새로운 객체 참조는 매우 적게 존재한다.

대부분의 **객체는 일회성이며, 메모리에 오랫동안 남는 경우는 드물다.** 이 가설 조건을 최대한으로 활용하기 위해서 HotSpot VM에서는 크게 2개로 물리적 공간을 나눴다. 둘로 나눈 공간이 Young과 Old 영역이다. 

![[Pasted image 20231011171224.png]]

- Young 영역(Young Generation):
	- 새롭게 생성된 객체가 할당되는 영역이다.
	- 대부분의 객체는 금방 Unreachable한 상태가 되기 때문에 많은 객체가 Young Area에서 사라진다.
	- Young 영역에서 발생하는 가비지 컬렉션을 Minor GC라 부른다.

- Old 영역(Old Generation)
	- Young 영역에서 Rechable한 상태를 유지하고 살아남은 객체가 복사되는 영역이다.
	- Young 영역보다 크게 할당되기 때문에 GC가 적게 발생한다.(GC는 공간에 데이터가 가득차면 발생)
	- Old 영역에서 일어나는 가비지 컬렉션을 Major GC라고 부른다.

Old 영역이 Young 영역보다 크게 할당되는 이유는 큰 데이터들은 바로 Old에 할당되기 때문이다.
Young 영역에는 수명이 짧은 객체만 할당되기 때문에 크게 할당될 이유가 없다.

그러나 Old 영역의 객체가 Young 영역의 객체를 참조하는 경우가 있을 수 있는데 이런 경우를 대비해서 Old 영역에는 512 byte의 Chunk(덩어리)로 되어 있는 카드 테이블을 제공한다.

![[Pasted image 20231011172103.png]]
이런 테이블이 도입된 이유는 간단하다. young 객체가 GC될 때 참조된 객체인지 판별하려고 모든 Old 영역의 객체를 탐색하는 것은 비효율적이기 때문이다. index 역할을 한다고 보면 된다.

### 가비지 컬렉션 정리

| GC종류 | Minor GC | Major GC |
| ------ | -------- | -------- |
| 대상   |          |          |
## 질문 & 확장

(없음)

## 출처(링크)
- https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html
- https://mangkyu.tistory.com/118
- https://d2.naver.com/helloworld/329631
- https://d2.naver.com/helloworld/1329
## 연결 노트










