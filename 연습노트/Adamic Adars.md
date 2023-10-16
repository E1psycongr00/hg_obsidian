작성 날짜: 2023-10-16
작성 시간: 13:22

## 주제: #미완 #graph

----
## 원문

Adamic - Adars 는 두 노드 사이의 공유 링크 양에 따라 소셜 네트워크의 링크를 예측하기 위해 설계되었다. 
$$ A(x,y)=\sum _{u\in N(x)\cap N(y)}{\frac {1}{\log {|N(u)|}}} $$



$|N(u)|$ 는 인접한 노드 집합이다. $N(x)\cap N(y)$ 의미는 x노드와 y노드의 공통된 인접 노드의 모음이라 할 수 있다. N(u)는 해당 공통 인접 노드의 dgree 갯수로 log 역수들의 합이다.

조금 더 자세히 알아보자.

```
A -- B
| \   |
|  C--D
| /   |
E -- F
```

A와 D의 Adamic Adars 지표 값은 얼마인가?
A와 D의 공통 인접 노드는 B와 C이다. 이들의 degree는 C의 경우 3과 B의 경우는 2이다. 그럼 결과 값은 다음과 같다.

$$ AA(x, y) = \frac {1}{\log(2)} + \frac{1}{log(3)} = 2.095$$



### Adamic Adars가 가지는 의미

소셜 네트워크에서 노드간의 링크를 예측할 떄 쓰는 지표라고 했다. 많은 사람


## 질문 & 확장

(없음)

## 출처(링크)
- https://velog.io/@eunzin/link-prediction-algorithms

## 연결 노트










