작성 날짜: 2023-10-11
작성 시간: 09:59

## 주제: #미완 #IT #JAVA 

----
## 원문

### GC를 이해하기 전에 알아야 할 것

> **'stop-the-world'**
	GC를 실행하기 위해 JVM이 애플리케이션 실행을 멈추는 것, stop the world가 발생하면 GC를 실행하는 쓰레드 이외의 나머지 쓰레드는 모두 작업을 멈춘다.

GC작업 중에는 GC 쓰레드 이외 모든 쓰레드가 작업을 멈추기 떄문에 적당한 GC를 선택하는것, 그리고 GC를 튜닝하는 작업은 stop the world 시간을 줄이는 것으로 이해할 수 있다.

### 개발자가 절대로 하지 말아야 할 메서드 System.gc()

Java는 프로그램 코드에서 명시적으로 메모리를 해제하지 않는다. 가끔 명시적으로 해제하기 위해 null을 활용하는 경우가 있다. 이는 문제가 되지 않는다. 하지만 직접 GC를 호출하는 System.gc()는 절대로 사용해서는 안된다. 


## 질문 & 확장

(없음)

## 출처(링크)
- https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html
- https://mangkyu.tistory.com/118
- https://d2.naver.com/helloworld/329631
- https://d2.naver.com/helloworld/1329
## 연결 노트










