---
tags:
  - 완성
  - 회로이론
  - 제어공학
  - 전기전자공학
aliases: 
  - 전송 파라미터
  - 체인 파라미터
date: 2025-02-20
title: ABCD 파라미터
---

# ABCD 파라미터 (ABCD Parameters)

## 개요

ABCD 파라미터는 전기전자공학에서 [[4단자망#4단자망이란 무엇인가?|4단자망(Four-terminal network)]]을 분석하기 위해 사용하는 중요한 매개변수 집합이다. 이는 **전송 파라미터(Transmission Parameters)** 또는 **체인 파라미터(Chain Parameters)**로도 불린다. 주로 캐스케이드(cascade) 연결된 회로의 분석에 유용하게 사용된다.

>[!note] 4단자망이란?
>4단자망은 입력과 출력이 각각 2개의 단자로 구성된 전기 회로망으로, 송신단(input port)과 수신단(output port)으로 구분된다.

## 기본 방정식

![[ABCD 파라미터 기본 모형 (draw).svg|500]]

ABCD 파라미터는 다음과 같은 2개의 방정식으로 표현된다:

$$
\begin{cases}
V_{1} = A \cdot V_{2} + B \cdot I_{2} \\
I_{1} = C \cdot V_{2} + D \cdot I_{2}
\end{cases}
$$

여기서:
- $V_{1}, I_{1}$: 입력 포트(송신단)의 전압과 전류
- $V_{2}, I_{2}$: 출력 포트(수신단)의 전압과 전류
- $A, B, C, D$: 네트워크 특성을 나타내는 ABCD 파라미터

행렬 형태로 표현하면 다음과 같다:

$$
\begin{bmatrix}
V_{1} \\
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

## ABCD 파라미터의 물리적 의미

### A 파라미터 (전압 비율)
- **정의**: $A=\frac{V_{1}}{V_{2}}\mid_{I_{2}=0}$ (출력이 개방회로일 때)
- **물리적 의미**: 출력 단자가 개방된 상태(무부하)에서의 입력 전압과 출력 전압의 비율
- **단위**: 무차원(dimensionless)

### B 파라미터 (전달 임피던스)
- **정의**: $B = \frac{V_{1}}{I_{2}}|_{V_{2}=0}$ (출력이 단락 회로일 때)
- **물리적 의미**: 출력이 단락된 상태에서 출력 전류에 대한 입력 전압의 비율
- **단위**: 옴(Ω)

### C 파라미터 (전달 어드미턴스)
- **정의**: $C = \frac{I_{1}}{V_{2}}|_{I_{2}=0}$ (출력이 개방 회로일 때)
- **물리적 의미**: 출력이 개방된 상태에서 출력 전압에 대한 입력 전류의 비율
- **단위**: 지멘스(S, Siemens)

### D 파라미터 (전류 비율)
- **정의**: $D=\frac{I_{1}}{I_{2}}|_{V_{2}=0}$ (출력이 단락 회로일 때)
- **물리적 의미**: 출력이 단락된 상태에서 입력 전류와 출력 전류의 비율
- **단위**: 무차원(dimensionless)

## 그림으로 보는 ABCD 파라미터 측정 조건

![[ABCD 정수별 특징 (draw).svg]]

## 주요 회로 요소의 ABCD 파라미터

### 직렬 소자 (임피던스 Z)

![[Pasted image 20250221144729.png]]

직렬 임피던스 Z에 대한 ABCD 파라미터:

$$
\begin{bmatrix}
A & B \\
C & D
\end{bmatrix}
=
\begin{bmatrix}
1 & Z \\
0 & 1
\end{bmatrix}
$$

### 병렬 소자 (어드미턴스 Y)

![[Pasted image 20250221144734.png]]

병렬 어드미턴스 Y에 대한 ABCD 파라미터:

$$
\begin{bmatrix}
A & B \\
C & D
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 \\
Y & 1
\end{bmatrix}
$$

## ABCD 파라미터의 특성

### 행렬식 특성
선형 수동 회로에서 ABCD 행렬의 행렬식은 항상 1이다:

$$AD - BC = 1$$

### 캐스케이드 연결 특성
ABCD 파라미터의 가장 큰 장점은 캐스케이드 연결된 회로의 분석이 용이하다는 점이다. 두 회로가 캐스케이드 연결되었을 때, 전체 시스템의 ABCD 행렬은 각 회로의 ABCD 행렬의 곱으로 표현된다:

$$
\begin{bmatrix}
A & B \\
C & D
\end{bmatrix}_{total}
=
\begin{bmatrix}
A_1 & B_1 \\
C_1 & D_1
\end{bmatrix}
\begin{bmatrix}
A_2 & B_2 \\
C_2 & D_2
\end{bmatrix}
$$

## 자주 묻는 질문

>[!question] Q1: 수전단 전압이 단자망 임피던스에 걸리는 전압 아닌가?
>A1: 아니다. 식 $V_{1} = A \cdot V_{2} + B \cdot I_{2}$ 를 해석하면 송전단 전압 $V_{1}$은 $V_{2}$를 A배하고 B 임피던스에 흐르는 수전단 전류의 곱만큼 전압 강하가 나타난 합이다. 즉, 송전단과 수전단 전압, 전류는 측정 또는 예상할 수 있는 포트 외부의 수치이고, 그들의 관계가 ABCD 파라미터를 통해 나타나는 것이다.

>[!question] Q2: ABCD 파라미터와 다른 파라미터(Z, Y, S 등)의 차이점은?
>A2: ABCD 파라미터는 입력과 출력 사이의 관계를 표현하는 방식이 다르다. Z, Y 파라미터는 입출력 전압과 전류의 관계를 직접 표현하는 반면, ABCD 파라미터는 출력 변수를 기준으로 입력 변수를 표현한다. 이러한 특성 때문에 캐스케이드 연결 분석에 특히 유용하다.

## 응용 분야

- 전송선로 분석
- 필터 설계
- 변압기 모델링
- 전력 시스템 분석
- 마이크로파 회로 설계

## 연결 노트

- [[4단자망]]
- [[임피던스 파라미터]]
- [[어드미턴스 파라미터]]
- [[전송선로 이론]]
- [[회로망 분석]]

## 출처

- Pozar, D. M. (2011). Microwave Engineering (4th ed.). Wiley.
- Sadiku, M. N. O. (2018). Elements of Electromagnetics (7th ed.). Oxford University Press.
- Paul, C. R. (2009). Fundamentals of Electric Circuit Analysis. Wiley.
- 전기전자공학회 (2020). 전기전자공학 핸드북. 한국전기전자공학회.





