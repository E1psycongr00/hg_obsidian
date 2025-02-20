---
tags:
  - 미완
aliases: 
date:
title: "ABCD 파라미터"
---

---

## 내용(Content)

### 정의

ABCD 파라미터는 전기전자공학에서 [[4단자망#4단자망이란 무엇인가?|4단자망]]을 분석하기 위해 사용하는 중요한 매개변수 집합이다. ABCD 파라미터는 전송 파라미터 또는 체인 파라미터로 불리기도 한다.

### 특징

#### 기본 방정식

![[ABCD 파라미터 기본 모형 (draw).svg|500]]

ABCD 파라미터는 다음과 같은 2개의 방정식을 사용한다.

$$
\begin{cases}
V_{1} = A \cdot V_{2} +  B \cdot I_{2} \\
I_{1} = C \cdot V_{2} + D \cdot I_{2}
\end{cases}
$$

- $V_{1}, I_{1}$은 입력 포트의 전압과 전류 (송신단)
- $V_{2}, I_{2}$: 출력 포트의 전압과 전류 (수신단)
- $A,B,C,D$: 네트워크 특성을 나타내는 ABCD 파라미터

매트릭스로 표현하면 다음과 같다.

$$
\begin{bmatrix}
V_{1}, \\
I_{1}
\end{bmatrix}
=
\begin{bmatrix}
A & B \\
C & D
\end{bmatrix}
\begin{bmatrix}
V_{2} \\
I_{2}
\end{bmatrix}
$$


#### 각 정수별 특징

- $A$(전압 비율, Voltage Ratio)
	- 정의: $A=\frac{V_{1}}{V_{2}}\mid_{I_{2}=0}$  (출력이 개방회로일 때)





## 질문 & 확장

(없음)

## 연결 노트

## 출처(링크)





