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
- SRTF(Shortest Remaining Time First)
- priority
- round robin
- multi level queue


### FCFS(First Come First Served)

### SJF(Sortest Job First)
프로세스의 다음 CPU Burst가 가장 짧은 프로세스부터 실행하는 알고리즘이다.

SJF에는 기본적으로 비선점형으로 끝까지 프로세스를 실행한다.

우선 SJF의 기본 원리에 대해서 알아보자

P1: 5
P2: 3
P3: 10

이렇게 3개의 process가 있고 각각 실행 시간(CPU 버스트)가 5, 3, 10이라 가정하면 SJF 알고리즘이라면 P2 -> P1 -> P3 순으로 실행한다.



### SRTF(Shortest Remaining Time First)
CPU 버스트가 남은 것중 가장 짧은 프로세스를 실행하는 알고리즘이다. 실행하다가도 중간에 실행 시간이 짧은 프로세스가 들어오면 진행하던 프로세스를 멈추고 해당 프로세스를 실행한다. 그래서 선점형이다.


### Priority


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
- [[CPU 스케줄러|CPU Scheduler]]









