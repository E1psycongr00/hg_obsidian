---
tags:
  - JAVA
  - 커링
aliases:
  - java currying
date: 2024-03-26
title: java 커링
---
작성 날짜: 2024-03-26
작성 시간: 21:07

#미완

----
## 내용(Content)
### 커링
>[!summary]
>수학과 컴퓨터 과학에서 다중 인수를 가진 함수를 단일 인수를 가진 함수열로 바꾸는 것을 의미

$$
\begin{align}
x = f(a, b, c)  \\
h = g(a) \\
i = h(b) \\
x = i(c)
\end{align}
$$

### 람다와 커링
람다 함수를 활용하면 커링을 쉽게 표현할 수 있다.

```text
f(a, b, c) = a + b + c 를 쿼링
f = a => b => c => a + b + c
```

function이 하나의 인자를 받으며 중첩된 형태로 존재하고 최종 재귀 끝에서 연산을 수행하는 것이다.

### java와 커링
#### Function 활용하기

## 질문 & 확장

(없음)

## 출처(링크)
- https://stackoverflow.com/questions/38487755/can-java-lambdas-bind-methods-to-their-parameters
- https://www.golinuxcloud.com/java-currying-function-examples/#Example_1_Currying_function_to_multiply_two_numbers
- https://www.golinuxcloud.com/java-currying-function-examples/#Example_1_Currying_function_to_multiply_two_numbers
- https://www.geeksforgeeks.org/currying-functions-in-java-with-examples/
## 연결 노트










