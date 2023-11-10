작성 날짜: 2023-11-10
작성 시간: 18:36

## 주제: #미완 #JAVA #Validation 

----
## 원문

### @RequestBody에서 Validation 에러가 발생한 경우

#### 원인

@Valid와 @RequestBody에서 Validation이 발생한 경우 400 코드 응답이 뜬다. 그리고 [[MethodArgumentNotValidException이란|MethodArgumentNotValidException]] 이 발생한다. 

기본적으로 validation 예외는 ConstraintViolationException 예외가 발생하지만 Controller에서 @RequestBody를 쓰는 경우에는 **RequestResponseBodyMethodProcessor**가 @Valid와 함께 처리하면서 [[MethodArgumentNotValidException이란|MethodArgumentNotValidException]]을 발생시킨다.


#### 커스텀 예외 처리하기

BindingException을 상속하기 때문에 여기서 BindingResult을 뽑아낼 수 있다. 이 말은 BindingResult 를 통해 예외 상세한 정보를 가져오고 가공할 수 있다는 의미가 된다.

```java
@ExceptionHandler(MethodArgumentNotValidException.class)  
public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {  
    log.error(e.getMessage());  
    BindingResult bindingResult = e.getBindingResult();  
  
    StringBuilder builder = new StringBuilder();  
    for (FieldError fieldError : bindingResult.getFieldErrors()) {  
       builder.append("[");  
       builder.append(fieldError.getField());  
       builder.append("]은 ");  
       builder.append(fieldError.getDefaultMessage());  
       builder.append(" 입력된 값: [");  
       builder.append(fieldError.getRejectedValue());  
       builder.append("]");  
    }  
  
    return ResponseEntity.badRequest().body(new ErrorResponse(400, builder.toString()));  
}
```

다음 코드는 MethodArgumentNotValidException을 핸들링하는 코드이다. bindingResult로 부터 FieldError들을 가져오고 상세정보를 가져오도





## 질문 & 확장

(없음)

## 출처(링크)
- https://kapentaz.github.io/spring/Spring-Boo-Bean-Validation-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90/#
- https://docs.spring.io/spring-framework/reference/core/validation/beanvalidation.html
- https://velog.io/@imcool2551/Spring-%EA%B2%80%EC%A6%9D1-BindingResult-MessageCodesResolver#1-bindingresult-fielderror-objecterror
## 연결 노트
- [[MethodArgumentNotValidException이란]]









