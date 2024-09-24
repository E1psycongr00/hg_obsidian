---
tags:
  - 솔루션
  - LLM
  - Langchain
  - "#테스트"
aliases: 
date: 2024-09-24
title: LLM 테스트 FakeLLM
---
작성 날짜: 2024-09-24
작성 시간: 11:35

#미완 #솔루션 #LLM #Langchain #테스트 

----

## 문제 & 원인

단위 테스트를 하다 보면 외부에서 불러온 클래스나 모듈을 Mocking 해야 할 때가 있다. 그러나 LLM을 Mocking한다는 것은 필요한 테스트 응답을 만드는 것이 어렵고, LCEL 방식의 코드는 Mocking도 어려울 뿐더러 테스트 코드가 복잡해지거나, 어려워진다.

이런 경우 Fake LLM이 도움이 될 수 있다.


## 해결 방안

### FakeListLLM

Langchain에는 위의 문제를 해결하기 위해
`langchain.llms.fake` 패키지에서 `FakeListLLM`, `FakeStreamingListLLM`을 제공한다.
이들 LLM을 이용해서 
## 질문 & 확장

(없음)

## 출처(링크)

- https://rudaks.tistory.com/entry/langchain-Fake-LLM-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

## 연결 노트
