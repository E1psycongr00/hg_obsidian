---
tags:
  - CS
  - JAVA
  - Synchronization
aliases:
---
작성 날짜: 2024-01-20
작성 시간: 19:17

## 주제: #미완 #CS #JAVA #Synchronization 

----
## 내용(Content)
### Java에서 Monitor
자바에서는 [[Monitor 동기화 메커니즘|Monitor]] 기능이 Object에 내장되어 있다. Object에는 Monitor를 활용하기 위해 3가지 메서드를 제공한다.

1. wait
2. notify == signal
3. notifyAll == broadcast

이 메서드들과 함께 상호배제를 보장하기 위해서 Synchronized 키워드와 함께 사용한다.

### Java Monitor 예제
Java Monitor 예제를 위해서 공급자-소비자 문제에서 동기화를 Monitor를 이용해 진행해보자

공급자-소비자 문제는 Bounded Buffer 문제이다. 하나의 버퍼를 두고 여러 쓰레드 입력과 여러 쓰레드 출력이 주어졌을 때 동기화 방법에 대한 문제이다.

[[Java와 함께하는 Semaphore 사용 예제]]를 보면 Bounded Buffer를 흥미롭게 해결한다. Java의 Monitor를 활용하면 더 쉽게 해결할 수 있다.




## 질문 & 확장

(없음)

## 출처(링크)
- https://hyunah-home.tistory.com/entry/Monitor%EB%9E%80
- https://coding-start.tistory.com/201

## 연결 노트
- [[Monitor 동기화 메커니즘]]









