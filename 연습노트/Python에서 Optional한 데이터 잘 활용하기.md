---
tags:
  - 솔루션
  - "#Python"
  - 단축평가
aliases: 
date: 
title: Python에서 Optional한 데이터 잘 활용하기
---
작성 날짜: 2024-09-26
작성 시간: 12:37

#미완 #솔루션 #Python #단축평가 

----

## 문제 & 원인

```python
os.getEnv()
```

이런 function들을 보면 리턴값이 `str | None` 형태이다. 이 형태는 python 3.10+에서 union 타입 형태로 위와 같은 형태는 `Optional[str]`과 동일하다.


## 해결 방안

### 단축 평가 활용하기

```python
def func(x: str | None):
	return str(x or "")
```

[[단축 평가 계산|단축 평가]]를 활용하면 쉽게 str 타입으로 반환할 수 있다.

여기서 `str(x or "")`을 사용하면 x 가 만약 truthy하지 못하다면 빈 문자열을 출력하고, truthy하다면 문자열 x를 리턴하도록 한다. 만약 타입이 확실히 문자열이라면 str 대신 `x or ""`로 써도 무방하다.
## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트

- [[단축 평가 계산]]