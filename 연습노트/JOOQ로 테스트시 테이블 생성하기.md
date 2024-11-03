---
tags:
  - 미완
  - JAVA
  - JOOQ
aliases: 
date: 2024-11-01
title: JOOQ로 DDL, DML 해보기
---
작성 날짜: 2024-11-01
작성 시간: 19:57


----
## 내용(Content)

### Field와 Table 정의하기

JOOQ에서는 자동으로 Code Generator를 이용해서 기존에 존재하는 테이블을 매핑해서 필드 정보나 테이블을 생성할 수 있지만, 직접 설정도 가능하다. 테스트의 경우, 테스트 전용 간이 테이블이 필요한 경우가 많기 때문에 필드를 직접 설정하는 것도 꽤 도움이 될 수 있다.

```java
import org.jooq.Field;
import org.jooq.Record;
import org.jooq.Table;

import static org.jooq.impl.DSL.constraint;
import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;

```

```java
private static final Table<Record> USERS = table("users");

private static final class Users {
	private static final Field<Long> ID = field("id", Long.class);
	private static final Field<String> NAME = field("name", String.class);
	private static final Field<String> EMAIL = field("email", String.class);
}
```

Field는 field에서 이름을 선언하고, Java에서 매핑할 때 Long.class과 같은 Java.lang 패키지의 타입으로 선언한다. 이를 통해 ID 라는 **상수 변수가 Field 타입 임을 선언**하고, 이를 이용해서 `DslContext` 에서 DDL이나 DML에 활용할 수 있다.


#### 테이블 선언하기

```java
dslContext.createTableIfNotExists(USERS)
                .column(Users.ID, SQLDataType.BIGINT.nullable(false))
                .column(Users.NAME, SQLDataType.VARCHAR(255))
                .column(Users.EMAIL, SQLDataType.VARCHAR(255))
                .constraint(constraint("users_pk").primaryKey(Users.ID))
                .execute();
```

테이블 선언할 때는 


### JOOQ로 테이블 작성하기

dslContext.createTable 또는 dslContext.createTableIfNotExist를 이용해 테이블을 생성할 수 있다.

## 질문 & 확장



## 출처(링크)



## 연결 노트





