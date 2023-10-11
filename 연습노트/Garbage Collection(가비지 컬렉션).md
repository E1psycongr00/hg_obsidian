작성 날짜: 2023-10-11
작성 시간: 09:59

## 주제: #미완 #IT #JAVA 

----
## 원문

### Garbage Collection이란

프로그램을 개발하다 보면 유효하지 않은 메모리인 Garbage가 발생한다. C의 경우에는 직접 해제해주어야 하지만, Java의 경우에는 개발자가 직접 메모리를 해제하지 않는다. 그 이유는 JVM에 내장되어 있는 Garbage Collector가 알아서 불필요한 메모리를 정리해주기 때문이다. 

이런 GC를 공부하고 이해해야 하는 이유는, GC가 돌아갈 때는 GC 쓰레드 이외에 모든 쓰레드가 멈추기 때문이다. 이를 'stop the world'라고 부르기도 한다.

GC작업 중에는 GC 쓰레드 이외 모든 쓰레드가 작업을 멈추기 떄문에 적당한 GC를 선택하는것, 그리고 GC를 튜닝하는 작업은 stop the world 시간을 줄이는 것으로 이해할 수 있다.


Java는 프로그램 코드에서 명시적으로 메모리를 해제하지 않는다. 가끔 명시적으로 해제하기 위해 null을 활용하는 경우가 있다. 이는 문제가 되지 않는다. 하지만 직접 GC를 호출하는 System.gc()는 절대로 사용해서는 안된다. 


## 질문 & 확장

(없음)

## 출처(링크)
- https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html
- https://mangkyu.tistory.com/118
- https://d2.naver.com/helloworld/329631
- https://d2.naver.com/helloworld/1329
## 연결 노트










