---
tags:
  - 완성
  - AutoGen
  - 채팅시스템
aliases: 
date: 2025-01-14
title: autogen 순차적 패턴 과정 이해
---

---

## 내용(Content)


### Sequential Chatting: AI 에이전트 간 효과적인 연속 대화 시스템
Autogen 프레임워크의 Sequential Chatting(순차적 채팅) 시스템은 AI 에이전트 간 협업을 체계적으로 관리하고, 각 에이전트의 전문성을 최대한 활용할 수 있게 해준다. 이 글에서는 Carry Over System을 중심으로 Sequential Chatting의 구조와 사용 방법을 상세히 살펴보겠다.

### Sequential Pattern의 기본 구조

Sequential Chatting은 여러 AI 에이전트가 순차적으로 대화하며 정보를 축적하고 처리하는 시스템이다. 이 시스템의 핵심은 맥락(Context)을 다음 에이전트에게 효과적으로 전달하는 Carry Over System이다.

### 작동 원리 예시

![[Autogen 순차적 채팅 동작 과정 (draw).svg]]

Carry Over 시스템을 이해하기 위해 그림과 함께 동작 과정 예시를 설명하겠다.

시스템은 다음과 같은 순서로 작동한다:

1. A 에이전트가 B 에이전트와 첫 번째 대화를 수행한다
2. 첫 번째 대화의 요약(Summary)이 생성된다
3. A 에이전트가 C 에이전트와 두 번째 대화 시 이전 요약을 포함하여 전달한다
4. 이러한 과정이 마지막 에이전트까지 순차적으로 진행된다


**예시 코드:**

```python
chat_result = a_agent.initiate_chats([
    {
        "recipient": b_agent,
        "message": "question 1",
        "max_turns": 2,
        "summary_method": "last_msg"
    },
    {
        "recipient": c_agent,
        "message": "question 2",
        "max_turns": 2,
        "summary_method": "last_msg"
    },
    {
        "recipient": d_agent,
        "message": "question 3",
        "max_turns": 3,
        "summary_method": "reflection_with_llm",
        "summary_args": {
            "summary_prompt": "Your custom summary prompt here"
        }
    }
])
```

### Context 관리 시스템

각 단계에서 생성되는 Context는 누적되어 전달되므로 마지막 에이전트가 이전의 모든 대화 내용을 고려하여 최종 결정을 내릴 수 있다. 주요 특징은 다음과 같다:

1. Context 누적 방식
    - 이전 대화 요약이 순차적으로 축적된다
    - 각 단계의 질문과 함께 전달된다
    - 정보의 연속성이 유지된다
2. 데이터 전달 구조
    - Question + Previous Summaries 형태로 전달된다
    - 체계적인 정보 관리가 이루어진다
    - 효율적인 메모리 사용이 가능하다


### summary 전략

Autogen에서 제공하는 Summary 전략은 크게 2가지이다.

1. **last_msg 전략:**

```python
{
    "recipient": b_agent,
    "message": "question 1",
    "max_turns": 2,
    "summary_method": "last_msg"
}
```

이 방식은 마지막 응답만을 다음 단계로 전달하며, 간단하고 직관적이다.

2. **reflection_with_llm 전략:**

```python
{
    "recipient": d_agent,
    "message": "question 3",
    "max_turns": 3,
    "summary_method": "reflection_with_llm",
    "summary_args": {
        "summary_prompt": "Your custom summary prompt here"
    }
}
```

LLM을 활용한 지능적 요약 방식으로, 더 정교한 Context 관리가 가능하다.


### 활용 가이드라인

#### 적합한 사용 사례

- 단계별 정보 수집이 필요한 프로젝트
- 순차적 의사결정 프로세스
- 복잡한 작업의 단계별 분해

#### 주의 사항

- 비선형적 작업 흐름에는 부적합
- 반복적 피드백이 필요한 경우 다른 패턴을 고려
- 에이전트 간 복잡한 상호작용이 필요한 경우에는 제한적

### 결론

Sequential Chatting 시스템은 복잡한 작업을 체계적으로 분해하고 처리하는 데 매우 효과적인 도구이다. Context의 누적 전달을 통해 각 에이전트의 전문성을 최대한 활용하면서도, 전체적인 작업의 일관성을 유지할 수 있다.

## 질문 & 확장

(없음)

## 연결 노트

## 출처(링크)





