---
tags:
  - Python
  - Langchain
  - RAG
  - Retriever
aliases:
  - 상위 문서 검색기
date: 2024-09-27
title: ParentDocumentRetriever
---
작성 날짜: 2024-09-27
작성 시간: 14:41

#미완 #Python #Langchain #RAG #Retriever 

----
## 내용(Content)

### ParentDocumentRetriever

>[!summary]
> 각 Chunk 간의 맥락이 유지되도록 긴 Context를 원하는 경우와 작은 문서 정보 모두 원하는 경우 사용하는 검색기

ParentDocumentRetriever는 문서 간의 계층 구조를 이용하여, 보다 긴 맥락의 문서를 효율적으로 탐색할 수 있도록 한다.

### 동작 원리

![[ParentDocumentRetriever 동작 원리 (draw).svg]]


Question이 들어오면 쿼리를 만들어서 VectorStore에서 검색한다. 이 때 chunk 1-1이 검색된 유사 청크라면 chunk 1-1의 상위 문서인 Page 1을 모두 포함해서 LLM에게 전달한다. 그러면 LLM은 선택한 유사 청크가 문맥이 짤려서 제대로 답변이 안된 경우라도, 문서 하나를 LLM에게 전달했기 떄문에 문맥에 따라서 chunk 1-1을 이해하고 제대로 된 답변을 기대할 수 있다.

### 코드

##### 


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










