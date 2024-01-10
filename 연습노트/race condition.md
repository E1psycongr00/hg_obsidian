---
tags:
  - OS
  - Process
  - Thread
aliases:
  - 경쟁 조건
---
작성 날짜: 2024-01-10
작성 시간: 19:45

## 주제: #미완 #OS #Process #Thread 

----
## 내용(Content)
### 정의
여러 프로세스/스레드가 동시에 같은 데이터를 조작할 때 타이밍이나 접근 순서에 따라 결과가 달라질 수 있는 상황을 말한다

### race condition이 가지는 문제점
race condition은 3가지 문제에 직면한다.
- Mutual exclusion
- deadlock
- starvation

>[!info] Mutual exclusion(상호 배제)
>두 개 이상의 프로세스가 공용 데이터에 동시에 접근하는 것을 막는 방법


>[!info] deadlock
>상호 배제시에 교착 상태에 빠질 수 있다.

## 질문 & 확장

(없음)

## 출처(링크)
- https://www.youtube.com/watch?v=vp0Gckz3z64
- https://iredays.tistory.com/125
## 연결 노트










