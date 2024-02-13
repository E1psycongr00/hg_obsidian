---
tags:
  - 알고리즘
  - DP
aliases:
---
작성 날짜: 2024-02-13
작성 시간: 17:43

#미완 #솔루션

----

## 문제 & 원인
![[Pasted image 20240213174626.png]]

(0, 0) 지점부터 목표 지점까지 경로들의 모든 합을 K로 나눠떨어지면 0이 되는 모든 경로의 수를 구하여라
## 해결 방안
### top-down 3DP
DP로 쓰기 위해 3차원을 활용하려고 한다. 

**3차원**
- y
- x
- value % k

value % k를 인자로 받는 이유는 

## 질문 & 확장

(없음)

## 출처(링크)
- https://leetcode.com/problems/paths-in-matrix-whose-sum-is-divisible-by-k/

## 연결 노트
