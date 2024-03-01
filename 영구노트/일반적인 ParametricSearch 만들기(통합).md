---
tags:
  - 알고리즘
  - 이분탐색
aliases: 
title: 일반적인 ParametricSearch 만들기(통합)
date: 2024-02-16
---
작성 날짜: 2024-02-16
작성 시간: 22:38

#완성 #솔루션 #알고리즘 #이분탐색 

----

## 문제 & 원인
- [[Parametric Search 조건을 만족하는 최소값#code]] 
- [[Parametric Search 조건을 만족하는 최대값#code]]

이 2개는 코드가 너무 중복되는 코드가 많다. 그래서 lower bound 로직을 해치지 않으면서 이 코드를 통합할 수 있는 하나의 코드를 만들어 보고자 한다.
## 해결 방안

### code
```java
public static int parametricSearch(IntPredicate condition, boolean isMax, int lo, int hi) {  
    condition = isMax ? condition : condition.negate();  
    while (lo < hi) {  
       int mid = lo + (hi - lo) / 2;  
       if (condition.test(mid)) {  
          lo = mid + 1;  
       } else {  
          hi = mid;  
       }  
    }  
    return isMax ? lo - 1 : lo;  
}
```

isMax를 인자로 두어 isMax에 따라 condition을 반전할 지 결정하고, 리턴도 isMax에 따라 다르게 출력되도록 코드를 짜보았다.

### 결과 코드
```java
public class Main {  
    public static void main(String[] args) {  
       System.out.println(parametricSearch(mid -> mid < 5, true, 0, 10));  // 4
       System.out.println(parametricSearch(mid -> mid > 5, false, 0, 10));  // 6
    
    }
}
```

콜백을 활용하기 때문에 lambda 캡처링을 통해서 깔끔한 코드를 짜는 것도 가능하다.

예를 들면 condition 함수가 bfs를 사용해야 한다면

`parametricSearch(mid -> bfs(mid, start, arrive, weightLimit), true, 0, 1_000_001)`

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
- [[Parametric Search 조건을 만족하는 최대값]]
- [[Parametric Search 조건을 만족하는 최소값]]
- [[lower bound]]
- [[upper bound]]