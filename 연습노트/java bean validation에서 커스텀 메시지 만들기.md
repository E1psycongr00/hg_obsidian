작성 날짜: 2023-11-10
작성 시간: 12:31

## 주제: #미완 #IT #JAVA #Validation 

----
## 원문

### Message 직접 작성하기

```java
@Positive(message = "양수만 가능합니다")  
private final int productNo;
```


이렇게 직접 어노테이션에 속성 message를 줄 수 있다.

단점은 매번 이렇게 message를 작성하는 것은 불필요한 중복 코드를 작성하게 될 가능성이 크다.

### MessageTemplate 활용하기

ContraitViolation 객체 속성을 살펴보면
ConstraintViolationImpl{interpolatedMessage='과거 또는 현재의 날짜여야 합니다', propertyPath=salStartAt, rootBeanClass=class backjoon.Product, messageTemplate='{javax.validation.constraints.PastOrPresent.message}

이렇게 messageTemplate이 있음을 알 수 있다. 이 때 참조하는 template을 직접 수정해도 되고, 내가 지정한 

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










