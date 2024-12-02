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

### save 내부의 persist와 merge

JPA에서는 entity 영속성 관리를 다음과 같이 한다.

```java
public enum EntityState {
    // 영속성 컨텍스트에 의해 관리되지 않는 상태
    TRANSIENT,      
    // 영속성 컨텍스트에 의해 관리되는 상태
    MANAGED,        
    // 영속성 컨텍스트에서 분리된 상태
    DETACHED,       
    // 삭제된 상태
    REMOVED         
}
```

JPA에 repository의 save는 persist와 merge 방식에 따라 영속 상태가 변화한다.

```java
// JpaRepository의 save() 메서드 내부 동작
public <S extends T> S save(S entity) {
    // isNew() 판단 기준
    // 1. @Version이나 @LastModifiedDate 필드가 null인가?
    // 2. ID가 null인가?
    // 3. ID가 primitive type이면서 0인가?
    if (entityInformation.isNew(entity)) {
        entityManager.persist(entity);  // 새로운 엔티티
    } else {
        entityManager.merge(entity);    // 기존 엔티티
    }
}
```

**persist 동작:**

```java
void persist(Entity entity) {
    // 1. 영속성 컨텍스트에 엔티티 등록
    persistenceContext.addNew(entity);
    
    // 2. IDENTITY 전략인 경우
    if (isIdentityStrategy) {
        // INSERT 즉시 실행하여 ID 획득
        executeInsert(entity);
    }
    // 다른 전략의 경우 트랜잭션 커밋 시점까지 지연
}
```

**merge 동작:**

```java
Entity merge(Entity entity) {
    // 1. DB에서 해당 ID의 엔티티 조회
    Entity managedEntity = entityManager.find(Entity.class, entity.getId());
    
    if (managedEntity == null) {
        // 2-1. 없으면 새로운 엔티티로 저장
        return persist(entity);
    } else {
        // 2-2. 있으면 기존 엔티티 업데이트
        managedEntity.updateFrom(entity);
        return managedEntity;
    }
}
```

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






## 해결 방안


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
