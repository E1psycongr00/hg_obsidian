---
tags:
  - 솔루션
aliases:
---
작성 날짜: 2024-01-17
작성 시간: 01:33

## 주제: #미완 #솔루션

----

## 문제 & 원인
공급자 & 소비자 구조의 자료를 구현하려고 한다. 

- 입력과 출력 모두 여러 쓰레드 요청 가능하며, 동기화가 되어야 한다.
- 데이터 입출력은 원형 큐 형태로 동작해야 한다.

여러 쓰레드가 하나의 버퍼에서 동작하게 하려면 상호 배제가 필요하다. 그 이유는 여러 쓰레드가 쓰고 읽는 과정에서 [[race condition]]]은 원치 않은 결과를 얻을 수 있기 때문이다. 그리고 입력 쓰레드와 출력 쓰레드 task를 따로 만든다면 읽고 쓰는 과정에서 실행 순서에 따라 쓰레드를 Block해야 할 수 있다. 그렇기 때문에 세마 포어를 쓰는게 좋을 것이다.

## 해결 방안
```java
public void produce(int item) throws InterruptedException {  
    empty.acquire(); // Wait for an empty slot  
  
    mutex.acquire(); // Enter Critical Section  
    buffer[in] = item;  
    in = (in + 1) % bufferSize;  
    mutex.release(); // Exit Critical Section  
  
    full.release(); // Signal that the slot is full  
  
}
```

```java
public int consume() throws InterruptedException {  
    full.acquire(); // Wait for a full slot  
  
    mutex.acquire(); // Enter Critical Section  
    int item = buffer[out];  
    out = (out + 1) % bufferSize;  
    mutex.release(); // Exit Critical Section  
  
    empty.release(); // Signal that the slot is empty  
    return item;  
}
```
## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
