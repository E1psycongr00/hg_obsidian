---
tags:
  - 미완
  - MSA
aliases:
  - 2PC
date: 2024-12-18
title: 2 Phase Commit
---
---

## 내용(Content)

### 2 Phase Commit

분산 트랜잭션에서 **2PC (Two-Phase Commit)** 프로토콜은 여러 데이터베이스 또는 노드 간에 트랜잭션의 원자성을 보장하기 위한 표준 방식이다. 2PC는 **Coordinator(조정자)**와 **Participants(참여자)** 간의 협력을 통해 트랜잭션의 성공 또는 실패를 결정한다. ^fc11c6

### 2PC와 관련된 주요 개념

- **Coordinator (조정자)**: 트랜잭션의 상태를 관리하고 최종 결정(commit/abort)을 내리는 역할.
- **Participant (참여자)**: 조정자의 명령에 따라 트랜잭션의 작업을 수행하는 노드.
- **Log 기록**: 각 단계의 상태를 기록하여 장애 발생 시 트랜잭션 복구에 활용.

### 2PC 단계

![[2PC 프로토콜 동작 과정 Sequence Diagram (draw).svg|700]]

#### 1단계: Prepare 단계

조정자는 모든 참여자에게 트랜잭션을 준비하라는 요청을 보내고, 이 요청에 대한 각 참여자의 응답을 기다린다.

1. **Coordinator의 역할**:
    - "Prepare to Commit" 요청을 참여자들에게 전달한다.
    - 각 참여자로부터 "Yes" (준비 완료) 또는 "No" (준비 실패)의 응답을 수신한다.
2. **Participant의 역할**:
    - 트랜잭션의 로컬 작업을 수행하고, 성공 여부를 확인한다.
    - 성공한 경우, **로컬 로그에 준비 상태(Prepared)**를 기록하고 조정자에게 "Yes" 응답을 보낸다.
    - 실패하거나 오류가 발생하면 조정자에게 "No" 응답을 보낸다.

**결과**:
- 모든 참여자가 "Yes"를 응답하면 **Commit 단계**로 진행.
- 하나라도 "No"를 응답하면 **Abort 단계**로 진행.

#### **2단계: Commit 단계**

Prepare 단계에서 수집된 응답에 따라 조정자가 최종 결정을 내린다.

1. **모든 참여자가 준비 완료("Yes") 상태인 경우**:
    
    - 조정자는 **Commit** 명령을 모든 참여자에게 전달한다.
    - 참여자들은 **Commit** 명령을 받고 트랜잭션을 실제로 커밋한다.
    - 참여자들은 커밋이 완료되면 조정자에게 확인 메시지를 보낸다.
2. **하나라도 준비 실패("No") 상태인 경우**:
    
    - 조정자는 **Abort** 명령을 모든 참여자에게 전달한다.
    - 참여자들은 **Abort** 명령을 받고 트랜잭션을 롤백한다.

>[!caution]
>Commit중에 실패하는 경우에도 Prepare Phase와 마찬가지로 해당 참여자에게 재 commit 시도하고 실패할 경우 모두 Abort명령을 참여자에게 전달해서 롤백을 시도한다.

### 2PC의 장점

- **원자성 보장**: 트랜잭션이 성공적으로 완료되거나 모든 작업이 원상 복구된다.
- **일관성 유지**: 분산된 데이터베이스 간에 데이터의 일관성을 보장한다.


### 2PC의 단점

1. **Blocking 문제**:
    
    - 조정자가 장애 상태가 되면 참여자는 계속 대기해야 한다. 이는 분산 시스템의 성능과 가용성을 저하시킬 수 있다.
2. **오버헤드**:
    
    - 트랜잭션 준비 및 커밋을 위해 다수의 메시지 교환과 로그 기록이 필요하므로 비용이 크다.
3. **확장성 한계**:
    
    - 참여자 수가 많아질수록 네트워크 지연과 병목 현상이 발생할 가능성이 높다.


## 질문 & 확장

- 2PC의 장애 복구를 위한 추가적인 전략은 무엇이 있는가?
- Sagas와 2PC의 차이점은 무엇이며, 사용 사례에서 어떤 선택이 적합한가?
- Paxos와 Raft와 같은 분산 합의 알고리즘이 2PC에 어떤 개선을 제공할 수 있는가?

## 출처(링크)

- - **Gray, J., & Lamport, L. (2006).** Consensus on transaction commit. _ACM Transactions on Database Systems._
- **Tanenbaum, A. S., & Steen, M. V. (2007).** Distributed Systems: Principles and Paradigms. Pearson Education.
- [Two-phase commit protocol - Wikipedia](https://en.wikipedia.org/wiki/Two-phase_commit_protocol)

## 연결 노트

- down:: [[2PC 장애 복구 전략]]








