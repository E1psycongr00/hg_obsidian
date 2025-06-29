---
tags:
  - OS
  - Process
  - PCB
aliases:
  - Process Control Block
  - PCB 정의
  - PCB
title: PCB(Process Controll Block)
created: 2024-01-05T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-01-05
작성 시간: 20:09



----
## 내용(Content)

### PCB란
**PCB는 프로세스 스케줄링을 위해 프로세스에 관한 정보를 저장하는 임시 저장소이다** ^cbc3eb

PCB는 운영체제에서 프로세스를 관리하기 위해 해당 프로세스의 상세 정보를 담고 있는 자료 구조를 말한다.

프로세스를 컨텍스트 스위칭할 때 기존 프로세스의 상태를 어딘 가에 저장을 해둬야 나중에 새로 해야 할 작업 상태나 다시 작업을 결정할지에 대한 작업을 쉽게 할 수 있다.

### PCB 구조
PCB는 프로세스와 라이프 사이클을 함께 한다. 프로세스가 생성되면 메모리에 해당 프로세스의 PCB가 생성되며 프로세스 소멸 시 같이 소멸한다.

OS는 PCB에 담긴 프로세스 고유 정보를 이용해 프로세스를 관리하며, 프로세스의 실행 상태를 파악하고, 우선순위 조정 및 스케줄링을 하고 다른 프로세스 간의 동기화를 제어한다.

![[PCB 구조(draw).svg|400]]

| 종류            | 설명                                                              |
| --------------- | ----------------------------------------------------------------- |
| Pointer         | 프로세스의 현재 위치를 저장하는 정보                              |
| Process State   | 프로세스의 각 상태(new, ready, running, waiting, terminated) 저장 |
| Process id(PID) | 프로세스의 식별자 ID                                              |
| Program Counter | 프로세스를 위해 다음에 실행될 명령어 주소를 포함하는 카운터 저장  |
| Register        | 누산기, 베이스 등을 포함하는 CPU 레지스터 정보                    |
| Memory Limit    | 운영 체제에서 사용하는 메모리 관리 시스템에 대한 정보             |
| List of Open File                | 프로세스를 위해 열린 파일 목록                                                                  |
## 질문 & 확장

(없음)

## 출처(링크)
- https://inpa.tistory.com/entry/%F0%9F%91%A9%E2%80%8D%F0%9F%92%BB-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%E2%9A%94%EF%B8%8F-%EC%93%B0%EB%A0%88%EB%93%9C-%EC%B0%A8%EC%9D%B4#%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%9D%98_%EC%9E%90%EC%9B%90_%EA%B5%AC%EC%A1%B0


## 연결 노트










