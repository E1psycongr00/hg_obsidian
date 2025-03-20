---
tags:
  - 완성
  - JAVA
  - Spring
  - JPA
aliases: 
date: 2024-12-02
title: 영속성 관리 with JPA
---
작성 날짜: 2024-12-02
작성 시간: 18:33


----
## 내용(Content)

### EntityManagerFactory와 EntityManager 관계

![[엔티티매니저와 엔티티매니저 팩토리 관계 (draw).svg]]

JPA에서는 엔티티매니저 팩토리를 통해 엔티티 매니저 인스턴스를 관리하고 여러 요청이 들어왔을 때 요청에 맞게 엔티티 매니저 인스턴스를 생성해준다. 엔티티 매니저는 영속성 컨텍스트와 상태를 가지기 때문에 스레드 간 공유하면 큰일나기 때문에 이런식으로 관리한다. 물론 무분별한 인스턴스 관리는 메모리나 성능에 악영향을 줄 수 있기 때문에 Factory로 관리한다.

>[!tip] Tip: 영속성 컨텍스트란?
>Persistence Context로 불리는 영속성 컨텍스트는 엔티티를 영구 저장하는 공간이다. 보통은 1:1 관계로 생성되지만 특수한 상황에는 여러 엔티티 매니저가 하나의 영속성 컨텍스트에 접근하는 N:1 관계로 생성되어 관리되기도 한다.

### Entity 생명 주기

엔티티 생명 주기에는 4가지 상태가 존재한다.

- 비영속(new/transient): 완전 새로운 엔티티
- 영속(managed): 영속성 컨텍스트에 의해 관리되는 
- 준영속(detached): 영속성 컨텍스트 관리에 벗어난 엔티티
- 삭제(removed): 삭제된 상태

#### 비영속(new, transient)

완전히 순수한 객체 엔티티 상태이며, 영속성 컨텍스트와 db 모두 거치지 않은 엔티티이다. 보통 다음과 같은 특징을 가진다.

- id가 초기화될 수도 안될 수도 있다.
	- id가 초기화 된 경우 자동 id 생성 전략 사용 X
	- id가 초기화되지 않은 경우나, 초기화되었으나 db에 없는 경우 persist 수행
	- id가 초기화되고, db에 존재하는 경우, merge 수행
- 영속성 컨텍스트의 어떤 혜택도 누릴 수 없음

>[!caution] Caution: 비영속 엔티티 주의점
> id 생성 전략을 db에서 자동 생성해서 가져오는 전략을 사용하는 경우 반드시 초기화 상태이면 안된다. by [[엔티티 영속과 Identity 키생성 방식 그리고 낙관적인 락 문제]]  

#### 영속(managed)

영속성 컨텍스트가 엔티티를 관리하고 있는 상태이며 영속성 컨텍스트의 모든 이점을 누릴 수 있다.

- 반드시 식별자(id)값이 존재한다.(없으면 예외 발생)
- flush시 db에 실제로 저장된다.
- 영속성 컨텍스트의 관리 대상이 된다
	- 1차 캐시,
	- 동일성 보장
	- 트랜잭션 지원 쓰기 지연
	- 변경 감지
	- 지연 로딩

#### 준영속(detached)

영속성 컨텍스트가 종료되거나, 어떤 이유로 관리 대상에서 제외 될 때 준영속 상태라고 한다.

- 식별자 값이 반드시 존재한다.(영속 -> 준영속 으로 상태 변환되기 때문)
- 다시 영속 상태로 전환되려면, merge를 통해 가능해진다.
- 주로 쓰일 일은 없음

#### 삭제(deleted)

영속성 컨텍스트와 db에서 모두 삭제된 엔티티이다.

### 영속성 컨텍스트 기능

#### 1차 캐시

영속성 컨택스트는 내부에 캐시를 가지고 있는데 이를 **1차 캐시**라고 한다. 내부에는 Map이 있고 key는`@Id`로 매핑된 타입을 식별자로 가지고, 값에는 엔티티를 저장한다.

1차 캐시는 2가지 기능을 가진다.

- 영속시 캐시에 동일한 엔티티 정보가 존재한다면, 캐시에서 바로 인스턴스 정보를 가져온다.
- 캐시에 존재하지 않으면 db로부터 조회하고 영속성 컨텍스트 내부에 캐싱해둔다.

이 떄문에 1차 캐시는 다음과 같은 이점을 가진다

- 동일성 보장
- db를 거치지 않는 경우가 있기 때문에 성능상 이점이 존재

>[!info] Info: 동등성과 동일성
>- 동등성(equality): java의 `equals()`로 인스턴스는 다를 수 있으나 값이 같음을 보장할 때 쓰임
>- 동일성(identity):  java에서 `a == b`과 같은 의미로 사용된다. 인스턴스가 같음을 보장(같은 메모리 주소를 가진 객체)

#### 쓰기 지연

`persist()` 요청시 바로 db에 insert문을 날리는 것이 아닌 쓰기 지연 SQL 저장소에 insert SQL를 생성한다. 그리고 1차 캐싱이 되는데, transaction이 commit 되는 시점(flush)에 작성된 지연 SQL 저장소의 SQL 구문을 작성해서 날린다. 여러번 DB에서 호출되는 것이 아니라 한번에 호출되기 때문에 최적화를 할 수 있다.

#### 변경 감지

JPA에서는 엔티티 영속시(persist, merge) 최초 상태를 스냅샷해둔다. 그래서 영속 상태의 엔티티의 값이 변경되면 영속시 저장해둔 스냅샷과 값을 비교하고 update 쿼리를 지연 SQL 저장소에 작성한다. 트랜잭션 커밋시(flush) 업데이트 쿼리를 db에 반영한다.

### EntityManager의 영속화 메서드

엔티티 매니저는 엔티티를 영속화하기 위해서 크게 2가지 메서드를 제공한다.

- persist()
- merge()

#### persist

persist는 `new/transient` 상태의 엔티티를 `managed` 상태로 만드는 메서드이다.

persist의 특징은 다음과 같다.

- 생성키 전략에 따라 persist를 잘 사용해야 한다.
	- 자동 키 생성 전략이 없는 경우 엔티티의 id가 반드시 존재해야 함
	- identity의 경우 반드시 null이여 하며, 즉시 insert를 호출하기 떄문에 쓰기 지연 X
	- Sequence의 경우 하나의 insert 작업에 2번의 sql문을 호출할 수 있으나 쓰기 지연 O
- 자동키 생성 전략의 경우 Insert문을 즉시 호출하지만 flush시 엔티티에 key값을 반영한다.

#### merge

merge는 `detach` 상태의 엔티티를 `managed` 상태로 만드는 메서드이다.

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

merge의 특징은 다음과 같다.

- key가 반드시 존재해야 한다.
- key를 바탕으로 항상 find 작업을 즉시 수행한다.
- 새로운 엔티티가 없다면 persist를 수행
- 존재한다면 update

merge는 save&update를 지원함을 알 수 있다. 하지만 반드시 쿼리를 조회하기 때문에 보통 캐싱이 안된 엔티티를 영속화하면서 캐싱작업하기 때문에 db를 대부분 직접 즉시 호출할 가능성이 있다.

#### save

```java
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

data JPA의 경우 repository를 통해 save 메서드를 지원한다. 이를 통해 안전하게 엔티티의 영속성을 관리할 수 있다. 하지만 가끔 영속성에 대해 잘 모르면 문제를 오히려 얻기도 한다.

## 질문 & 확장

(없음)

## 출처(링크)

- 자바 ORM 표준 JPA 프로그래밍 by 김영한

## 연결 노트










