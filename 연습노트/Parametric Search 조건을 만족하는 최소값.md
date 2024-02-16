---
tags:
  - 알고리즘
  - 이분탐색
aliases:
---
작성 날짜: 2024-02-16
작성 시간: 22:19

#미완 #알고리즘 #이분탐색 

----
## 내용(Content)
### ParametricSearchMin
>[!summary]
>주어진 조건에 만족하는 최소 x를 찾는데 사용하는 이분 탐색 알고리즘


### code
#### java
```java
public static int parametricSearchMin(IntPredicate condition, int lo, int hi) {  
    while (lo < hi) {  
       int mid = lo + (hi - lo) / 2;  
       if (!condition.test(mid)) {  
          lo = mid + 1;  
       } else {  
          hi = mid;  
       }  
    }  
    return lo;
```

lower_bound와 거의 동일하나 condition을 부정해서 lo가 움직이도록 설계했다.
이렇게 해야 하는 이유는 lo가 움직이는 조건은 if 조건문이 참이여야 하기 떄문이다.

### lower bound와 Parametric Search min과 관계
[[Parametric Search 조건을 만족하는 최대값#Lower Bound와 관계]]와 거의 비슷하지만 최소값을 구한다는 것은 condition이 다음과 같다고 가정해본다. 

`nums[mid] >= target` 이것을 부정하면 `nums[mid] < target`으로 lower bound에서 최대한 가까운 5값은 찾는 문제와 같아진다.

위의 예시가 알려주는 것은 lower bound 코드를 활용하기 위해 부정문을 이용하여 lower bound로 활용할 수 있게 하기 함이다.

![[lower_bound와 Parametric Search 예제(draw).svg|500]]

lower bound 알고리즘을 돌리기 위해선 5보다 작은 인덱스에 대해서는 항상 True여야 하며, 큰 값은 항상 False여야 한다.  `nums[mid] >= target`은 
## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
- [[Parametric Search 조건을 만족하는 최대값]]
- [[lower bound]]
- [[upper bound]]










