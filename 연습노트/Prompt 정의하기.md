---
tags:
  - LLM
  - Langchain
aliases: 
date: 2024-09-24
title: Prompt 정의하기
---
작성 날짜: 2024-09-24
작성 시간: 16:03

#미완 #LLM #Langchain 

----
## 내용(Content)

### LLM 모델 종류

우선 Prompt를 정의하기 전에 LLM 모델을 이해할 필요가 있다.

LLM의 생성 스타일은 2가지로 나눠지는데 `Chat` 모델과 `Completion` 모델이다.


>[!info] info1: Completion
>- Completion 스타일은 중간에 글을 써놓고 추가적으로 글을 완성할 때 쓰는 모델이다. 자동 완성 기능이 여기에 속한다.
>

>[!info] info2: Chat
>- Chat 스타일은 ChatGPT, Claude, Gemini등 대화형을 지원하는 모델이다. Completion도 물론 지원한다.

### Prompt 정의하기

언어 모델이 동작하기 이전에 사전에 Role을 정해서 LLM이 좀 더 나은 응답을 위해 설정하는 것이 Prompt이다. 보통 Prompt 모델은 Chat모델에서 정의하며 Langchain에서는 다음과 같이 3개의 역할을 정의함으로써 prompt를 정의한다.

System:
System은 AI 모델에 대한 전반적인 지시사항이나 컨텍스트를 제공한다. 이는 AI의 행동 방식, 대화의 목적, 또는 특정 규칙을 설정하는 데 사용된다. System 프롬프트는 대화의 전체적인 틀을 잡아주는 역할을 합니다.

## 질문 & 확장

(없음)

## 출처(링크)

- https://rudaks.tistory.com/entry/langchain-Prompt-Template-%EC%82%AC%EC%9A%A9%EB%B2%95
- https://www.pinecone.io/learn/series/langchain/langchain-prompt-templates/
## 연결 노트










