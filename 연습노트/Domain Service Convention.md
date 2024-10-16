---
tags:
  - 미완
  - JAVA
  - 객체지향
  - DDD
aliases: 
date: 2024-10-16
title: Domain Service Convention
---
작성 날짜: 2024-10-16
작성 시간: 21:48


----
## 내용(Content)

### Domain Service Convention

도메인을 구성하다보면 네이밍 컨벤션을 생각해야 할 때가 있다. 무작정 DomainService를 접미사로 붙인다고 가정해보자. Java Spring 을 활용할 때 보통 Web 영역과 application 영역, Domain 영역으로 나뉜다. 이 때 Applicaion 영역은 보통 접미사로 Service라고 이름을 짓는다.

![[대충네이밍을지은DomainService (draw).svg]]

Application Layer 영역에서 OrderService와 OrderDomainService 이렇게 두면 네이밍도 헷갈리고 OrderDomainService에 여럿 비즈니스 로직을 추가하게 되서 자칫 DomainService가 비대해 질 수 있다.

###  Rule

#### 클래스 규칙

- DomainService는 Domain Layer에 위치해야 한다.
- 특별한 이유가 없는 한 인터페이스를 만들지 마라(관리할 패키지가 많아질 수 있다)
- 접미사를 붙여서 구분 지어라

>[!example]
>```java
>public class IssueManager implements DomainService {
>	// logic
>}
>```

도메인 서비스를 인터페이스로 도입했는데, 개인적인 생각은 아예 없어도 되고, Domain Service라고 명확하게 구분짓고 싶다면 Common Package에 마커 인터페이스로 사용하는 것이 괜찮을 것 같다. 

>[!info]
>마커 인터페이스는 메서드를 정의하지 않은 인터페이스로 특정 객체가 어떤 객체인지 표시할 때 사용한다. 가독성 향상 및 다형성 등에 응용된다.

#### 메서드 규칙

- **Get 메서드 구현 X** (Domain Service는 상태를 가지지 않는다)
- VO가 아닌 **엔티티의 상태 변화**에 사용해야 한다. 
	- 주로 엔티티와 엔티티간의 소통(Aggergate)에 사용된다.
- **평범하고 일반적인 메서드 네이밍 사용 금지**(updateIssueAsync)
	- 평범한 메서드는 도메인의 메서드와 겹칠 우려가 있다.
- 유**효한 엔티티를 Parameter로 사용**해야 한다.

>[!example]
>```java
>public Task assignToAsync(Issue issue, IdentityUser user) {
>	// logic
>}
>```

#### 예외 처리 규칙

- 예외 발생시 BusinessException 또는 Custom BusinessException을 사용한다.

```java
public async Task AssignToAsync(Issue issue, IdentityUser user)
{
    var openIssueCount = await _issueRepository.GetCountAsync(
            i => i.AssignedUserId == user.Id && !i.IsClosed
        );

        if (openIssueCount >= 3)
        {
            throw new BusinessException("IssueTracking:ConcurrentOpenIssueLimit");
        }

        issue.AssignedUserId = user.Id;
}
```

#### 그 외 규칙

- **DTO를 리턴하지 않는다.**
	- DTO 는 Application Layer에서 책임져야할 객체이다.
### Naming Convention 예시

DomainService 네이밍은 Domain 객체에서 복잡한 비즈니스 규칙을 분리함과 동시에 이해하기 편한 네이밍을 정해야 한다.

꼭 정답은 아니지만 Domain Service 네이밍에 대한 대략적인 예시를 정할 수 있다.

**접미사**
- Calculator(복잡한 계산 로직)
- Policy(비즈니스 규칙 또는 의사 결정 로직)
- Strategy(알고리즘, 또는 전략)
- Manager(거대한 책임)
- Engine
- 그 외에 domain에 특화된 네이밍

#### Calculator

주로 복잡한 수학적 계산이나 복잡한 수치 연산에 사용된다.

#### Policy

비즈니스 로직이나 의사 결정 로직의 경우를 캡슐화 할 때 사용한다. "How" 보다는 "What" 에 초점을 두고 있다.

#### Strategy


## 질문 & 확장

(없음)

## 출처(링크)

- https://www.nexcess.net/blog/domain-naming-best-practices/
- https://abp.io/docs/latest/framework/architecture/best-practices/domain-services

## 연결 노트










