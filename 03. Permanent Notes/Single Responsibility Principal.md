---
tags:
  - 객체지향
aliases:
  - SRP
  - 단일 책임 원칙
title: Single Responsibility Principal
created: 2024-10-16T00:00:00.000Z
note-type: COMMON
completed: true
---

## 내용

### 주제 요약

**단일 책임 원칙(SRP, Single Responsibility Principle)**은 객체 지향 프로그래밍(OOP)의 주요 원칙 중 하나로, **클래스는 단 하나의 책임만 가져야 한다**는 것을 의미한다[^1]. 이는 각 클래스가 하나의 변화 이유만을 가져야 함을 강조하며, 코드의 이해도와 유지 보수성을 높이는 데 중점을 둔다.

### SRP의 주요 개념

1. **책임 분리**  
   클래스는 명확하게 정의된 하나의 책임만 가져야 한다. 예를 들어, 고객 데이터를 관리하는 클래스가 데이터 저장소와 관련된 로직까지 처리하는 것은 SRP를 위반할 가능성이 높다.

2. **변화 이유**  
   클래스가 변경되어야 하는 이유가 단 하나여야 한다. 예를 들어, 고객 데이터를 처리하는 로직과 UI 변경 로직이 같은 클래스에 있다면, UI 요구 사항이 변경될 때 고객 데이터 처리 로직이 영향을 받을 수 있다.

3. **장점**  
   - **유지보수 용이성**: 책임이 분리된 코드는 더 쉽게 이해하고 수정할 수 있다.
   - **재사용성 증가**: 특정 기능만을 담당하는 클래스는 다른 프로젝트나 모듈에서 쉽게 재사용할 수 있다.
   - **테스트 용이성**: 단일 책임을 가진 클래스는 테스트가 간단해지고, 테스트 케이스가 명확해진다.

### SRP 적용 예시

- **잘못된 예**:  
  ```python
  class Report:
      def generate_report(self):
          # 보고서 생성 로직
          pass

      def print_report(self):
          # 보고서 출력 로직
          pass
  ```

- **SRP 준수 예**:  
  ```python
  class ReportGenerator:
      def generate_report(self):
          # 보고서 생성 로직
          pass

  class ReportPrinter:
      def print_report(self, report):
          # 보고서 출력 로직
          pass
  ```

---

## 질문 & 확장

1. 단일 책임 원칙과 **인터페이스 분리 원칙(ISP)**의 차이점은 무엇인가?  
2. SRP를 적용하면 코드 성능에 미치는 영향은 어떠한가?  
3. 대규모 프로젝트에서 SRP를 실현하기 위한 디자인 패턴에는 어떤 것들이 있는가?

## 연관 노트


## 출처

[^1]: Robert C. Martin, *Clean Architecture: A Craftsman's Guide to Software Structure and Design*, Prentice Hall, 2017, Chapter 4.  

    > "A class should have only one reason to change, encapsulating a single responsibility."  

    SRP의 핵심 정의와 적용 방법을 설명하는 데 중요한 정보를 제공.  
