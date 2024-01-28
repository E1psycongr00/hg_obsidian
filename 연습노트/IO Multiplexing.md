---
tags:
  - OS
  - 네트워크
aliases:
---
작성 날짜: 2024-01-28
작성 시간: 10:17

## 주제: #미완 #OS #네트워크 

----
## 내용(Content)
### 멀티플렉싱
>[!summary] IO multiplexing == Async Blocking IO
>하나의 프로세스가 관심있는 여러 IO 작업을 동시에 모니터링하고 한번에 처리하는 메커니즘
>![[IO multiplexing(draw)|600]]

IO 관점에서 멀티 플렉싱은 하나의 프로세스가 여러 파일을 관리하는 기법으로 설명할 수 있다. server-client 환경이라면 하나의 server에서 여러 socket 즉, 파일을 관리하여 여러 client가 접속할 수 있게 구성되기 때문이다.

프로세스에서 특정 파일에 접근할 때 [[파일 디스크립터]]를 사용하게 되는데, 해당 FD를 어떻게 활용하는지가 IO multiplexing의 핵심이 된다. 여기서 커널 응답에 대해 어떤 방식으로 대기하느냐에 따라 select, poll, epoll(linux), kqueue(bsd), iocp(windows)로 나뉜다.


>[!note] 파일
>프로세스가 [[Kernel|커널]]에 진입할 수 있도록 중간에 이어주는 역할을 하는 인터페이스

>[!faq] 시스템 콜 요청에 대해서 곧바로 응답은 non-blocking 아닌가?
>맞는 말이다. 그러나 multiplexing은 multiplexing 함수를 호출한 시점에서 봐야 한다. 위 그림의 경우 select() 함수를 호출한 시점에 block이 되고 이 과정에서 멀티플렉싱에 대한 메인 처리를 수행하기 때문에 Blocking IO인 것이다.

>[!faq] read 요청에 대한 non-blocking 작업을 하는 이유
>select() 결과에 따라 system call을 호출해서 non-blocking 요소를 없앨 수 있다. 그러나 데이터가 **checksum** 문제로 폐기되는 일부 상황의 경우에는 select() 함수가 어떤 FD를 읽다가 Block이 될 수 있다. 이러한 상황에 대비해 데이터를 줄 수 없는 경우 errorcode를 즉시 리턴하도록 설계하여 안정성을 높일 수 있다.


## 질문 & 확장

(없음)

## 출처(링크)
- https://velog.io/@octo__/BlockingNon-Blocking-IO-IO-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%86%B5%EC%A7%80-%EB%AA%A8%EB%8D%B8
- https://blog.naver.com/n_cloudplatform/222189669084
## 연결 노트
- [[Non-Blocking IO]]
- [[Blocking IO]]
- [[운영 체제(OS)|운영체제]]
- [[Kernel]]
- [[파일 디스크립터]]






