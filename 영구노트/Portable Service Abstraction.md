---
tags:
  - 완성
  - JAVA
  - Spring
aliases:
  - PSA
date: 2024-10-28
title: Portable Service Abstraction
---
작성 날짜: 2024-10-28
작성 시간: 15:31


----
## 내용(Content)

### Portable Service Abstraction

>[!summary]
>Spring의 핵심 요소 중 하나로, 환경과 세부 기술의 변화와 상관없이 일관된 방식으로 기술에 접근할 수 있도록 해주는 추상화 구조를 의미

PSA는 추상화된 인터페이스를 통해 여럿 기술과 상관없이 일관된 사용을 제공한다.

![[PSA 추상화 구조 (draw).svg]]

예를 들면 Spring JDBC나 JPA를 들 수 있다.

JDBC의 경우 각 데이터베이스 제조사에서, 표준 JDBC 인터페이스 맞는 구현체 `벤더`를 제공한다.
그리고 `드라이버`로 불린다.

>[!example]
>기업별 벤더(JDBC Driver)는 다음과 같다.
>- MySQL Driver
>- Oracle Driver
>- PostgreSQL Driver
>- etc...



## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










