---
tags:
  - 회로이론
  - 단자망
aliases:
  - 임피던스 파라미터
created: 2025-05-02
title: Z형 파라미터
note-type: COMMON
completed: false
---

## 내용(Content)

### 정의

임피던스로 2 x 2 행렬을 만들어 전류를 곱해 전압식으로 나타낸 것을 Z형 파라미터 혹은 임피던스 파라미터로 부른다.

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
- $Z_{11} = \frac{V_{1}}{I_{1}}\mid_{I_{2}=0}$
- $Z_{12}$ = $\frac{V_{1}}{I_{2}} \mid_{I_{1}=0}$
- $Z_{21}$ = $\frac{V_{2}}{I_{1}} \mid_{I_{2}=0}$
- $Z_{22}$ = $\frac{V_{2}}{I_{2}} \mid_{I_{1}=0}$

### T형 파라미터 해석

![[T 형 회로 (draw).svg|450]]
세로 부분의 $Y_{3}$ 는 $Z_{3}$ 의 어드미턴스이다.

- $Z_{11} = Z_{1}+ Z_{3}$ 
- $Z_{12} = Z_{3}$
- $Z_{21} = Z_{3}$
- $Z_{22}=Z_{2} + Z_{3}$


## 질문 & 확장

(없음)

## 연결 노트

## 출처(링크)

