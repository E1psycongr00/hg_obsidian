---
tags:
  - 유사도
  - Jaccard
aliases: 
created: 2024-12-13
title: jaccard 유사도와 유사 사용자 기반 추천
note-type: COMMON
completed: true
---
---

## 내용(Content)

### 유사 사용자 기반 추천 (User-based Recommendation)

![[Jaccard 사용자 기반 추천 클러스터링 (draw).svg]]

#### 시나리오
- A,B,C,D가 선호하는 유저들을 집합 테이블 형식으로 나타냄.
```text
user_items = {
	'A': {'Item1', 'Item2', 'Item3', 'item4'},
	'B': {'Item2', 'Item4', 'Item5', },
	'C': {'Item2', 'Item3', 'Item7'},
	'D': {'Item7', 'Item9', 'Item10'},
}
```

#### 1. Jaccard 유사도 계산

사용자 $A$가 선호한 아이템 집합 $I_A$, 사용자 $B$가 선호한 아이템 집합 $I_B$에 대해 [[Jaccard 유사도#^e6710e|Jaccard 수식]]을 이용해 $J(I_A, I_B)$를 계산.

#### 2. 유사도의 의미
- $J(I_A, I_B)$ 값은 사용자 $A$와 사용자 $B$가 얼마나 비슷한 취향을 가지고 있는지 나타낸다.
- 값이 클수록 두 사용자가 선호하는 아이템이 더 많이 겹친다는 뜻이다.
- 예:
    - $J(I_A, I_B) = 0$: 완전히 다른 취향.
    - $J(I_A, I_B) = 1$: 동일한 취향.

![[Pasted image 20241213142528.png]]

#### 3. 거리 행렬 생성

Jaccard 유사도 행렬을 기반으로 거리 행렬을 생성한다. `거리 = 1 - 유사도` 개념으로 사용하며, 이를 통해 사용자들 사이의 거리감을 나타낼 수 있다.

![[Pasted image 20241213145000.png]]


#### 4. Clustering을 이용해서 유사한 유저 군집화

KMeans 알고리즘과 거리 행렬을 이용해서 A,B,C,D를 2 부류로 클러스터링을 수행한다.

![[Pasted image 20241213145137.png]]

#### 5. 추천하기

A,B,C는 서로 군집화되어 있고 유사한 관심사를 가진 사용자이다.

- $J(I_A, I_B)$가 높은 사용자(예: $B$)의 선호 아이템 집합 $I_B$에서, 사용자 $A$가 아직 선호하지 않은 아이템을 추천한다.
- 추천 아이템: $I_B - I_A$

### 예제로 사용한 코드

```python
import pandas as pd
from sklearn.metrics import pairwise_distances
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import seaborn as sns


# 데이터 (이전 코드에서 생성된 user_items 사용)
user_items = {
    'A': {'Item1', 'Item2', 'Item3', 'item4'},
    'B': {'Item2', 'Item4', 'Item5', },
    'C': {'Item2', 'Item3', 'Item7'},
    'D': {'Item7', 'Item9', 'Item10'},
}

# 사용자 목록
users = list(user_items.keys())

# Jaccard 유사도 계산
def jaccard_similarity(set1, set2):
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union if union != 0 else 0

# 유사도 행렬 생성
similarity_matrix = [[jaccard_similarity(user_items[u1], user_items[u2]) 
                      for u2 in users] for u1 in users]

# 거리 행렬 생성 (1 - 유사도)
distance_matrix = 1 - pd.DataFrame(similarity_matrix, index=users, columns=users)

# K-means 클러스터링
kmeans = KMeans(n_clusters=2, random_state=0)  # 클러스터 수: 2
clusters = kmeans.fit_predict(similarity_matrix)

# 시각화 (seaborn heatmap 이용)
sns.heatmap(similarity_df, annot=True, cmap='viridis')
plt.title('Jaccard Similarity Matrix (Pandas)')
plt.show()

# 시각화 (seaborn heatmap 이용)
sns.heatmap(distance_matrix_df, annot=True, cmap='viridis')
plt.title('Distance Matrix (Pandas)')
plt.show()

sns.scatterplot(x='user', y='cluster', data=cluster_df, hue='cluster', palette='bright')
plt.title('K-means Clustering Result')
plt.show()
```

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










