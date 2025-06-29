---
tags:
  - 회로이론
  - 단자망
aliases:
  - 임피던스 파라미터
created: 2025-05-02
title: Z형 파라미터
note-type: COMMON
completed: true
---

## 내용(Content)

### 정의

Z형 파라미터(임피던스 파라미터)는 2포트 네트워크에서 전압과 전류의 관계를 임피던스 행렬로 표현한 것이다. 이는 2x2 행렬로 구성되며, 전류 벡터에 곱해 전압 벡터를 계산한다. 수학적으로 다음과 같이 정의된다.


$$
\begin{bmatrix}
V_{1} \\
V_{2}
\end{bmatrix}
 =
 \begin{bmatrix}
Z_{11} & Z_{12} \\
Z_{21} & Z_{22}
\end{bmatrix}
\begin{bmatrix}
I_{1} \\
I_{2}
\end{bmatrix}
$$
- $Z_{11} = \frac{V_1}{I_1} \mid_{I_2=0}$: 포트 2가 개방($I_2=0$)일 때 포트 1의 입력 임피던스.
- $Z_{12} = \frac{V_1}{I_2} \mid_{I_1=0}$: 포트 1이 개방($I_1=0$)일 때 포트 2의 전류에 대한 포트 1의 전압 비.
- $Z_{21} = \frac{V_2}{I_1} \mid_{I_2=0}$: 포트 2가 개방($I_2=0$)일 때 포트 1의 전류에 대한 포트 2의 전압 비.
- $Z_{22} = \frac{V_2}{I_2} \mid_{I_1=0}$: 포트 1이 개방($I_1=0$)일 때 포트 2의 입력 임피던스.

### T형 회로에서의 Z형 파라미터 해석

![[Excalidraw/T 형 회로 (draw).svg|450]]
여기서 세로 부분의 $Y_3$는 임피던스 $Z_3$의 어드미턴스($Y_3 = \frac{1}{Z_3}$)이다. T형 회로에서 Z형 파라미터는 다음과 같이 계산된다:

- $Z_{11} = Z_1 + Z_3$: 포트 1의 입력 임피던스.
- $Z_{12} = Z_3$: 포트 2의 전류가 포트 1의 전압에 미치는 영향.
- $Z_{21} = Z_3$: 포트 1의 전류가 포트 2의 전압에 미치는 영향.
- $Z_{22} = Z_2 + Z_3$: 포트 2의 입력 임피던스.

## 4단자 정수와 Z 파라미터 관계
4단자 정수(ABCD 파라미터)와 Z형 파라미터 사이의 관계는 회로 분석 시 유용하게 사용된다. 특히 한 파라미터 집합을 알고 있을 때 다른 파라미터 집합으로 변환할 때 필수적이다. Z형 파라미터는 4단자 정수 A, B, C, D를 사용하여 다음과 같이 표현한다.

$$
Z_{11} = \frac{A}{C}, \quad Z_{12} = Z_{21} = \frac{1}{C}, \quad Z_{22} = \frac{D}{C}
$$
- $Z_{11}$: 포트 1의 입력 임피던스 파라미터
- $Z_{12}$: 역방향 전달 임피던스 파라미터
- $Z_{21}$: 순방향 전달 임피던스 파라미터
- $Z_{22}$: 포트 2의 입력 임피던스 파라미터
- $A, C, D$: 4단자 정수의 각 파라미터

이 수식들은 4단자 정수와 Z형 파라미터 간의 직접적인 변환 관계를 보여준다.

## 특징 및 응용

- **대칭성**: 회로가 대칭적이라면 $Z_{11} = Z_{22}$이고, 상호적인(reciprocal) 경우 $Z_{12} = Z_{21}$이다.
- **응용**: Z형 파라미터는 전력 시스템, 필터 설계, 신호 처리 등에서 2포트 네트워크의 동작을 분석하는 데 유용하다.
- **변환**: Z형 파라미터는 Y형 파라미터(어드미턴스 파라미터)나 다른 파라미터(예: ABCD 파라미터)로 변환 가능하다.

## 질문 & 확장

(없음)

## 연결 노트

## 출처(링크)

