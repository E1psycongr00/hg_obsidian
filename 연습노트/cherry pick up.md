---
tags:
  - "#알고리즘"
  - "#DP"
aliases:
---
작성 날짜: 2024-02-11
작성 시간: 22:47

#미완 #솔루션

----

## 문제 & 원인


## 해결 방안
```python
class Solution:
    INF = 10 ** 9
    BLOCKED = -1

    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)
  
        def out_of_bound(r1, c1, r2, c2):
            return r1 == n or r2 == n or c1 == n or c2 == n
            
        def is_arrive_target_point(r1, c1, r2, c2):
            return r1 == n - 1 and c1 == n - 1 and r2 == n - 1 and c2 == n - 1

        @cache
        def countPickupCherry(r1, c1, r2, c2):
            if out_of_bound(r1, c1, r2, c2):
                return -self.INF
            if grid[r1][c1] == self.BLOCKED or grid[r2][c2] == self.BLOCKED:
                return -self.INF
            if is_arrive_target_point(r1, c1, r2, c2):
                return grid[r1][c1]
  

            cherries = grid[r1][c1] if r1 == r2 and c1 == c2 else grid[r1][c1] + grid[r2][c2]

            return cherries + max(
                countPickupCherry(r1 + 1, c1, r2 + 1, c2),
                countPickupCherry(r1 + 1, c1, r2, c2 + 1),
                countPickupCherry(r1, c1 + 1, r2 + 1, c2),
                countPickupCherry(r1, c1 + 1, r2, c2 + 1)
            )
  
        return max(0, countPickupCherry(0, 0, 0, 0))
```

## 질문 & 확장

(없음)

## 출처(링크)
- https://leetcode.com/problems/cherry-pickup/submissions/1172320912/

## 연결 노트
