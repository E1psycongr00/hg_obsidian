---
tags:
  - OS
  - Thread
aliases:
  - 쓰레드 생명주기
  - 쓰레드 상태
title: Thread LifeCycle
created: 2024-12-10T00:00:00.000Z
note-type: COMMON
completed: true
---

----
## 내용(Content)

쓰레드 라이프사이클은 운영체제 수준에서 관리되는 기본적인 상태 전이를 따르며, 대부분의 프로그래밍 언어들은 이를 기반으로 구현한다.

### 기본 쓰레드 상태
1. **생성 (Created)**
   - 쓰레드가 생성되었지만 아직 실행 가능한 상태가 아님
   - 필요한 시스템 자원 할당 단계

2. **실행 가능 (Runnable)**
   - CPU를 할당받아 실행될 수 있는 상태
   - 실제 실행 중이거나 실행 대기 중

3. **대기 (Waiting)**
   - I/O 작업, 동기화, 타이머 등으로 인해 일시적으로 실행이 중단된 상태
   - 특정 조건이 만족되면 다시 실행 가능 상태로 전환

4. **종료 (Terminated)**
   - 쓰레드 실행이 완료되거나 강제 종료된 상태
   - 시스템 자원 반환

### 기본 상태 전이
- 생성 → 실행 가능: 쓰레드 시작
- 실행 가능 → 대기: I/O 요청, 동기화, 슬립 등
- 대기 → 실행 가능: I/O 완료, 동기화 해제, 슬립 시간 종료
- 실행 가능 → 종료: 실행 완료 또는 강제 종료

### 프로그래밍 언어별 특징

#### Java
- 6가지 상태로 세분화 (NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED)
- Thread 클래스를 통한 명시적 상태 관리
- synchronized, wait(), notify() 등 다양한 동기화 메커니즘 제공

#### Python
- threading 모듈로 구현
- 단순화된 상태 관리 (생성, 실행, 종료)
- GIL로 인한 특수한 동시성 제약

#### Go
- goroutine이라는 경량 쓰레드 사용
- 채널 기반 통신으로 상태 관리
- 런타임에 의한 자동 스케줄링

#### C++
- OS 수준의 쓰레드 직접 제어
- POSIX 스레드 또는 플랫폼별 API 활용
- 저수준 제어 가능

## 질문 & 확장
- 왜 프로그래밍 언어마다 쓰레드 구현이 다른가?
  - 언어의 설계 철학과 목적
  - 실행 환경(런타임)의 특성
  - 성능과 사용 편의성의 균형

## 출처(링크)
- Operating System Concepts (Silberschatz et al.)
- Modern Operating Systems (Tanenbaum)

## 연결 노트











