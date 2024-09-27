---
tags:
  - Python
  - Langchain
  - RAG
  - Retriever
aliases:
  - 다중 쿼리 검색기
date: 2024-09-27
title: MultiQueryRetriever
---
작성 날짜: 2024-09-27
작성 시간: 13:38

#미완 #Python #Langchain #RAG #Retriever 

----
## 내용(Content)

### MultiQueryRetriever

>[!summary]
>질문이 너무 추상적이거나 검색이 힘든 경우, 그와 유사한 질문을 여러 개 생성 임베딩해서 Vector Store에 쿼리하는 검색기

MultiQueryRetriever는 LLM을 활용해 vector store 검색을 위한 쿼리를 여러 개 생성해서 검색의 질을 높인다. 하지만 LLM을 사용하므로 기존 Retriever에 비해 비용이 더 들어간다.

하지만 여러 쿼리를 생성해서 관련된 다양한 답변을 얻을 수 있기 때문에 질문에 관련된 풍부한 내용을 얻을 수 있다.

### 동작 과정

![[Multi Query Retriever 동작 원리 (draw).svg]]



## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










