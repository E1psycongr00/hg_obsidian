---
tags:
  - OS
  - Thread
aliases: null
title: Thread 분류 기준
created: 2024-12-09T00:00:00.000Z
---

----
## 내용(Content)

### 쓰레드 분류 기준

[[Thread Basic#^40241b|쓰레드]]는 크게 두 가지 관점에서 분류할 수 있습니다:
1. 구현 계층에 따른 분류 (하드웨어 vs 소프트웨어)
2. 관리 주체에 따른 분류 (커널 레벨 vs 사용자 레벨)

### Hardware vs Software Thread

하드웨어와 소프트웨어 쓰레드는 각각 다른 계층에서 구현되며 서로 다른 목적을 가집니다.

| 구분        | CPU 쓰레드                             | 소프트웨어 쓰레드                 |
| --------- | ----------------------------------- | ------------------------- |
| **정의**    | CPU에서 독립적으로 명령어를 실행할 수 있는 하드웨어 유닛 | 프로그램 내의 독립적인 실행 경로 |
| **제어 주체** | CPU 하드웨어 및 마이크로코드                    | 운영 체제 또는 런타임 시스템  |
| **구현 방식** | 물리적 코어 또는 SMT(Simultaneous Multi-Threading) | 가상 실행 컨텍스트  |
| **병렬 처리** | 실제 물리적 병렬 실행                  | 논리적 병렬 실행       |
| **스케줄링**  | 하드웨어 수준 스케줄링                 | OS 또는 런타임 시스템 스케줄링  |
| **예시**     | Intel Hyper-Threading, AMD SMT | Java Threads, POSIX Threads |

### Kernel vs User Level Thread

쓰레드 관리 주체에 따른 분류는 운영체제의 구조와 밀접한 관련이 있습니다.

|**기준**|**커널 레벨 쓰레드**|**사용자 레벨 쓰레드**|
|---|---|---|
|**구현 위치**|운영체제 커널|사용자 공간 라이브러리|
|**생성/관리 비용**|상대적으로 높음|낮음|
|**스케줄링 유연성**|커널에 의해 제한됨|애플리케이션 요구에 맞춤 가능|
|**시스템 호출 처리**|직접 처리 가능|커널 쓰레드를 통해 간접 처리|
|**동기화 기능**|커널에서 제공하는 기본 기능 사용|라이브러리 수준에서 구현|
|**확장성**|시스템 자원에 따른 제한|메모리 제한 내에서 많은 쓰레드 생성 가능|

## 질문 & 확장

(없음)

## 출처(링크)

- Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). Operating System Concepts (10th ed.). Wiley.
- Tanenbaum, A. S., & Bos, H. (2014). Modern Operating Systems (4th ed.). Pearson.
- Intel® 64 and IA-32 Architectures Software Developer's Manual
- AMD64 Architecture Programmer's Manual

## 연결 노트

- example:: [[CPU 쓰레드(Thread)|하드웨어 쓰레드]]
- example:: [[User Level Thread|User Level Thread]]
- example:: [[Kernel Level Thread|Kernel Level Thread]]



