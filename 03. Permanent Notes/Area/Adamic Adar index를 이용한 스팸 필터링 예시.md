---
tags:
  - graph
aliases: 
created: 2024-12-12
title: Adamic Adar index를 이용한 스팸 필터링 예시
note-type: COMMON
completed: true
---
---

## 내용(Content)

### Adamic-Adar Index를 활용한 스팸 필터링: 비정상적인 연결 패턴 감지

Adamic-Adar Index는 네트워크 상의 비정상적인 연결 패턴을 감지하는 데도 활용될 수 있다. 특히, 이메일 네트워크나 소셜 네트워크에서 **스팸 계정**을 식별하거나 **의심스러운 연결**을 탐지하는 데 유용하다.

#### 시나리오

회사 내부의 이메일 네트워크를 분석한다고 가정하자.

- 각 노드는 직원(이메일 사용자)을 나타내며, 엣지는 이메일 송수신 관계를 나타낸다.
- 의심스러운 스팸 발신자가 존재한다고 가정하고, 이를 Adamic-Adar Index를 사용해 감지하려 한다.

#### 데이터

| 사용자 | 연결된 사람수 $\Gamma(z)$ |
| --- | ------------------- |
| A   | 5                   |
| B   | 5                   |
| C   | 50                  |
| D   | 5                   |
C와 D 모두 A,B 모두와 이메일 송수신 관계로 공통 노드 관계이다.

#### 계산을 통해 스팸 감지하기
$$\text{Adamic-Adar}(A, B) = \sum_{z \in \Gamma(A) \cap \Gamma(B)} \frac{1}{\log |\Gamma(z)|}
$$

1. 사용자 A와 B의 공통 이웃: C (스팸 계정)
	- Adamic Adar: $\frac{1}{\log |\Gamma(C)|} = \frac{1}{\log 50}$ = 0.59

2. 사용자 A와 B의 공통 이웃: D (정상 계정)
	- $\frac{1}{\log |\Gamma(D)|} = \frac{1}{\log 5}$ = 1.43


| 사용자 간 연결 | 공통 이웃 | 연결된 사람수 $\Gamma(z)$ | Adamic Adar Score | 스팸 여부 |
| -------- | ----- | ------------------- | ----------------- | ----- |
| A <-> B  | C     | 50                  | 0.59              | 스팸    |
| A <-> B  | D     | 5                   | 1.43              | 정상    |
|          |       |                     |                   |       |

점수가 낮은 C는 스팸일 가능성이 높다.


## 질문 & 확장

(없음)

## 출처(링크)

- - Newman, M. E. J. (2001). Scientific collaboration networks. II. Shortest paths, weighted networks, and centrality.

## 연결 노트










