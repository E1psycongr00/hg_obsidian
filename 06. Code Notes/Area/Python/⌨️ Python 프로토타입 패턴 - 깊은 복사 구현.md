---
tags: 
  - 디자인패턴
  - 프로토타입패턴
  - Python
  - copy모듈
  - 깊은복사
aliases: []
created: 2025-06-09
title: ⌨️ Python 프로토타입 패턴 - 깊은 복사 구현
note-type: CODE
language: "python"
environment: "Python 3.6+"
---

# ⌨️ Python 프로토타입 패턴 - 깊은 복사 구현

## 참조 타입 필드의 깊은 복사

참조 타입 필드를 포함한 복잡한 객체의 깊은 복사 구현 방법이다.

### Address 클래스 (참조 타입)

```python
class Address:
    """주소 클래스 (참조 타입)"""
    
    def __init__(self, street, city, zip_code):
        self.street = street
        self.city = city
        self.zip_code = zip_code
    
    def __str__(self):
        return f"{self.street}, {self.city} {self.zip_code}"
    
    def __repr__(self):
        return f"Address('{self.street}', '{self.city}', '{self.zip_code}')"
```

### Person 클래스 (깊은 복사 구현)

```python
import copy
from abc import ABC, abstractmethod

class Prototype(ABC):
    @abstractmethod
    def clone(self):
        pass
    
    @abstractmethod
    def display(self):
        pass

class Person(Prototype):
    """사람 클래스 - 깊은 복사 예제"""
    
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address  # 참조 타입
        self.hobbies = []       # 가변 컬렉션
    
    def clone(self):
        """깊은 복사 구현"""
        return copy.deepcopy(self)
    
    def shallow_clone(self):
        """얕은 복사 구현 (비교용)"""
        return copy.copy(self)
    
    def add_hobby(self, hobby):
        self.hobbies.append(hobby)
    
    def display(self):
        print(f"Person: {self.name}, Age: {self.age}")
        print(f"Address: {self.address}")
        print(f"Hobbies: {self.hobbies}")
    
    def __str__(self):
        return f"Person({self.name}, {self.age}, {self.address})"
```

## 사용 예제

### 깊은 복사 vs 얕은 복사 비교

```python
def demonstrate_deep_vs_shallow_copy():
    """깊은 복사 vs 얕은 복사 비교 데모"""
    print("=== Deep vs Shallow Copy Demo ===")
    
    # 원본 객체 생성
    address = Address("123 Main St", "Seoul", "12345")
    original = Person("John", 25, address)
    original.add_hobby("Reading")
    
    # 얕은 복사
    person_shallow = original.shallow_clone()
    person_shallow.name = "Shallow Copy"
    person_shallow.add_hobby("Gaming")
    person_shallow.address.city = "Busan"  # 원본에도 영향!
    
    # 깊은 복사
    person_deep = original.clone()
    person_deep.name = "Deep Copy"
    person_deep.add_hobby("Coding")
    person_deep.address.city = "Incheon"  # 원본에 영향 없음
    
    print("Original:")
    original.display()
    print("\nShallow Copy:")
    person_shallow.display()
    print("\nDeep Copy:")
    person_deep.display()

if __name__ == "__main__":
    demonstrate_deep_vs_shallow_copy()
```

## 커스텀 깊은 복사 구현

### __deepcopy__ 메소드 오버라이드

```python
class CustomClonePerson(Prototype):
    """커스텀 깊은 복사 동작을 가진 사람 클래스"""
    
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address
        self.hobbies = []
        self.creation_time = __import__('time').time()
    
    def __deepcopy__(self, memo):
        """깊은 복사 커스터마이징"""
        # 새 인스턴스 생성
        new_obj = type(self)(self.name, self.age, copy.deepcopy(self.address, memo))
        # 취미 목록 깊은 복사
        new_obj.hobbies = copy.deepcopy(self.hobbies, memo)
        # 생성 시간은 새로 설정
        new_obj.creation_time = __import__('time').time()
        return new_obj
    
    def clone(self):
        return copy.deepcopy(self)
    
    def add_hobby(self, hobby):
        self.hobbies.append(hobby)
    
    def display(self):
        print(f"CustomPerson: {self.name}, Age: {self.age}")
        print(f"Address: {self.address}")
        print(f"Hobbies: {self.hobbies}")
        print(f"Created at: {self.creation_time}")
```

## 선택적 깊은 복사

필요에 따라 일부 필드만 깊은 복사하는 방법이다.

```python
class SelectiveClonePerson(Prototype):
    """선택적 복사를 지원하는 사람 클래스"""
    
    def __init__(self, name, age, address):
        self.name = name
        self.age = age
        self.address = address
        self.hobbies = []
    
    def clone(self, deep_copy_address=True, deep_copy_hobbies=True):
        """선택적 복사 구현"""
        # 기본 얕은 복사
        new_obj = copy.copy(self)
        
        # 선택적 깊은 복사
        if deep_copy_address:
            new_obj.address = copy.deepcopy(self.address)
        
        if deep_copy_hobbies:
            new_obj.hobbies = copy.deepcopy(self.hobbies)
        
        return new_obj
    
    def add_hobby(self, hobby):
        self.hobbies.append(hobby)
    
    def display(self):
        print(f"SelectivePerson: {self.name}, Age: {self.age}")
        print(f"Address: {self.address}")
        print(f"Hobbies: {self.hobbies}")
```

### 선택적 복사 사용 예제

```python
def demonstrate_selective_copy():
    """선택적 복사 데모"""
    print("=== Selective Copy Demo ===")
    
    # 원본 객체 생성
    address = Address("456 Oak St", "Seoul", "54321")
    original = SelectiveClonePerson("Alice", 30, address)
    original.add_hobby("Swimming")
    
    # 주소만 깊은 복사, 취미는 얕은 복사
    clone1 = original.clone(deep_copy_address=True, deep_copy_hobbies=False)
    clone1.address.city = "Daegu"
    clone1.add_hobby("Dancing")  # 원본에도 영향
    
    # 취미만 깊은 복사, 주소는 얕은 복사
    clone2 = original.clone(deep_copy_address=False, deep_copy_hobbies=True)
    clone2.address.city = "Gwangju"  # 원본에도 영향
    clone2.add_hobby("Singing")  # 원본에 영향 없음
    
    print("Original:")
    original.display()
    print("\nClone1 (deep address, shallow hobbies):")
    clone1.display()
    print("\nClone2 (shallow address, deep hobbies):")
    clone2.display()

if __name__ == "__main__":
    demonstrate_selective_copy()
```

## 순환 참조 처리

복잡한 객체 그래프에서 순환 참조를 안전하게 처리하는 방법이다.

```python
class Node:
    """순환 참조가 있는 노드 클래스"""
    
    def __init__(self, value):
        self.value = value
        self.children = []
        self.parent = None
    
    def add_child(self, child):
        child.parent = self
        self.children.append(child)
    
    def clone(self):
        """순환 참조를 고려한 복사"""
        return copy.deepcopy(self)  # Python의 deepcopy는 순환 참조를 자동 처리
    
    def __deepcopy__(self, memo):
        """커스텀 깊은 복사 (순환 참조 처리)"""
        # memo 딕셔너리를 사용하여 이미 복사된 객체 추적
        if id(self) in memo:
            return memo[id(self)]
        
        # 새 객체 생성 및 memo에 등록
        new_obj = Node(self.value)
        memo[id(self)] = new_obj
        
        # 자식 노드들 복사
        for child in self.children:
            new_child = copy.deepcopy(child, memo)
            new_obj.add_child(new_child)
        
        return new_obj
    
    def display(self, level=0):
        indent = "  " * level
        print(f"{indent}Node({self.value})")
        for child in self.children:
            child.display(level + 1)
```

### 순환 참조 테스트

```python
def demonstrate_circular_reference():
    """순환 참조 처리 데모"""
    print("=== Circular Reference Demo ===")
    
    # 순환 참조가 있는 트리 구조 생성
    root = Node("Root")
    child1 = Node("Child1")
    child2 = Node("Child2")
    
    root.add_child(child1)
    root.add_child(child2)
    child1.add_child(Node("Grandchild"))
    
    # 순환 참조 생성 (부모-자식 관계)
    # 이미 parent 관계가 있으므로 순환 참조 존재
    
    # 깊은 복사 (순환 참조 자동 처리)
    cloned_root = root.clone()
    
    print("Original tree:")
    root.display()
    print("\nCloned tree:")
    cloned_root.display()
    
    print(f"\nOriginal and clone are different objects: {root is not cloned_root}")
    print(f"Original child and clone child are different: {root.children[0] is not cloned_root.children[0]}")

if __name__ == "__main__":
    demonstrate_circular_reference()
```

>[!warning] 깊은 복사 주의사항
>- 모든 중첩된 객체가 새로 생성되므로 메모리 사용량이 증가한다
>- 복사 시간이 얕은 복사보다 오래 걸린다
>- 순환 참조가 있는 경우 `memo` 딕셔너리를 활용해야 한다

>[!tip] Python의 장점
>- `copy.deepcopy()`가 순환 참조를 자동으로 처리한다
>- `__deepcopy__()` 메소드로 커스텀 깊은 복사 동작을 정의할 수 있다
>- `memo` 딕셔너리를 통해 이미 복사된 객체를 추적할 수 있다

## 관련 노트
- [[06. Code Notes/Area/Python/⌨️ Python 프로토타입 패턴 - 얕은 복사 구현|⌨️ Python 프로토타입 패턴 - 얕은 복사 구현]]
- [[06. Code Notes/Area/Python/⌨️ Python 프로토타입 패턴 - 프로토타입 관리자 구현|⌨️ Python 프로토타입 패턴 - 프로토타입 관리자 구현]]
- [[03. Permanent Notes/Area/📝 얕은 복사와 깊은 복사|📝 얕은 복사와 깊은 복사]]
- [[02. MOC/🏛️ 프로토타입 패턴|🏛️ 프로토타입 패턴]] 