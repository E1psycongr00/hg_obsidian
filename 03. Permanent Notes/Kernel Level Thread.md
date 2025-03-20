---
tags:
  - 완성
  - OS
  - Thread
aliases:
  - 커널 쓰레드
  - 커널 레벨 쓰레드
  - KLT
title: Kernel Level Thread
created: 2024-01-21T00:00:00.000Z
---
작성 날짜: 2024-01-21
작성 시간: 23:30

----
## 내용(Content)
### 커널 레벨 스레드(Kernel Level Thread)

>[!summary] 커널 쓰레드 == OS 쓰레드
>- 운영체제의 커널에 의해 직접 관리되는 쓰레드
>- 하드웨어 CPU의 실제 실행 단위
>- 커널이 직접 스케줄링하는 대상
>- 각각의 커널 스레드는 독립적인 커널 스택과 컨텍스트를 가짐

^7651b2

커널 레벨 스레드는 운영체제 커널이 직접 생성하고 관리하는 스레드입니다. 각 커널 스레드는 독립적인 스케줄링 개체로 취급되며, 커널에 의해 직접 CPU에 할당됩니다.

#### 특징
1. **자원 할당**
   - 각 스레드마다 TCB(Thread Control Block) 할당
   - 독립적인 커널 스택 공간 보유
   - CPU 레지스터 컨텍스트 독립적 관리

2. **병행성(Concurrency)**
   - 멀티프로세서 시스템에서 진정한 병렬 실행 가능
   - 한 프로세스의 스레드들이 여러 CPU에서 동시 실행 가능

3. **블로킹 동작**
   - 한 스레드가 블로킹되어도 같은 프로세스의 다른 스레드는 실행 가능
   - I/O 작업이나 시스템 콜로 인한 블로킹에서 효율적

#### 장점
- 커널이 각 스레드를 직접 관리하므로 스케줄링이 더 유연함
- 한 스레드가 블로킹되어도 다른 스레드가 실행될 수 있음
- 멀티프로세서 환경에서 효율적인 병렬 처리 가능

#### 단점
- 사용자 레벨 스레드에 비해 생성과 관리 비용이 큼
- 컨텍스트 스위칭 시 모드 전환(user mode ↔ kernel mode) 필요
- 커널 자원을 더 많이 사용

>[!note] 컨텍스트 스위칭 오버헤드
>1. 유저 모드에서 커널 모드로 전환 필요
>2. 커널 스택 및 레지스터 컨텍스트 저장/복원
>3. CPU 캐시 무효화 발생 가능
>4. 스케줄러 호출 및 실행
>이러한 과정들이 사용자 레벨 스레드 전환보다 더 많은 시간 소요

## 질문 & 확장
Q1: 커널 레벨 스레드와 사용자 레벨 스레드의 차이점은?
A1: 커널 레벨 스레드는 운영체제가 직접 관리하고 스케줄링하는 반면, 사용자 레벨 스레드는 사용자 영역의 라이브러리가 관리합니다.

Q2: 왜 커널 레벨 스레드를 사용하나요?
A2: 진정한 병렬성 구현과 시스템 자원의 효율적 활용을 위해 사용됩니다. 특히 멀티코어 시스템에서 더 효과적입니다.

## 출처(링크)
- Operating System Concepts, 10th Edition (Silberschatz, Galvin, Gagne)
- Modern Operating Systems, 4th Edition (Andrew S. Tanenbaum)
- [Linux Kernel Development, 3rd Edition (Robert Love)](https://www.oreilly.com/library/view/linux-kernel-development/9780768696974/)
- [Understanding the Linux Kernel, 3rd Edition (Daniel P. Bovet)](https://www.oreilly.com/library/view/understanding-the-linux/0596005652/)

## 연결 노트
- related:: [[멀티 쓰레드 모델]]
