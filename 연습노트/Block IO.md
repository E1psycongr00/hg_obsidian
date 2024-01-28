---
tags:
  - OS
  - 네트워크
aliases:
---
작성 날짜: 2024-01-26
작성 시간: 17:12

## 주제: #미완 #OS #네트워크 

----
## 내용(Content)
### I/O
>[!summary] I/O
>INPUT/OUTPUT, 데이터의 입출력의 의미를 가진다

**IO의 종류**
- 네트워크(socket)
- file
- pipe
- device

### Socket
>[!summary] 소켓
>네트워크 통신은 두 컴퓨터 간의 소켓을 통해 이루어진다. 양측 모두 소켓을 열어야 통신이 가능하다.
>
>![[네트워크 소켓 통신(draw)]]

>[!summary] 백엔드 서버의 소켓
>백엔드 서버에서는 네트워크 통신을 위해 여러 소켓이 존재하고 소켓을 열어야 다른 서버의 소켓을 통해 통신이 가능하다
>![[백엔드 서버 소켓(draw)]]

### Block IO (네트워크 관점)
>[!summar] Block IO
>I/O 작업을 요청한 프로세스/스레드가 요청 완료 전까지 Block됨
>
>![[OS 관점 Block IO 과정(draw)|600]]

위의 그림과 같인 **Read**라는 시스템 콜을 호출하면 응답 전까지 Block되고 쓰레드는 아무런 역할을 하지 않고 Block 된다.

소켓 입장에서는 buffer의 상태에 따라 read 또는 write라는 시스템 콜을 요청한 쓰레드가 Blocked 될 수 있다. 소켓에는 sendBuffer와 receiveBuffer가 있는데 받는 소켓의 경우에는 recv 버퍼가 비어있다면 계속 대기하고, 소켓에 쓰는 요청을 보냈을 경우 writeBuffer가 가득 차있다면 대기한다.



## 질문 & 확장

(없음)

## 출처(링크)
- https://www.youtube.com/watch?v=mb-QHxVfmcs

## 연결 노트










