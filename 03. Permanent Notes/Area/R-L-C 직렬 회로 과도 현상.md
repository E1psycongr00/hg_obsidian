---
tags:
  - 회로이론
  - 제어공학
aliases: null
title: R-L-C 직렬 회로 과도 현상
created: null
note-type: COMMON
completed: true
---

---

## 내용(Content)

### RLC 직렬 회로의 과도 현상 개요

RLC 직렬 회로는 저항(Resistor, R), 인덕터(Inductor, L), 커패시터(Capacitor, C)가 직렬로 연결된 회로이다. 이 회로에서 과도 현상(Transient Response)은 회로에 갑작스러운 변화(전원 연결/차단, 스위치 조작 등)가 발생했을 때 정상 상태에 도달하기까지의 일시적인 응답을 의미한다.

### 미분방정식 모델

RLC 직렬 회로의 과도 현상은 2차 미분방정식으로 표현된다:

$$L\frac{d^2i}{dt^2} + R\frac{di}{dt} + \frac{1}{C}i = v(t)$$

여기서:
- $i$ : 회로에 흐르는 전류
- $v(t)$ : 회로에 인가된 전압
- $L$ : 인덕턴스 (단위: H, 헨리)
- $R$ : 저항 (단위: Ω, 옴)
- $C$ : 커패시턴스 (단위: F, 패럿)

### 감쇠 계수와 공진 주파수

RLC 회로의 특성을 결정하는 두 가지 주요 매개변수:

1. 감쇠 계수 (Damping Factor): $\alpha = \frac{R}{2L}$
2. 공진 주파수 (Resonant Frequency): $\omega_0 = \frac{1}{\sqrt{LC}}$

### 과도 응답의 세 가지 경우

RLC 직렬 회로의 과도 응답은 감쇠 계수($\alpha$)와 공진 주파수($\omega_0$)의 관계에 따라 세 가지 경우로 분류된다:

#### 1. 과감쇠 (Overdamped) 응답: $\alpha > \omega_0$

과감쇠 상태에서는 회로가 진동 없이 서서히 정상 상태에 도달한다. 특성방정식의 해는 두 개의 서로 다른 실근을 가지며, 전류는 다음과 같이 표현된다:

$$i(t) = A_1e^{s_1t} + A_2e^{s_2t}$$

여기서 $s_1$과 $s_2$는 음의 실수이다.

>[!tip] 과감쇠
>과감쇠 상태는 마치 점성이 매우 큰 액체 속에서 움직이는 것과 유사하다. 움직임이 빠르게 감소하여 진동 없이 정지 상태에 도달한다.

#### 2. 임계 감쇠 (Critically Damped) 응답: $\alpha = \omega_0$

임계 감쇠 상태에서는 회로가 최대한 빠르게 진동 없이 정상 상태에 도달한다. 특성방정식의 해는 중근을 가지며, 전류는 다음과 같이 표현된다:

$$i(t) = (A_1 + A_2t)e^{-\alpha t}$$

>[!tip] 임계 감쇠
>임계 감쇠는 과도 현상이 가장 빠르게 사라지는 상태로, 많은 제어 시스템에서 이상적인 상태로 간주된다.

#### 3. 부족 감쇠 (Underdamped) 응답: $\alpha < \omega_0$

부족 감쇠 상태에서는 회로가 진동하면서 서서히 정상 상태에 도달한다. 특성방정식의 해는 켤레 복소수 쌍이며, 전류는 다음과 같이 표현된다:

$$i(t) = Ae^{-\alpha t}\cos(\omega_d t + \phi)$$

여기서 $\omega_d = \sqrt{\omega_0^2 - \alpha^2}$는 감쇠 진동 주파수이다.

>[!tip] 부족 감쇠
>부족 감쇠 상태는 진자가 공기 중에서 진동하다가 서서히 멈추는 것과 유사하다. 진폭이 점차 감소하는 진동이 나타난다.

### RLC 회로의 응용

RLC 직렬 회로는 다양한 전자 시스템에서 활용된다:

1. 필터 회로 (대역 통과, 대역 제거 등)
2. 튜닝 회로 (라디오 수신기 등)
3. 발진기 회로
4. 과도 전압 및 전류 억제 회로

## 질문 & 확장

1. RLC 병렬 회로의 과도 현상은 직렬 회로와 어떤 차이가 있는가?
2. 다양한 초기 조건(전압, 전류)에 따른 RLC 회로의 응답은 어떻게 달라지는가?
3. 실제 회로에서 부품의 비이상적 특성(저항의 온도 의존성, 인덕터의 포화 등)이 과도 현상에 미치는 영향은?

## 연결 노트

- [[RL 회로 과도 현상]]
- [[RC 회로 과도 현상]]
- [[공진 회로와 Q 인자]]
- [[필터 회로 설계]]

## 출처(링크)

1. Nilsson, J. W., & Riedel, S. A. (2015). Electric Circuits (10th ed.). Pearson.
2. Alexander, C. K., & Sadiku, M. N. O. (2013). Fundamentals of Electric Circuits (5th ed.). McGraw-Hill Education.
3. Irwin, J. D., & Nelms, R. M. (2015). Basic Engineering Circuit Analysis (11th ed.). Wiley.
4. Hayt, W. H., Kemmerly, J. E., & Durbin, S. M. (2012). Engineering Circuit Analysis (8th ed.). McGraw-Hill Education.





