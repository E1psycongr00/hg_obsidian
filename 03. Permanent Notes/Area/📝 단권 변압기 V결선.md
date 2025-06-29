---
tags:
  - 전기기사
  - 변압기
  - 단권변압기
  - V결선
aliases:
  - 단권 변압기 브이결선
created: 2025-06-10
title: 📝 단권 변압기 V결선
note-type: COMMON
level: 심화
completed: true
archived: false
time-to-understand: 10분
last-reviewed: 2025-06-10
---

### V결선의 개요
V결선은 3상 전력을 공급하는 변압기 3대 중 1대가 고장 났을 때, 나머지 2대만으로 3상 전력을 계속 공급하기 위한 비상 운전 방식으로 주로 사용된다. [[03. Permanent Notes/Area/📝 단권 변압기 기본 개념|단권 변압기]] 2대를 이용해 3상 부하에 전력을 공급하는 방식이다.

### 결선도 및 구조
![[Excalidraw/단권 변압기 V 결선 (draw).svg|550]]

- **구조**: 단권 변압기 2대의 입력측과 출력측을 각각 V자 형태로 연결한다. 3대의 델타(Δ)결선에서 1대가 제거된 형태와 유사하다.

### 단권 변압기 V 결선 부하용량, 자기 용량
부하 용량: $\sqrt{ 3 }V_{h}I_{h} = \sqrt{ 3 }V_{l}I_{l}$
자기 용량: $2V_{2}I_{2}$
$$
\frac{자기용량}{부하용량} = \frac{2}{\sqrt{ 3 }} \cdot\frac{V_h - V_l}{V_h}
$$
- $V_h$: 고압측 전압
- $V_l$: 저압측 전압
- $I_h$: 고압측 전류
- $I_l$: 저압측 전류

>[!question] 왜 저압측, 고압측 용량이 같음?
>실제로는 손실때문에 같지 않지만 이상적인 단권 변압기의 경우 승압시 전력 손실이 없다고 가정하기 때문에 저압측 용량과 고압측 용량이 같다.

자세한 증명은 [[03. Permanent Notes/Area/📝 단권 변압기 V결선 부하용량 자기용량 관계 증명|단권 변압기 V결선 부하용량 자기용량 관계 증명]] 참고.
### V결선의 핵심: 이용률과 출력비

V결선의 효율과 경제성을 판단하는 중요한 지표이다.

- **변압기 이용률**: 변압기 1대의 용량이 얼마나 효율적으로 사용되는지를 나타낸다.
    $$
    이용률 = \frac{V결선 출력}{변압기 2대 용량} = \frac{\sqrt{3} P_1}{2 P_1} = \frac{\sqrt{3}}{2} \approx 86.6\%
    $$
    - $P_1$: 변압기 1대의 용량
    - 즉, 변압기 용량의 86.6%만 출력에 기여하고, 나머지 13.4%는 사용되지 못해 비효율적이다.

- **출력비 (고장비)**: 원래 3대로 운전할 때(델타결선)와 비교하여 출력이 얼마나 나오는지를 나타낸다.
    $$
    출력비 = \frac{V결선 출력}{델타결선 출력} = \frac{\sqrt{3} P_1}{3 P_1} = \frac{1}{\sqrt{3}} \approx 57.7\%
    $$
    - 변압기 2대를 사용하므로 총용량은 3대의 2/3(66.7%)가 되어야 하지만, 실제 출력은 57.7%에 그친다.

### V결선의 특징
- **장점**:
    - **경제성**: 3대가 아닌 2대의 변압기만으로 3상 전력 공급이 가능하여 초기 설치 비용이 저렴하다.
    - **비상 운전**: 델타결선 운전 중 1대 고장 시 응급처치로 사용할 수 있다.
- **단점**:
    - **낮은 이용률**: 변압기 설비 용량을 100% 활용하지 못한다 (이용률 86.6%).
    - **불평형 전압**: 부하가 증가하면 변압기 2대의 임피던스 강하 차이로 인해 출력 전압이 불평형해질 수 있다.

>[!summary] 요약
>V결선은 2대의 단권 변압기로 3상 전력을 공급하는 경제적이고 실용적인 방식이지만, 이용률과 출력비가 낮아 설비를 100% 효율적으로 사용하지는 못하는 단점이 있다. 주로 소용량 설비나 비상 운전 시에 유용하게 활용된다. 