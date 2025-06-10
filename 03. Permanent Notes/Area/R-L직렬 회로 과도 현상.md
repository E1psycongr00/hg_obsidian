---
tags:
  - 회로이론
  - 제어공학
aliases: null
title: R-L직렬 회로 과도 현상
created: 2025-02-19T00:00:00.000Z
note-type: COMMON
completed: true
---

---

## 내용(Content)

### RL 직렬 회로 과도 현상

DC 전압과 저항, 리액턴스가 모두 직렬로 연결되어 있고, 스위치를 연결했을 때 전압 인가시 과도 상태에 거쳐 정상 상태에 도달하기 까지 현상을 의미한다.

### 특징

![[Pasted image 20250219183545.png|500]]

RL 회로 응답의 전류 식:

![[시정수에 따른 과도응답 상태 그래프 (draw).svg]]

$$
i(t) = \frac{E}{R} (1 - e^{\frac{R}{L}t})
$$


[[03. Permanent Notes/Area/시정수#정의|시정수]]($\tau$): $\frac{L}{R}$

### 식 유도 과정

$$
E = R \cdot i + L \frac{di}{dt}
$$
E 는 DC 전압이고 라플라스 변환을 하면

$$
\frac{E}{s} = R \cdot I + L \cdot sI = (Ls + R) \cdot I
$$
좌변에 I만 남기면

$$
I = \frac{E}{L} \cdot \frac{1}{s\left( s + \frac{R}{L} \right)}
$$

분수를 분해하면

$$
I = \frac{E}{R} \cdot \left( \frac{1}{s} - \frac{1}{s+\frac{R}{L}} \right)
$$

역 라플라스 변환하면

$$
i(t) = \frac{E}{R} \cdot (1 - e^{(R/L) t})
$$



## 질문 & 확장

(없음)

## 연결 노트

## 출처(링크)





