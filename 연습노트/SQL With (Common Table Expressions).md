---
tags:
  - SQL
  - CTE
aliases:
  - Common Table Expressions
  - CTE
date: 2024-04-29
title: SQL With 문
---
작성 날짜: 2024-04-29
작성 시간: 18:06

#미완 #SQL #CTE 

----
## 내용(Content)


### CTE (Common Table Expressions)

>[!summary]
>CTE는 일시적인 결과 집합을 생성하며, 마치 생성된 테이블처럼 참조해서 사용가능하다.

```sql
WITH cte_name AS (
	-- 여기에 서브쿼리를 작성한다.
)
-- 이후 일반적인 쿼리 작성
-- cte.name을 마치 실제 테이블인것 처럼 사용 가능

SELECT * FROM cte_name;
```

>[!example]
>우리가 employees 테이블에서 급여가 평균 이상인 직원들을 찾고 싶다고 가정하자. 이를 위해서 cte문을 사용해볼 수 있다.
>```SQL
>WITH AvgSalary AS (
>	SELECT AVG(salary) AS average FROM emplyees
>)
>SELECT e.name, e.salary
>FROM emplyees e, AvgSalary a
>WHERE e.salary > a.average;
>```

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










