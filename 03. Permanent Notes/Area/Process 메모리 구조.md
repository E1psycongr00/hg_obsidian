---
tags:
  - OS
  - Process
aliases: 
created: 2024-12-13
title: Process 메모리 구조
note-type: COMMON
completed: true
---
---

## 내용(Content)

### 프로세스 메모리 구조
프로세스 메모리 구조는 운영체제가 프로세스 실행을 위해 메모리를 할당하는 방식으로, 일반적으로 다음과 같은 영역으로 구성된다:

![[Process 메모리 구조(draw).svg|300 x 500]]

1. [[03. Permanent Notes/Area/Code 영역#^ff460d|코드 영역(Code Segment)]]
2. [[03. Permanent Notes/Area/Data 영역#^9406ee|데이터 영역(Data Segment)]]
3. [[03. Permanent Notes/Area/Heap 영역#^94ae88|힙 영역(Heap Segment)]]
4. [[03. Permanent Notes/Area/Stack 영역#^40ff2b|스택 영역(Stack Segment)]]

### OS에서 프로세스가 저장될 때 발생하는 일

![[프로세스가 메모리에 저장되는 과정(draw).svg|700]]

예를 들어 OS에서 카카오톡 프로그램을 실행한다고 가정하자. 그러면 카카오톡 프로세스가 만들어질 것이다. 프로세스가 생성된다는 것은 메모리와 CPU로 부터 자원을 할당 받는다는 의미이고, 프로세스가 OS에 적재되는 순간, RAM에 Stack, Heap, Data, Code 영역으로 이루어진 프로세스가 저장된다.

### Process의 자원 공유
프로세스는 메모리의 별도의 주소 공간에서 실행되기 때문에, 한 프로세스는 다른 프로세스의 데이터에 접근할 수 없다. 

그러나 프로세스 간 소통이 불가능한 것이 아니다. 프로세스 간의 정보를 공유하는 방법은 다음과 같다.

- IPC(Inter-Process-Communication)
- LPC(Local-Inter-Communication)
- 임의로 별도의 공유 메모리를 만들어 공유

프로세스 간의 소통이 가능하긴 하지만 큰 단점은 CPU 레지스터 교체 뿐만 아니라 RAM과 CPU 사이의 캐시 메모리도 초기화되기 때문에 비용이 크다는 단점이 있다. 그래서 멀티 프로세싱을 지원하긴 하지만 기본적으로 보다 비용이 적은 멀티 쓰레딩 방식을 선호한다.

## 질문 & 확장

- 프로세스 메모리 구조의 각 영역에서 발생할 수 있는 주요 문제점은 무엇인가? 
- 운영체제 별로 메모리 관리 방식이 어떻게 다른가?

## 출처(링크)

- Abraham-Silberschatz-Operating-System-Concepts-10th-2018
- [Process memory - Wikipedia](https://en.wikipedia.org/wiki/Process_memory)
- [👩‍💻 ‍완전히 정복하는 프로세스 vs 스레드 개념](https://inpa.tistory.com/entry/%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%E2%9A%94%EF%B8%8F-%EC%93%B0%EB%A0%88%EB%93%9C-%EC%B0%A8%EC%9D%B4#%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%9D%98_%EC%9E%90%EC%9B%90_%EA%B3%B5%EC%9C%A0)

## 연결 노트

- down:: [[03. Permanent Notes/Area/PCB(Process Controll Block)|PCB]]
- down:: [[03. Permanent Notes/Area/Stack 영역]]
- down:: [[03. Permanent Notes/Area/Data 영역]]
- down:: [[03. Permanent Notes/Area/Heap 영역]]
- down:: [[03. Permanent Notes/Area/Code 영역]]





