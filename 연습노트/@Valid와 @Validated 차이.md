작성 날짜: 2023-11-12
작성 시간: 13:21

## 주제: #미완 #JAVA #Validation 

----
## 원문
### @Valid
valid는 객체의 내부에 정의된 어노테이션의 유효성을 검증할 떄 사용한다.

예를 들어 다음과 같은 객체를 만들었다고 가정하자

```java
public class Person {
	@NotBlank
	private final String name;
	
	@Positive
	private final int age;
	// ....
}
```

어디선가는 이 Person을 사용하고 이 객체 안의 내용을 검증하고 싶을 것이다. 이럴 떄 @Valid를 사용한다.


### @Validated

Spring Bean Validation에서 추가된 어노테이션이다.


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










