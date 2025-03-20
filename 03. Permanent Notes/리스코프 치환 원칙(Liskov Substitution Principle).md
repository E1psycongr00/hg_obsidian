---
tags:
  - 객체지향설계
  - SOLID원칙
  - 프로그래밍원칙
  - 소프트웨어설계
aliases:
  - LSP
  - 리스코프 치환 원칙
  - 리스코프 교체 원칙
created: 2025-01-10
title: 리스코프 치환 원칙(Liskov Substitution Principle)
note-type: COMMON
completed: true
---

## 내용

### 개요

리스코프 치환 원칙(LSP)은 바바라 리스코프(Barbara Liskov)가 1987년에 제안한 객체지향 프로그래밍의 핵심 원칙이다[^1]. 이 원칙은 "상위 타입의 객체를 하위 타입의 객체로 치환해도 프로그램의 정확성을 보장해야 한다"는 것을 의미한다.

### 수학적 정의

리스코프 치환 원칙은 다음과 같은 수학적 표현으로 정의된다[^2]:

$$ \forall \phi(x) : T(x) \Rightarrow \phi(y) : S(y) $$

여기서:
- $\phi$ 는 타입 T에 대해 증명 가능한 속성
- S는 T의 하위 타입
- x는 T 타입의 객체
- y는 S 타입의 객체

### 핵심 규칙

1. **[[선행 조건(Precondition)의 이해#개요|선행 조건(Precondition)]]**
   - 하위 타입의 메서드는 상위 타입의 메서드보다 더 강한 선행 조건을 가질 수 없다[^3].

2. **후행 조건(Postcondition)**
   - 하위 타입의 메서드는 상위 타입의 메서드보다 더 약한 후행 조건을 가질 수 없다[^3].

3. **불변 조건(Invariant)**
   - 하위 타입은 상위 타입의 모든 불변 조건을 유지해야 한다[^4].

### 실제 구현 예시

```python
# 잘못된 예시
class Rectangle:
    def set_width(self, width): self.width = width
    def set_height(self, height): self.height = height
    def area(self): return self.width * self.height

class Square(Rectangle):  # LSP 위반
    def set_width(self, width):
        self.width = self.height = width
    def set_height(self, height):
        self.width = self.height = height

# 올바른 예시
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self._width = width
        self._height = height
    
    def area(self):
        return self._width * self._height

class Square(Shape):
    def __init__(self, side):
        self._side = side
    
    def area(self):
        return self._side * self._side
```

## 질문 & 확장

1. **개념 심화**
   - LSP와 다른 SOLID 원칙들 간의 상호 관계는 어떠한가?
   - 계약에 의한 설계(Design by Contract)와 LSP는 어떤 관계가 있는가?
   - LSP가 타입 시스템 설계에 미치는 영향은 무엇인가?
   - 행위적 하위 타입과 구조적 하위 타입의 차이는 무엇인가?

2. **실무 적용**
   - 실제 프로젝트에서 LSP 위반을 어떻게 감지할 수 있는가?
   - 레거시 코드에서 LSP 위반을 어떻게 리팩토링할 수 있는가?
   - LSP를 준수하면서 코드의 유연성을 어떻게 유지할 수 있는가?
   - 인터페이스 설계 시 LSP를 어떻게 고려해야 하는가?

3. **한계와 대안**
   - LSP를 엄격히 준수하기 어려운 상황은 언제인가?
   - 상속 대신 컴포지션을 사용해야 하는 경우는 언제인가?
   - LSP 위반이 불가피한 경우의 대처 방법은 무엇인가?
   - 다형성과 LSP의 관계에서 발생하는 제약사항은 무엇인가?

4. **발전과 확장**
   - 함수형 프로그래밍에서 LSP는 어떻게 적용되는가?
   - 마이크로서비스 아키텍처에서 LSP의 의미는 무엇인가?
   - 제네릭 프로그래밍에서 LSP를 어떻게 활용할 수 있는가?
   - 새로운 프로그래밍 패러다임에서 LSP의 미래는 어떠한가?

## 연결 노트

- down:: [[선행 조건(Precondition)의 이해]]


## 출처

[^1]: Barbara Liskov and Jeannette Wing, "A Behavioral Notion of Subtyping," *ACM Transactions on Programming Languages and Systems*, 1994.

    > "Let φ(x) be a property provable about objects x of type T. Then φ(y) should be true for objects y of type S where S is a subtype of T."
    
    LSP의 기본 정의와 수학적 표현을 제공하기 위해 인용.

[^2]: Robert C. Martin, *Clean Architecture: A Craftsman's Guide to Software Structure and Design*, Prentice Hall, 2017.

    > "Substitutability is a principle in object-oriented programming stating that objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program."
    
    LSP의 실용적 해석과 현대적 의미를 설명하기 위해 참조.

[^3]: Bertrand Meyer, *Object-Oriented Software Construction*, Prentice Hall, 2nd Edition.

    > "The conditions for substitutability include both preconditions that may be weakened and postconditions that may be strengthened."
    
    LSP의 계약 조건과 관련된 세부 규칙을 설명하기 위해 인용.

[^4]: Craig Larman, *Applying UML and Patterns*, Prentice Hall, 3rd Edition.

    > "The LSP is not just about syntax but about behavior—about honoring contracts. A derived class must honor the behavior clients expect of the base class."
    
    LSP의 행위적 측면과 구현 시 고려사항을 설명하기 위해 참조.









