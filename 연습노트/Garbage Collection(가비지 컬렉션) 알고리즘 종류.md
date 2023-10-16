
작성 날짜: 2023-10-11
작성 시간: 18:12

## 주제: #미완 #IT #JAVA #GC 

----
## 원문

### Serial GC
Mark and Sweep 이라는 과정으로 진행된다. Old Generation에는 Mark Sweep Compact 라는 알고리즘이 사용된다.  해당 알고리즘은 Mark Sweep에 Compact라는 작업이 추가된 것이다. Compact란 Heap 영역을 정리하기 위한 단계로 유효한 객체들이 연속되게 쌓이도록 앞 부분부터 채워서 객체가 존재하는 부분과 존재하지 않는 부분으로 나누는 것이다. 

Serial GC는 CPU 코어가 하나일 때 설계된 GC로 모든 가비지 컬렉션 일을 처리하기 위해 하나의 쓰레드만을 이용한다. 여러 CPU를 운영하는 서버의 경우에는 Serial GC는 적합하지 않다.

### Parallel GC
Thoughtput GC로 불리기도 한다. 기본 처리 과정은 

## 질문 & 확장

(없음)

## 출처(링크)
- https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html
- https://mangkyu.tistory.com/118
- https://mangkyu.tistory.com/119
- https://d2.naver.com/helloworld/329631
- https://d2.naver.com/helloworld/1329

## 연결 노트










