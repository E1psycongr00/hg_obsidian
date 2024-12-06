---
tags:
  - 미완
  - JAVA
  - Spring
  - Transaction
aliases:
  - Spring 트랜잭션
  - 스프링 트랜잭션
date: 2024-12-04
title: Spring Transaction
---
작성 날짜: 2024-12-04
작성 시간: 10:25


----
## 내용(Content)

### Spring 트랜잭션과 Propagation에 대한 분석 및 이해

Spring 트랜잭션 관리는 데이터베이스의 일관성과 신뢰성을 보장하기 위해 필수적인 기능이다. Spring Framework는 애플리케이션에서 트랜잭션의 경계를 설정하고, 데이터베이스 작업이 실패할 경우 롤백을 통해 일관성을 유지할 수 있도록 한다. 이 과정에서 중요한 역할을 하는 개념 중 하나가 **트랜잭션의 전파(Propagation)**이다.

### Spring 트랜잭션의 본질

트랜잭션은 일련의 데이터베이스 작업을 **원자성(Atomicity)**을 보장하며 수행하기 위한 메커니즘이다. 원자성은 모든 작업이 성공적으로 완료되거나, 그렇지 않으면 전체가 무효화되어야 함을 의미한다. 예를 들어, 은행 계좌에서 돈을 인출한 후 다른 계좌로 이체하는 두 단계의 작업이 있을 때, 어느 한 단계에서라도 오류가 발생하면 모든 작업이 취소되어야 한다. 이를 통해 데이터의 일관성과 무결성을 보장할 수 있다.

Spring에서는 `@Transactional` 애너테이션을 사용하여 메소드나 클래스에 트랜잭션을 적용할 수 있습니다. 이 애너테이션은 트랜잭션 경계를 명시적으로 정의하며, 해당 메소드가 호출될 때 트랜잭션을 시작하고, 메소드 실행이 성공하면 커밋, 실패 시 롤백을 수행하게 한다.

```java
@Service
public class BankService {

	@Transactional
	public void transferMoney(Account fromAccount, Account toAccount, double amount) {
		withdraw(fromAccount, amount);
		deposit(toAccount, amount);
	}
}
```
위 예제에서 `transferMoney` 메소드는 트랜잭션 내에서 실행되며, 만약 `withdraw` 또는 `deposit` 메소드에서 예외가 발생하면 전체 트랜잭션이 롤백된다. 이는 데이터의 무결성을 유지하기 위한 핵심적인 기능이다.

### 트랜잭션 전파(Propagation)의 이해

Propagation은 트랜잭션의 전파 방식을 정의하는 개념으로, 하나의 트랜잭션이 **다른 트랜잭션의 경계 내에서 호출될 때** 어떤 방식으로 동작할 지를 결정한다. 이는 복잡한 비즈니스 로직에서 여러 계층 간 트랜잭션 관리의 유연성을 제공한다. Spring에서는 다양한 Propagation 옵션을 제공하여 트랜잭션 간 상호작용을 제어할 수 있다.

#### 주요 Propagation 옵션 분석 및 예시

1. **REQUIRED**
   - 현재 트랜잭션이 존재하면 그 트랜잭션을 사용하고, 없으면 새로운 트랜잭션을 생성합니다. 이는 기본적인 설정으로, 대부분의 상황에서 유용하며 트랜잭션 간의 일관성을 유지하는 데 적합하다.
   
   ```java
	@Transactional(propagation = Propagation.REQUIRED)
	public void processOrder(Order order) {
		// 기존 트랜잭션이 있으면 재사용, 없으면 새로운 트랜잭션 생성
		updateOrderStatus(order);
	}
   ```
   이 경우, 만약 `processOrder` 메소드가 호출될 때 이미 트랜잭션이 있다면 그 트랜잭션을 사용하여 작업이 수행됩니다. 트랜잭션이 없을 경우에는 새로운 트랜잭션이 생성됩니다.

2. **REQUIRES_NEW**
   - 항상 새로운 트랜잭션을 생성하며, 기존 트랜잭션이 존재할 경우 이를 일시 중지합니다. 독립적인 트랜잭션이 필요하거나, 기존 트랜잭션의 성공 여부와 무관하게 별도의 작업이 필요할 때 사용됩니다.
   
   ```java
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void createInvoice(Order order) {
		// 기존 트랜잭션을 일시 중지하고 새로운 트랜잭션 생성
	   saveInvoice(order);
	}
   ```
   예를 들어, `createInvoice` 메소드는 `processOrder` 메소드 내에서 호출될 수 있습니다. 이 경우 `createInvoice`는 새로운 트랜잭션에서 실행되며, 기존 트랜잭션의 성공 여부와 관계없이 독립적으로 수행됩니다.

3. **NESTED**
   - 현재 트랜잭션 내에서 중첩된 트랜잭션을 생성합니다. 이는 부모 트랜잭션에 종속적이며, 부모 트랜잭션이 롤백되면 중첩된 트랜잭션도 롤백됩니다. `SAVEPOINT`를 활용하여 특정 부분만 롤백하는 기능이 필요할 때 유용합니다.
   
   ```java
   @Transactional(propagation = Propagation.NESTED)
   public void updateInventory(Order order) {
       // 부모 트랜잭션 내에서 중첩된 트랜잭션 생성
       adjustInventory(order);
   }
   ```
   `updateInventory` 메소드가 호출되면 중첩된 트랜잭션이 생성되어 부모 트랜잭션의 영향을 받습니다. 부모가 롤백되면 중첩 트랜잭션도 롤백됩니다.

4. **MANDATORY**
   - 반드시 기존 트랜잭션이 존재해야 하며, 만약 존재하지 않을 경우 예외를 발생시킵니다. 이는 호출자가 이미 트랜잭션을 관리하고 있다는 전제하에 실행되어야 하는 경우 사용됩니다.
   
   ```java
   @Transactional(propagation = Propagation.MANDATORY)
   public void validateOrder(Order order) {
       // 기존 트랜잭션이 없으면 예외 발생
       checkOrderDetails(order);
   }
   ```
   이 옵션은 트랜잭션이 이미 존재해야만 메소드가 실행될 수 있도록 보장합니다. 만약 트랜잭션이 없으면 `IllegalTransactionStateException`이 발생합니다.

5. **NOT_SUPPORTED**
   - 트랜잭션 없이 작업을 수행하며, 기존 트랜잭션이 존재하면 이를 일시 중지합니다. 트랜잭션이 필요 없는 작업을 실행할 때 적합합니다.
   
   ```java
   @Transactional(propagation = Propagation.NOT_SUPPORTED)
   public void logOrderDetails(Order order) {
       // 트랜잭션 없이 로깅 작업 수행
       logInfo(order);
   }
   ```
   이 메소드는 트랜잭션이 필요하지 않은 작업, 예를 들어 로깅과 같은 작업에 사용됩니다.

6. **NEVER**
   - 트랜잭션이 없는 상태에서만 실행되며, 트랜잭션이 존재할 경우 예외를 발생시킵니다. 트랜잭션이 존재해서는 안 되는 특정 작업에 사용됩니다.
   
   ```java
   @Transactional(propagation = Propagation.NEVER)
   public void sendOrderNotification(Order order) {
       // 트랜잭션이 있으면 예외 발생
       sendNotification(order);
   }
   ```
   이 메소드는 트랜잭션 없이 수행되어야 하며, 만약 트랜잭션이 존재할 경우 예외가 발생하여 작업이 중단됩니다.

7. **SUPPORTS**
   - 현재 트랜잭션이 존재하면 이를 사용하고, 없으면 트랜잭션 없이 실행합니다. 트랜잭션이 필수적이지 않지만, 가능하다면 트랜잭션을 사용하는 상황에서 유용합니다.
   
   ```java
   @Transactional(propagation = Propagation.SUPPORTS)
   public void fetchOrderDetails(Order order) {
       // 트랜잭션이 있으면 사용, 없으면 트랜잭션 없이 실행
       retrieveOrder(order);
   }
   ```
   이 경우, `fetchOrderDetails` 메소드는 트랜잭션이 존재할 때 트랜잭션 내에서 실행되며, 없으면 트랜잭션 없이 수행됩니다.

### Propagation 사용 예시

Propagation 옵션의 효과를 이해하기 위해 온라인 쇼핑몰에서의 주문 처리를 예로 들어보겠습니다. 예를 들어, 주문을 처리하는 `OrderService`가 `InventoryService`와 `PaymentService`를 호출하는 경우를 가정해봅시다. 주문 처리는 재고 감소, 결제 처리, 그리고 주문 상태 업데이트와 같은 여러 단계로 구성됩니다.

- `OrderService`의 메소드에 `Propagation.REQUIRED`가 설정되어 있고, `InventoryService`와 `PaymentService`의 메소드에 `Propagation.REQUIRES_NEW`가 설정되어 있다면, 각 서비스는 독립적인 트랜잭션에서 실행됩니다. 예를 들어 `InventoryService`에서 오류가 발생하더라도 `PaymentService`의 트랜잭션에는 영향을 주지 않습니다. 이러한 설정은 각 작업의 독립성을 유지하고, 특정 단계에서 문제가 발생하더라도 다른 작업이 지속될 수 있도록 합니다.

```java
@Service
public class OrderService {
	@Autowired
	private InventoryService inventoryService;
	@Autowired
	private PaymentService paymentService;
	
	@Transactional(propagation = Propagation.REQUIRED)
	public void processOrder(Order order) {
		// 주문 관련 데이터베이스 작업
		inventoryService.updateInventory(order);
		paymentService.processPayment(order);
		// 주문 상태 업데이트
	}
}

@Service
public class InventoryService {
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void updateInventory(Order order) {
		// 재고 감소 관련 데이터베이스 작업
	}
}

@Service
public class PaymentService {
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void processPayment(Order order) {
		// 결제 처리 관련 데이터베이스 작업
	}
}
```

이 예제에서 `OrderService`는 주문 처리를 위한 트랜잭션을 관리하며, `InventoryService`와 `PaymentService`는 각각 독립적인 트랜잭션을 사용하여 재고 업데이트와 결제 처리를 수행합니다. 이러한 전파 방식을 통해 애플리케이션의 트랜잭션을 유연하게 관리할 수 있으며, 비즈니스 로직의 요구사항에 따라 데이터베이스 작업을 안전하게 처리할 수 있습니다.

### 결론

Spring 트랜잭션 관리와 Propagation은 데이터베이스의 일관성과 무결성을 보장하며 복잡한 비즈니스 로직의 안정적인 처리를 위한 핵심적인 요소입니다. 예를 들어, 실제 프로젝트에서 주문 처리를 위한 서비스에서 트랜잭션을 적용하여 재고 감소, 결제 처리, 주문 상태 업데이트와 같은 작업들이 모두 성공적으로 완료되어야만 최종 커밋이 이루어지도록 관리할 수 있습니다. 만약 어느 한 단계에서 오류가 발생하면 전체 작업을 롤백하여 데이터의 무결성을 보장할 수 있습니다. 트랜잭션의 전파 방식은 각 작업의 독립성과 의존성을 제어할 수 있는 강력한 도구로, 이를 적절히 활용하면 더욱 신뢰성 있는 애플리케이션을 설계할 수 있습니다. `@Transactional`과 다양한 Propagation 옵션을 통해 트랜잭션 경계를 명확히 정의하고, 각 상황에 맞는 트랜잭션 전파 방식을 적용함으로써 애플리케이션의 복잡한 비즈니스 요구 사항을 효과적으로 처리할 수 있습니다.


## 질문 & 확장

(없음)

## 출처(링크)

- [Spring Transaction Propagation을 예제를 통해 알아보자](https://oingdaddy.tistory.com/28)
## 연결 노트

- [[DB 트랜잭션]]
- [[분산 트랜잭션 종류별 특징]]



