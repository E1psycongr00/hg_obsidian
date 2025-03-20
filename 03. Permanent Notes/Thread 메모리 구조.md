---
tags:
  - OS
  - Thread
  - Memory
aliases:
  - Thread Memory 구조
title: Thread 메모리구조
created: 2024-12-10T00:00:00.000Z
note-type: COMMON
completed: true
---

----

## 내용(Content)

스레드는 프로세스 내에서 실행되는 실행 흐름의 단위로, 고유한 메모리 구조를 가진다. 스레드의 메모리 구조는 다음과 같이 구성된다:

![[Process와 Thread 메모리 관계(draw).svg|600]]

Thread는 Process내에서 Stack영역을 따로 할당 받고 나머지 영역은 공유한다. 쓰레드끼리 프로세스의 자원을 공유하면서 프로세스 실행의 일부로 동작하기 때문에 동시 작업이 가능하고 비용이 적다.

1. **스택 영역 (Stack Area)**
   - 각 스레드마다 독립적으로 할당
   - 함수 호출 시 지역 변수, 매개변수 저장
   - 함수의 호출/반환 정보 관리
   - LIFO(Last In First Out) 구조
   - 개인적인 스택 메모리를 통해 함수 호출 구조를 효율적으로 관리

2. **레지스터 집합 (Register Set)**
   - 스레드별 고유한 레지스터 값 보유
   - Program Counter, Stack Pointer 등 포함
   - 컨텍스트 스위칭 시 저장/복원됨
   - 빠른 컨텍스트 전환을 가능하게 함

3. **공유 영역**
   - 코드(Code) 영역: 실행 코드 저장
   - 데이터(Data) 영역: 전역/정적 변수 저장
   - 힙(Heap) 영역: 동적 메모리 할당 영역
   - 같은 프로세스 내 모든 스레드가 공유
   - 메모리 사용의 효율성 증가

## 질문 & 확장

1. 스레드별 독립 메모리와 공유 메모리의 차이점은?
   - 독립 메모리: 스택, 레지스터 (스레드 안전성 보장)
   - 공유 메모리: 코드, 데이터, 힙 (자원 효율성 증가)

2. 멀티스레드 환경에서의 메모리 관리는?
   - 동기화 메커니즘 필요
   - 뮤텍스, 세마포어 등 사용
   - 데드락 방지 고려 필요
   - 캐시 메모리 최적화를 통한 성능 향상
   - 로드 밸런싱을 통한 코어 간 부하 분산

3. 스레드 관리의 주요 목적은?
   - 자원 공유를 통한 메모리 사용량 감소
   - 병행 실행을 통한 시스템 응답성 향상
   - 성능 최적화를 통한 시스템 효율성 증대(캐쉬 메모리 최적화, 비동기 작업, 로드 밸런싱)

## 출처(링크)

1. Operating System Concepts, 10th Edition - Silberschatz, Galvin, Gagne
2. Modern Operating Systems - Andrew S. Tanenbaum
3. [Oracle Java Documentation - Thread Memory Model](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html#jls-17.4)
4. [👩‍💻 ‍완전히 정복하는 프로세스 vs 스레드 개념](https://inpa.tistory.com/entry/%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%E2%9A%94%EF%B8%8F-%EC%93%B0%EB%A0%88%EB%93%9C-%EC%B0%A8%EC%9D%B4#%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%9D%98_%EC%9E%90%EC%9B%90_%EA%B3%B5%EC%9C%A0)

## 연결 노트
- down:: [[Stack 영역]]
- down:: [[Heap 영역]]
- down:: [[Code 영역]]
- down:: [[Data 영역]]
- Thread Synchronization
- Context Switching
- Memory Management
- Concurrent Programming
- Thread Scheduling
- Cache Optimization
- Load Balancing










