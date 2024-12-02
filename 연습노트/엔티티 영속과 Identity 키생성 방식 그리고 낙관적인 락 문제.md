---
tags:
  - 미완
  - 솔루션
  - JPA
aliases: 
date: 2024-12-02
title: 엔티티 영속과 낙관적인 락 문제
---
작성 날짜: 2024-12-02
작성 시간: 16:22


----

## 문제 & 원인

### ObjectOptimisticLockingFailureException

>**org.springframework.orm.ObjectOptimisticLockingFailureException**: Row was updated or deleted by another transaction (or unsaved-value mapping was incorrect): com.example.module_ex.member.domain.Member#1

테스트 시에 repository에 다음과 같은 코드를 작성했다.

```java
    @Test
    @Transactional
    void addInventoryItem_성공() {
        // given
        Member inputMember = new Member(1L, "test@test.com", new ArrayList<>());
        Member member = memberRepository.save(inputMember);
        Long inventoryId = 1L;
    }
}
```

그 결과 위와 같은 ObjectOptimisticLockingFailureException이 발생했다. 해당 에러는 영속 상태 불일치나 트랜잭션 발생시 문제가 생기면 발생하는 에러이다.

**현재 문제의 결론을 이야기 하지만 버전의 불일치 또는 영속 상태의 불일치 때문에 발생한다.**


### 영속 상태 불일치 시나리오


불일치 과정

1. save() 호출
	- 이미 ID를 초기화했기 때문에 isNew()는 False이다.
	- merge()를 실행
2. merge() 실행
	- DB에서 초기화된 ID를 조회
	- 없으므로 새로운 엔티티로 판단
	- persist() 시도
3. persist() 실행
	- IDENTITY 전략이 적용된 상태
	- 이미 ID가 존재하기 떄문에 INSERT 실패
	- 엔티티 상태가 불안정해짐(TRANSIENT, MANAGE 중 어떤 상태인지 알 수가 없음)
4. 결과
	- 엔티티 상태 불일치
	- JPA가 엔티티 상태 추적 불가
	- ObjectOptimisticLockingFailureException 발생


Identity 키 전략은 key 생성을 db에 위임하고 insert 이후 쿼리해서 id를 업데이트하는 방식이기 때문에 쓰기 지연이 아닌 persist() 호출시 바로 insert문을 사용하고, 이 때 자동 생성 전략과 직접 넣은 ID값이 충돌하면서 동시성 문제가 발생할 수 있고, 엔티티 영속 상태가 불안정해질 수 있다. 그래서 낙관적인락 예외가 발생하게 된다. 이는 JPA 가이드를 명확히 따르면 쉽게 해결할 수 있다.

## 해결 방안

#### Id를 null로 초기화

```java
new Member(null, "장지수", "hello@naver.com");
```


#### builder 패턴 사용

```java
Member.builder()
	.name("장지수")
	.email("hello@naver.com")
	.build()
```

#### null 접근 허용 X

생성자와 setter 모두 id에는 접근하지 못하도록 통제한다.

빌더 패턴의 경우 초기화하지 않은 값들은 모두 null과 기본값으로 초기화한다.

```java
public Member {

	// 필드 정의

	public Member(String name, String email) {
		this.name = name;
		this.email = email;
	}
}
```

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트

- [[영속성 관리 with JPA]]