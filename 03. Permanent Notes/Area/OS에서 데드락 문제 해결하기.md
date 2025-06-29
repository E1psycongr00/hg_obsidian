---
tags:
  - OS
  - Process
  - Synchronization
  - Thread
aliases:
  - OS에서 DeadLock 문제 해결하기
title: OS에서 데드락 문제 해결하기
created: 2024-01-22T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-01-22
작성 시간: 15:12


----
## 내용(Content)
### OS의 데드락 해결 방법
>[!summary] 데드락을 해결하는 4가지 방법
>- Dead Lock 방지
>- Dead Lock 회피
>- Dead Lock 방지와 복구
>- Dead Lock 무시

#### Dead Lock 방지
Dead Lock을 방지한다는 것은 [[03. Permanent Notes/Area/DeadLock#데드락의 발생 조건|데드락의 4가지 발생 조건]]중 하나라도 만족을 못하게 디자인하는 것이다.

>[!tip]- mutual exclusion 방지
>리소스를 하나의 쓰레드가 아닌 여러 쓰레드가 동시에 접근하도록 허용함. 이 방법은 실제로 해결하기엔 문제가 너무 많은 방법
>

>[!tip]- hold and wait 방지
>- 사용한 리소스를 모두 획득한 후 시작
>- 리소스를 전혀 가지지 않은 상태에서만 리소스 요청
>
>![[Dead Lock 예시2(draw).svg|400]]
>예를 들면 위 그림에서 우측 차량이 2번으로 접근하려 할 때 다음 작업은 1번을 향해 가므로 윗 차량이 1번으로 못 가게 하고 2번 차량을 통과시킨 후 동작시키는 것이다. 
>
>**문제점1**
>이것의 문제점은 우측 차량이 너무 느려서 늦게 통과한다면 1번을 통과하려는 윗차량은 가만히 있으니 1번 리소스는 사용하지 않게 되니 효율이 떨어진다. 
>
>**문제점2**
>1번 2번을 모두 확보가 쉽지 않을 수도 있다. 그러면 우측 차량을 계속해서 갈 수 없고 우선 순위가 밀리기 때문에 Thread Starvation이 발생할 수 있다.

>[!tip]- no Preemption 방지
>추가적인 리소스를 기다려야 한다면 이미 획득한 리소스를 다른 프로세스가 선점하도록 한다. 사실 이와 같은 방법은 CPU 스케줄링에서 굉장히 많이 사용된다. [[03. Permanent Notes/Area/CPU 스케줄링 알고리즘#Round Robin(RR)|RR]] 알고리즘을 살펴보면 time slice를 통해서 기아 현상을 막고 프로세스간의 공평성을 부여하는데 이러한 방법을 적용시키면 Lock이 걸린 쓰레드가 양보를 통해 Dead Lock 방지가 가능하다
>

>[!tip]- circular wait 방지
>모든 리소스에 순서 체계를 부여해서 오름차순으로 리소스를 요청
>
>![[Dead Lock 예시2(draw).svg|400]]
>위의 예시에서 아래 차량이 4번 위에 올라갔다고 가정하자. 그러면 그 다음엔 2번을 통과해야 하는데 2는 4보다 작으므로 가지 못하게 Block하는 것이다. 차량의 예시에서는 말이 안될수 있겠지만 이를 통과시키려면 아래 차량은 2번을 통과하고 4번을 통과하게 하도록 하는 것이다. 이게 가능한 이유는 Lock 개념이라 완벽하게 도로와 차 상황가 일치하지 않는다. 알잘딱하게 이해하자
>


#### Dead Lock 회피
실행 환경에서 추가적인 정보를 활용해 Dead Lock 상황을 회피한다

>[!note] Banker 알고리즘
>리소스가 허락을 요청했을 때 데드락 발생 가능성이 있으면 리소스를 할당해도 안전할 때까지 계속 요청을 거절하는 알고리즘


#### Dead Lock 감지와 복구
데드락을 허용하고 감지하면 복구함

복구 전략
1. 데드락 걸린 모든 프로세스 또는 쓰레드 삭제
2. 리소스의 일시적 선점 허용

#### Dead Lock 무시
OS가 직접 이 문제를 해결하지 않는다. 개발자에게 맡긴다.
## 질문 & 확장

(없음)

## 출처(링크)
- https://www.youtube.com/watch?v=ESXCSNGFVto&list=PLcXyemr8ZeoQOtSUjwaer0VMJSMfa-9G-&index=7&t=2s

## 연결 노트
- [[03. Permanent Notes/Area/DeadLock]]
- [[03. Permanent Notes/Area/race condition]]









