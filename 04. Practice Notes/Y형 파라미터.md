---
tags:
  - 회로이론
  - 단자망
aliases: 
created: 2025-05-02
title: Y형 파라미터
note-type: COMMON
completed: false
---

## 내용(Content)

### 정의

어드미턴스로 나타낸 4단자 파라미터이다.  $I = YV$ 형태로 나타낸다.

$$
\begin{bmatrix}
I_{1} \\
I_{2}
\end{bmatrix}
=
\begin{bmatrix}
Y_{11} & Y_{12} \\
Y-21 & Y_{22}
\end{bmatrix}

\begin{bmatrix}
V_{1} \\
V_{2}
\end{bmatrix}
$$

- $Y_{11} = \frac{I_{1}}{V_{1}} \mid_{V_{2}=0}$
- $Y_{12} = \frac{I_{1}}{V_{2}} \mid_{V_{1}=0}$
- $Y_{21} = \frac{I_{2}}{V_{1}} \mid_{V_{2}=0}$
- $Y_{22} = \frac{I_{2}}{V_{2}} \mid_{V_{1}=0}$

### pi 형 회로 해석

![[pi형 회로 (draw).svg|450]]

이 때 $Z_{2}$의 어드미턴스를 $Y_{2}$라 하자.

- $Y_{11} = Y_{1} + Y_{2}$
- $Y_{12} = -Y_{2}$
- $Y_{21}= -Y_{2}$
- $Y_{22} = Y_{2}+Y_{3}$


## 질문 & 확장

(없음)

## 연결 노트

## 출처(링크)

