---
tags:
  - OS
  - 네트워크
aliases:
---
작성 날짜: 2024-01-28
작성 시간: 09:25

## 주제: #미완 #OS #네트워크 

----
## 내용(Content)
### Non-Block IO
>[!summary] Non-Block IO
>프로세스/스레드를 Block 시키지 않고 요청에 대한 현재 상태를 즉시 리턴함
>
>![[non-block Io(draw)|600]]

Blocked IO는 [[Kernel]]에서 read 동작시 [[시스템 콜]]을 요청한 Thread가 Block되지만 Non-Blocked IO의 경우 Block되지 않고 즉시 현재 상태를 리턴 후 Thread는 계속해서 동작한다. 차이점은 어떤 방법에 의해서 response을 응답 받은 사실을 알아내고 그 이후 다시 [[시스템 콜]]을 요청해 커널로부터 데이터를 받아온다.

커널이 IO 작업이 끝났는지 확인하는 작업 종류에 따라 **Non-Blocking** 방식이 달라진다.

1. 폴링(완료되었는지 지속적인 요청으로 확인)
2. IO multiplexing
3. callback & signal

## 질문 & 확장

(없음)

## 출처(링크)
- https://www.youtube.com/watch?v=mb-QHxVfmcs
## 연결 노트
- [[시스템 콜]]
- [[인터럽트와 시스템 콜 동작 과정]]
- [[Kernel|커널]]
- [[IO Multiplexing]]








