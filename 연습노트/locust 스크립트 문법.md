작성 날짜: 2023-12-01
작성 시간: 14:46

## 주제: #미완 #Locust #부하테스트 

----
## 내용(Content)

### User class
사용자 클래스는 Locust 시뮬레이션시 반드시 필요한 클래스이다. locust에서 동시 사용자 수를 지정할 때 해당 User Class를 기반으로 인스턴스를 생성한다.

User Class가 가지는 특징을 알아보자

#### wait_time 속성
사용자 wait_time 속성을 지정하면 각 작업 실행 후 시간 지연이 발생한다. 따로 wait_time을 지정하지 않으면 작업이 완료되자 마자 다음 작업이 실행된다.

wait_time을 정의하는 방법은 두 가지가 있다.

- constant: 정해진 시간
	- constant_throughput: 작업이 초당 x회 실행되도록 보장하는 적응 시간
	- constant_pacing: 작업이 주기당
- between: 최소값과 최대값 사이의 임의 시간

## 질문 & 확장

(없음)

## 출처(링크)
- https://kim-dragon.tistory.com/133
- https://docs.locust.io/en/stable/writing-a-locustfile.html
- https://bcho.tistory.com/1369

## 연결 노트










