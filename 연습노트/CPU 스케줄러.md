---
tags:
  - OS
  - Process
  - CPU
aliases:
  - CPU Scheduler
---
작성 날짜: 2024-01-16
작성 시간: 19:45

## 주제: #미완 #OS #Process #CPU 

----
## 내용(Content)
### CPU Scheduler
CPU 스케줄러는 CPU에서 실행될 프로세스를 선택하는 역할을 수행한다.

![[프로세스 상태 전이도(draw)|700]]

자세히 알고 싶으면 [[프로세스 상태 전이]] 보자

조금 더 그림을 통해 자세히 설명하면 CPU 스케줄러는 Ready 상태의 프로세스가 들어있는 Ready Queue에서 다음에 실행해야 할 프로세스를 선택하는 역할을 수행한다.

### Dispatcher
ready에서 프로세스가 running 상태로 바뀌는 것을 Dispatch라고 하는데 이때 Dispatcher가 여러 역할을 수행한다.

- Context Switching
- Kernel -> User mode 전환

>[!summary] dispatcher
>선택된 프로세스에게 CPU를 할당하는 역할

### 선점/비선점 방식

>![summary]
## 질문 & 확장

(없음)

## 출처(링크)
- https://www.youtube.com/watch?v=LgEY4ghpTJI

## 연결 노트










