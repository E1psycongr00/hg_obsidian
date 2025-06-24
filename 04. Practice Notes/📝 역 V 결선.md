---
tags:
  - 회로이론
  - 평형3상교류
  - 변압기결선
aliases: 
  - 역V결선
  - Open Wye
  - 오픈 와이 결선
created: 2025-06-23
title: 📝 역 V 결선
note-type: COMMON
level: "기초"
completed: true
archived: false
time-to-understand: "5분"
last-reviewed: 2025-01-27
---

### 정의
역 V 결선(Open Wye Connection)은 3상 Y결선 변압기 뱅크에서 변압기 한 대가 고장 나거나 제거되었을 때, 남은 2대의 변압기 중 **한 대의 극성을 180도 반전시켜** 3상 부하에 전력을 임시로 공급하는 비상 결선 방식이다.

### 목적
Y결선에서 변압기 한 대가 없어지면 심각한 전압 불평형이 발생하여 정상적인 3상 전력 공급이 불가능하다. 이때 한 상을 역결선함으로써 **전압의 벡터 합을 조정하여 3상 평형에 가까운 상태를 만들어** 부하에 전력을 계속 공급하는 것이 주된 목적이다.

> [!tip] 핵심 원리
> 한 상의 벡터를 180도 뒤집으면, 남은 두 상의 전압 벡터와 새로운 관계를 형성하여 3상 시스템의 기본 조건을 최소한으로 유지할 수 있게 된다.

### V 결선(Open Delta)과의 명확한 차이
역 V 결선은 V 결선과 자주 혼동되지만, 기반이 되는 결선 방식과 원리가 완전히 다르다.

| 구분 | V 결선 (Open Delta) | 역 V 결선 (Open Wye) |
|------|-------------------|-------------------|
| **기반 결선** | **델타(Δ) 결선** | **와이(Y) 결선** |
| **원리** | Δ결선에서 한 변이 없어진 형태 | Y결선에서 한 상 제거 후, 다른 한 상을 **역결선** |
| **특징** | - 제3고조파 제거 효과 없음<br>- 출력비 57.7%, 이용률 86.6% | - 전압 불평형이 더 심각할 수 있음<br>- 표준화된 출력/이용률 계산이 어려움 |
| **주용도** | Δ-Δ 결선 중 비상 운전, 소용량 3상 공급 | Y-Y 결선 중 비상 운전 |

### 장점 및 단점

#### 장점
- **비상 전력 공급**: Y결선 뱅크 고장 시, 전력 공급 중단을 막고 임시 운전이 가능하다.
- **경제성**: 초기 부하가 적을 경우 2대만으로 운전을 시작하고, 향후 3대로 증설하는 계획을 세울 수 있다.

#### 단점 및 유의사항
- **심각한 전압 불평형**: 3상 전압이 완벽하게 평형을 이루지 못한다. 특히 **선간전압 2개는 같지만 나머지 1개는 √3배로 커지는 문제**가 발생하여 부하 기기에 악영향을 줄 수 있다.
- **과부하 위험**: V결선과 마찬가지로 남은 2대의 변압기가 자신의 용량을 100% 활용하지 못한다. 2대의 변압기가 낼 수 있는 총 출력은 **산술적인 합(200%)이 아닌 그보다 훨씬 낮은 수준**이며, 부하가 조금만 커져도 쉽게 과부하에 걸린다.
- **보호 계전기 오동작**: 불평형 전압과 전류로 인해 보호 계전기가 오동작하거나 부동작할 수 있다.
- **비상 운전 전용**: 정상적인 운전 방식이 아니므로, 고장 복구 후 즉시 정상 결선으로 되돌려야 한다.

> [!warning] 중요
> 역 V 결선은 V 결선보다도 전압 불평형 문제가 더 클 수 있는 비상 대책이다. 적용 시 부하의 종류와 민감도를 반드시 고려해야 한다.

### 질문 & 확장

- 역 V 결선에서 전압 불평형을 최소화하는 방법은?
- 어떤 부하에서 역 V 결선 사용이 특히 위험한가?
- 역 V 결선과 스코트 결선의 차이점은?

### 연결 노트

- [[03. Permanent Notes/Area/📝 V 결선|📝 V 결선]] - V 결선과의 차이점 비교
- [[02. MOC/🏛️ 변압기.md|🏛️ 변압기]] - 변압기 관련 전체 지식
- [[02. MOC/🏛️ 회로 이론.md|🏛️ 회로 이론]] - 회로 이론 전반
- [[04. Practice Notes/📝 설비 불평형률 계산 및 기준.md|📝 설비 불평형률 계산 및 기준]] - 불평형 관련 기준

### 출처

- [네이버 블로그: v결선과 역v결선의 차이](https://m.blog.naver.com/casd00/221201561992)
- [Electrical Technology: Open Delta Connections of Transformers](https://www.electricaltechnology.org/2019/06/open-delta-connections-of-transformers.html)
- [Tutorials Point: Transformers Open Delta (V-V) Connection](https://www.tutorialspoint.com/electrical_machines/transformers_open_delta_v_v_connection.htm)
- [Daelim Transformer: The Ultimate FAQs Guide To Transformer Connection](https://www.daelimtransformer.com/transformer-connection.html)


