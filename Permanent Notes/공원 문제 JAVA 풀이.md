---
tags:
  - 완성
  - 솔루션
  - 알고리즘
  - JAVA
aliases: 
date: 2024-12-28
title: 공원 문제 JAVA 풀이
---
---

## 문제 & 원인

[[공원 문제#문제 & 원인|공원 문제]]를 JAVA로 접근해보고 객체지향적으로 접근해보자.



## 해결 방안

### 자바 문제 풀이

```java
import java.util.Arrays;

public class Solution {
    private static final String EMPTY_SPACE = "-1";

    public int solution(int[] matSizes, String[][] park) {
        // 매트 크기를 내림차순으로 정렬하여 가장 큰 매트부터 확인
        Arrays.sort(matSizes);
        for (int i = matSizes.length - 1; i >= 0; i--) {
            if (canPlaceMat(park, matSizes[i])) {
                return matSizes[i];
            }
        }
        return -1;
    }

    private boolean canPlaceMat(String[][] park, int matSize) {
        int rows = park.length;
        int cols = park[0].length;

        // 모든 가능한 시작점에 대해 매트 배치 가능 여부 확인
        for (int row = 0; row <= rows - matSize; row++) {
            for (int col = 0; col <= cols - matSize; col++) {
                if (isValidMatPlacement(park, row, col, matSize)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean isValidMatPlacement(String[][] park, int startRow, int startCol, int size) {
        // 
        for (int i = startRow; i < startRow + size; i++) {
            for (int j = startCol; j < startCol + size; j++) {
                if (!EMPTY_SPACE.equals(park[i][j])) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

### 객체 지향 풀이

Validator, Park 2개의 객체로 나눈다.

**Park**:

- parkGrid의 2차원 배열 상태를 책임진다.
- EmptySpace에 대해서 정사각형 범위 탐색을 해서 넘겨준다.

**Validator**:

- Park 객체를 이용해 공원에 적절한 돗자리를 깔 수 있는지 검증한다.


```java
import java.util.Arrays;

public class Solution {

    public int solution(int[] matSizes, String[][] parkGrid) {
        Park park = new Park(parkGrid);
        Validator validator = new Validator(park);

        Arrays.sort(matSizes);
        for (int i = matSizes.length - 1; i >= 0; i--) {
            if (validator.canPlaceMat(matSizes[i])) {
                return matSizes[i];
            }
        }
        return -1;
    }

    static class Park {

        private static final String EMPTY_SPACE = "-1";
        private final String[][] parkGrid;
        private final int rows;
        private final int cols;

        public Park(String[][] parkGrid) {
            this.parkGrid = parkGrid;
            this.rows = parkGrid.length;
            this.cols = parkGrid[0].length;
        }

        public int getRows() {
            return rows;
        }

        public int getCols() {
            return cols;
        }

        public boolean isEmptySpace(int row, int col) {
            return parkGrid[row][col].equals(EMPTY_SPACE);
        }

        public boolean isEmptySpaceRange(int startRow, int startCol, int size) {
            int endRow = startRow + size;
            int endCol = startCol + size;

            if (endRow > rows || endCol > cols) {
                return false;
            }

            for (int i = startRow; i < endRow; i++) {
                for (int j = startCol; j < endCol; j++) {
                    if (!isEmptySpace(i, j)) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    static class Validator {

        private final Park park;

        public Validator(Park park) {
            this.park = park;
        }

        public boolean canPlaceMat(int size) {
            for (int row = 0; row < park.getRows(); row++) {
                for (int col = 0; col < park.getCols(); col++) {
                    if (park.isEmptySpaceRange(row, col, size)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
```
## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
