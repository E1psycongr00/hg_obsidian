---
tags:
  - graph
aliases: null
title: Adamic Adars
created: 2023-10-16T00:00:00.000Z
note-type: COMMON
completed: true
---


----
## 내용(Content)

### Adamic Adars

>[!summary]
>Adamic-Adar Index는 네트워크 그래프에서 **두 노드가 공유하는 이웃 노드의 중요도를 기반으로 유사성을 측정하는 방법**이다.

이는 이웃 노드의 중요도가 낮을수록(즉, 그 노드와 연결된 다른 노드의 수가 적을수록) 해당 이웃 노드가 두 노드의 관계를 설명하는 데 더 중요한 역할을 한다고 가정한다.


### 수식

#### 해석하기

지표는 다음과 같은 수식으로 정의된다:

$$ AdamicAdars\mathrm{}(x,y)=\sum _{u\in N(x)\cap N(y)}{\frac {1}{\log {|N(u)|}}} $$

- $N(x)$: 노드 x의 이웃 노드의 집합
- $N(y)$: 노드 y의 이웃 노드의 집합
- u: 두 노드가 공유하는 공통 이웃 노드
- $|N(u)|$: 노드 u의 이웃 노드 갯수

Adamic-Adar Index는 다음과 같은 방식으로 작동한다:

1. 두 노드 xxx와 yyy의 공통 이웃들을 찾는다.
2. 각 공통 이웃의 "정보량"을 계산한다.
    - 여기서 정보량은 이웃 노드가 적게 연결될수록 크다고 간주한다.
3. 모든 공통 이웃의 정보량을 합산해 최종 유사성을 계산한다.

이 결과는 다음과 같은 의미를 가진다:

- 값이 클수록 두 노드는 공통성이 높다고 판단한다.
- 특히, 잘 연결되지 않은(즉, 희소한) 공통 이웃 노드가 많을수록 유사성이 더 크게 평가된다.

### Adamic Adars가 필요한 이유

- **추천 시스템**: [[03. Permanent Notes/Area/Adamic Adar index와 추천 시스템 이해와 예시| 추천 시스템 예시]]
    - 사용자 기반 추천에서, 사용자 간의 유사성을 측정해 제품, 친구, 콘텐츠 등을 추천하는 데 사용된다.
    - 예: 소셜 네트워크에서 친구 추천.
- **링크 예측**:
    - 그래프 상에서 아직 존재하지 않는 잠재적 연결을 예측하는 데 유용하다.
    - 예: 연구 분야에서 공동 저자의 관계 예측.
- **정보 네트워크 분석**:
    - 네트워크의 구조적 패턴을 분석하고, 관계의 강도를 정량화하는 데 기여한다.
    - 예: 웹페이지의 관계성 분석.
- **스팸 필터링**: [[03. Permanent Notes/Area/Adamic Adar index를 이용한 스팸 필터링 예시|스팸 필터링 예시]]
    - 이메일, 메시지 네트워크에서 비정상적인 연결 패턴을 탐지하는 데 활용 가능하다.

### Adamic Adars가 가지는 의미

소셜 네트워크에서 노드 간의 링크를 예측할 떄 쓰는 지표라고 했다. 왜 식에서는 공통 인접 노드의 degree특징을 노드 간의 연결 가능성을 예측하려고 하는 것일까?

예를 들어 친구를 사귄다고 가정하자.  A와 C는 과연 친구가 될 가능성이 있는 가를 예측하려고 한다. 이 때 둘 다 친구인 B가 있다고 가정하자 . B가 A와 C 둘만의 친구라면 A와 B 그리고 C는 생각보다 가까운 관계일 가능성이 높다. 또는 공통점이 많을 수도 있다. 그러나 B가 수 많은 친구를 데리고 있고, 그 중에 A와 C가 있다면 A와 C는 사실 가까운 관계일 가능성이 낮다. 이러한 생각을 가지고 특정 군집 간의 링크(연결)을 예측하는 지표가 Adamic Adars라 할 수 있다.

### 장점과 단점

#### 장점:

- 계산이 간단하고 효율적이다.
- **자주 사용되지 않는 노드(희소 정보)를 더 중요하게 평가**해 희소성을 잘 반영한다.

#### 단점:

- 대규모 네트워크에서는 계산 복잡도가 증가할 수 있다.
- 너무 희소한 그래프에서는 **충분한 공통 이웃 노드가 없을 수 있다.**


### 정리

예를 들면 Adamic Adars 지표가 높다는 것은 링크를 통해 두 노드가 특정한 군집에 속하고, 서로 유사할 가능성이 높다는 것을 예측할 뿐이지.. 실제 둘 간의 특성을 분석해서 유사점이 있는 것을 분석하는 것은 아니라 할 수 있다.


## 질문 & 확장

- Adamic-Adar Index는 다른 네트워크 유사성 지표(예: Jaccard Index, Common Neighbors)와 어떤 차이점이 있는가?
- 대규모 네트워크에서 Adamic-Adar Index의 효율성을 개선할 방법은 무엇인가?

## 출처(링크)

- Newman, M. E. J. (2001). Scientific collaboration networks. II. Shortest paths, weighted networks, and centrality.
- Liben-Nowell, D., & Kleinberg, J. (2003). The link-prediction problem for social networks.

## 연결 노트

- example:: [[03. Permanent Notes/Area/Adamic Adar index와 추천 시스템 이해와 예시]]
- example:: [[03. Permanent Notes/Area/Adamic Adar index를 이용한 스팸 필터링 예시]]
- 







