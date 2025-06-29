---
tags:
  - 알고리즘
  - 스케줄러
aliases:
  - RR
title: Round Robin
created: null
note-type: COMMON
completed: true
---

---

## 내용(Content)

### Round Robin: 순환적 공정성의 본질

우리는 종종 '순서대로', '돌아가면서'라는 표현을 사용한다. 이는 **자원이나 기회를 분배**할 때 가장 직관적이고 공정한 방식을 떠올릴 때 자연스럽게 나오는 표현이다. Round Robin은 이러한 직관을 알고리즘으로 형상화한 것으로, `순환적 공정성`(Circular Fairness)을 구현하는 가장 기본적인 방식이다.

Round Robin이 해결하고자 하는 근본적인 문제는 '어떻게 하면 편향 없이 모든 대상에게 동등한 기회를 제공할 수 있을까'이다. 이는 단순한 기술적 해결책을 넘어, 공정한 분배의 본질적 문제를 다루는 알고리즘적 접근이다.

### 순환적 공정성의 철학

Round Robin의 핵심은 `순환적 공정성`에 있다. 이는 모**든 참여자가 정확히 한 번씩, 동일한 순서로 반복적으로 선택되는 것을 보장**한다. 이 특성은 결정론적(deterministic) 선택을 가능하게 하며, 어떤 참여자도 다른 참여자보다 우선권을 갖지 않는 평등한 구조를 만든다.

이 알고리즘의 가장 중요한 특성은 상태 독립성이다. 현재의 선택은 오직 '마지막으로 선택된 대상이 누구인가'만을 기억하면 되며, 그 이전의 역사나 다른 외부 조건에 영향을 받지 않는다. 이러한 단순성은 알고리즘의 예측 가능성과 안정성을 보장한다.

시간 독립성 또한 주목할 만한 특성이다. Round Robin은 각 선택 사이의 시간 간격과 무관하게 작동한다. 즉, 선택들 사이에 얼마나 시간이 흘렀는지와 관계없이 항상 동일한 순서를 유지한다.

### 수학적 기반

Round Robin의 수학적 구조는 모듈러 연산을 기반으로 한다. $n$개의 대상이 있을 때, 현재 위치 $p$에서 다음 선택은 다음 수식으로 결정된다:

#### 기본 Round Robin


$$P(t) = (P_{0} + t) \bmod n $$

##### 구성 요소

- $P(t)$: t번째 위치
- $P_{0}$: 시작 위치(초기값)
- $t$: 현재 몇 번째 선택인지 (0부터 시작)
- $n$: 전체 선택 가능한 대상의 수

##### 예시

```text
t = 0일 때: P(0) = (0 + 0) mod 4 = 0
t = 1일 때: P(1) = (0 + 1) mod 4 = 1
t = 2일 때: P(2) = (0 + 2) mod 4 = 2
t = 3일 때: P(3) = (0 + 3) mod 4 = 3
t = 4일 때: P(4) = (0 + 4) mod 4 = 0  // 다시 처음으로
```

##### code

```python
def round_robin(n, turn):
    START_INDEX = 0
    if turn == 0:
        return START_INDEX
    return (START_INDEX + turn) % n
```

#### 가중치 기반 Round Robin

$$
P(t) = \arg \max_{i} \left( \frac{w_{i}}{C_{i}(t)} \right)
$$

##### 구성 요소

- $w_{i}$: i번째 대상의 가중치 (높을수록 자주 선택됨)
- $C_{i}(t)$ t 시점까지 i번째 대상이 선택된 횟수
- $\arg \max_{i}$: 최댓값을 가지는 i를 찾는 연산자

##### 동작 방식

- 각 대상마다 $\frac{w_{i}}{C_{i}(t)}$ 값을 계산
- 이 값이 가장 큰 대상을 선택

##### 예시

**초기 상태 (t=0)**:

```text
서버1: 4/1 = 4
서버2: 2/1 = 2
서버3: 1/1 = 1
→ 서버1 선택 (가장 큰 값)
```

**첫 번째 선택 후 (t=1)**:

```text
서버1: 4/2 = 2
서버2: 2/1 = 2
서버3: 1/1 = 1
→ 서버1 선택 (같은 값일 때는 인덱스가 작은 것 선택)
```

**두 번째 선택 후 (t=2)**:

```text
서버1: 4/3 ≈ 1.33
서버2: 2/1 = 2
서버3: 1/1 = 1
→ 서버2 선택 (이제 서버2의 값이 더 큼)
```


##### 구현 코드

```python
def argmax(list):
    return max(enumerate(list), key=lambda x: x[1])[0]

def weighted_round_robin(weight_list, choose_list):
    val_list = [weight_list[i] / choose_list[i] for i in range(len(weight_list))]
    choose_idx = argmax(val_list)
    choose_list[choose_idx] += 1
    return choose_idx
```


### 순환적 공정성 구조

모듈러의 경우 순차적으로 너무 당연하기 때문에 가중치 라운드 로빈의 시뮬레이션 데이터를 시각화하겠다.


![[weighted_round_robbin.gif]]

turn이 진행될 수록 가중치가 점점 동일 해져감을 알 수 있다. 이 때문에 오래 진행될 수록 순환적 공정성을 보장한다.

위 가중치 라운드 로빈은 매우 단순한 모델이고 시간이 지날수록 가중치가 희석되는 문제 때문에 다음과 같은 경우를 고려해서 가중치 희석을 막고, 순환적 공정성을 보장하기도 한다.

- **주기적 리셋**: 구현이 간단하지만 리셋 시점에서 급격한 변화 발생
- **동적 가중치 조정**: 더 안정적인 비율 유지가 가능하나 계산 복잡도 증가
- **슬라이딩 윈도우**: 최근 이력만 반영하여 가중치 효과 유지, 메모리 사용량 증가

## 결론

Round Robin은 단순성과 공정성의 완벽한 조화를 보여주는 알고리즘이다. 그 본질은 모든 참여자에게 동등한 기회를 보장하는 순환적 구조에 있으며, 이는 수학적으로 정확하고 효율적인 방식으로 구현된다.

이 알고리즘의 설계 철학은 현대 컴퓨터 과학의 여러 영역에 영향을 미치고 있다. 특히 공정성이 중요한 시스템 설계에서, Round Robin의 원칙은 여전히 중요한 참조점이 되고 있다. 그 단순함 속에 담긴 깊은 통찰은, 복잡한 문제에 대한 우아한 해결책이 항상 존재할 수 있다는 것을 보여준다.

## 질문 & 확장

(없음)

## 연결 노트

down:: [[03. Permanent Notes/Area/슬라이딩 윈도우를 활용한 라운드 로빈 알고리즘]]

## 출처(링크)





