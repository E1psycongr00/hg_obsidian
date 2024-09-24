---
tags:
  - LLM
  - RAG
  - Langchain
aliases: 
date: 2024-09-24
title: LCEL과 RAG
---
작성 날짜: 2024-09-24
작성 시간: 20:03

#미완 #LLM #RAG #Langchain 

----
## 내용(Content)

### LECL

>[!summary]
>langchain에서는 pipline으로 langchain 모듈간의 연결을 "|"로 쉽게 표현가능하다.

### RAG와 함께 LECL 예제

#### 1. 문서 임베딩과 Retrieval 질의 검색

```python
from dotenv import load_dotenv
from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

load_dotenv()

docs = [
    Document(page_content="the dog loves to eat pizza", metadata={"source": "animal.txt"}),
    Document(page_content="the cat loves to eat lasagna", metadata={"source": "animal.txt"})
]

db = FAISS.from_documents(docs, OpenAIEmbeddings())

retriever = db.as_retriever()
result = retriever.invoke("What does the dog want to eat?")
print(result)
```

그러면 invoke 결과로 "the dog loves to eat pizza" Document가 출력된다.

#### 2. Prompt와 모델 설정




## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










