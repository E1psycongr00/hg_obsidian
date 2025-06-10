---
tags:
  - 분산시스템
aliases: null
created: 2024-12-19T00:00:00.000Z
title: 네트워크 분리 장애시 3PC 장애 대응 동작 방식
note-type: COMMON
completed: true
---

## 내용(Content)

### 네트워크 분리 장애

각 분산 시스템이 소통 과정에서 네트워크 문제가 발생에 더 이상 서로 소통을 할 수 없는 상황.
부분적으로 동기화가 이루어지지 않아, 데이터 불일치나, 데드락과 같은 여러 문제들이 발생할 수 있다.

### 2PC와 네트워크 분리 장애

#### 네트워크 분리와 데이터 불일치 문제

>[!info] Info: 네트워크 Commit 중간에 발생한 데이터 불일치 문제
>![[2PC 네트워크 데이터 불일치 문제 (draw).svg]]

precommit이 완료되서 commit 중간에 네트워크에 문제가 생겨서 더 이상 소통이 불가능해지는 경우, Coordinator가 더 이상 participant에 관여할 수 없게 된다. participant 들은 서로 어떤 상태인지 알수 없고, 이미 Commit된 상태라면, 다른 Participant는 Commit을 해야할지 말아야할지 알 수가 없다. 그래서 서로 데이터 불일치가 생기게 되고, 트랜잭션이 깨지게 된다.

그 외에도 타임아웃 등이 없다면 무한히 수신을 기다리는 문제들이 발생할 수도 있다.

### 3PC를 이용해 네트워크 분리 장애 대응

#### CanCommit(prepare) 단계에서 네트워크 분리 발생

>[!info] CanCommit 단계에서 네트워크 분리 문제
>![[3PC preCommit 단계 네트워크 장애 예제 (draw).svg]]

3PC에는 canCommit(prepare) 외에 preCommit이라는 단계를 중간에 한번 더 수행하고, 상태 저장을 통해서 네트워크에 장애시 participant가 스스로 장애에 대응할 수 있게 한다. 로그 시스템과 타임아웃을 이용해서 precommit과 cancommit에 문제가 발생시 다음 명령에 대한 응답이 오지 않는다면 Abort를 participant가 강제하도록 한다. 그러면 더 이상 트랜잭션을 진행하지 않고, 모든 서비스들이 이 전 과정으로 동기화 될 수 있다.

#### Commit 단계에서 문제가 발생했으나 조정자 복구로 장애를 복구하는 경우

>[!info] Commit 단계에서 조정자 복구로 장애 복구
>![[Commit 단계에서 조정자 복구로 장애 복구 (draw).svg]]

Commit 단계에서 문제가 발생하는 경우 3PC도 데이터 불일치 문제를 막을 수 없다. 그러나 네트워크가 복구되어 서로 소통할 수 있는 상황이 되고 Coordinator가 통제권을 찾는다면, Participant의 로그와 precommit 상태들을 확인해 commit과 Abort를 판단하고 진행해서 장애를 복구할 수 있다.


### 한계

Commit 단계에서 데이터 불일치와 조정자(Coordinator)가 복구되지 못하면 상태에 대해서 처리할 수 없고, 여전히 데이터 불일치가 발생한다. 이럴 때 Coordinator없이 Participant끼리 서로 소통하면서 트랜잭션 장애를 복구해야 한다. 이 때 **Paxos** 또는 **Raft** 와 같은 합의 알고리즘을 사용할 수 있다.


## 질문 & 확장

- Paxos와 Raft를 이용한 합의 알고리즘은 무엇이며, 어떻게 네트워크 장애로 발생한 데이터 불일치 문제를 해결할 수 있는가?

## 출처(링크)


## 연결 노트


