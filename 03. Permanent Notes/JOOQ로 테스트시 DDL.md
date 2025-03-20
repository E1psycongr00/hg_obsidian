---
tags:
  - JAVA
  - JOOQ
aliases: null
title: 'JOOQ로 DDL, DML 해보기'
created: 2024-11-01T00:00:00.000Z
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

테이블 선언할 때는 column과 constraint를 지정할 수 있다.

#### 외래키 선언하기

```java
    // Users 테이블 정의
public static final class Users {
	public static final Table<Record> USERS = DSL.table(DSL.name("users"));
	public static final Field<Long> ID = DSL.field(DSL.name(USERS.getName(), "id"), Long.class);
	public static final Field<String> NAME = DSL.field(DSL.name(USERS.getName(), "name"), String.class);
	public static final Field<String> EMAIL = DSL.field(DSL.name(USERS.getName(), "email"), String.class);
}

    // Orders 테이블 정의
public static final class Orders {
	public static final Table<Record> ORDERS = DSL.table(DSL.name("orders"));
	public static final Field<Long> ID = DSL.field(DSL.name(ORDERS.getName(), "id"), Long.class);
	public static final Field<Long> USER_ID = DSL.field(DSL.name(ORDERS.getName(), "user_id"), Long.class);
	public static final Field<LocalDateTime> ORDER_DATE = DSL.field(DSL.name(ORDERS.getName(), "order_date"), LocalDateTime.class);
	public static final Field<String> STATUS = DSL.field(DSL.name(ORDERS.getName(), "status"), String.class);
}
```

위와 같이 테이블이 선언됬다고 가정하자.

User에는 ID, NAME, EMAIL, ORDERs에는 ID, USER_ID, ORDER_DATE, STATUS가 있을 떄 USER_ID를 외래키로 만들어보자.

```java
// Orders 테이블 생성 (외래키 포함)
dslContext.createTableIfNotExists(Orders.ORDERS)
		.column(Orders.ID, SQLDataType.BIGINT.nullable(false))
		.column(Orders.USER_ID, SQLDataType.BIGINT.nullable(false))
		.column(Orders.ORDER_DATE, SQLDataType.LOCALDATETIME)
		.column(Orders.STATUS, SQLDataType.VARCHAR(20))
		.constraints(
			constraint("orders_pk").primaryKey(Orders.ID),
			constraint("orders_user_fk")
				.foreignKey(Orders.USER_ID)
				.references(Users.USERS, Users.ID)
				.onDeleteRestrict()  // 사용자 삭제 제한
				.onUpdateCascade()   // 사용자 ID 변경 시 주문도 업데이트
		)
		.execute();
}
```

위에서 정의한 테이블을 SQL로 표현하면 다음과 같다.

```sql
CREATE TABLE orders (
    id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP,
    status VARCHAR(20),
    CONSTRAINT orders_pk PRIMARY KEY (id),
    CONSTRAINT orders_user_fk 
        FOREIGN KEY (user_id) 
        REFERENCES users (id)
        ON DELETE RESTRICT 
        ON UPDATE CASCADE
);
```

### 테이블 변경하기

테이블 변경하기는 `Alter`를 사용한다.

```java
// 총 주문금액 컬럼 추가
dslContext.alterTable(Orders.ORDERS)
		.addColumn(Orders.TOTAL_AMOUNT)
		.type(SQLDataType.DECIMAL(10, 2))
		.defaultValue(BigDecimal.ZERO)
		.execute();

// 배송주소 컬럼 추가
dslContext.alterTable(Orders.ORDERS)
		.addColumn(Orders.SHIPPING_ADDRESS)
		.type(SQLDataType.VARCHAR(500))
		.execute();

// 삭제 여부 컬럼 추가
dslContext.alterTable(Orders.ORDERS)
		.addColumn(Orders.IS_DELETED)
		.type(SQLDataType.BOOLEAN)
		.defaultValue(false)
		.notNull()
		.execute();
```

예제에서는 addColumn만 사용했지만, dropColumn과 renameColumn등 다양하게 사용 가능하다.

## 질문 & 확장



## 출처(링크)

- https://www.jooq.org/doc/3.20/manual-single-page/

## 연결 노트





