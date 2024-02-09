---
tags:
  - JS
aliases:
---
작성 날짜: 2024-02-09
작성 시간: 14:07

#미완 #JS 

----
## 내용(Content)
### 함수

>[!summary] 함수
>JS의 함수는 [[일급 객체]] 이다.

JS는 일급 객체이기 떄문에 일급 함수라 하며 일급 객체에 특징을 가진다.

1. 함수는 변수나 데이터로 할당 될 수 있다.
2. 함수를 매개 변수로 전달 가능하다.(콜백 함수)
3. 함수가 함수를 반환 가능하다.(고차 함수, 클로저)
### 함수의 호출 패턴
>[!summary] 함수 호출 패턴
>- 일반 함수 실행
>- 함수가 object의 method일 때 실행
>- bind method 호출했을 때
>- 함수가 생성자 함수로 사용될 때


### 일반 함수 호출(Single Function Invocation)
>[!summary] 일반 함수 호출
>함수를 ()를 이용해 일반적으로 호출하는 경우 this는 global 객체의 window 기반으로 호출한다.


```js
function func() {
	return this;
}
```

![[Pasted image 20240209142100.png]]
### 메서드
>[!summary] 메서드
>객체에 의존성이 있는 함수이다. OOP의 핵심이다.



### 생성자 함수
>[!summary] 생성자 함수
>인스턴스를 생성하는 함수이다.
## 질문 & 확장

(없음)

## 출처(링크)
- https://ko.wikipedia.org/wiki/%EC%9D%BC%EA%B8%89_%EA%B0%9D%EC%B2%B4
- https://velog.io/@reveloper-1311/%EC%9D%BC%EA%B8%89-%EA%B0%9D%EC%B2%B4First-Class-Object%EB%9E%80
- https://velog.io/@imacoolgirlyo/JS-JavaScript-Function-Invocation%EC%99%80-this#-functionprototypecallthis-arglist%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%ED%95%A8%EC%88%98-%ED%98%B8%EC%B6%9C
## 연결 노트










