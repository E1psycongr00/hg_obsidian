작성 날짜: 2023-11-10
작성 시간: 18:37

## 주제: #미완 #JAVA #Validation 

----
## 원문

### MessageCodesResolver가 필요한 이유

매번 Validation Message 를 작성하는것은 굉장히 피곤한 일이고, 코드를 길게 만든다. 그러나 범용성이 높은 Validation Message를 작성하는 것은 코드를 짧게 만들고, 유지 보수하기 좋게 만들지만, 때로는 세부적으로 에러 메시지를 전달해야 할 때가 있다.

MessageCodesResolver는 단계적으로 코드를 생성하며, 세부적인 내용에서 범용적인 내용 순으로 우선 순위를 가지고 관리한다. 이 때문에 코드를 이용하여 평소에는 범용적으로 사용하다가 필요할 때 세부적인 예외를 작성할 수 있게 된다.

### MessageCodesResolver 구성
Spring에서는 오류 메시지를 관리하기 위해서 `MessageCodesResolver` 를 사용한다. 기본 구현체는 DefaultMessageCodesResolver이다.

```java
public interface MessageCodesResolver {  

	String[] resolveMessageCodes(String errorCode, String objectName);  
  
	String[] resolveMessageCodes(String errorCode, String objectName, String field, @Nullable Class<?> fieldType);   
}
```


## 질문 & 확장

(없음)

## 출처(링크)
- https://docs.spring.io/spring-framework/reference/core/validation/conversion.html
- https://kapentaz.github.io/spring/Spring-Boo-Bean-Validation-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90/#
- https://catsbi.oopy.io/f6bc86a1-d19d-4647-bd12-b2d1d7db1b4b
## 연결 노트










