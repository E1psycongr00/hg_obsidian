작성 날짜: 2023-10-05
작성 시간: 11:46

## 주제: #미완 #QueryDSL

----

## 원문

### 배경
- Querydsl은 HQL 쿼리를 형식이 안전한 방식으로 유지해야 할 필요성에서 탄생함. 
	- HQL 쿼리의 증분 구성에는 문자열 연결이 필요하므로 코드를 읽기가 어렵다.
	- 일반 문자열을 통한 도메인 유형 및 속성에 대한 안전하지 않은 참조는 문자열 기반 HQL 구성의 또 다른 문제였다.
- Hibernate용 HQL은 Querydsl의 첫 번째 대상 언어였지만 현재는 JPA, JDO, JDBC, Lucene, Hibernate Search, MongoDB, Collections 및 RDFBean을 백엔드로 지원

### 원칙
_유형 안전성은_ Querydsl의 핵심 원칙이다. 쿼리는 도메인 유형의 속성을 반영하는 생성된 쿼리 유형을 기반으로 구성된다.  또한 함수/메서드 호출은 완전히 유형이 안전한 방식으로 구성된다.

_일관성은_ 또 다른 중요한 원칙이다. 쿼리 경로와 작업은 모든 구현에서 동일하며 쿼리 인터페이스에도 공통 기본 인터페이스가 있다.

### QueryDsl JPA와 JPQL 비교
**JPQL**
```java
String username = "java";
String jpql = "select m from Member m where m.username = :username";
List<Member> result = em.createQuery(query, Member.class).getResultList();
```

**QueryDSL**
```java
String username = "java";
List<Member> result = queryFactory 
	.select(member) 
	.from(member) 
	.where(usernameEq(username))
	.fetch();
```


###
## 질문 & 확장



## 출처(링크)
- https://www.baeldung.com/intro-to-querydsl
- https://ittrue.tistory.com/292
- http://querydsl.com/static/querydsl/5.0.0/reference/html_single/
## 연결 노트
