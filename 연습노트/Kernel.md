---
tags:
  - OS
aliases:
---
작성 날짜: 2024-01-25
작성 시간: 12:25

## 주제: #미완 #OS 

----
## 내용(Content)
### 커널

>[!summary] 커널
>커널은 인터페이스로서 응용프로그램 수행에 필요한 여러가지 서비스를 제공하고, CPU, 메모리 등의 리소스를 관리하는 역할을 수행한다.
>- 사용자가 SystemCall을 통해 컴퓨터 자원을 사용할수 있게 해주는 자원 관리자라고 할 수 있다.


커널은 항상 컴퓨터 자원만을 바라보기 떄문에 사용자와의 상호작용은 지원하지 않으나, 사용자와 상호작용하기 위해 Shell을 활용하기도 한다.

### 커널의 자원 관리
**커널이 관리하는 자원**
- Task(Process) Management: CPU를 추상적 자원 Task로 제공
- Memory Management: 메모리를 추상적 자원인 Page와 Segment로 제공
- File System: 디스크를 추상적 자원인 추상적 자원인 File로 제공
- Network Management: Network 장치를 추상적 자원인 Socket으로 제공
- Device Driver Management: 각종 외부 장치 접근 
- Interrupt Handling: 인터럽트 핸들러
- I/O Communication: 입출력 통신 관리



### 유저 모드와 커널 모드의 관계(Interface)





## 질문 & 확장

(없음)

## 출처(링크)
- https://minkwon4.tistory.com/295

## 연결 노트










