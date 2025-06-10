---
tags: 
  - 전기기사
  - 변압기
  - 단권변압기
  - Y결선
aliases: 
created: 2025-06-10
title: 📝 단권 변압기 Y결선 자기용량과 부하용량 관계 증명
note-type: COMMON
level: 전문가
completed: false
archived: false
time-to-understand: 10분
last-reviewed: 2025-06-10
---


### 자기 용량과 부하 용량
![[Excalidraw/단권 변압기 Y 결선 (draw).svg|550]]

부하 용량: $\sqrt{ 3 }V_{h}I_{h} = \sqrt{ 3 }V_{l}I_{l}$
자기 용량: $3V_{2}I_{2}$

Y 결선의 경우 상 기준 분석이 되기 때문에 [[03. Permanent Notes/Area/📝 단권 변압기 기본 개념|단상 단권 변압기]]와 같은 공식이 적용된다.

$$
\frac{자기용량}{부하용량} = \frac{V_h - V_l}{V_h} = \frac{I_h - I_l}{I_h}
$$

- $V_h$: 고압측 전압
- $V_l$: 저압측 전압
- $I_h$: 고압측 전류
- $I_l$: 저압측 전류

### 증명

#### 직렬 권선 전압을 선간 전압으로 표현하기

각 상의 $V_{2}$를 고압측과 저압측 선간 전압으로 표현해야 한다. 우선 한 상에는 $V_{1}$과 $V_{2}$가 걸려 있기 때문에 Y 결선의 특성을 활용하면

$$
V_{1} + V_{2} = \frac{V_{h}}{\sqrt{ 3 }}
$$

$$
V_{1} = \frac{V_{l}}{\sqrt{ 3 }}
$$
이렇게 두 식으로 표현할 수 있다. 정리하면 다음과 같다.

$$
V_{2} = \frac{V_{h} - V_{l}}{\sqrt{ 3 }}
$$

#### 부하 용량과 자기 용량비 계산하기

위 그림을 참고하면 $I_{2} = I_{h}$와 같기 때문에 비를 간단하게 표현 가능하다.

$$
\frac{\text{자기 용량}}{\text{부하 용량}} = \frac{3V_{2}I_{2}}{\sqrt{ 3 }V_{h}I_{h}} = \frac{3 \left( \frac{V_{h} - V_{l}}{\sqrt{ 3 }} \right) \cancel{ I_{h} }}{\sqrt{ 3 }V_{h}\cancel{ I_{h} }} = \frac{V_{h} - V_{l}}{V_{h}}
$$