---
tags:
  - OS
aliases: 
created: 2024-12-13
title: Context Switching
note-type: COMMON
completed: true
---
---

## 내용(Content)

### Context Switching

**컴퓨터 시스템에서 Context Switching은 CPU가 한 프로세스에서 다른 프로세스로 전환하는 과정을 말한다.** Kernel이 주체가 되어 동작한다. ^d23b1f

### Context Switching의 필요성

- **멀티태스킹 지원**: 현대의 운영 체제는 여러 프로세스를 **[[03. Permanent Notes/Area/CPU의 작업 처리 방식 (병렬성과 동시성)#^efaeef|동시성]]에 실행**하기 위해 CPU를 공유해야 한다. Context Switching은 이러한 멀티태스킹 환경에서 필수적이다.
- **인터럽트 처리**: 특정 하드웨어나 소프트웨어 이벤트가 발생할 때, 운영 체제가 기존 프로세스를 중단하고 인터럽트를 처리할 수 있도록 돕는다.
- **공정한 CPU 자원 분배**: 프로세스가 공정하게 CPU 시간을 사용할 수 있도록 보장한다.

>[!caution]
>3가지 모두 멀티 태스킹에 의해서 인터럽트가 발생하고 그 이유가 CPU 자원의 공정한 분배이때문에 서로 깊이 연관되어 있는 특징이다.


### Context Switching의 과정

1. **현재 프로세스 상태 저장**
    - 실행 중인 프로세스의 **CPU 레지스터**, **프로세스 상태**, **프로세스 제어 블록(PCB: Process Control Block)** 등을 메모리에 저장합니다.
2. **다음 프로세스 선택**
    - 스케줄러(Scheduler)가 다음에 실행할 프로세스를 결정합니다. (예: 우선순위 기반, 라운드 로빈 등)
3.  **새 프로세스 상태 복원**
    - 선택된 프로세스의 저장된 상태를 메모리에서 읽어와 CPU에 로드합니다.
4.  **새 프로세스 실행**
    - 복원된 상태로 작업을 이어서 실행합니다.

### Context Switching의 활용

#### 4.1 멀티태스킹 환경

- **운영 체제**: 윈도우, 리눅스 등 대부분의 운영 체제가 멀티태스킹을 지원하기 위해 Context Switching을 사용한다.
- **사용자 프로그램**: 여러 응용 프로그램이 동시에 실행되도록 CPU 시간을 나누어 제공한다.

#### 4.2 인터럽트 처리

- **하드웨어 이벤트**: 예를 들어, 키보드 입력이 발생하면 운영 체제는 현재 실행 중인 프로세스를 일시적으로 중단하고 입력을 처리한다.
- **시스템 호출**: 응용 프로그램이 운영 체제 기능을 요청할 때, Context Switching이 수행된다.

#### 4.3 멀티프로세싱과 병렬 처리

- **다중 CPU 환경**: 여러 프로세스가 각기 다른 CPU에서 실행될 수 있도록 스케줄링과 상태 전환에 활용된다.
- **스레드 관리**: 단일 프로세스 내에서 여러 스레드를 관리할 때도 Context Switching이 필요하다.

### Context Switching의 비용

- **CPU 오버헤드**: 상태를 저장하고 복원하는 과정은 추가적인 CPU 사이클을 소모한다.
- **캐시 무효화**: 프로세스가 전환되면서 CPU 캐시 메모리가 초기화되므로, 성능 저하를 초래할 수 있다.
- **자원 소모**: 고빈도 전환은 시스템의 전체적인 성능을 저하시킬 가능성이 있다


## 질문 & 확장

- Context Switching 비용을 최소화하기 위한 운영 체제 설계 방법은 무엇이 있을까?
- 특정 환경에서 Context Switching이 발생하지 않도록 최적화하는 기법은 무엇일까?


## 출처(링크)

- Andrew-S.-Tanenbaum-Modern-Operating-Systems
- [컨텍스트 스위칭의 이해와 중요성](https://lilys.ai/digest/2006153?s=1&nid=-1)

## 연결 노트

- down:: [[03. Permanent Notes/Area/멀티 태스킹 관점에서 Context Switching 이해]]