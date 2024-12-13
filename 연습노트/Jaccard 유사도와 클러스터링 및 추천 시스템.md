---
tags:
  - 미완
  - 유사도
  - Jaccard
aliases: 
date: 2024-12-13
title: Jaccard 유사도와 클러스터링 및 추천 시스템
---
---

## 내용(Content)

### Jaccard 유사도와 클러스터링

Jaccard 유사도는 데이터 간의 유사성을 측정하는 방법으로, 클러스터링 알고리즘에서 자주 사용된다. 클러스터링은 유사한 데이터끼리 그룹화하는 작업이며, Jaccard 유사도는 특히 **이진 데이터(binary data)** 또는 **집합 기반 데이터**에 적합하다.

#### 활용 방법

1. **거리 기반 클러스터링**  
	- Jaccard 유사도를 거리로 변환하여 K-means, DBSCAN 등 거리 기반 클러스터링 알고리즘에 활용할 수 있다.
	- 거리 변환: $D(A, B) = 1 - J(A, B)$
	- $J(A, B)$ 값이 높을수록 $D(A, B)$ 값은 작아지며, 이는 두 데이터가 더 가깝다는 것을 의미한다.
2. **계층적 클러스터링**  
	- Jaccard 유사도를 계층적 클러스터링에서 데이터 객체 간의 연결 기준으로 사용할 수 있다.
	- 단일 연결(single linkage) 또는 완전 연결(complete linkage)을 정의할 때, Jaccard 유사도를 거리 메트릭으로 사용한다.

### Jaccard 유사도와 추천 시스템

Jaccard 유사도는 추천 시스템에서 사용자의 선호도(예: 구매, 클릭) 데이터를 바탕으로 유사성을 측정하는 데 활용된다. 이는 **집합 기반의 접근 방식**에서 특히 효과적이다.

### 활용 예시



2. **유사 아이템 기반 추천 (Item-based Recommendation)**  
    특정 아이템을 선호한 사용자 집합을 비교하여 유사 아이템을 추천한다.
    
    - 예: 아이템 $A$를 선호한 사용자 집합 ${U_1, U_2, U_3}$와 아이템 $B$를 선호한 사용자 집합 ${U_2, U_4}$의 유사도를 계산하여, $J(A, B) = \frac{|{U_2}|}{|{U_1, U_2, U_3, U_4}|} = \frac{1}{4} = 0.25$
3. **희소 데이터 처리**  
    Jaccard 유사도는 희소한 이진 데이터(아이템을 선호/비선호 여부만 있는 경우)에서 높은 성능을 보인다.
    

#### 예시

- **영화 추천 시스템**  
    두 사용자가 선호하는 영화 집합 간 Jaccard 유사도를 계산해 비슷한 취향의 영화를 추천한다.
    - 사용자 $A$가 ${\text{Inception, Matrix, Titanic}}$, 사용자 $B$가 ${\text{Matrix, Avatar, Titanic}}$을 선호한 경우,  
$$J(A, B) = \frac{|{\text{Matrix, Titanic}}|}{|{\text{Inception, Matrix, Titanic, Avatar}}|} = \frac{2}{4} = 0.5$$


## 질문 & 확장

- Jaccard 유사도와 코사인 유사도의 추천 성능 차이는 무엇인가?
- 추천 시스템에서 Jaccard 유사도를 가중치를 포함한 방식으로 확장할 수 있는가?

## 출처(링크)

- Manning, Christopher D., Raghavan, Prabhakar, and Schütze, Hinrich. _Introduction to Information Retrieval._ Cambridge University Press, 2008.
- Tan, Pang-Ning, Steinbach, Michael, and Kumar, Vipin. _Introduction to Data Mining._ Pearson, 2006.

## 연결 노트

example:: [[jaccard 유사도와 유사 사용자 기반 추천]]








