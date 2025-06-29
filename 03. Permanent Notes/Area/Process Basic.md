---
tags:
  - OS
  - Process
aliases:
  - 프로세스
  - 프로세스 기본
title: Process Basic
created: 2024-12-09T00:00:00.000Z
note-type: COMMON
completed: true
---

----
## 내용(Content)

### 프로세스란?

>[!summary]
> 독립적인 실행 단위로, 프로그램이 메모리에 로드 되어 CPU 자원을 할당 받아 **실행 중인 상태**

^e8fa94

프로세스는 **운영 체제에서 실행되는 독립적인 프로그램의 인스턴스**이다.
각 프로세스는 고유한 메모리 공간과 자원을 가지며, 다른 프로세스와 격리되어 작동한다. ^b26d05

- **주요 특징**:
    
    - 독립적인 실행 단위.
    - 별도의 메모리 공간(코드, 데이터, 스택, 힙)을 소유.
    - 다른 프로세스와 통신 시 **IPC(Inter-Process Communication)**가 필요.
- **예시**:
    
    - 웹 브라우저, 텍스트 에디터, 음악 플레이어와 같은 애플리케이션.

### 프로세스 확인 예시

![[Pasted image 20240104135739.png]]

작업 관리자를 살펴보면 프로세스 항목에 여러 프로그램 항목들이 나와 있고, 우측에 소모되는 자원이 표시된다. 프로세스는 CPU에서 로드되어 실행중인 상태, 즉 인스턴스이기 떄문에 자원을 소모한다.

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트

- down:: [[03. Permanent Notes/Area/Program vs Process]]
- down:: [[03. Permanent Notes/Area/Process 메모리 구조]]
- down:: [[03. Permanent Notes/Area/Process 컨텍스트 스위칭|Process Context Switching]]
- down:: [[03. Permanent Notes/Area/프로세스 상태 전이]]
- down:: [[03. Permanent Notes/Area/Inter Process Communication]]
- down:: [[03. Permanent Notes/Area/Process vs Thread]]



