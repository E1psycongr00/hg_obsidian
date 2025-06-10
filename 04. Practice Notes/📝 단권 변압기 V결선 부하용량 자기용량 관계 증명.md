---
tags:
  - 전기기사
  - 변압기
  - 단권변압기
  - V결선
aliases: 
created: 2025-06-10
title: 📝 단권 변압기 V결선 부하용량 자기용량 관계 증명
note-type: COMMON
level: 전문가
completed: false
archived: false
time-to-understand: 10분
last-reviewed: 2025-06-10
---

### 단권 변압기 V 결선 부하용량, 자기 용량
![[Excalidraw/단권 변압기 V 결선 (draw).svg|550]]

부하 용량: $\sqrt{ 3 }V_{h}I_{h} = \sqrt{ 3 }V_{l}I_{l}$
자기 용량: $2V_{2}I_{2}$
$$
\frac{자기용량}{부하용량} = \frac{2}{\sqrt{ 3 }} \cdot\frac{V_h - V_l}{V_h}
$$
- $V_h$: 고압측 전압
- $V_l$: 저압측 전압
- $I_h$: 고압측 전류
- $I_l$: 저압측 전류

### 증명하기
#### 직렬 권선 전압을 선간 전압으로 표현하기

$$
V_{h} = V_{1} + V_{2}
$$

$$
V_{l} = V_{1}
$$

이 2 식을 활용해서 표현하면

$$
V_{2} = V_{h} - V_{l}
$$

#### 자기 용량과 부하 용량의 비 구하기

$$
\frac{\text{자기 용량}}{\text{부하 용량}} = \frac{2V_{2}I_{2}}{\sqrt{ 3 }V_{h}I_{h}} - \frac{2}{\sqrt{ 3 }} V_{h}
$$




