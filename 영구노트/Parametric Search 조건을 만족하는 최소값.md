---
tags:
  - 알고리즘
  - 이분탐색
aliases: 
title: Parametric Search 조건을 만족하는 최소값
date: 2024-02-16
---
작성 날짜: 2024-02-16
작성 시간: 22:19

#완성 #알고리즘 #이분탐색 

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

lower bound 알고리즘을 돌리기 위해선 5보다 작은 인덱스에 대해서는 항상 True여야 하며, 큰 값은 항상 False여야 한다.  `nums[mid] >= target`은 5보다 작은 부분이 False이기 때문에 lower bound를 적용할 수 없다. 그렇기에 부정문을 쓰는 것이다.

그렇다면 왜 최대값을 구할 때와 다르게 low -1 이 아닌 low를 리턴하는 것일까?

실제로는 위의 조건문은 활용할 때는 다음과 같은 람다 함수가 콜백으로 들어간다.

`(mid) -> mid >= 5` 

이 코드를 뒤집으면 `mid -> mid < 5` 가 되고 under bound는 target과 가까운 true 인덱스 + 1인 최초 false가 나오는 지점(5)을 반환할 것이다. 그런대 mid >=5 조건을 보면 5를 포함한 최소값을 반환해야 한다. 그래서 답은 5가 된다.

그럼 `mid -> mid > 5` 인 경우를 살펴보자
이 경우 부정형은 `mid -> mid <= 5`와 같고 index는 6을 리턴할 것이다. 그런데 이 6이 mid > 5에서 허용하는 인덱스 중 가장 작은 값이 된다.  그리서 low 그대로 리턴한다.

### 결과 코드 예시
```java
System.out.println(parametricSearchMin(mid -> mid >= 5, 0, 10)); // 5
```
## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
- [[Parametric Search 조건을 만족하는 최대값]]
- [[lower bound]]
- [[upper bound]]










