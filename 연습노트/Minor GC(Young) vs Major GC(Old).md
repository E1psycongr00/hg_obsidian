작성 날짜: 2023-10-11
작성 시간: 17:30

## 주제: #미완

----
## 원문
Minor GC는 Young 영역에서 일어난 GC, Major GC는 Old 영역에서 일어나는 GC이다. 2개의 GC가 어떻게 다른지 살펴보자

### Minor GC 동작 과정
가장 먼저 할당되는 곳은 Young Generation 영역이다.  Young 영역은 3가지 영역으로 분리할 수 있다.

- Eden 영역
- Survivor 영역(2개)

각 영역에 따라 GC 절차 과정을 서술하면 다음과 같다.
![[Pasted image 20231011173346.png]]

1. 새로 생성된 대부분의 객체는 Eden 영역에 저장된다.
2. Eden 영역에서 GC가 한번 발생한 이후 살아남은 객체는 Survivor 영역으로 이동한다.
3. Eden 영역에서 GC가 발생할 때 살아 나은 객체는 계속해서 Survivor 영역에 쌓인다.
4. 가득 찬 Survivor 영역은 다른 Survivor 영역으로 이동하고, 가득 찬 Survivor 영역은 비워준다.
5. 옮겨준 Survivor에서도 계속해서 살아남은 객체는 Old 영역으로 이동한다.


### HotSpot VM의 Minor GC 최적화
빠른 속도로 GC를 수행하기 위해서 빠른 메모리 할당이 필요하다. 이 때 두 가지 기술을 사용하는데 하나는 bump the pointer, 다른 하나는 TLABs(Thread Local Allocation Buffer)이다.

#### Bump The Pointer
Eden 영역에 마지막으로 할당된 객체의 주소를 캐싱해두는 것이다. 이를 통해 새로운 객체를 위해 유효한 메모리를 탐색할 필요 없이 마지막 주소의 다음 주소를 사용하게 함으로써 속도를 높이고 있다. 이를 통해 새로운 객체를 할당할 때 객체의 크기가 Eden 영역에 적합한지만 판별하면 되므로 빠르게 메모리 할당을 할 수 있다.

하지만 문제는 멀티쓰레드의 경우이다. 이 경우 Eden 영역에 할당할 때 Lock을 걸어 동기화해야 하는데, 이것이 메모리 할당을 더 오래 걸리게 만들 수 있다.

#### TLABs(Thread Local Allocation Buffers)

## 질문 & 확장

(없음)

## 출처(링크)
- https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html
- https://mangkyu.tistory.com/118
- https://d2.naver.com/helloworld/329631
- https://d2.naver.com/helloworld/1329

## 연결 노트










