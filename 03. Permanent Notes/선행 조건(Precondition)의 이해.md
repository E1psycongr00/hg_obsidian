---
tags:
  - 객체지향설계
  - 계약기반설계
  - 프로그래밍원칙
  - 소프트웨어설계
aliases:
  - precondition
  - 사전조건
title: 선행 조건(Precondition)의 이해
created: 2025-01-10T00:00:00.000Z
note-type: COMMON
completed: true
---

## 내용

### 개요

선행 조건(Precondition)은 메서드나 함수가 올바르게 실행되기 위해 호출 시점에 만족해야 하는 조건이다[^1]. 이는 계약 기반 설계(Design by Contract)의 핵심 요소로, 메서드의 입력 매개변수나 시스템의 상태에 대한 제약사항을 명시한다.

### 수학적 표현

선행 조건은 다음과 같은 수학적 표현으로 정의될 수 있다[^2]:

$$ P(x) \Rightarrow Q(f(x)) $$

여기서:
- $P(x)$ 는 입력 x에 대한 선행 조건
- $f(x)$ 는 메서드/함수
- $Q(f(x))$ 는 실행 결과에 대한 후행 조건

### 객체지향 설계에서의 적용

1. **상속과 선행 조건의 관계**
   ```python
   class Account:
       def withdraw(self, amount: float) -> bool:
           """
           선행 조건: amount > 0 and amount <= self.balance
           """
           if amount <= 0 or amount > self.balance:
               raise ValueError("Invalid withdrawal amount")
           self.balance -= amount
           return True

   class SavingsAccount(Account):
       def withdraw(self, amount: float) -> bool:
           """
           선행 조건: amount > 0 and amount <= self.balance
                    and not self.is_frozen
           """
           # LSP 위반: 더 강한 선행 조건 추가
           if self.is_frozen:
               raise ValueError("Account is frozen")
           return super().withdraw(amount)
   ```

2. **계약 강화와 약화**
   ```python
   from typing import List
   
   class Sorter:
       def sort(self, numbers: List[int]) -> List[int]:
           """
           선행 조건: len(numbers) > 0
           """
           if not numbers:
               raise ValueError("Empty list")
           return sorted(numbers)

   class QuickSorter(Sorter):
       def sort(self, numbers: List[int]) -> List[int]:
           """
           선행 조건: len(numbers) > 0 and len(numbers) <= 1000
           """
           # LSP 위반: 더 강한 선행 조건 추가
           if len(numbers) > 1000:
               raise ValueError("List too large")
           return super().sort(numbers)
   ```




## 질문 & 확장

1. **개념 심화**
   - 선행 조건과 불변 조건(invariant)의 차이점은 무엇인가?

## 출처

[^1]: Bertrand Meyer, *Object-Oriented Software Construction*, Prentice Hall, 2nd Edition.

    > "A precondition is an obligation on the client, a requirement that the client must satisfy whenever it calls the routine."
    
    선행 조건의 기본 정의와 역할을 설명하기 위해 인용.

[^2]: Gary T. Leavens and Yoonsik Cheon, "Design by Contract with JML", 2006.

    > "Preconditions are assertions about the program's state when a method is called, including constraints on the method's arguments."
    
    선행 조건의 수학적 표현과 프로그램 상태와의 관계를 설명하기 위해 참조.

[^3]: Robert C. Martin, *Clean Code: A Handbook of Agile Software Craftsmanship*, Prentice Hall.

    > "Preconditions should be checked first in any method. They are the guard rails that keep bad data from propagating through the system."
    
    선행 조건의 실제 구현과 중요성을 설명하기 위해 인용.

[^4]: Joshua Bloch, *Effective Java*, Addison-Wesley Professional, 3rd Edition.

    > "Use preconditions to fail fast and provide clear error messages. This helps in debugging and maintains system integrity."
    
    선행 조건 검사의 실용적 구현 방법과 이점을 설명하기 위해 참조.
