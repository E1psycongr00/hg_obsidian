---
tags:
  - JS
aliases:
---
작성 날짜: 2024-02-10
작성 시간: 13:09

#미완 #JS 

----
## 내용(Content)
### Object.freeze
>[!summar] Object.freeze
>객체 내부의 값 수정을 막기 위해 동결을 목적으로 사용하는 메서드


```js
const status = Object.freeze({
    PENDING: "PENDING",
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED",
});
```

ts는 readOnly로 java와 같은 언어에서는 final로 변수를 고정할 수 있지만 자바는 불가능하다. 이런 경우 freeze를 이용해 객체 상태를 수정 못하도록 동결할 수 있다.

>[!caution] Object.freeze는 깊은 동결을 못한다.
>Object.freeze는 중첩 Object에 대해서 동결을 수행하지 못한다. 그래서 따로 코드를 구현해야 한다. 제공하는 라이브러리도 있긴 하다.
>```js
>
>```
## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










