---
tags:
  - "#OS"
  - Process
  - Thread
  - Synchronization
aliases:
  - Spin Lock
  - 스핀 락
---
작성 날짜: 2024-01-11
작성 시간: 20:01

## 주제: #미완 #OS #Synchronization 

----
## 내용(Content)
### Spin Lock이란?
다른 쓰레드가 Lock을 소유하고 있다면 그 Lock이 반환 될 때까지 계속 확인하고 기다리는 작업을 반복하는 것을 SpinLock이라고 한다.

>[!info] Lock
>Lock이란 공유 자원을 특정 스레드가 사용하고 있을 때 다른 쓰레드는 해당 공유 자원에 접근하지 못하도록 막는 작업이다.

동기화 메커니즘을 자세히 살펴보자.
먼저 쓰레드가 실행되는 동안 (CPU를 점유하는 동안) 공유 자원에 락을 걸고, 쓰레드 작업이 작업이 종료되면 
### Spin Lock의 장점과 문제점





>[!info] Race Condition(경쟁 조건)
>여러 프로세스가 공통된 공유 자원을 활용할 때
>[[race condition]]

>[!info] Critical Section(임계 영역)
>여러 스레드 또는 프로세스가 공유 자원에 접근할 수 있는 코드 영역
>ex) Race Condition이 발생할 수 있는 곳으로 두 프로세스가 동시에 접근하면 안되는 구역
>```java
>public class Counter {
>	private int cnt;
>
>	//cnt에 접근하는 임계영역	
>	public synchronized void increase() {
>		cnt++;	
>	}
>}
>```





## 질문 & 확장

(없음)

## 출처(링크)
- https://hogwart-scholars.tistory.com/entry/OS-Spin-Lock-%EC%8A%A4%ED%95%80%EB%9D%BD%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90#Critical%20Section%20(%EC%9E%84%EA%B3%84%20%EC%98%81%EC%97%AD)-1

## 연결 노트










