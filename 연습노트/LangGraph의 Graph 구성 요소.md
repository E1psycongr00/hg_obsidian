---
tags:
  - Python
  - Langchain
  - LangGraph
aliases: []
date: 2024-10-10
title: LangGraph의 Graph 구성 요소
---
작성 날짜: 2024-10-10
작성 시간: 15:57

#미완 #Python #Langchain #LangGraph 

----
## 내용(Content)

### Graph

>[!summary]
> LangGraph는 , `State`, `Node`, `Edge` 3개의 핵심 요소를 이용해 Agent workflow를 그래프로 구성한다.

#### State

>[!summary]
>어플리케이션의 현재 스냅샷을 나타내는 공유 데이터 구조.

계산을 수행하고 결과를 스냅샷으로 찍어서 공유한다. 
State는 기본적으로 `TypedDict` (python 기본 dict) 또는 `Pydandic`(Validation을 적용 가능한 엄격한 python dict 관련 라이브러리) 으로 정의해서 사용한다.
State는 매번 그래프를 거치면서 변화할 수 있고, 나머지 key,value는 유지되고 변화하는 key의 value만 수정한다.

자세한 State에 대한 내용은 [[LangGraph의 State란]] 을 참고하자.

#### Node

>[!summary]
>노드는 현재 State를 입력으로 받고, 계산 이후 State를 반환하는 논리

Node는 State 를 입출력으로 받는 function을 그래프 노드로 구성한 것이다.

#### edge

>[!summary]
> 현재 Node에서 어떤 Node를 실행할지 결정하는 Component이다.

edge는 상황에 따라 기본 edge 또는 분기에 따라 처리되는 conditional_edge로 구분될 수 있다.



## 질문 & 확장

(없음)

## 출처(링크)

- https://langchain-ai.github.io/langgraph/concepts/low_level/

## 연결 노트

- [[]]








