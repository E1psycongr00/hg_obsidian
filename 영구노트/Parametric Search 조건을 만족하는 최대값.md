---
tags:
  - 알고리즘
  - 이분탐색
aliases:
---
작성 날짜: 2024-02-16
작성 시간: 21:19

#완성 #알고리즘 #이분탐색 

----
## 내용(Content)
### Parametric Search Max
>[!summary] 
>주어진 조건에 이분탐색으로 대입해서 만족하는 최대값

매개 변수 탐색은 optimize(x) -> decision(x) 문제로 바꿔서 푸는 것이다. 결정화 문제는 `대입해서 그것이 조건을 만족하느냐` 이고 x를 대입해서 true, false로 나타내기 때문에 문제를 풀기 쉬워지는 장점이 있다.


>[!caution] 
>상황에 따라 삼분 탐색이나 정확하진 않지만 근사에서 탐색하는 등 여러 가지를 매개변수 탐색이라 할 수 있다. 매개변수의 핵심은 어떤 x를 대입해서 조건에 맞는 x를 구하는 것이다. 

### code
#### java
```java
public static int parametricSearchMax(IntPredicate condition, int lo, int hi) {  
    while (lo < hi) {  
       int mid = lo + (hi - lo) / 2;  
       if (condition.test(mid)) {  
          lo = mid + 1;  
       } else {  
          hi = mid;  
       }  
    }  
    return lo - 1;  
}
```

condition을 IntPredicate로 받은 이유는 Predicate로 받으면 boxing이 일어나기 때문에 매번 호출하는 알고리즘 특성상 성능에  안 좋을 수 있기 때문에 사용했다.

함수형 객체를 사용한 이유는 람다는 지역변수를 캡처 할 수 있고, condition과 이분 탐색 로직 분리를 통해 코드가 한 가지 작업만 할 수 있도록 하고 다양한 컨디션에 대해서 쉽게 대처할 수 있다. 기존 이분 탐색과 거의 동일한 코드기 때문에 사용하는데 큰 어려움도 없다.
### Lower Bound와 관계
이해를 돕기 위해 \[0, 10) 인  범위에서 target이 5일 때 범위의 정수 값을 배열로 \[0,1,2,3,4,5,6,7,8,9]로 가진다고 하자. 

![[lower_bound와 Parametric Search 예제(draw).svg|500]]

조건을 만족하는 최대 x을 구하는 것도 under_bound와 코드는 동일하며 큰 차이가 없다. 다만 if 문이 condition으로 바뀐 점인데 해석해보자

under_bound의 코드 중` if (nums[mid] < target) {low = mid + 1}`이 있는데 위의 예시를 대입해서 살펴보면 target (5) 이전 값에 대해서는 모두 참이며, 이후 값에서는 거짓이 된다.

즉, 5 이전까지는 참이며 5를 포함한 이후로는 거짓이 된다.  low가 끝나는 시점은 True가 False 경계와 가장 가까운 True인 index + 1이며 이는 False 이다.

그래서 ParametricSearchMax에서는 결과는 lo - 1이 된다.

### 결과 코드 예시
```java
System.out.println(parametricSearchMax(mid -> mid < 5, 0, 10)); // 5
```

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
- [[lower bound]]
- [[upper bound]]
- [[Parametric Search 조건을 만족하는 최소값]]








