작성 날짜: 2023-11-24
작성 시간: 14:03

## 주제: #미완

----
## 원문

### 사용하는 이유
Spring Converter는 Controller에서 데이터를 받아올 때 데이터간 타입 변환에 주로 사용된다. 
주로 String -> object 또는 Integer -> object로 많이 사용되며, object -> object와 같이도 사용할 수 있다.


### Spring에서 컨버터를 관리하는 방법

Spring에서는 Converter를 MVC ConversionService를 이용해 관리한다. 해당 객체는 여러 conversion을 보관하고 있다가 데이터 바인딩이 필요한 시점에 호출된다.

컨버터를 ConversionService에 주입하는 데는 2가지 방법이 있다.

1. Bean 활용하기
2. Converter

### 사용 방법




## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










