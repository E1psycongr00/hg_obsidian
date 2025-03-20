---
tags:
  - 완성
  - JAVA
  - DataBase
  - Flyway
aliases: 
date: 2024-11-13
title: Flyway 소개
---
작성 날짜: 2024-11-13
작성 시간: 20:26


----
## 내용(Content)

### Flyway

>[!summary]
> 데이터베이스 스키마를 안정적이고 쉽고 지속적으로 리모델링하는데 사용할 수 있는 프레임워크이다.

- Flyway는 **DB 형상 도구**이다. DB 스키마의 리팩토링, 버전 관리를 위한 도구이고, Spring에서 공식적으로 제공하는 도구이다. 

- Flyway는 `마이그레이션`을 사용하여 데이터베이스를 한 버전에서 다음으로 업데이트하며, 마이그레이션별 SQL 또는 고급 데이터베이스 변환을 위한 Java API를 지원한다.

- Flyway는 선형적으로 버전을 관리한다.

>[!help]
>'마이그레이션'이란 데이터베이스를 한 버전에서 다음 버전으로 업데이트하는 데 사용되는 것

### Flyway의 특징

- **형상 관리**: Flyway는 데이터베이스 변경에 대한 명확한 버전 관리 시스템을 제공하여 어떤 변경이 언제 이루어졌는지 쉽게 추적할 수 있다.
- **롤백 기능**: 마이그레이션이 실패하거나 이전 상태로 되돌려야 할 경우, Flyway는 마이그레이션 기록을 관리하여 쉽게 롤백할 수 있도록 한다.
- **환경 간 일관성**: Flyway를 사용하면 개발, 테스트, 프로덕션 등 모든 환경이 동일한 데이터베이스 스키마로 동기화되도록 보장하여 배포 시 불일치와 잠재적 문제를 줄일 수 있다.
- **다양한 데이터베이스 지원**: Flyway는 MySQL, PostgreSQL, Oracle 등 다양한 데이터베이스를 지원하여 다양한 프로젝트에 유연하게 사용할 수 있다.
- **CI/CD 파이프라인과의 통합**: Flyway는 지속적 통합 및 배포 파이프라인에 쉽게 통합되어 배포 중 마이그레이션 적용 과정을 자동화할 수 있다.

### 동작 원리

Flyway는 선형적으로 형상 관리를 수행한다. 마이그레이션 스크립트에는 네이밍 컨벤션이 존재하는데 이를 통해 Spring boot에서는 DB 스키마 형상 관리를 한다.

![[Flyway 형상관리 (draw).svg]]

flyway 생성 시에 v1, v2 이런식으로 올라가지만,u2를 하더라도 다음 스크립트 버전은 V2가 아닌 V3로 진행한다. 이런 식을 선형적으로 관리되고, Undo 스크립트더라도, 직접 스크립트를 짜서 이전으로 되돌려야 한다.

### Flyway 네이밍 컨벤션

Flyway는 네이밍을 통해 형상 관리를 한다. 네이밍 구조는 크게 5가지로 나뉜다.

![[Flyway Naming Convension (draw).svg]]

**네이밍 구조**
- Prefix: 스크립트의 특징을 Action을 정의
	- V: Version migration: 가장 기본으로, 선형적으로 버전을 관리하는 Prefix
	- U: Undo migration: 마이그레이션을 이전으로 되돌림(유료임!)
	- R: Repeatable migration: 여러 번 실행 가능한 파일로, 주로 참조 데이터나 뷰를 사용할 때 사용
- Version: 숫자 순서대로 Flyway는 선형적으로 관리한다. 새로 작성할 때 최신 버전보다 높은 숫자를 사용하고, 날짜 형식으로도 관리 가능하다.
- Seperator: `_` 2개를 사용한다. `__` Prefix + Version과 Description 구분 용도로 사용한다.
- Description: 마이그레이션의 주제에 대한 간략한 내용을 작성한다.
- Suffix: Flyway에서는 `.sql`를 사용한다.

>[!caution]
> V1, V2 이런식으로 마이그레이션을 했다면 U2, U1 이런식으로 migration해야 한다.
>  U는 특정 Version을 이전으로 되돌리는 마이그레이션으로 선형적인 구조로 형상관리하는 Flyway에서는 최신 Version을 순서대로 되돌려야 안전하게 사용가능하다.

>[!example]- Example: Version 날짜 형식
>Version을 날짜형식으로도 많이 관리한다. 관리 형식은 다음과 같다.
> ### 기본 날짜
> ```text
>구조: V<년><월><일><시><분><초>__설명.sql
>예시:  20241113210000__initial_schema.sql
>```
>위의 경우 2024년 11월 13일 21시 00분 00초이다.
>
> ### 날짜 + 일련번호
> 동일한 날짜에 사용하는 경우 일련번호를 추가할 수도 있다.
> `V20241113210000_1_second_schema.sql`
> 


### Flyway 명령어

Flyway는 데이터베이스 마이그레이션을 관리하기 위해 다음과 같은 기본 명령어를 지원한다.

- **info**: 데이터베이스 스키마의 현재 상태/버전을 출력합니다. 보류 중인 마이그레이션, 적용된 마이그레이션, 적용된 마이그레이션의 상태 및 적용된 시간을 출력한다. 
- **migrate**: 데이터베이스 스키마를 현재 버전으로 마이그레이션한다. 클래스 경로에서 사용 가능한 마이그레이션을 스캔하고 보류 중인 마이그레이션을 적용한다. 
- **baseline**: baselineVersion을 포함한 모든 마이그레이션을 제외하고 기존 데이터베이스를 기준선으로 설정한다. 기준선은 기존 데이터베이스에서 Flyway를 시작하는 데 도움이 된다. 그런 다음 최신 마이그레이션을 정상적으로 적용할 수 있다. 
- **validate**: 사용 가능한 마이그레이션에 대해 현재 데이터베이스 스키마를 검증한다. 
- **repair**: 메타데이터 테이블을 복구한다. 
- **clean**: 구성된 스키마의 모든 객체를 삭제한다. 물론 프로덕션 데이터베이스에서는 clean을 사용해서는 안된다. 

### Intellij IDEA 플러그인과 Flyway

Intellij의 플러그인 중 JPABuddy를 이용하면, JPA 엔티티 기반으로 Flyway의 마이그레이션을 생성할 수 있다. 그 외에도 Intellij는 Flyway 기능을 편리하게 만들어주는 여럿 기능들을 제공한다.

[How to Use Flyway for Database Migrations in Spring Boot Applications | The IntelliJ IDEA Blog](https://blog.jetbrains.com/idea/2024/11/how-to-use-flyway-for-database-migrations-in-spring-boot-applications/)
```embed
title: "Fetching"
image: "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibGRzLW1pY3Jvc29mdCIgd2lkdGg9IjgwcHgiICBoZWlnaHQ9IjgwcHgiICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMCkiPjxjaXJjbGUgY3g9IjgxLjczNDEzMzYxMTY0OTQxIiBjeT0iNzQuMzUwNDU3MTYwMzQ4ODIiIGZpbGw9IiNlMTViNjQiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDM0MC4wMDEgNDkuOTk5OSA1MCkiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiB0aW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS41cyIgYmVnaW49IjBzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxjaXJjbGUgY3g9Ijc0LjM1MDQ1NzE2MDM0ODgyIiBjeT0iODEuNzM0MTMzNjExNjQ5NDEiIGZpbGw9IiNmNDdlNjAiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDM0OC4zNTIgNTAuMDAwMSA1MC4wMDAxKSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIHRpbWVzPSIwOzEiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjVzIiBiZWdpbj0iLTAuMDYyNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+PGNpcmNsZSBjeD0iNjUuMzA3MzM3Mjk0NjAzNiIgY3k9Ijg2Ljk1NTE4MTMwMDQ1MTQ3IiBmaWxsPSIjZjhiMjZhIiByPSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzNTQuMjM2IDUwIDUwKSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIHRpbWVzPSIwOzEiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjVzIiBiZWdpbj0iLTAuMTI1cyI+PC9hbmltYXRlVHJhbnNmb3JtPgo8L2NpcmNsZT48Y2lyY2xlIGN4PSI1NS4yMjEwNDc2ODg4MDIwNyIgY3k9Ijg5LjY1Nzc5NDQ1NDk1MjQxIiBmaWxsPSIjYWJiZDgxIiByPSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzNTcuOTU4IDUwLjAwMDIgNTAuMDAwMikiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiB0aW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS41cyIgYmVnaW49Ii0wLjE4NzVzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxjaXJjbGUgY3g9IjQ0Ljc3ODk1MjMxMTE5NzkzIiBjeT0iODkuNjU3Nzk0NDU0OTUyNDEiIGZpbGw9IiM4NDliODciIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDM1OS43NiA1MC4wMDY0IDUwLjAwNjQpIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIgdGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNXMiIGJlZ2luPSItMC4yNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+PGNpcmNsZSBjeD0iMzQuNjkyNjYyNzA1Mzk2NDE1IiBjeT0iODYuOTU1MTgxMzAwNDUxNDciIGZpbGw9IiNlMTViNjQiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDAuMTgzNTUyIDUwIDUwKSI+CiAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJyb3RhdGUiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMCA1MCA1MDszNjAgNTAgNTAiIHRpbWVzPSIwOzEiIGtleVNwbGluZXM9IjAuNSAwIDAuNSAxIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxLjVzIiBiZWdpbj0iLTAuMzEyNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+PGNpcmNsZSBjeD0iMjUuNjQ5NTQyODM5NjUxMTc2IiBjeT0iODEuNzM0MTMzNjExNjQ5NDEiIGZpbGw9IiNmNDdlNjAiIHI9IjUiIHRyYW5zZm9ybT0icm90YXRlKDEuODY0NTcgNTAgNTApIj4KICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIgdGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNXMiIGJlZ2luPSItMC4zNzVzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxjaXJjbGUgY3g9IjE4LjI2NTg2NjM4ODM1MDYiIGN5PSI3NC4zNTA0NTcxNjAzNDg4NCIgZmlsbD0iI2Y4YjI2YSIgcj0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoNS40NTEyNiA1MCA1MCkiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiB0aW1lcz0iMDsxIiBrZXlTcGxpbmVzPSIwLjUgMCAwLjUgMSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMS41cyIgYmVnaW49Ii0wLjQzNzVzIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjAgNTAgNTA7MCA1MCA1MCIgdGltZXM9IjA7MSIga2V5U3BsaW5lcz0iMC41IDAgMC41IDEiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjEuNXMiPjwvYW5pbWF0ZVRyYW5zZm9ybT48L2c+PC9zdmc+"
description: "Fetching [How to Use Flyway for Database Migrations in Spring Boot Applications | The IntelliJ IDEA Blog](https://blog.jetbrains.com/idea/2024/11/how-to-use-flyway-for-database-migrations-in-spring-boot-applications/)"
url: "[How to Use Flyway for Database Migrations in Spring Boot Applications | The IntelliJ IDEA Blog](https://blog.jetbrains.com/idea/2024/11/how-to-use-flyway-for-database-migrations-in-spring-boot-applications/)"
```


![[3-ij-db-connect.gif]]

![[Pasted image 20241113212844.png]]

![[Pasted image 20241113212849.png]]
## 질문 & 확장

(없음)

## 출처(링크)

- [One-Stop Guide to Database Migration with Flyway and Spring Boot](https://reflectoring.io/database-migration-spring-boot-flyway/)
- [\[데이터베이스\] Flyway란 무엇일까?](https://coding-jun.tistory.com/14)
- [How to Use Flyway for Database Migrations in Spring Boot Applications | The IntelliJ IDEA Blog](https://blog.jetbrains.com/idea/2024/11/how-to-use-flyway-for-database-migrations-in-spring-boot-applications/)
- [Database Migrations with Flyway | Baeldung](https://www.baeldung.com/database-migrations-with-flyway)
- [달록의 데이터베이스 마이그레이션을 위한 Flyway 적용기](https://hudi.blog/dallog-flyway/)
- [형상관리 데이터베이스 마이그레이션 툴 flyway — minseok\_study](https://minseok-study.tistory.com/entry/%ED%98%95%EC%83%81%EA%B4%80%EB%A6%AC-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98-%ED%88%B4-flyway)

## 연결 노트

