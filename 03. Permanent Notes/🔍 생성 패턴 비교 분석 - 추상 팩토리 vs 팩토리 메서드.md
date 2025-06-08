---
tags:
  - 객체지향
  - 디자인패턴
  - GoF
  - 생성패턴
  - 패턴비교
aliases:
  - Factory Pattern Comparison
  - 팩토리 패턴 비교
created: 2025-01-10
title: 🔍 생성 패턴 비교 분석 - 추상 팩토리 vs 팩토리 메서드
note-type: REVIEW
review-type: 패턴 비교
comparison-target: 추상 팩토리 패턴, 팩토리 메서드 패턴
analysis-depth: 상세
practical-focus: 높음
---

## 비교 분석 개요

팩토리 메서드 패턴과 추상 팩토리 패턴은 모두 객체 생성을 캡슐화하는 생성 패턴이지만, **생성하는 객체의 범위와 구조에서 근본적인 차이**를 가진다. 이 분석은 두 패턴의 차이점을 명확히 하고 실무에서의 선택 기준을 제시한다.

## 핵심 차이점 비교

### 1. 생성 대상의 범위

| 구분 | 팩토리 메서드 | 추상 팩토리 |
|------|---------------|-------------|
| **생성 대상** | **단일 제품** | **제품군 (관련된 여러 제품)** |
| **메서드 수** | 하나의 팩토리 메서드 | 여러 개의 생성 메서드 |
| **관계성** | 제품 간 관계 없음 | 제품 간 상호 연관성 필수 |
| **예시** | Document 생성 | Button + TextField + CheckBox 생성 |

### 2. 구조적 차이점

#### 팩토리 메서드 패턴 구조
```java
// 단일 제품 생성에 집중
abstract class DocumentCreator {
    protected abstract Document createDocument(String fileName);
    // 하나의 팩토리 메서드만 존재
}

class WordDocumentCreator extends DocumentCreator {
    protected Document createDocument(String fileName) {
        return new WordDocument(fileName);
    }
}
```

#### 추상 팩토리 패턴 구조
```java
// 제품군 생성에 집중
interface GUIFactory {
    Button createButton();      // 제품 1
    TextField createTextField(); // 제품 2
    CheckBox createCheckBox();   // 제품 3
    // 여러 개의 생성 메서드 존재
}

class WindowsFactory implements GUIFactory {
    public Button createButton() { return new WindowsButton(); }
    public TextField createTextField() { return new WindowsTextField(); }
    public CheckBox createCheckBox() { return new WindowsCheckBox(); }
}
```

### 3. 클래스 계층 구조

| 구분 | 팩토리 메서드 | 추상 팩토리 |
|------|---------------|-------------|
| **Creator 계층** | 추상 클래스 상속 | 인터페이스 구현 |
| **Product 계층** | 단일 Product 인터페이스 | 여러 Product 인터페이스 |
| **확장 방식** | Creator 서브클래스 추가 | Factory 구현체 추가 |
| **복잡도** | 상대적으로 단순 | 상대적으로 복잡 |

## 사용 시기 비교

### 팩토리 메서드 패턴 사용 시기

#### ✅ 적합한 상황
- **단일 타입의 객체 생성**이 필요할 때
- 객체 생성 로직이 **서브클래스마다 다를** 때
- **Template Method 패턴과 함께** 사용할 때
- 생성할 객체의 **정확한 클래스를 미리 알 수 없을** 때

#### 📝 실제 사례
```java
// 문서 처리 시스템
abstract class DocumentProcessor {
    protected abstract Document createDocument();
    
    public void processDocument() {
        Document doc = createDocument(); // 팩토리 메서드
        doc.open();
        doc.process();
        doc.save();
    }
}
```

### 추상 팩토리 패턴 사용 시기

#### ✅ 적합한 상황
- **관련된 객체들의 집합(제품군)**을 생성해야 할 때
- 제품군의 **일관성을 보장**해야 할 때
- **플랫폼별 구현**이 필요할 때
- **여러 제품이 함께 동작**해야 할 때

#### 📝 실제 사례
```java
// GUI 시스템 - 플랫폼별 일관된 컴포넌트 필요
GUIFactory factory = getFactory(platform);
Button button = factory.createButton();
TextField field = factory.createTextField();
CheckBox checkbox = factory.createCheckBox();
// 모든 컴포넌트가 동일한 플랫폼 스타일로 생성됨
```

## 장단점 비교

### 팩토리 메서드 패턴

#### 장점
- **구현이 단순**하고 이해하기 쉬움
- **기존 코드 수정 없이** 새로운 제품 타입 추가 가능
- **Template Method 패턴과 자연스럽게 결합**
- **메모리 사용량이 적음**

#### 단점
- **단일 제품만 생성** 가능
- **제품 간 관계를 보장할 수 없음**
- Creator 클래스가 **많아질 수 있음**
- **복잡한 제품군 관리에 부적합**

### 추상 팩토리 패턴

#### 장점
- **제품군의 일관성 보장**
- **플랫폼 독립적인 코드** 작성 가능
- **관련 객체들의 호환성** 자동 보장
- **새로운 제품군 추가가 용이**

#### 단점
- **구현이 복잡**하고 클래스 수가 많음
- **새로운 제품 타입 추가 시 모든 팩토리 수정** 필요
- **메모리 사용량이 많음**
- **과도한 추상화로 인한 복잡성** 증가

## 실무 선택 가이드라인

### 🎯 팩토리 메서드를 선택해야 하는 경우

1. **단일 객체 생성**이 목적인 경우
2. **생성 로직이 서브클래스마다 다른** 경우
3. **Template Method와 함께** 사용하는 경우
4. **간단한 구조**를 선호하는 경우

```java
// 예시: 로그 처리기 생성
abstract class LogProcessor {
    protected abstract Logger createLogger();
    
    public void processLog(String message) {
        Logger logger = createLogger();
        logger.log(message);
    }
}
```

### 🎯 추상 팩토리를 선택해야 하는 경우

1. **여러 관련 객체를 함께 생성**해야 하는 경우
2. **플랫폼별 구현**이 필요한 경우
3. **제품군의 일관성**이 중요한 경우
4. **확장성**이 중요한 대규모 시스템

```java
// 예시: 크로스 플랫폼 UI 시스템
interface UIFactory {
    Button createButton();
    TextField createTextField();
    Menu createMenu();
}
```

### ⚖️ 선택 기준 체크리스트

| 질문 | 팩토리 메서드 | 추상 팩토리 |
|------|---------------|-------------|
| 생성할 객체가 1개인가? | ✅ | ❌ |
| 여러 관련 객체를 함께 생성하는가? | ❌ | ✅ |
| 플랫폼별 구현이 필요한가? | △ | ✅ |
| 제품 간 호환성이 중요한가? | ❌ | ✅ |
| 구현 복잡도를 낮게 유지하고 싶은가? | ✅ | ❌ |
| 새로운 제품 타입 추가가 빈번한가? | ✅ | ❌ |

## 다른 생성 패턴과의 관계

### 빌더 패턴과의 비교
- **빌더**: 복잡한 객체의 **단계별 생성**에 집중
- **팩토리**: 객체 **타입 선택과 생성**에 집중
- **조합 가능**: 팩토리에서 빌더를 반환하는 구조

### 싱글톤 패턴과의 관계
- **팩토리 자체를 싱글톤**으로 구현하는 경우가 많음
- **제품 객체는 싱글톤이 아님** (일반적으로)

### 프로토타입 패턴과의 관계
- **팩토리에서 프로토타입을 복제**하여 객체 생성
- **생성 비용이 높은 객체**에 유용한 조합

## 실제 프레임워크 활용 사례

### 팩토리 메서드 활용 사례
- **Java**: `Calendar.getInstance()`
- **Spring**: `@Bean` 메서드들
- **Android**: `Fragment.newInstance()`

### 추상 팩토리 활용 사례
- **Java**: `DocumentBuilderFactory`
- **Spring**: `BeanFactory`, `ApplicationContext`
- **GUI**: Swing Look and Feel

## 마이그레이션 가이드

### 팩토리 메서드 → 추상 팩토리
```java
// Before: 팩토리 메서드
abstract class ComponentCreator {
    protected abstract Component createComponent();
}

// After: 추상 팩토리
interface ComponentFactory {
    Button createButton();
    TextField createTextField();
    // 제품군으로 확장
}
```

### 추상 팩토리 → 팩토리 메서드
```java
// Before: 추상 팩토리 (과도한 복잡성)
interface UIFactory {
    Button createButton();
}

// After: 팩토리 메서드 (단순화)
abstract class ButtonCreator {
    protected abstract Button createButton();
}
```

## 결론 및 권장사항

### 🎯 핵심 선택 기준
1. **생성 대상의 수**: 단일 vs 제품군
2. **관계의 중요성**: 독립적 vs 상호 연관
3. **복잡도 허용 수준**: 단순함 vs 확장성
4. **플랫폼 요구사항**: 단일 vs 다중 플랫폼

### 📋 실무 권장사항
- **소규모 프로젝트**: 팩토리 메서드 우선 고려
- **대규모 시스템**: 추상 팩토리의 장점 활용
- **점진적 발전**: 팩토리 메서드로 시작 → 필요시 추상 팩토리로 확장
- **과도한 추상화 주의**: 실제 필요성을 검증 후 적용

## 관련 자료

- [[02. MOC/🏛️ 추상 팩토리 패턴.md|🏛️ 추상 팩토리 패턴 MOC]]
- [[02. MOC/🏛️ GoF 생성 패턴.md|🏛️ GoF 생성 패턴 MOC]]
- [[03. Permanent Notes/추상 팩토리 패턴 개념|추상 팩토리 패턴 개념]]
- [[06. Code Notes/Area/Java/⌨️ 추상 팩토리 패턴 Java 구현_java (2025-06-08)|⌨️ 추상 팩토리 Java 구현]]
- [[06. Code Notes/Area/Python/⌨️ 추상 팩토리 패턴 Python 구현_python (2025-01-10).md|⌨️ 추상 팩토리 Python 구현]]
- [[06. Code Notes/Area/Java/⌨️ 팩토리 메서드 패턴 Java 구현_java (2025-06-07).md|⌨️ 팩토리 메서드 Java 구현]]
- [[03. Permanent Notes/📚 추상 팩토리 패턴 실제 활용 사례.md|📚 실제 활용 사례]] 