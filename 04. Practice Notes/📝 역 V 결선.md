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
completed: false
archived: false
time-to-understand: "5분"
last-reviewed: 2025-01-27
---

### 정의

역 V 결선은 Y 결선(와이 결선)에서 한 상을 제거하고, 나머지 한 상을 180도 뒤집어서 연결하는 변압기 결선 방식이다. 영어로는 **Open Wye Connection**이라고 부른다.

기본적으로 2대의 변압기만 사용하여 3상 전력을 공급할 수 있는 특수한 결선 방법이다.

### 목적

역 V 결선의 주요 목적은 **불평형 없는 전원 공급**이다. 

일반적으로 Y 결선에서 한 상이 고장나거나 제거되면 전압 불평형이 발생한다. 하지만 역 V 결선에서는 한 상을 180도 역결선함으로써 이러한 불평형 문제를 해결하고, 2대의 변압기만으로도 3상 평형 전압을 공급할 수 있다.

### V 결선과의 차이점

많은 사람들이 혼동하는 개념이지만, **역 V 결선**과 **V 결선**은 완전히 다른 결선 방식이다.

| 구분 | V 결선 (Open Delta) | 역 V 결선 (Open Wye) |
|------|-------------------|-------------------|
| **기본 결선** | 델타 결선 기반 | Y 결선 기반 |
| **연결 방식** | 삼각형에서 한 변 제거 | 별형에서 한 상 제거 후 역결선 |
| **극성** | 정상 극성 유지 | 한 상 180도 반전 |

### 기본 특징

1. **변압기 개수**: 2대의 변압기만 사용
2. **극성 변화**: 한 상의 극성을 180도 뒤집어서 연결
3. **전압 평형**: 3상 평형 전압 공급 가능
4. **경제성**: 변압기 3대 대신 2대만 사용하여 경제적
5. **용도**: 주로 비상 운전이나 초기 설치 시 활용

### 실용적 활용

- **비상 운전**: Y-Y 결선 중 한 대 고장 시 임시 운전 방식
- **경제적 설치**: 초기에 2대만 설치 후 필요시 3대로 확장
- **특수 부하**: 불평형 부하가 예상되는 경우

>[!note] 참고
>역 V 결선은 일반적이지 않은 특수 결선 방식이므로, 설계 시 전문적인 검토가 필요하다.

### 질문 & 확장

- 역 V 결선에서 각 변압기의 부하 분담은 어떻게 될까?
- 180도 역결선이 전압 평형에 미치는 구체적인 영향은?
- 다른 특수 결선 방식들과는 어떤 차이가 있을까?

### 연결 노트

- [[03. Permanent Notes/Area/📝V 결선|📝V 결선]] - V 결선과의 차이점 비교
- [[02. MOC/🏛️ 변압기.md|🏛️ 변압기]] - 변압기 관련 전체 지식
- [[02. MOC/🏛️ 회로 이론.md|🏛️ 회로 이론]] - 회로 이론 전반

### 출처

- [네이버 블로그: v결선과 역v결선의 차이](https://m.blog.naver.com/casd00/221201561992)
- [Electrical Technology: Open Delta Connections of Transformers](https://www.electricaltechnology.org/2019/06/open-delta-connections-of-transformers.html)
- [Tutorials Point: Transformers Open Delta (V-V) Connection](https://www.tutorialspoint.com/electrical_machines/transformers_open_delta_v_v_connection.htm)
- [Daelim Transformer: The Ultimate FAQs Guide To Transformer Connection](https://www.daelimtransformer.com/transformer-connection.html)


