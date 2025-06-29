---
tags:
  - 회로이론
  - 제어공학
aliases: null
title: ABCD 파라미터
created: 2025-02-20T00:00:00.000Z
note-type: COMMON
completed: true
---

---

## 내용(Content)

### 정의

ABCD 파라미터는 전기전자공학에서 [[03. Permanent Notes/Area/4단자망#4단자망이란 무엇인가?|4단자망]]을 분석하기 위해 사용하는 중요한 매개변수 집합이다. ABCD 파라미터는 전송 파라미터 또는 체인 파라미터로 불리기도 한다.

### 특징

#### 기본 방정식

![[Excalidraw/ABCD 파라미터 기본 모형 (draw).svg|500]]

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


#### 4단자 정수(전송 파라미터 특징)

- $A$(전압 비율, Voltage Ratio)
	- **정의**: $A=\frac{V_{1}}{V_{2}}\mid_{I_{2}=0}$  (출력이 개방회로일 때)
	- **의미**: A는 출력 단자(수전단 측)가 개방된 상태에서의 입력 전압과 출력 전압의 비율을 나타낸다. 이는 해당 시스템이 전압을 얼마나 증폭하거나 감쇠하는지 알려준다.
	- **단위**: 단순 전압대 전압 비율이기 때문이 단위가 존재하지 않는다.
- $B$(단락 저항, Short-Circuit Resistance)
	- **정의**: $B = \frac{V_{1}}{I_{2}}|_{V_{2}=0}$ (출력이 단락 회로일 때)
	- **의미**: 단자망 내부의 임피던스 특성을 반영하며, 전송선에서는 단락 임피던스로 해석한다.
	- **단위**: $\ohm$
- $C$(개방 전도도, Open-Circuit Conductance, 개방 어드미턴스)
	- **정의**: $C = \frac{I_{1}}{V_{2}}$
	- **의미**: 단자망 내부의 전도도 특성을 보여준다. 개방 어드미턴스(임피던스의 역수) 인식한다.
- D(전류 비율, Current Ratio, 단락 전류 이득)
	- **정의**: $D=\frac{I_{1}}{I_{2}}|_{V_{2}=0}$ (출력이 단락 회로일 때)
	- **의미**: 수전단 측과 송전단 측의 전류 비로 전류의 변화를 표현한다.
	- **단위**: 없음

>[!info] 4단자 정수 항등식
>- AD - BC = 1 (ABCD 파라미터 행렬의 크기는 1이다)
>- 대칭인 경우 A = D

### 그림으로 보는 4단자 정수 특징

![[ABCD 정수별 특징 (draw).svg]]

### 단일 소자 특성

#### 직렬 소자

![[attachments/screenshot/Pasted image 20250221144729.png]]

#### 병렬 소자

![[attachments/screenshot/Pasted image 20250221144734.png]]

### T형과  pi형 회로

#### T형 회로

![[Excalidraw/T 형 회로 (draw).svg|400]]
$$
\begin{bmatrix}
1 & Z_{1} \\
0 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 \\
Y_{3} & 1
\end{bmatrix}
\begin{bmatrix}
1 & Z_{2} \\
0 & 1
\end{bmatrix}
$$

#### pi형 회로

![[Excalidraw/pi형 회로 (draw).svg|400]]

$$
\begin{bmatrix}
1 & 0 \\
Y_{1} & 1
\end{bmatrix}
\begin{bmatrix}
1 & Z_{2} \\
0 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 \\
Y_{3} & 1
\end{bmatrix}
$$


## 질문 & 확장

Q1: 수전단 전압이 단자망 임피던스에 걸리는 전압 아닌가?
A1: 아니다. 식 $V_{1} = A \cdot V_{2} + B \cdot I_{2}$ 를 해석하면 송전단 전압 $V_{1}$은 $V_{2}$를 A배하고 B 임피던스에 흐르는 수전단 전류의 곱만큼 전압 강하가 나타난 합이다. 즉, 송전단과 수전단 전압, 전류는 측정 또는 예상할 수 있는 포트 외부의 수치이고, 그들의 관계가 ABCD 파라미터를 통해 나타나는 것이다.

## 연결 노트

## 출처(링크)





