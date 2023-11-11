작성 날짜: 2023-11-11
작성 시간: 00:13

## 주제: #미완 #솔루션 #JAVA #Validation 

----

## 문제 & 원인

Spring Bean Validation을 사용하면 유효성 검사 예외 발생시 범용적으로 처리하는 것 외에 세부적인 내용에 대해서도 예외 메시지를 작성할 필요가 있다고 했다.

이 전에 이런 문제를 해결하기 위해서 [[Spring bean validation 예외 분석]] 과 [[java bean validation에서 커스텀 메시지 만들기]] 를 사용했다.  그러나 첫번째의 경우 예외 별로 BindResult에서 정보를 가져와 단순히 문자열을 가공해서 처리했을 뿐이고, 두번 째의 경우는 JavaTemplate을 이용한 커스텀 예외처리다. Spring에서는 기본적으로 예외 메시지를 Message Source에 보관해둔다.

우리는 

## 해결 방안


## 질문 & 확장

(없음)

## 출처(링크)

- https://kapentaz.github.io/spring/Spring-Boo-Bean-Validation-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90/#
- https://catsbi.oopy.io/c61342dd-26c5-4cd8-a462-957cd5787525
- https://velog.io/@imcool2551/Spring-%EA%B2%80%EC%A6%9D1-BindingResult-MessageCodesResolver
- https://www.baeldung.com/spring-custom-validation-message-source
## 연결 노트

- [[Spring bean validation과 MessageCodesResolver]]








