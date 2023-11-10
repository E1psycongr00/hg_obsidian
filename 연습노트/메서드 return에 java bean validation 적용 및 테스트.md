작성 날짜: 2023-11-10
작성 시간: 12:04

## 주제: #미완

----
## 원문
### 메서드 리턴에 Validation 적용하기

#### 파라미터 validaiton 코드

```java
public class Calculator {  
  
    @Min(100000)  
    public int calculate(@Min(1_000) int price,  
       @Max(3000) int discountPrice) {  
       return price - discountPrice;  
    }  
}
```

메서드 위에 적용해주면 된다.


#### 테스트 코드

```java
@Test  
void returnTest() throws NoSuchMethodException {  
    // ExecutableValidator 생성  
    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();  
    ExecutableValidator validator = factory.getValidator().forExecutables();  
  
    // Calculator 객체 생성  
    Calculator calculator = new Calculator();  
    Method method = calculator.getClass().getMethod("calculate", int.class, int.class);  
  
    Set<ConstraintViolation<Calculator>> violations = validator.validateReturnValue(  
       new Calculator(), method, 0  
    );  
  
    // validation 결과 출력  
    violations.forEach(System.out::println);  
}
```


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










