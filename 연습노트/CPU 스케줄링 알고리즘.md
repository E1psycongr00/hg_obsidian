---
tags:
  - OS
  - CPU
  - Process
aliases:
---
작성 날짜: 2024-01-16
작성 시간: 21:50

## 주제: #미완 #OS #CPU #Process 

----
## 내용(Content)
스케줄러에 대해 궁금하다면 [[CPU 스케줄러]] 참고

OS마다 다를 적용하는게 다를 순 있지만 CPU가 프로세스를 스케줄링하는데 몇가지 기법이 있다.

- FCFS
- SJF(Shortest Job First)
- SRTF
- priority
- round robin
- multi level queue


### FCFS(First Come First Served)

### SJF(Sortest Job First)
프로세스의 다음 CPU Burst가 가장 짧은 프로세스부터 실행하는 알고리즘이다.

SJF에는 선점형 SJF,비선점형 SJF가 있다.

우선 SJF의 기본 원리에 대해서 알아보자

P1: 5
P2: 3
P3: 10

이렇게 3개의 process가 있고 각각 실행 시간(CPU 버스트)가 5, 3, 10이라 가정하면 SJF 알고리즘이라면 P2 -> P1 -> P3 순으로 실행한다.

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
- [[CPU 스케줄러|CPU Scheduler]]









