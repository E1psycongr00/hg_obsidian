---
tags:
  - 완성
  - 분산시스템
  - 합의알고리즘
aliases: 
date: 2024-12-20
title: Paxos
---
---

## 내용(Content)

### Paxos

Paxos는 분산 시스템에서 합의를 이루기 위한 알고리즘으로, 시스템의 여러 노드가 하나의 값에 동의할 수 있도록 설계되었다. 이는 특히 노드나 네트워크의 장애가 발생해도 일관성을 유지하는 데 중요한 역할을 한다.

### Paxos 목표

- **일관성(Consistency)**: 모든 참여 노드가 동일한 값을 선택하도록 보장한다.
- **내구성(Durability)**: 선택된 값은 영구적으로 유지되며 변경되지 않는다.
- **가용성(Availability)**: 일부 노드가 실패하더라도 합의를 계속 진행할 수 있다.

### Paxos의 구성 요소

- **Proposer (제안자)**: 합의할 값을 제안한다.
- **Acceptor (수락자)**: 제안된 값을 수락하거나 거부한다.
- **Learner (학습자)**: 합의된 값을 학습한다.
- **Client (클라이언트)**: 시스템과 상호작용하며 요청을 보낸다.

## 알고리즘 단계

![[Paxos 동작 과정 (draw).svg|700]]

Paxos는 기본적으로 두 단계로 진행된다:

### 1. **Prepare 단계 (준비 단계)**

- Proposer는 고유한 제안 번호를 포함한 `Prepare` 메시지를 Acceptors에게 보낸다.
- Acceptor는 이전에 수락한 제안이 없는 경우, 해당 제안을 잠정적으로 수락하고 `Promise` 메시지를 반환한다.

### 2. **Accept 단계 (수락 단계)**

- Proposer는 `Accept` 메시지를 Acceptors에게 보낸다.
- Acceptor는 이전에 보낸 `Promise`와 충돌하지 않는 경우, 해당 값을 수락하고 `Accepted` 메시지를 반환한다.


## 특징

1. **Fault Tolerance (장애 허용성)**:
    
    - 일부 노드가 실패하더라도 시스템은 합의를 이룰 수 있다.
    - 과반수 이상의 Acceptors가 작동하면 합의가 가능하다.
2. **Concurrency (동시성)**:
    
    - 여러 Proposer가 동시에 값을 제안할 수 있지만, 결국 하나의 값만 합의된다.
3. **Complexity (복잡성)**:
    
    - 구현이 복잡하고, 네트워크 지연과 같은 현실적인 문제로 인해 성능이 저하될 수 있다.

### 한계

- Paxos는 구현의 복잡성과 네트워크 효율성 문제로 인해 실제 시스템에서 사용하기 어렵다.
- **Raft**와 같은 알고리즘은 Paxos의 아이디어를 기반으로 더 단순한 구현을 제공한다.

## 질문 & 확장

- Paxos와 Raft의 주요 차이점은 무엇인가?
- Paxos를 기반으로 한 시스템의 실제 구현 예시는 무엇인가?
- Paxos가 해결할 수 없는 문제는 어떤 것이 있는가?

## 출처(링크)

- [Leslie Lamport, "Paxos Made Simple", ACM SIGACT News.](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)
- [Lamport, L. (1998). "The Part-Time Parliament". ACM Transactions on Computer Systems.](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf)
- Distributed Systems by Maarten van Steen and Andrew S. Tanenbaum.
- 
## 연결 노트










