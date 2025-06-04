---
tags:
  - 객체지향
  - 객체지향설계
aliases: 
created: 2025-06-03
title: RDD 책임 지향 설계 프롬프트 by python
note-type: COMMON
completed: true
---

# 책임 주도 설계(RDD) 실무 가이드

프로젝트 구현에 앞서, 특히 로직 및 백엔드 설계 시에는 **책임 주도 설계(Responsibility-Driven Design, RDD)** 원칙을 적극적으로 적용해야 합니다.

## 책임 주도 설계란?

RDD는 각 객체가 시스템 내에서 어떤 명확한 책임을 가질지 정의하는 데 중점을 둡니다. 이는 단순히 데이터와 메서드를 묶는 것을 넘어, **"누가 무엇을 알고, 누가 무엇을 해야 하는가?"**를 명확히 정의하는 설계 방법론입니다.

### 핵심 이점
- **높은 응집도 및 낮은 결합도**: 각 객체가 단일하고 명확한 책임을 가지게 되어 코드의 응집도가 높아지고, 불필요한 의존성을 줄여 결합도를 낮춥니다.
- **유지보수 및 확장 용이성**: 책임이 명확한 객체는 변경에 유연하게 대응할 수 있으며, 새로운 기능 추가 시 기존 코드의 변경 없이 확장하기 용이합니다.
- **시스템 이해도 증진**: 각 객체의 역할이 명확해지면서 시스템 전체의 동작 방식과 흐름을 더 쉽게 이해할 수 있습니다.

## RDD 적용 5단계 프로세스

### 1단계: 시스템 시나리오 분석
새로운 기능을 개발하기 전에 다음 질문들을 통해 시나리오를 분석합니다:
- **무엇이 시작점인가?** (사용자 액션, 외부 이벤트, 스케줄링 등)
- **어떤 정보가 필요한가?** (입력 데이터, 저장된 데이터, 외부 API 등)
- **어떤 작업들이 수행되어야 하는가?** (검증, 변환, 계산, 저장 등)
- **최종 결과는 무엇인가?** (응답 데이터, 상태 변경, 알림 등)

### 2단계: 책임 식별 및 분류
각 작업에 대해 **두 가지 유형의 책임**을 식별합니다:

#### 지식 책임 (Knowing Responsibilities)
- **데이터 보관**: 어떤 객체가 특정 정보를 저장하고 관리하는가?
- **계산 수행**: 어떤 객체가 특정 알고리즘이나 비즈니스 규칙을 알고 있는가?
- **상태 추적**: 어떤 객체가 시스템의 특정 상태를 모니터링하는가?

#### 행동 책임 (Doing Responsibilities)
- **작업 수행**: 어떤 객체가 실제 비즈니스 로직을 실행하는가?
- **다른 객체 제어**: 어떤 객체가 다른 객체들의 협력을 조정하는가?
- **외부 통신**: 어떤 객체가 외부 시스템과의 소통을 담당하는가?

### 3단계: CRC 카드 작성
각 식별된 객체에 대해 **클래스(Class), 책임(Responsibility), 역할(Roles), 협력자(Collaborators)** 정보를 정리합니다:

#### 책임과 역할의 구분
- **책임(Responsibility)**: 객체의 존재 이유를 한 문장으로 정의
- **역할(Roles)**: 책임을 달성하기 위한 구체적인 행동들

```
클래스명: UserAuthenticator
책임: 사용자 인증 프로세스를 수행한다
역할:
  - 로그인 요청 검증
  - 인증 토큰 생성 및 검증
  - 세션 관리
  - 실패한 인증 시도 추적
협력자:
  - UserRepository (사용자 정보 조회)
  - TokenGenerator (JWT 토큰 생성)
  - SessionStore (세션 저장소)
  - SecurityLogger (보안 이벤트 로깅)
```

#### 클래스명 작성 가이드라인

**1. 우선순위 기반 명명 전략**

최고 우선순위부터 적용:

1. **구체적 동사 기반** (가장 권장)
   - `OrderProcessor`, `PaymentValidator`, `EmailSender`
   - `UserAuthenticator`, `PasswordEncoder`, `DataConverter`

2. **역할 기반**
   - `PriceCalculator`, `InventoryChecker`, `ReportGenerator`
   - `ConfigurationLoader`, `EventHandler`, `MessageBroker`

3. **패턴 기반** (필요시 사용)
   - `UserRepository`, `DatabaseConnectionFactory`
   - `ApiGateway`, `EventPublisher`

4. **Service/Manager** (제한적 허용)
   - 아래 조건을 모두 만족할 때만 사용

**2. Service/Manager 사용 허용 조건**

다음 **모든 조건**을 만족할 때만 Service/Manager 사용 허용:

✅ **허용되는 경우:**
- 프레임워크 관례 (Spring @Service, MVC 패턴 등)
- 복잡한 비즈니스 로직 조정 (여러 객체 협력 조정)
- 도메인과 행동이 명확히 표현됨

```
좋은 예:
- OrderFulfillmentService (주문 이행 프로세스 조정)
- UserAccountManager (사용자 계정 생명주기 관리)
- PaymentTransactionService (결제 트랜잭션 처리)
```

❌ **금지되는 경우:**
- 모호한 도메인이나 행동
- 단일 기능만 수행하는 경우
- 더 구체적인 동사로 표현 가능한 경우

```
나쁜 예:
- UserService (너무 모호함)
- DataService (무엇을 하는지 불분명)
- CommonService (범용적 이름)
```

**3. 명명 우선순위 결정 플로우**

```
1. 구체적 동사로 표현 가능한가?
   YES → Processor, Validator, Calculator 등 사용
   
2. 역할로 명확히 표현 가능한가?
   YES → Handler, Generator, Checker 등 사용
   
3. 표준 패턴에 해당하는가?
   YES → Repository, Factory, Gateway 등 사용
   
4. 복잡한 프로세스 조정이 필요한가?
   YES → Service 사용 (도메인+행동+Service)
   
5. 생명주기 관리가 필요한가?
   YES → Manager 사용 (관리대상+Manager)
   
6. 위 모든 경우에 해당하지 않는다면
   → 설계를 다시 검토 (책임 분리 필요할 수 있음)
```

**4. 컨텍스트별 가이드라인**

| 컨텍스트 | 권장 패턴 | 허용 패턴 | 금지 패턴 |
|---------|----------|-----------|----------|
| 도메인 로직 | `Processor`, `Calculator` | `DomainActionService` | `Service`, `Manager` |
| 애플리케이션 계층 | `Handler`, `Coordinator` | `UseCaseService` | 모호한 Service |
| 프레임워크 통합 | `Gateway`, `Adapter` | `FrameworkService` | 범용 Service |
| 데이터 접근 | `Repository`, `Finder` | - | `DataService` |

### 4단계: 협력 관계 설계
객체 간의 메시지 전달 패턴을 정의합니다:
- **누가 누구에게 무엇을 요청하는가?**
- **응답으로 무엇을 받아야 하는가?**
- **협력의 순서는 어떻게 되는가?**

### 5단계: 책임 검증 및 조정
설계된 책임이 다음 원칙들을 만족하는지 검증합니다:

#### 단일 책임 원칙 (SRP) 검증
- 각 객체의 책임을 한 문장으로 설명할 수 있는가?
- 객체가 변경되는 이유가 단 하나뿐인가?
- 객체의 모든 역할이 하나의 책임을 달성하는데 필요한가?

#### 의존성 방향 검증
- 고수준 모듈이 저수준 모듈에 의존하지 않는가?
- 순환 의존성이 존재하지 않는가?

## 구체적 적용 예시

### 좋은 RDD 설계 예시

```python
# 1순위: 구체적 동사 기반 명명
class OrderProcessor:
    """주문 데이터를 처리한다"""
    def process_order(self, order_data):
        # 단일 책임: 주문 데이터 처리
        pass

class InventoryChecker:
    """재고 가용성을 확인한다"""
    def check_availability(self, items):
        # 단일 책임: 재고 확인
        pass

class PaymentValidator:
    """결제 정보를 검증한다"""
    def validate_payment(self, payment_info):
        # 단일 책임: 결제 검증
        pass

# 복잡한 프로세스 조정 - Service 허용
class OrderFulfillmentService:
    """주문 이행 프로세스 전반을 조정한다"""
    def __init__(self, order_processor, inventory_checker, payment_validator):
        self._order_processor = order_processor
        self._inventory_checker = inventory_checker  
        self._payment_validator = payment_validator
    
    def fulfill_order(self, order_request):
        # 여러 객체 협력 조정이 주 책임
        self._inventory_checker.check_availability(order_request.items)
        self._payment_validator.validate_payment(order_request.payment)
        return self._order_processor.process_order(order_request)
```

### 피해야 할 안티패턴

```python
# 모호한 Service 남발
class OrderService:  # ❌ 무엇을 하는지 불분명
    def create_order(self, data): pass
    def update_order(self, data): pass
    def cancel_order(self, data): pass
    def validate_order(self, data): pass
    # 너무 많은 책임이 뒤섞임

class UserService:  # ❌ 도메인만 있고 행동이 모호함
    def register_user(self, data): pass
    def authenticate_user(self, data): pass
    def update_profile(self, data): pass
    def send_email(self, data): pass
    # 전혀 다른 책임들이 한 클래스에

# 더 나은 분리
class UserRegistrator:     # ✅ 명확한 책임: 사용자 등록
class UserAuthenticator:   # ✅ 명확한 책임: 사용자 인증  
class UserProfileManager:  # ✅ 명확한 책임: 프로필 관리 (생명주기)
class EmailSender:         # ✅ 명확한 책임: 이메일 발송
```

## 적용 체크리스트

### 설계 완료 후 검증 항목
- [ ] 각 클래스의 책임을 한 문장으로 설명할 수 있는가?
- [ ] 클래스명이 그 책임을 명확히 나타내는가?
- [ ] 한 클래스가 변경되는 이유가 하나뿐인가?
- [ ] 객체 간 협력 관계가 명확히 정의되었는가?
- [ ] 순환 의존성이 존재하지 않는가?
- [ ] 각 역할이 해당 객체의 책임 범위 내에 있는가?

### 클래스명 검증 체크리스트
- [ ] 구체적 동사나 역할로 표현했는가?
- [ ] Service/Manager 사용시 허용 조건을 만족하는가?
- [ ] 도메인과 행동이 모두 명확한가?
- [ ] 팀 내 명명 규칙을 일관되게 적용했는가?

### Service/Manager 사용 검증
- [ ] 프레임워크 관례나 복잡한 조정 역할인가?
- [ ] 도메인+행동이 명확히 표현되었는가?
- [ ] 더 구체적인 동사로 표현할 수 없는가?
- [ ] 단일 책임 원칙을 위반하지 않는가?

## 적용 범위 및 우선순위

### 최우선 적용 대상
- **비즈니스 로직 레이어**: 도메인 서비스, 엔티티, 값 객체
- **애플리케이션 서비스**: 유스케이스 조정 및 트랜잭션 관리
- **데이터 접근 레이어**: Repository, DAO 패턴

### 차순위 적용 대상
- **API 컨트롤러**: 요청/응답 처리 및 서비스 레이어 호출
- **외부 통합**: 외부 API 클라이언트, 메시지 큐 처리

### 상황에 따른 적용
- **UI 컴포넌트**: 복잡한 상태 관리가 필요한 경우에만 적용
- **유틸리티 클래스**: 단순한 도구성 함수는 RDD 적용 불필요

## 팀 내 실천 방법

1. **설계 리뷰 미팅**: 구현 전 30분간 책임 분배 및 명명 논의
2. **CRC 카드 작성**: 복잡한 기능의 경우 필수적으로 작성
3. **네이밍 리뷰**: 명명 우선순위와 허용 조건 검증
4. **페어 프로그래밍**: 구현 중 책임 분배에 대한 지속적 논의
5. **리팩터링 주기**: 월 1회 기존 코드의 책임 분배 및 명명 검토

---

**기억하세요**: 
- RDD는 완벽한 설계를 한 번에 만들어내는 것이 아니라, 지속적인 개선을 통해 더 나은 책임 분배를 찾아가는 과정입니다. 
- **명명은 트레이드오프**입니다. 이상적인 이름보다는 팀과 프로젝트 컨텍스트에 맞는 **일관된 규칙**이 더 중요합니다.
- Service/Manager를 사용할 때는 **명확한 이유**가 있어야 하며, 단순히 "관례"라는 이유만으로는 충분하지 않습니다. 

