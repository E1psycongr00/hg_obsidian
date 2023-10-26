작성 날짜: 2023-10-26
작성 시간: 19:21

## 주제: #미완 #솔루션

----

## 문제 & 원인

Hello라는 객체의 엔티티가 있다고 하자. 

우리는 data jpa repository에서 [[data jpa Projection 인터페이스|closed projection]]을 활용해 정보를 가져오는데 만약 여러 projection이 있고 이를 비슷한 네이밍 규칙을 활용해 spring data repository를 작성할 수 있는 방법이 있을까?


## 해결 방안

### 객체 리턴 타입을 명시하기

만약 Hello 엔티티와 HelloInfo라는 projection 두 가지 타입을 name을 활용해 데이터를 가져오고 싶다고 가정하자. 이 때 가져오려는 데이터가 Projection이

## 질문 & 확장

(없음)

## 출처(링크)
- https://velog.io/@max9106/JPA-Projection

## 연결 노트
