---
tags:
  - 완성
  - 분산시스템
aliases: 
date: 2024-12-18
title: 3 Phase Commit
---

## 내용(Content)

### 3 Phase Commit

3PC(Three-Phase Commit Protocol)는 분산 시스템에서 트랜잭션의 원자성을 보장하기 위해 고안된 트랜잭션 커밋 프로토콜이다. 이는 2PC(Two-Phase Commit Protocol)의 단점을 보완하기 위해 설계된 알고리즘으로, 주요 목표는 시스템 장애 시 데이터 불일치(inconsistency) 가능성을 줄이는 것이다. 특히 네트워크 파티션(network partition)과 같은 문제 상황에서 2PC보다 복구가 용이하다.

### 3PC의 주요 단계

3PC는 이름 그대로 세 가지 주요 단계를 포함한다. 각 단계에서 참여자와 조정자는 특정 상태와 메시지를 교환하며 진행한다.

![[3 Phase Commit 동작 과정 시퀀스 (draw).svg|600]]
#### 1. CanCommit 단계 (Prepare 단계)

- **조정자(Coordinator):** 트랜잭션을 시작하며 각 참여자(Participant)에게 준비 상태를 요청한다.
    - 메시지: `CanCommit?`
- **참여자(Participant):** 자신이 트랜잭션을 준비할 수 있는지 판단 후 응답한다.
    - 메시지: `Yes` 또는 `No`
- **결과:**
    - 모든 참여자가 `Yes`를 반환하면 다음 단계로 진행.
    - 하나라도 `No`를 반환하면 트랜잭션은 중단된다.

#### 2. PreCommit 단계 (Prepare to Commit)

- **조정자(Coordinator):**
    - 모든 참여자가 `Yes`를 반환하면 트랜잭션의 준비 완료 상태를 알린다.
    - 메시지: `PreCommit`
- **참여자(Participant):**
    - 트랜잭션을 준비하고 로컬 변경 사항을 임시로 저장한다(preCommit 상태 저장). 이 상태에서는 실제 커밋은 하지 않는다.
    - 준비 완료 후 조정자에게 확인 메시지를 반환.
    - 메시지: `ACK`
- **결과:**
    - 모든 참여자의 `ACK` 메시지가 도착하면 최종 커밋 단계로 진행.
    - 조정자가 일정 시간 내에 `ACK`를 받지 못하면 트랜잭션을 중단하고 롤백한다.

#### 3. DoCommit 단계 (Commit 단계)

- **조정자:**
    - 모든 참여자의 `ACK` 메시지를 수신한 후 트랜잭션 커밋을 지시한다.
    - 메시지: `DoCommit`
- **참여자:**
    - 트랜잭션을 최종적으로 커밋하고 조정자에게 커밋 완료 메시지를 보낸다.
    - 메시지: `Committed`
- **결과:**
    - 모든 참여자가 성공적으로 커밋을 완료하면 트랜잭션 종료.

### 3PC의 안정성과 효율성 트레이드 오프

3PC는 [[네트워크 분리 장애시 3PC 장애 대응 동작 방식|Coordinator의 장애 시 데이터 불일치를 문제]]를 방지하기 위해 설계되었다.. 이는 **네트워크 분리**(network partition) 상황에서도 **중단 상태를 최소화**하기 위해 중요한 특징을 추가한다.

#### 2PC의 한계:

- Coordinator가 **Commit 메시지를 보내기 전**에 장애가 발생하면, Participant들은 상태를 알 수 없어 **결정 불가능 상태**에 빠질 수 있다.
- 일부 Participant는 Commit을 실행하고, 일부는 실행하지 않아 **데이터 불일치**가 발생할 수 있다.

#### 3PC의 개선점:

3PC는 "PreCommit 단계"를 추가하여, 모든 Participant가 트랜잭션을 커밋하기 전에 **동기화 상태를 확인**한다.

- Coordinator가 장애가 발생해도, Participant들은 PreCommit 상태를 기준으로 행동을 결정할 수 있다.
- 네트워크 분리가 발생하더라도 각 Participant가 중립적 상태를 유지하여 **데이터 일관성을 보장**한다. 

####  비효율성 문제

3PC는 안정성을 강화했지만, 그 대가로 **더 많은 메시지 오버헤드**가 발생한다.

- 2PC는 2단계(Prepare → Commit)로 단순하지만, 3PC는 추가 단계(CanCommit → PreCommit → Commit)를 가지며 메시지 수가 증가한다.
- 네트워크 대역폭을 더 많이 사용하며, 지연 시간이 길어질 수 있다.

### 언제 3PC를 선택해야 하는가?

- **2PC**: 네트워크가 안정적이고 장애 확률이 낮은 환경에서 적합.
- **3PC**: 네트워크 신뢰성이 낮거나 장애가 자주 발생할 수 있는 분산 시스템에서 필수.

## 질문 & 확장

- 3PC가 블록체인과 같은 새로운 분산 시스템에서 어떻게 활용될 수 있을까?
- 타임아웃 설정이 지나치게 길거나 짧을 경우, 3PC의 효율성과 신뢰성은 어떻게 달라질까?
- 3PC의 메시지 교환 오버헤드를 최소화할 수 있는 알고리즘 개선 방안은 무엇일까?

## 출처(링크)

- Tanenbaum, Andrew S. _Distributed Systems: Principles and Paradigms_. Pearson Education.
- Coulouris, George, et al. _Distributed Systems: Concepts and Design_. Addison-Wesley.


## 연결 노트

- down:: [[네트워크 분리 장애시 3PC 장애 대응 동작 방식]]








