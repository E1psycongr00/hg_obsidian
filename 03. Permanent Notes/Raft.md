---
tags:
  - 완성
  - 분산시스템
  - 합의알고리즘
aliases: 
date: 2024-12-20
title: Raft
---
---

## 내용(Content)

### Raft

Raft 알고리즘은 분산 시스템에서의 [[상태 복제#^93a5cf|상태 복제(State Replication)]] 합의(Consensus) 문제를 해결하기 위해 설계된 합의 알고리즘이다. 주로 **리더 선출(Leader Election)**과 **로그 복제(Log Replication)**라는 두 가지 주요 메커니즘을 통해 작동하며, 분산 시스템의 일관성과 가용성을 유지한다.

Raft는 **Paxos** 알고리즘의 대안으로 개발되었으며, 이해하기 쉽고 구현이 용이하다는 장점을 갖는다


### 주요 목표

1. **리더 선출(Leader Election):** 시스템 내에서 단일 리더를 선택.
2. **로그 복제(Log Replication):** 모든 노드에 동일한 상태 로그를 유지.
3. **안전성(Safety):** 로그의 일관성을 보장하며, 리더 변경 후에도 동일한 결과를 유지.

### Raft의 주요 메커니즘

#### 1. 리더 선출 과정

- 각 노드는 리더의 [[하트비트#하트비트 정의|하트비트(heartbeat)]]를 감지하며, 일정 시간 응답이 없으면 스스로 후보자가 된다.
- 후보자는 다른 노드들에게 투표를 요청하며, 과반수 투표를 얻으면 리더로 선출된다.

#### 2. 로그 복제 과정

1. 리더는 클라이언트 요청을 받으면 이를 자신의 로그에 기록한다.
2. `AppendEntries` 메시지를 통해 모든 팔로워에게 로그를 전파한다.
3. 과반수의 노드가 로그를 확인하면 커밋(commit)되어 클라이언트에 응답한다.


## 질문 & 확장

- Raft 알고리즘의 장점을 살리면서 성능을 최적화할 방법은 무엇인가?
- 네트워크가 심각하게 분할된 경우 Raft는 어떻게 동작을 보장하는가?
- Raft를 기반으로 하는 시스템에서 실시간 처리를 어떻게 구현할 수 있는가?

## 출처(링크)

- Diego Ongaro, John Ousterhout, _In Search of an Understandable Consensus Algorithm (Raft)_ (2014)
- Martin Kleppmann, _Designing Data-Intensive Applications_ (2017)

## 연결 노트










