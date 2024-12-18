---
tags:
  - 미완
  - MSA
aliases: 
date: 2024-12-18
title: 2PC 장애 복구 전략
---
---

## 내용(Content)

### 장애 상황에서 복구 전략

[[2 Phase Commit#^fc11c6|2PC]]는 분산 환경에서 여러 장애 상황이 발생할 수 있기 때문에, 트랜잭션 상태를 보장하기 위해 장애 복구 전략을 사용한다.

#### 2.1. 조정자 장애 복구

1. **Prepare Phase 중 장애**
    
    - 조정자가 Prepare 요청을 보내기 전에 장애가 발생한 경우:
        - 트랜잭션이 진행되지 않음. 참여 노드들은 트랜잭션을 보류하거나 타임아웃 후 롤백한다.
    - Prepare 요청을 보낸 후 응답을 수집하기 전에 장애가 발생한 경우:
        - 참여 노드들은 타임아웃이 발생하면 트랜잭션을 롤백한다.
2. **Commit Phase 중 장애**
    
    - 조정자가 Commit/Abort 명령을 보내기 전에 장애가 발생한 경우:
        - 참여 노드들은 준비 상태로 유지된다.
        - 장애 복구 후 조정자가 로그를 기반으로 Commit 또는 Abort를 결정하여 전파한다.
    - Commit/Abort 명령을 일부만 전송한 경우:
        - 장애 복구 후 조정자가 로그를 확인하고 나머지 노드들에 명령을 전송한다.

#### 2.2. 참여 노드 장애 복구

1. **Prepare Phase 중 장애**
    
    - 참여 노드가 Prepare 요청을 받기 전에 장애가 발생하면:
        - 트랜잭션에 참여하지 않으므로 복구 후 특별한 작업이 필요 없다.
    - Prepare 요청을 받은 후 응답을 보내기 전에 장애가 발생하면:
        - 참여 노드는 복구 시 로그를 확인하여 상태를 결정한다.
        - Prepare 응답을 보내지 않은 경우 트랜잭션을 롤백한다.
2. **Commit Phase 중 장애**
    
    - Commit/Abort 명령을 받기 전에 장애가 발생한 경우:
        - 복구 시 조정자에게 상태를 요청한다.
        - 조정자가 Commit/Abort 상태를 알려주면 그에 따라 처리한다.
    - Commit/Abort 명령을 받은 후 이를 처리하기 전에 장애가 발생한 경우:
        - 복구 시 로그를 확인하여 명령을 재처리한다.


#### 2.3. 네트워크 장애 복구

1. **Prepare Phase 중 네트워크 장애**
    
    - 조정자가 참여 노드와 통신할 수 없는 경우:
        - 조정자는 타임아웃 후 트랜잭션을 Abort한다.
        - 참여 노드는 Prepare 응답을 보내지 않았으므로 롤백한다.
2. **Commit Phase 중 네트워크 장애**
    
    - Commit/Abort 명령이 일부 노드에 도달하지 않은 경우:
        - 조정자는 장애 복구 후 로그를 확인하고 다시 명령을 전송한다.
        - 참여 노드는 조정자에게 상태를 요청하거나 타임아웃 후 자체적으로 상태를 결정한다.

###  장애 복구를 위한 핵심 메커니즘

1. **로그(Log) 기반 복구**
    
    - 조정자와 참여 노드 모두 트랜잭션 상태를 지속적으로 로그에 기록한다.
    - 장애 발생 시 로그를 기반으로 복구 절차를 수행한다.
    - 일반적으로 [[Write Ahead Logging#^9ef1f5|WAL(Write-Ahead Logging)]] 기법을 사용하여 장애 시 데이터 일관성을 보장한다.
2. **타임아웃 처리**
    
    - 참여 노드와 조정자 모두 타임아웃 메커니즘을 사용하여 장애 상황에 대응한다.
    - 타임아웃 후 롤백을 수행하여 교착 상태를 방지한다.
3. **재시도 및 상태 요청**
    
    - 조정자와 참여 노드는 장애 복구 시 상태를 상호 요청하고, 다시 명령을 재전송하여 상태를 동기화한다.

## 질문 & 확장

- 2PC의 성능 문제를 해결하기 위한 대안은 무엇인가?
    - 3PC(Three-Phase Commit) 또는 Paxos와 같은 합의 알고리즘이 성능과 장애 복구 측면에서 어떻게 비교되는지 검토할 필요가 있다.
- 네트워크 파티션 상황에서 2PC가 어떻게 일관성을 유지할 수 있을까?
- 2PC를 활용한 트랜잭션 로그의 최적화 방법은 무엇인가?

## 출처(링크)
- Jim Gray, _Transaction Processing: Concepts and Techniques_, Morgan Kaufmann
- Tanenbaum, _Distributed Systems: Principles and Paradigms_
- [The circular two-phase commit protocol \| Proceedings of the 12th international conference on Database systems for advanced applications](https://dl.acm.org/doi/10.5555/1783823.1783854#:~:text=Distributed%20transactional%20systems%20require%20an%20atomic%20commitment,atomic%20commitment%20protocol%20for%20main%2Dmemory%20primary%2Dbackup%20systems)

## 연결 노트

- down:: [[Write Ahead Logging]]







