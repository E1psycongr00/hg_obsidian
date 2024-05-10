---
tags:
  - SQL
  - MySQL
aliases: 
date: 2024-05-10
title: MySQL 비트 연산
---
작성 날짜: 2024-05-10
작성 시간: 20:55

#미완 #SQL #MySQL 

----
## 내용(Content)

### 비트 연산자 사용은 표준인가?

>[!summary]
> ANSI SQL 기준으로 비트 연산자는 표준이 아니다.

[The SQL Standard - ISO/IEC 9075:2023 (ANSI X3.135) - ANSI Blog](https://blog.ansi.org/sql-standard-iso-iec-9075-2023-ansi-x3-135/)에서 자료를 살펴봐도 비트 연산자에 대한 내용은 나와있지 않다. 고로 비트 연산자의 사용은 표준이라 볼 수 없다.

비트 연산자의 사용은 MySQL 또는 SQL Server와 같은 DBMS에서 지원하고 이는 DBMS의 확장 기능일 뿐, ANSI SQL 표준을 따르지는 않는다. 그러므로 DBMS별로 지원하는지 살펴볼 필요가 있다.

### MYSQL의 비트 연산자

MySQL 8.0 기준으로 사용되는 비트 연산자 종류는 다음과 같다.


| 종류  |   역할    |
| :-: | :-----: |
|  &  | 비트 AND  |
| \|  |  비트 OR  |
|  ^  | 비트 XOR  |
|  ~  | 비트 NOT  |
| <<  | 왼쪽 시프트  |
| >>  | 오른쪽 시프트 |

실제 코딩할 때 사용되는 언어와 같기 때문에 이해하는데 어렵지 않다.

### MYSQL에서 제공하는 비트 관련 함수




## 질문 & 확장

(없음)

## 출처(링크)

- [MySQL :: MySQL 8.0 Reference Manual :: 14.12 Bit Functions and Operators](https://dev.mysql.com/doc/refman/8.0/en/bit-functions.html)

## 연결 노트










