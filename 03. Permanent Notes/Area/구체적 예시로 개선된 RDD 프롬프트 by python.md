---
tags:
  - 객체지향
  - 객체지향설계
  - 소프트웨어설계
aliases: 
created: 2025-06-04
title: 구체적 예시로 개선된 RDD 프롬프트 by python
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

#### 책임의 적절성 판단 기준

**1. 정량적 지표**

- **메서드 수**: 5-7개 이하 (생성자, getter/setter 제외)
- **의존성 수**: 직접 의존하는 객체 3-5개 이하
- **라인 수**: 클래스당 200라인 이하 (주석 포함)
- **책임 설명**: 접속사 없이 한 문장으로 표현 가능

**2. 질적 지표**

- **응집도 측정**: 모든 메서드가 클래스의 핵심 데이터를 사용하는가?
- **결합도 측정**: 다른 클래스의 내부 구조를 알아야 하는가?
- **변경 영향도**: 하나의 비즈니스 규칙 변경 시 한 클래스만 수정되는가?
- **테스트 가능성**: 의존성 주입 없이 단위 테스트가 어려운가?

**3. 책임 크기 판단 기준**

```
너무 작은 책임 (과도한 분리):
- 메서드 1-2개만 가지는 클래스
- 단순한 데이터 전달만 하는 클래스
- 항상 함께 변경되는 여러 클래스

적절한 책임:
- 명확한 비즈니스 개념을 나타냄
- 독립적으로 테스트 가능
- 하나의 변경 이유만 가짐

너무 큰 책임 (과소한 분리):
- 여러 비즈니스 규칙을 처리
- 다양한 이유로 변경됨
- 메서드들 간 연관성이 낮음
```

## 설계 트레이드오프 상황 대처법

실무에서는 이상적인 RDD와 현실적 제약 사이에서 균형을 찾아야 합니다.

### 성능 vs 설계 품질

**상황**: 객체 간 메시지 전달로 인한 성능 오버헤드

**판단 기준**:

- 병목 지점이 실제로 측정되었는가? (추측 금지)
- 성능 요구사항이 명확히 정의되었는가?
- 유지보수 비용과 성능 이득을 비교했는가?

**대처 방법**:

1. **측정 우선**: 프로파일링으로 실제 병목 확인
2. **점진적 최적화**: 핵심 경로만 선별적 최적화
3. **문서화**: 성능을 위한 설계 타협 명시

```python
# 설계 품질 우선 (일반적인 경우)
class OrderProcessor:
    def process_order(self, order):
        validated = self._validator.validate(order)
        calculated = self._calculator.calculate_total(validated)
        return self._repository.save(calculated)

# 성능 우선 (측정된 병목이 있는 경우)
class HighPerformanceOrderProcessor:
    """성능 최적화를 위해 검증과 계산을 통합
    - 벤치마크: 기존 대비 30% 성능 향상
    - 트레이드오프: 단일 책임 원칙 완화
    """
    def process_order(self, order):
        # 검증과 계산을 한 번에 처리
        if not self._is_valid_and_calculate(order):
            raise ValidationError()
        return self._repository.save(order)
```

### 프레임워크 제약 vs RDD 원칙

**상황**: 프레임워크가 특정 구조를 강제하는 경우

**판단 기준**:

- 프레임워크 관례를 벗어날 때의 리스크는?
- 팀원들의 학습 비용은?
- 장기적 유지보수성에 미치는 영향은?

**대처 방법**:

1. **어댑터 패턴**: 프레임워크 계층과 도메인 계층 분리
2. **관례 우선**: 팀 전체가 이해할 수 있는 수준에서 타협
3. **점진적 개선**: 리팩토링을 통한 단계적 품질 개선

```python
# 프레임워크 제약이 있는 경우
@app.route('/orders', methods=['POST'])
def create_order():  # 프레임워크가 함수명 제약
    """
    프레임워크 제약으로 인한 타협점:
    - 함수 기반 엔드포인트 (클래스 기반 불가)
    - 하지만 비즈니스 로직은 별도 객체로 분리
    """
    order_data = request.get_json()
    
    # 실제 비즈니스 로직은 RDD 원칙 적용
    processor = OrderProcessor(
        validator=OrderValidator(),
        calculator=PriceCalculator(),
        repository=OrderRepository()
    )
    
    result = processor.process_order(order_data)
    return jsonify(result)
```

### 레거시 코드 vs 새로운 설계

**상황**: 기존 코드와의 호환성 유지 필요

**판단 기준**:

- 레거시 코드 변경 시 리스크 수준은?
- 새로운 기능의 복잡도는?
- 점진적 마이그레이션이 가능한가?

**대처 방법**:

1. **스트랭글러 패턴**: 새 기능은 RDD 적용, 기존 코드는 점진적 교체
2. **파사드 패턴**: 레거시 코드를 깔끔한 인터페이스로 감싸기
3. **경계 명확화**: 레거시와 신규 코드 간 명확한 경계 설정

```python
# 레거시 코드 (수정 불가)
class LegacyOrderManager:
    def create_order_with_everything(self, data):
        # 모든 것을 한 메서드에서 처리
        pass

# 신규 코드 (RDD 적용)
class ModernOrderService:
    """레거시 시스템과의 호환성을 유지하면서 RDD 적용"""
    
    def __init__(self, legacy_manager, modern_processor):
        self._legacy = legacy_manager
        self._modern = modern_processor
    
    def process_order(self, order_data):
        # 점진적 마이그레이션: 새 로직 우선, 실패 시 레거시 사용
        try:
            return self._modern.process_order(order_data)
        except Exception:
            # 로깅 후 레거시로 폴백
            return self._legacy.create_order_with_everything(order_data)
```

### 개발 속도 vs 설계 품질

**상황**: 빠른 배포가 필요한 MVP나 프로토타입

**판단 기준**:

- 프로토타입이 그대로 프로덕션에 갈 가능성은?
- 기술 부채 상환 계획이 있는가?
- 핵심 비즈니스 로직과 부수적 기능을 구분할 수 있는가?

**대처 방법**:

1. **핵심 vs 부수 구분**: 핵심 로직만 RDD 적용
2. **기술 부채 추적**: TODO 주석과 이슈로 개선점 관리
3. **리팩토링 스프린트**: 정기적인 코드 품질 개선 시간 확보

```python
# MVP 단계 - 빠른 구현 우선
class QuickOrderHandler:
    """
    TODO: 추후 RDD 원칙 적용 필요
    - 책임 분리 (검증, 계산, 저장)
    - 에러 처리 개선
    - 테스트 추가
    """
    def handle_order(self, data):
        # 일단 동작하는 코드로 MVP 배포
        if data.get('amount', 0) > 0:
            return self._save_to_db(data)
        raise ValueError("Invalid order")

# 정식 버전 - RDD 적용
class ProductionOrderProcessor:
    """MVP 검증 후 RDD 원칙을 적용한 정식 구현"""
    
    def __init__(self, validator, calculator, repository):
        self._validator = validator
        self._calculator = calculator
        self._repository = repository
    
    def process_order(self, order_data):
        validated = self._validator.validate(order_data)
        calculated = self._calculator.calculate_total(validated)
        return self._repository.save(calculated)
```

### 트레이드오프 의사결정 프레임워크

```
1. 상황 분석
   - 제약 조건 명확화 (성능, 시간, 기술적 제약)
   - 비즈니스 영향도 평가
   - 장단기 관점 구분

2. 선택지 도출
   - 이상적 RDD 설계안
   - 제약 조건 고려한 타협안
   - 최소 품질 기준안

3. 의사결정
   - 측정 가능한 기준 적용
   - 팀 전체 합의
   - 결정 이유 문서화

4. 추적 및 개선
   - 타협한 부분 이슈로 등록
   - 정기적 재검토
   - 점진적 개선 계획
```

## 적용 체크리스트

### 설계 완료 후 검증 항목

- [ ] 각 클래스의 책임을 한 문장으로 설명할 수 있는가?
- [ ] 클래스명이 그 책임을 명확히 나타내는가?
- [ ] 한 클래스가 변경되는 이유가 하나뿐인가?
- [ ] 객체 간 협력 관계가 명확히 정의되었는가?
- [ ] 순환 의존성이 존재하지 않는가?
- [ ] 각 역할이 해당 객체의 책임 범위 내에 있는가?

### 책임의 적절성 검증 체크리스트

**정량적 지표 검증:**

- [ ] 클래스당 메서드 수가 5-7개 이하인가? (생성자, getter/setter 제외)
- [ ] 직접 의존하는 객체가 3-5개 이하인가?
- [ ] 클래스당 라인 수가 200라인 이하인가? (주석 포함)
- [ ] 책임 설명이 접속사 없이 한 문장으로 표현되는가?

**질적 지표 검증:**

- [ ] 모든 메서드가 클래스의 핵심 데이터를 사용하는가?
- [ ] 다른 클래스의 내부 구조를 직접 알 필요가 없는가?
- [ ] 하나의 비즈니스 규칙 변경 시 한 클래스만 수정되는가?
- [ ] 의존성 주입 없이도 단위 테스트가 가능한가?

**책임 크기 검증:**

- [ ] 과도한 분리는 아닌가? (메서드 1-2개, 단순 전달만)
- [ ] 과소한 분리는 아닌가? (여러 비즈니스 규칙 처리)
- [ ] 명확한 비즈니스 개념을 나타내는가?

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

### 트레이드오프 의사결정 검증

**성능 vs 설계 품질:**

- [ ] 성능 병목이 실제로 측정되었는가?
- [ ] 성능 요구사항이 명확히 정의되었는가?
- [ ] 설계 타협 사항이 문서화되었는가?
- [ ] 추후 리팩토링 계획이 있는가?

**프레임워크 제약 vs RDD 원칙:**

- [ ] 프레임워크 제약 사항이 명확히 파악되었는가?
- [ ] 비즈니스 로직이 프레임워크 계층과 분리되었는가?
- [ ] 팀원들이 선택한 접근법을 이해할 수 있는가?

**레거시 vs 신규 설계:**

- [ ] 레거시 코드 변경 리스크가 평가되었는가?
- [ ] 점진적 마이그레이션 계획이 수립되었는가?
- [ ] 신규와 레거시 간 경계가 명확한가?

**개발 속도 vs 설계 품질:**

- [ ] 핵심 비즈니스 로직과 부수적 기능이 구분되었는가?
- [ ] 기술 부채가 적절히 추적되고 있는가?
- [ ] 코드 품질 개선 계획이 수립되었는가?

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

## 구체적 적용 예시

### 좋은 RDD 설계 예시

```python
# 1순위: 구체적 동사 기반 명명
class OrderProcessor:
    """주문 데이터를 처리한다"""
    
    def __init__(self, validator, calculator, repository, logger):
        self._validator = validator
        self._calculator = calculator
        self._repository = repository
        self._logger = logger
    
    def process_order(self, order_data):
        """주문 처리의 전체 플로우 조정"""
        try:
            self._logger.info(f"Processing order: {order_data.id}")
            
            # 1. 검증 책임 위임
            validated_order = self._validator.validate(order_data)
            
            # 2. 계산 책임 위임
            calculated_order = self._calculator.calculate_total(validated_order)
            
            # 3. 저장 책임 위임
            saved_order = self._repository.save(calculated_order)
            
            self._logger.info(f"Order processed successfully: {saved_order.id}")
            return saved_order
            
        except ValidationError as e:
            self._logger.error(f"Order validation failed: {e}")
            raise
        except Exception as e:
            self._logger.error(f"Order processing failed: {e}")
            raise

class InventoryChecker:
    """재고 가용성을 확인한다"""
    
    def __init__(self, inventory_repository):
        self._inventory_repository = inventory_repository
    
    def check_availability(self, items):
        """재고 확인 및 예약"""
        unavailable_items = []
        
        for item in items:
            current_stock = self._inventory_repository.get_stock(item.product_id)
            if current_stock < item.quantity:
                unavailable_items.append(item)
        
        if unavailable_items:
            raise InsufficientStockError(unavailable_items)
        
        # 재고 예약 처리
        return self._inventory_repository.reserve_items(items)

class PaymentValidator:
    """결제 정보를 검증한다"""
    
    def __init__(self, payment_gateway, fraud_detector):
        self._payment_gateway = payment_gateway
        self._fraud_detector = fraud_detector
    
    def validate_payment(self, payment_info):
        """결제 정보 검증 및 사전 승인"""
        # 사기 거래 검사
        if self._fraud_detector.is_suspicious(payment_info):
            raise FraudDetectedError()
        
        # 결제 수단 유효성 검사
        if not self._payment_gateway.validate_card(payment_info.card):
            raise InvalidPaymentMethodError()
        
        # 결제 가능 금액 확인
        if not self._payment_gateway.check_available_balance(payment_info):
            raise InsufficientFundsError()
        
        return payment_info

# 복잡한 프로세스 조정 - Service 허용 사례
class OrderFulfillmentService:
    """주문 이행 프로세스 전반을 조정한다"""
    
    def __init__(self, order_processor, inventory_checker, payment_validator, notifier):
        self._order_processor = order_processor
        self._inventory_checker = inventory_checker  
        self._payment_validator = payment_validator
        self._notifier = notifier
    
    def fulfill_order(self, order_request):
        """여러 객체 간 복잡한 협력을 조정하는 것이 주 책임"""
        try:
            # 1. 재고 확인 및 예약
            reserved_items = self._inventory_checker.check_availability(order_request.items)
            
            # 2. 결제 정보 검증
            validated_payment = self._payment_validator.validate_payment(order_request.payment)
            
            # 3. 주문 처리
            processed_order = self._order_processor.process_order(order_request)
            
            # 4. 알림 발송
            self._notifier.notify_order_completed(processed_order)
            
            return processed_order
            
        except Exception as e:
            # 실패 시 보상 트랜잭션
            self._handle_fulfillment_failure(order_request, e)
            raise
    
    def _handle_fulfillment_failure(self, order_request, error):
        """실패한 주문의 보상 처리"""
        # 예약된 재고 해제, 결제 취소 등
        pass
```

### 피해야 할 안티패턴

```python
# 모호한 Service 남발
class OrderService:  # ❌ 무엇을 하는지 불분명
    def create_order(self, data): pass
    def update_order(self, data): pass
    def cancel_order(self, data): pass
    def validate_order(self, data): pass
    def calculate_shipping(self, data): pass
    def send_confirmation_email(self, data): pass
    # 너무 많은 책임이 뒤섞임 - SRP 위반

class UserService:  # ❌ 도메인만 있고 행동이 모호함
    def register_user(self, data): pass
    def authenticate_user(self, data): pass
    def update_profile(self, data): pass
    def send_email(self, data): pass
    def calculate_loyalty_points(self, data): pass
    # 전혀 다른 책임들이 한 클래스에

# 더 나은 분리
class UserRegistrator:     # ✅ 명확한 책임: 사용자 등록
    def register_user(self, user_data):
        # 등록 관련 검증, 암호화, 저장
        pass

class UserAuthenticator:   # ✅ 명확한 책임: 사용자 인증
    def authenticate(self, credentials):
        # 인증 로직, 토큰 생성
        pass

class UserProfileManager:  # ✅ 명확한 책임: 프로필 생명주기 관리
    def update_profile(self, user_id, profile_data):
        # 프로필 수정, 검증, 이력 관리
        pass

class EmailSender:         # ✅ 명확한 책임: 이메일 발송
    def send_email(self, recipient, template, data):
        # 이메일 템플릿 처리, 발송
        pass

class LoyaltyCalculator:   # ✅ 명확한 책임: 적립금 계산
    def calculate_points(self, transaction):
        # 적립금 계산 로직
        pass
```
