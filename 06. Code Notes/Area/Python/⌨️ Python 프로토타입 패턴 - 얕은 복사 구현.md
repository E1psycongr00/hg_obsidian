---
tags: 
  - 디자인패턴
  - 프로토타입패턴
  - Python
  - copy모듈
  - 얕은복사
aliases: []
created: 2025-06-09
title: ⌨️ Python 프로토타입 패턴 - 얕은 복사 구현
note-type: CODE
language: "python"
environment: "Python 3.6+"
---

# ⌨️ Python 프로토타입 패턴 - 얕은 복사 구현

## 기본 프로토타입 인터페이스

Python의 `copy` 모듈을 활용한 기본적인 프로토타입 패턴 구현이다.

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

## 얕은 복사 구현 예제

### Shape 클래스 구현

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

### 사용 예제

```python
def demonstrate_shallow_copy():
    """얕은 복사 데모"""
    print("=== Shallow Copy Demo ===")
    
    # 원본 객체 생성
    original = Shape("Circle", "Red", 10, 20)
    
    # 얕은 복사로 복제
    cloned = original.clone()
    cloned.set_position(30, 40)
    
    # 결과 확인
    original.display()  # Circle at (10, 20)
    cloned.display()    # Circle at (30, 40)

if __name__ == "__main__":
    demonstrate_shallow_copy()
```

## 커스텀 얕은 복사 구현

### __copy__ 메소드 오버라이드

```python
class CustomShallowShape(Prototype):
    """커스텀 얕은 복사 동작을 가진 도형 클래스"""
    
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
    
    def clone(self):
        return copy.copy(self)
    
    def display(self):
        print(f"CustomShape: {self.shape_type}, Color: {self.color}")
        print(f"Metadata: {self.metadata}")
        print(f"Created at: {self.creation_time}")
```

### 커스텀 복사 사용 예제

```python
def demonstrate_custom_shallow_copy():
    """커스텀 얕은 복사 데모"""
    print("=== Custom Shallow Copy Demo ===")
    
    # 원본 객체 생성
    original = CustomShallowShape("Triangle", "Green", {"version": 1.0})
    
    # 얕은 복사
    shallow_copy = original.clone()
    
    # 메타데이터 수정 (공유되므로 둘 다 영향받음)
    original.metadata["version"] = 2.0
    
    print("Original:")
    original.display()
    print("\nShallow Copy (shares metadata):")
    shallow_copy.display()

if __name__ == "__main__":
    demonstrate_custom_shallow_copy()
```

## 성능 측정 유틸리티

### 복사 성능 비교

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

class PerformanceTestShape(Prototype):
    """성능 테스트용 도형 클래스"""
    
    def __init__(self, shape_type, color, size=1000):
        self.shape_type = shape_type
        self.color = color
        self.data = list(range(size))  # 큰 데이터
        self.metadata = {"size": size, "type": "test"}
    
    @measure_clone_performance
    def shallow_clone(self):
        return copy.copy(self)
    
    def clone(self):
        return self.shallow_clone()
    
    def display(self):
        print(f"PerformanceShape: {self.shape_type}, {len(self.data)} items")
```

### 성능 테스트 실행

```python
def performance_test():
    """얕은 복사 성능 테스트"""
    print("=== Performance Test ===")
    
    # 큰 데이터를 가진 객체 생성
    large_shape = PerformanceTestShape("Circle", "Blue", 10000)
    
    # 얕은 복사 성능 측정
    cloned = large_shape.clone()
    
    print(f"Original data size: {len(large_shape.data)}")
    print(f"Cloned data size: {len(cloned.data)}")
    print(f"Data is shared: {large_shape.data is cloned.data}")

if __name__ == "__main__":
    performance_test()
```

>[!note] 얕은 복사의 특징
>- `copy.copy()`를 사용하여 객체의 최상위 레벨만 복사한다
>- 기본 타입 필드는 새로 복사되지만, 참조 타입 필드는 같은 객체를 가리킨다
>- 성능이 빠르지만 참조 타입 필드 수정 시 원본에도 영향을 줄 수 있다

>[!tip] Python의 장점
>- `copy` 모듈이 내장되어 있어 별도 구현이 불필요하다
>- `__copy__()` 메소드를 오버라이드하여 커스텀 복사 동작을 정의할 수 있다
>- 데코레이터를 활용한 성능 측정이 간편하다

## 관련 노트
- [[06. Code Notes/Area/Python/⌨️ Python 프로토타입 패턴 - 깊은 복사 구현|⌨️ Python 프로토타입 패턴 - 깊은 복사 구현]]
- [[03. Permanent Notes/Area/📝 얕은 복사와 깊은 복사|📝 얕은 복사와 깊은 복사]]
- [[02. MOC/🏛️ 프로토타입 패턴|🏛️ 프로토타입 패턴]] 