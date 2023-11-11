작성 날짜: 2023-11-11
작성 시간: 00:13

## 주제: #미완 #솔루션 #JAVA #Validation 

----

## 문제 & 원인

Spring Bean Validation을 사용하면 유효성 검사 예외 발생시 범용적으로 처리하는 것 외에 세부적인 내용에 대해서도 예외 메시지를 작성할 필요가 있다고 했다.

이 전에 이런 문제를 해결하기 위해서 [[Spring bean validation 예외 분석]] 과 [[java bean validation에서 커스텀 메시지 만들기]] 를 사용했다.  그러나 첫번째의 경우 예외 별로 BindResult에서 정보를 가져와 단순히 문자열을 가공해서 처리했을 뿐이고, 두번 째의 경우는 JavaTemplate을 이용한 커스텀 예외처리다. Spring에서는 기본적으로 예외 메시지를 Message Source에 보관해둔다.

우리는 MethodArgumentNotValidException과 ConstraintValidationException에서 자동으로 필요한 코드를 뽑아내서 MessageSource를 이용해 기본적으로는 범용 메시지를 사용하고 세부 메시지는 MessageSource를 활용하는 프로세스를 자동화하고 싶다. 이런 경우에는 어떻게 해야 할까?

## 해결 방안

### 알아야 할 것

우선 이 문제를 해결하기 위해 이해해야 할 객체들이 있다.

- BindingResult
- ObjectError, FieldError, MessageSourceResolvable
- ConstraintViolation가 무엇이고 어떤 것을 제공하는가
- MessageSource 사용법
- MessageCodesResolver

이 5가지는 정확하게 이해하고 있어야 한다.

### 해결 전략



## 질문 & 확장

(없음)

## 출처(링크)

- https://kapentaz.github.io/spring/Spring-Boo-Bean-Validation-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90/#
- https://catsbi.oopy.io/c61342dd-26c5-4cd8-a462-957cd5787525
- https://velog.io/@imcool2551/Spring-%EA%B2%80%EC%A6%9D1-BindingResult-MessageCodesResolver
- https://www.baeldung.com/spring-custom-validation-message-source
## 연결 노트

- [[Spring bean validation과 MessageCodesResolver]]








