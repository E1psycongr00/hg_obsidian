---
tags:
  - OS
  - CS
  - Synchronization
aliases:
---
작성 날짜: 2024-01-20
작성 시간: 15:31

## 주제: #미완 #CS #OS #Synchronization 

----
## 내용(Content)
### Monitor 소개
>[!summary] Monitor란
>Monotor는 mutual exclusion과 cooperation을 가진 동기화 메커니즘이다


>[!info] cooperation
>wait-set을 사용하여 스레드가 특정 조건을 충족할 때까지 기다리는 기술

[[세마포어|Semaphore]]와 비교해서 설명하자면 동기화를 위해 Semaphore를 사용하면 쓰레드 허용 갯수등 여러 부분에서 자유롭게 쓰레드 동기화를 조절할 수 있다. 그러나 자유도가 높다는 것은 큰 단점도 존재하는데 우선 여러 쓰레드를 허용 가능하기 때문에 잘못 사용하면 mutual exclusion을 충족하지 못하거나 deadlock과 같은 문제가 발생할 위험이 있다.


### Monitor 기능
모니터는 위의 정의에 따라 3가지 기능을 가진다.

- 한 번에 하나의 스레드만 중요한 코드 섹션에 상호 배타적으로 액세스할 수 있다.
- 특정 조건이 충족되기를 기다리는 동안 모니터에서 실행 중인 스레드가 차단될 수 있다.
- 하나의 스레드는 대기 중인 조건이 충족되면 다른 스레드에 알릴 수 있다.

## 질문 & 확장

(없음)

## 출처(링크)
- https://www.baeldung.com/cs/monitor
- https://hyunah-home.tistory.com/entry/Monitor%EB%9E%80
- https://www.youtube.com/watch?v=Dms1oBmRAlo&t=83s
## 연결 노트
- [[세마포어]]









