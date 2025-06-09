---
tags: 
  - 디자인패턴
  - 프로토타입패턴
  - Python
  - copy모듈
  - 객체복사
aliases: []
created: 2025-06-09
title: ⌨️ Python 프로토타입 패턴 구현
note-type: CODE
language: "python"
environment: "Python 3.6+"
---

# ⌨️ Python 프로토타입 패턴 구현

## 기본 구현: copy 모듈 활용

### 1. 프로토타입 인터페이스 정의

```python
import copy
from abc import ABC, abstractmethod

class Prototype(ABC):
    """프로토타입 추상 클래스"""
    
    @abstractmethod
    def clone(self):
        """객체 복제 메소드"""
        pass
    
    @abstractmethod
    def display(self):
        """객체 정보 출력 메소드"""
        pass
```

### 2. 얕은 복사 구현

```python
class Shape(Prototype):
    """도형 클래스 - 얕은 복사 예제"""
    
    def __init__(self, shape_type, color, x=0, y=0):
        self.shape_type = shape_type
        self.color = color
        self.x = x
        self.y = y
    
    def clone(self):
        """얕은 복사 구현"""
        return copy.copy(self)
    
    def display(self):
        print(f"Shape: {self.shape_type}, Color: {self.color}, "
              f"Position: ({self.x}, {self.y})")
    
    def set_position(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"{self.shape_type}({self.color}) at ({self.x}, {self.y})"
```

## 깊은 복사 구현

### 복잡한 객체의 깊은 복사

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

## 프로토타입 매니저 패턴

### 프로토타입 레지스트리

```python
class PrototypeManager:
    """프로토타입 매니저 (레지스트리)"""
    
    def __init__(self):
        self._prototypes = {}
    
    def register_prototype(self, key, prototype):
        """프로토타입 등록"""
        self._prototypes[key] = prototype
    
    def get_prototype(self, key):
        """프로토타입 복제하여 반환"""
        if key in self._prototypes:
            return self._prototypes[key].clone()
        else:
            raise KeyError(f"Prototype '{key}' not found")
    
    def list_prototypes(self):
        """등록된 프로토타입 목록 조회"""
        print("Registered prototypes:")
        for key in self._prototypes.keys():
            print(f"- {key}")
    
    def remove_prototype(self, key):
        """프로토타입 제거"""
        if key in self._prototypes:
            del self._prototypes[key]
        else:
            raise KeyError(f"Prototype '{key}' not found")
```

## 고급 구현: __copy__와 __deepcopy__ 메소드

### 커스텀 복사 동작 정의

```python
class CustomCloneShape(Prototype):
    """커스텀 복사 동작을 가진 도형 클래스"""
    
    def __init__(self, shape_type, color, metadata=None):
        self.shape_type = shape_type
        self.color = color
        self.metadata = metadata or {}
        self.creation_time = __import__('time').time()
    
    def __copy__(self):
        """얕은 복사 커스터마이징"""
        # 새 인스턴스 생성
        new_obj = type(self)(self.shape_type, self.color)
        # 메타데이터는 공유 (얕은 복사)
        new_obj.metadata = self.metadata
        # 생성 시간은 새로 설정
        new_obj.creation_time = __import__('time').time()
        return new_obj
    
    def __deepcopy__(self, memo):
        """깊은 복사 커스터마이징"""
        # 새 인스턴스 생성
        new_obj = type(self)(self.shape_type, self.color)
        # 메타데이터는 깊은 복사
        new_obj.metadata = copy.deepcopy(self.metadata, memo)
        # 생성 시간은 새로 설정
        new_obj.creation_time = __import__('time').time()
        return new_obj
    
    def clone(self):
        return copy.deepcopy(self)
    
    def display(self):
        print(f"CustomShape: {self.shape_type}, Color: {self.color}")
        print(f"Metadata: {self.metadata}")
        print(f"Created at: {self.creation_time}")
```

## 실사용 예제

### 클라이언트 코드

```python
def demonstrate_prototype_pattern():
    """프로토타입 패턴 데모"""
    
    # 프로토타입 매니저 생성
    manager = PrototypeManager()
    
    # 기본 프로토타입들 등록
    manager.register_prototype("circle", Shape("Circle", "Red"))
    manager.register_prototype("rectangle", Shape("Rectangle", "Blue"))
    
    # 복잡한 객체 프로토타입 등록
    default_address = Address("123 Main St", "Seoul", "12345")
    manager.register_prototype("person", Person("Template", 0, default_address))
    
    # 도형 복제 데모
    demonstrate_shape_cloning(manager)
    
    # 사람 복제 데모 (얕은 vs 깊은 복사)
    demonstrate_person_cloning(manager)
    
    # 커스텀 복사 데모
    demonstrate_custom_cloning()

def demonstrate_shape_cloning(manager):
    """도형 복제 데모"""
    print("=== Shape Cloning Demo ===")
    
    # 원형 복제
    circle1 = manager.get_prototype("circle")
    circle1.set_position(10, 20)
    
    circle2 = manager.get_prototype("circle")
    circle2.set_position(30, 40)
    
    circle1.display()
    circle2.display()
    print()

def demonstrate_person_cloning(manager):
    """사람 복제 데모 - 얕은 vs 깊은 복사"""
    print("=== Person Cloning Demo ===")
    
    # 원본 프로토타입 가져오기
    original = manager._prototypes["person"]
    
    # 얕은 복사
    person_shallow = original.shallow_clone()
    person_shallow.name = "Shallow Copy"
    person_shallow.add_hobby("Reading")
    person_shallow.address.city = "Busan"  # 원본에도 영향!
    
    # 깊은 복사
    person_deep = original.clone()
    person_deep.name = "Deep Copy"
    person_deep.add_hobby("Gaming")
    person_deep.address.city = "Incheon"  # 원본에 영향 없음
    
    print("Original:")
    original.display()
    print("\nShallow Copy:")
    person_shallow.display()
    print("\nDeep Copy:")
    person_deep.display()
    print()

def demonstrate_custom_cloning():
    """커스텀 복사 데모"""
    print("=== Custom Cloning Demo ===")
    
    # 원본 객체 생성
    original = CustomCloneShape("Triangle", "Green", {"version": 1.0})
    
    # 얕은 복사
    shallow_copy = copy.copy(original)
    
    # 깊은 복사
    deep_copy = copy.deepcopy(original)
    
    # 메타데이터 수정
    original.metadata["version"] = 2.0
    
    print("Original:")
    original.display()
    print("\nShallow Copy (shares metadata):")
    shallow_copy.display()
    print("\nDeep Copy (independent metadata):")
    deep_copy.display()

if __name__ == "__main__":
    demonstrate_prototype_pattern()
```

## 성능 최적화 및 고급 기법

### 1. 선택적 복사 전략

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
    
    def display(self):
        print(f"SelectivePerson: {self.name}, Age: {self.age}")
        print(f"Address: {self.address}")
        print(f"Hobbies: {self.hobbies}")
```

### 2. 프로토타입 팩토리 패턴

```python
class PrototypeFactory:
    """프로토타입 팩토리"""
    
    @staticmethod
    def create_shape(shape_type, color="Black"):
        """도형 프로토타입 생성"""
        prototypes = {
            "circle": Shape("Circle", color),
            "rectangle": Shape("Rectangle", color),
            "triangle": Shape("Triangle", color)
        }
        
        if shape_type.lower() in prototypes:
            return prototypes[shape_type.lower()].clone()
        else:
            raise ValueError(f"Unknown shape type: {shape_type}")
    
    @staticmethod
    def create_person(template_type="default"):
        """사람 프로토타입 생성"""
        templates = {
            "default": Person("Unknown", 0, Address("", "Seoul", "")),
            "student": Person("Student", 20, Address("University St", "Seoul", "12345")),
            "worker": Person("Worker", 30, Address("Business St", "Seoul", "54321"))
        }
        
        if template_type in templates:
            return templates[template_type].clone()
        else:
            raise ValueError(f"Unknown template type: {template_type}")
```

### 3. 메모이제이션을 활용한 복사 최적화

```python
class MemoizedPrototype(Prototype):
    """메모이제이션을 활용한 프로토타입"""
    
    def __init__(self, data):
        self.data = data
        self._clone_cache = {}
    
    def clone(self, cache_key=None):
        """캐시를 활용한 복사"""
        if cache_key and cache_key in self._clone_cache:
            return copy.deepcopy(self._clone_cache[cache_key])
        
        cloned = copy.deepcopy(self)
        
        if cache_key:
            self._clone_cache[cache_key] = cloned
        
        return cloned
    
    def display(self):
        print(f"MemoizedPrototype: {self.data}")
        print(f"Cache keys: {list(self._clone_cache.keys())}")
```

## 주의사항 및 베스트 프랙티스

### 1. 순환 참조 처리

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
```

### 2. 타입 안전성 보장

```python
from typing import TypeVar, Generic

T = TypeVar('T', bound=Prototype)

class TypeSafePrototypeManager(Generic[T]):
    """타입 안전한 프로토타입 매니저"""
    
    def __init__(self):
        self._prototypes: dict[str, T] = {}
    
    def register_prototype(self, key: str, prototype: T) -> None:
        self._prototypes[key] = prototype
    
    def get_prototype(self, key: str) -> T:
        if key in self._prototypes:
            return self._prototypes[key].clone()
        raise KeyError(f"Prototype '{key}' not found")
```

### 3. 성능 측정 유틸리티

```python
import time
import functools

def measure_clone_performance(func):
    """복사 성능 측정 데코레이터"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.6f} seconds")
        return result
    return wrapper

class PerformanceTestPrototype(Prototype):
    """성능 테스트용 프로토타입"""
    
    def __init__(self, size=1000):
        self.data = list(range(size))
        self.metadata = {"size": size, "type": "test"}
    
    @measure_clone_performance
    def shallow_clone(self):
        return copy.copy(self)
    
    @measure_clone_performance
    def deep_clone(self):
        return copy.deepcopy(self)
    
    def clone(self):
        return self.deep_clone()
    
    def display(self):
        print(f"PerformanceTest: {len(self.data)} items, {self.metadata}")
```

## 관련 노트
- [[03. Permanent Notes/📝 얕은 복사와 깊은 복사|📝 얕은 복사와 깊은 복사]]
- [[06. Code Notes/Area/Java/⌨️ Java 프로토타입 패턴 구현|⌨️ Java 프로토타입 패턴 구현]]
- [[02. MOC/🏛️ 프로토타입 패턴|🏛️ 프로토타입 패턴]] - 상위 MOC 