---
tags:
  - SQL
  - MySQL
aliases:
  - CONCAT
title: SQL에서 글자 붙여넣기
created: 2024-06-14T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-06-14
작성 시간: 02:37


----
## 내용(Content)

### CONCAT

>[!summary]
>```sql
>select concat(쿼리값, "추가할 글자")
>```
>쿼리 결과에 글자를 추가할때 사용하는 쿼리 함수


특정 결과에 추가로 글자를 붙일 때 CONCAT을 붙일 수 있다. 

### 예시

물고기의 최대 길이에 "cm" 를 붙여라

```SQL
SELECT concat(max(length), "cm") as max_length
from fish_info;
```


## 질문 & 확장



## 출처(링크)

- https://school.programmers.co.kr/learn/courses/30/lessons/298515

## 연결 노트

- [[03. Permanent Notes/Area/SQL 중간에 문자 삽입하기|CONCAT_WS]]
