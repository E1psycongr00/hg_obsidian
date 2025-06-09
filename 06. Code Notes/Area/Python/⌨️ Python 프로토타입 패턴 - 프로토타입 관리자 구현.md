---
tags: 
  - 디자인패턴
  - 프로토타입패턴
  - Python
  - 프로토타입매니저
  - 레지스트리패턴
aliases: []
created: 2025-06-09
title: ⌨️ Python 프로토타입 패턴 - 프로토타입 관리자 구현
note-type: CODE
language: "python"
environment: "Python 3.6+"
---

# ⌨️ Python 프로토타입 패턴 - 프로토타입 관리자 구현

## 프로토타입 매니저 (레지스트리) 패턴

프로토타입들을 중앙에서 관리하고 필요할 때 복제하여 제공하는 매니저 클래스이다.

### PrototypeManager 구현

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
    
    def get_prototype_count(self):
        """등록된 프로토타입 개수"""
        return len(self._prototypes)
    
    def has_prototype(self, key):
        """프로토타입 존재 여부 확인"""
        return key in self._prototypes
```

## 실사용 예제

### 완전한 클라이언트 코드

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
    
    # 사람 복제 데모
    demonstrate_person_cloning(manager)

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
    """사람 복제 데모"""
    print("=== Person Cloning Demo ===")
    
    # 사람 프로토타입 복제
    person1 = manager.get_prototype("person")
    person1.name = "Alice"
    person1.add_hobby("Reading")
    person1.address.city = "Busan"
    
    person2 = manager.get_prototype("person")
    person2.name = "Bob"
    person2.add_hobby("Gaming")
    # person2의 주소는 여전히 "Seoul" (깊은 복사)
    
    person1.display()
    person2.display()

if __name__ == "__main__":
    demonstrate_prototype_pattern()
```

## 고급 프로토타입 매니저

### 타입 안전성을 보장하는 제네릭 매니저

```python
from typing import TypeVar, Generic, Dict

T = TypeVar('T', bound='Prototype')

class TypeSafePrototypeManager(Generic[T]):
    """타입 안전한 프로토타입 매니저"""
    
    def __init__(self):
        self._prototypes: Dict[str, T] = {}
    
    def register_prototype(self, key: str, prototype: T) -> None:
        self._prototypes[key] = prototype
    
    def get_prototype(self, key: str) -> T:
        if key in self._prototypes:
            return self._prototypes[key].clone()
        raise KeyError(f"Prototype '{key}' not found")
    
    def has_prototype(self, key: str) -> bool:
        return key in self._prototypes
    
    def clear_all(self) -> None:
        self._prototypes.clear()
    
    def get_all_keys(self) -> list[str]:
        return list(self._prototypes.keys())
```

### 프로토타입 팩토리 패턴

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

### 팩토리 사용 예제

```python
def demonstrate_prototype_factory():
    """프로토타입 팩토리 데모"""
    print("=== Prototype Factory Demo ===")
    
    # 팩토리를 통한 도형 생성
    circle = PrototypeFactory.create_shape("circle", "Red")
    rectangle = PrototypeFactory.create_shape("rectangle", "Blue")
    
    circle.set_position(5, 10)
    rectangle.set_position(15, 25)
    
    circle.display()
    rectangle.display()
    
    # 팩토리를 통한 사람 생성
    student = PrototypeFactory.create_person("student")
    worker = PrototypeFactory.create_person("worker")
    
    student.name = "John"
    student.add_hobby("Study")
    
    worker.name = "Jane"
    worker.add_hobby("Work")
    
    student.display()
    worker.display()

if __name__ == "__main__":
    demonstrate_prototype_factory()
```

## 성능 최적화 기법

### 메모이제이션을 활용한 복사 최적화

```python
class MemoizedPrototype:
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

### 지연 복제 (Lazy Cloning) 매니저

```python
class LazyPrototypeManager:
    """지연 복제를 지원하는 프로토타입 매니저"""
    
    def __init__(self):
        self._prototypes = {}
        self._clone_cache = {}
    
    def register_prototype(self, key, prototype):
        self._prototypes[key] = prototype
        # 캐시 무효화
        if key in self._clone_cache:
            del self._clone_cache[key]
    
    def get_prototype(self, key, use_cache=True):
        """캐시를 활용한 프로토타입 반환"""
        if not use_cache:
            return self._prototypes[key].clone()
        
        # 캐시에서 먼저 확인
        if key in self._clone_cache:
            return self._clone_cache[key].clone()
        
        # 원본에서 복제하여 캐시에 저장
        if key in self._prototypes:
            cached = self._prototypes[key].clone()
            self._clone_cache[key] = cached
            return cached.clone()
        
        raise KeyError(f"Prototype '{key}' not found")
    
    def clear_cache(self):
        """캐시 초기화"""
        self._clone_cache.clear()
    
    def get_cache_info(self):
        """캐시 정보 조회"""
        return {
            "cached_keys": list(self._clone_cache.keys()),
            "cache_size": len(self._clone_cache)
        }
```

## 고급 사용 예제

### 카테고리별 프로토타입 관리

```python
class CategorizedPrototypeManager:
    """카테고리별 프로토타입 매니저"""
    
    def __init__(self):
        self._categories = {}
    
    def register_prototype(self, category, key, prototype):
        """카테고리에 프로토타입 등록"""
        if category not in self._categories:
            self._categories[category] = {}
        self._categories[category][key] = prototype
    
    def get_prototype(self, category, key):
        """카테고리에서 프로토타입 가져오기"""
        if category in self._categories and key in self._categories[category]:
            return self._categories[category][key].clone()
        raise KeyError(f"Prototype not found: {category}.{key}")
    
    def get_categories(self):
        """카테고리 목록 조회"""
        return list(self._categories.keys())
    
    def get_prototypes_in_category(self, category):
        """특정 카테고리의 프로토타입 목록 조회"""
        if category in self._categories:
            return list(self._categories[category].keys())
        return []
    
    def list_all_prototypes(self):
        """모든 프로토타입 목록 출력"""
        for category, prototypes in self._categories.items():
            print(f"Category: {category}")
            for key in prototypes.keys():
                print(f"  - {key}")
```

### 카테고리별 매니저 사용 예제

```python
def demonstrate_categorized_manager():
    """카테고리별 매니저 데모"""
    print("=== Categorized Manager Demo ===")
    
    manager = CategorizedPrototypeManager()
    
    # 도형 카테고리
    manager.register_prototype("shapes", "circle", Shape("Circle", "Red"))
    manager.register_prototype("shapes", "rectangle", Shape("Rectangle", "Blue"))
    
    # 사람 카테고리
    address = Address("123 Main St", "Seoul", "12345")
    manager.register_prototype("people", "employee", Person("Employee Template", 25, address))
    manager.register_prototype("people", "customer", Person("Customer Template", 30, address))
    
    # 사용
    circle = manager.get_prototype("shapes", "circle")
    circle.set_position(50, 60)
    circle.display()
    
    employee = manager.get_prototype("people", "employee")
    employee.name = "Alice"
    employee.add_hobby("Coding")
    employee.display()
    
    # 카테고리 정보 출력
    print(f"Categories: {manager.get_categories()}")
    print(f"Shapes: {manager.get_prototypes_in_category('shapes')}")
    print(f"People: {manager.get_prototypes_in_category('people')}")

if __name__ == "__main__":
    demonstrate_categorized_manager()
```

>[!tip] 프로토타입 매니저의 장점
>- 프로토타입들을 중앙에서 체계적으로 관리할 수 있다
>- 런타임에 동적으로 프로토타입을 등록/제거할 수 있다
>- 클라이언트 코드가 구체적인 프로토타입 클래스를 알 필요가 없다
>- 카테고리별 관리로 대규모 시스템에서도 효율적으로 사용 가능하다

>[!note] Python의 특별한 장점
>- 딕셔너리를 활용한 간단하고 직관적인 구현
>- 타입 힌트를 통한 타입 안전성 보장
>- 데코레이터와 컨텍스트 매니저 활용 가능
>- 동적 타입 시스템의 유연성

>[!example] 실제 사용 시나리오
>- 게임에서 다양한 유닛/아이템 템플릿 관리
>- 웹 애플리케이션의 설정 템플릿 관리
>- 데이터 분석에서 차트/그래프 템플릿 관리
>- ML 모델의 하이퍼파라미터 템플릿 관리

## 관련 노트
- [[06. Code Notes/Area/Python/⌨️ Python 프로토타입 패턴 - 얕은 복사 구현|⌨️ Python 프로토타입 패턴 - 얕은 복사 구현]]
- [[06. Code Notes/Area/Python/⌨️ Python 프로토타입 패턴 - 깊은 복사 구현|⌨️ Python 프로토타입 패턴 - 깊은 복사 구현]]
- [[03. Permanent Notes/📝 프로토타입 패턴의 구조와 참여자|📝 프로토타입 패턴의 구조와 참여자]]
- [[02. MOC/🏛️ 프로토타입 패턴|🏛️ 프로토타입 패턴]] 