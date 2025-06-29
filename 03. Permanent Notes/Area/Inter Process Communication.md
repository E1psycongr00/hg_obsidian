---
tags:
  - OS
  - Process
aliases:
  - IPC
created: 2024-12-13
title: Inter Process Communication
note-type: COMMON
completed: true
---
---

## 내용(Content)

### IPC란 무엇인가?
프로세스 간 통신(IPC, Inter-Process Communication)은 동일한 시스템에서 실행 중인 여러 프로세스가 서로 데이터를 교환하고 협력할 수 있도록 하는 메커니즘이다. 운영체제는 프로세스 간 격리를 기본적으로 제공하지만, 필요에 따라 프로세스 간 협력을 지원하기 위해 다양한 IPC 메커니즘을 제공한다.

### IPC의 필요성

1. **데이터 교환**: 하나의 프로세스가 다른 프로세스의 데이터를 읽거나 수정해야 할 때.
2. **리소스 공유**: 프로세스들이 동일한 리소스(예: 파일, 메모리)를 공동으로 사용할 때.
3. **작업 분할**: 하나의 큰 작업을 여러 프로세스가 나누어 수행할 때.
4. **동기화**: 프로세스들 간의 실행 순서를 조정해야 할 때.

### IPC 상세 동작 과정

![[IPC 통신 과정 (draw).svg]]


#### 1. 채널 생성 (Channel Creation)
- **설명**: 송신자와 수신자가 데이터를 주고받기 위해 통신 채널을 생성하는 단계.
- **동작 과정**:
	1. **송신자**가 커널에 통신 채널 생성(또는 연결)을 요청한다.
	2. 커널이 지정된 IPC 메커니즘(파이프, 메시지 큐, 소켓, 공유 메모리 등)을 통해 채널을 생성한다.
	3. 채널 식별자(핸들, FD)가 송신자와 수신자에게 전달된다.
	4. 생성 과정에서 **리소스 부족**, **권한 문제** 등의 에러를 처리한다.

#### 2. 데이터 준비 (Data Preparation)
- **설명**: 송신자가 전송할 데이터를 포장하거나 변환하여 전송 가능한 상태로 준비하는 단계.
- **동작 과정**:
	1. 송신할 데이터를 **필요한 포맷**(JSON, 바이너리, 구조체 등)으로 변환·직렬화한다.
	2. 커널이 데이터 크기와 형식을 확인한다.데이터 크기, 형식, 엔디언 등을 고려하여 호환성을 확보한다.
	3. 커널 혹은 라이브러리가 전송 전 데이터 유효성을 확인할 수 있다

#### 3. 데이터 전송 (Data Transmission)
- **설명**: 송신자가 데이터를 IPC 채널을 통해 전송하는 단계.
- **동작 과정**:
	1. 송신자가 **쓰기 연산(Write)**을 통해 채널에 데이터를 전달한다.
	2. 커널(또는 IPC 관리 모듈)이 **버퍼**에 데이터를 담거나, 공유 메모리라면 프로세스 간 접근 가능 영역에 복사한다.
	3. **블로킹/논블로킹 모드** 및 **동기화** 이슈를 고려한다(전송 버퍼가 가득 찬 경우 대기 등).

#### 4. 데이터 전달 (Data Delivery)
- **설명**: 커널이 데이터를 수신자에게 전달하는 단계.
- **동작 과정**:
	1. 커널은 버퍼에 있는 데이터를 **수신자 프로세스** 쪽으로 준비한다.
	2. **알림(Interrupt, Signal, Poll, Event)** 또는 **블로킹 해제** 등을 통해 수신자에게 도착 사실을 전달한다.
	3. 전송 중 에러나 채널 이상 여부를 모니터링한다.

#### 5. 데이터 수신 (Data Reception)
- **설명**: 수신자가 데이터를 읽고 처리하는 단계.
- **동작 과정**:
	1. 수신자는 **읽기 연산(Read)**을 통해 채널에서 데이터를 가져온다.
	2. 필요하다면 역직렬화(Deserialization)를 통해 원본 데이터 형태로 복원한다.
	3. 수신자는 데이터를 해석·처리하며, 처리 결과를 준비한다.

#### 6. 응답 처리 (Response Handling)
- **설명**: 수신자가 송신자에게 작업 결과나 응답 데이터를 전달하는 단계.
- **동작 과정**:
	1. 수신자는 처리 결과나 응답 데이터를 다시 **채널에 기록**하거나, 별도의 IPC 채널/메커니즘을 통해 송신자에게 전달한다.
	2. 송신자는 해당 응답을 읽고, 후속 작업을 수행하거나 통신 세션을 종료한다.

#### 7. (추가) 채널 종료 (Channel Termination)
- **설명**: 더 이상 사용하지 않는 채널을 종료한다.
- **동작 과정**:
	1. 송신자와 수신자가 더 이상 통신이 필요 없으면 채널을 닫는다.
	2. 커널은 사용 중이던 리소스(버퍼, FD, 메모리 매핑 등)를 해제한다.
	3. 명시적인 종료 처리를 통해 리소스 누수를 방지한다.

## IPC의 주요 메커니즘
운영체제는 다양한 IPC 메커니즘을 제공하며, 이들은 시스템 요구 사항과 설계 목표에 따라 선택된다.

#### 1. **파이프 (Pipes)**
- **설명**: 한 프로세스에서 다른 프로세스로 데이터 스트림을 전달하기 위한 단방향 통신 메커니즘.
- **특징**:
  - 익명 파이프는 부모-자식 관계의 프로세스 간에만 사용 가능.
  - 명명된 파이프(Named Pipes)는 관련 없는 프로세스 간에도 통신 가능.
- **사용 예시**:
  - `ls | grep`와 같은 Unix 명령어 파이프라인.

#### 2. **메시지 큐 (Message Queues)**
- **설명**: 운영체제가 관리하는 큐를 통해 프로세스 간 메시지를 주고받는 메커니즘.
- **특징**:
  - 메시지를 순서대로 전달 가능.
  - 비동기적으로 동작하므로 송신과 수신이 독립적.
- **사용 예시**:
  - 비동기 로그 전송, 이벤트 기반 시스템.

#### 3. **공유 메모리 (Shared Memory)**
- **설명**: 두 개 이상의 프로세스가 같은 메모리 영역에 접근하여 데이터를 공유.
- **특징**:
  - 빠른 데이터 교환.
  - 동기화를 위해 별도의 메커니즘(예: 세마포어)이 필요.
- **사용 예시**:
  - 대용량 데이터 처리, IPC 성능 최적화.

#### 4. **소켓 (Sockets)**
- **설명**: 네트워크를 통한 프로세스 간 통신 메커니즘. 로컬 또는 원격 통신에 사용.
- **특징**:
  - TCP/IP 또는 UDP 프로토콜 기반.
  - 네트워크와 무관하게 데이터 교환 가능.
- **사용 예시**:
  - 클라이언트-서버 모델, 웹 애플리케이션.

#### 5. **메모리 맵 (Memory Map)**
- **설명**: 파일이나 메모리를 가상 주소 공간에 매핑하여 프로세스 간 데이터 공유.
- **특징**:
  - 공유 메모리와 유사하지만 파일 기반.
  - 디스크 I/O를 줄여 성능 향상.
- **사용 예시**:
  - 대규모 데이터 파일 처리.

## IPC 설계 시 고려 사항

1. **성능**: 통신 메커니즘이 데이터 전송 속도에 미치는 영향.
2. **보안**: 민감한 데이터의 보호와 접근 제어.
3. **확장성**: 여러 프로세스가 동시에 통신할 때의 안정성.
4. **운영체제 지원**: 특정 메커니즘이 대상 운영체제에서 지원되는지 확인.

## 질문 & 확장

1. 공유 메모리와 메시지 큐는 어떤 상황에서 선택해야 할까?
2. IPC를 활용한 분산 시스템 설계 방법은 무엇인가?
3. IPC 메커니즘의 병목 현상을 해결하는 방법은 무엇인가?

## 출처(링크)

- Andrew S. Tanenbaum, _Modern Operating Systems_, Pearson.
- Linux Programmer’s Manual, man pages (e.g., `man pipe`, `man shm`).
- W. Richard Stevens, _UNIX Network Programming_.

## 연결 노트


