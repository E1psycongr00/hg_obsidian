---
tags: 
  - 디자인패턴
  - 프로토타입패턴
  - Java
  - 프로토타입매니저
  - 레지스트리패턴
aliases: []
created: 2025-06-09
title: ⌨️ Java 프로토타입 패턴 - 프로토타입 관리자 구현
note-type: CODE
language: "java"
environment: "JDK 8+"
---

# ⌨️ Java 프로토타입 패턴 - 프로토타입 관리자 구현

## 프로토타입 매니저 (레지스트리) 패턴

프로토타입들을 중앙에서 관리하고 필요할 때 복제하여 제공하는 매니저 클래스이다.

### PrototypeManager 구현

```java
import java.util.HashMap;
import java.util.Map;

// 프로토타입 매니저 (레지스트리)
public class PrototypeManager {
    private Map<String, Prototype> prototypes = new HashMap<>();
    
    // 프로토타입 등록
    public void registerPrototype(String key, Prototype prototype) {
        prototypes.put(key, prototype);
    }
    
    // 프로토타입 복제하여 반환
    public Prototype getPrototype(String key) throws CloneNotSupportedException {
        Prototype prototype = prototypes.get(key);
        if (prototype != null) {
            return prototype.clone();
        }
        throw new IllegalArgumentException("Prototype not found: " + key);
    }
    
    // 등록된 프로토타입 목록 조회
    public void listPrototypes() {
        System.out.println("Registered prototypes:");
        for (String key : prototypes.keySet()) {
            System.out.println("- " + key);
        }
    }
    
    // 프로토타입 제거
    public void removePrototype(String key) {
        prototypes.remove(key);
    }
    
    // 등록된 프로토타입 개수
    public int getPrototypeCount() {
        return prototypes.size();
    }
}
```

## 실사용 예제

### 완전한 클라이언트 코드

```java
public class PrototypePatternDemo {
    public static void main(String[] args) {
        try {
            // 프로토타입 매니저 생성
            PrototypeManager manager = new PrototypeManager();
            
            // 기본 프로토타입들 등록
            manager.registerPrototype("circle", 
                new Shape("Circle", "Red", 0, 0));
            manager.registerPrototype("rectangle", 
                new Shape("Rectangle", "Blue", 0, 0));
            
            Address defaultAddress = new Address("123 Main St", "Seoul", "12345");
            manager.registerPrototype("person", 
                new Person("Template", 0, defaultAddress));
            
            // 프로토타입 복제 및 사용
            demonstrateShapeCloning(manager);
            demonstratePersonCloning(manager);
            
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
    }
    
    private static void demonstrateShapeCloning(PrototypeManager manager) 
            throws CloneNotSupportedException {
        System.out.println("=== Shape Cloning Demo ===");
        
        // 원형 복제
        Shape circle1 = (Shape) manager.getPrototype("circle");
        circle1.setPosition(10, 20);
        
        Shape circle2 = (Shape) manager.getPrototype("circle");
        circle2.setPosition(30, 40);
        
        circle1.display();  // Circle at (10, 20)
        circle2.display();  // Circle at (30, 40)
    }
    
    private static void demonstratePersonCloning(PrototypeManager manager) 
            throws CloneNotSupportedException {
        System.out.println("\n=== Person Cloning Demo ===");
        
        // 사람 프로토타입 복제
        Person person1 = (Person) manager.getPrototype("person");
        person1.addHobby("Reading");
        person1.getAddress().setCity("Busan");
        
        Person person2 = (Person) manager.getPrototype("person");
        person2.addHobby("Gaming");
        // person2의 주소는 여전히 "Seoul" (깊은 복사)
        
        person1.display();
        person2.display();
    }
}
```

## 고급 프로토타입 매니저

### 타입 안전성을 보장하는 제네릭 매니저

```java
import java.util.HashMap;
import java.util.Map;

public class TypeSafePrototypeManager<T extends Prototype> {
    private Map<String, T> prototypes = new HashMap<>();
    
    public void registerPrototype(String key, T prototype) {
        prototypes.put(key, prototype);
    }
    
    @SuppressWarnings("unchecked")
    public T getPrototype(String key) throws CloneNotSupportedException {
        T prototype = prototypes.get(key);
        if (prototype != null) {
            return (T) prototype.clone();
        }
        throw new IllegalArgumentException("Prototype not found: " + key);
    }
    
    public boolean hasPrototype(String key) {
        return prototypes.containsKey(key);
    }
    
    public void clearAll() {
        prototypes.clear();
    }
}
```

### 카테고리별 프로토타입 매니저

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class CategorizedPrototypeManager {
    private Map<String, Map<String, Prototype>> categories = new HashMap<>();
    
    // 카테고리에 프로토타입 등록
    public void registerPrototype(String category, String key, Prototype prototype) {
        categories.computeIfAbsent(category, k -> new HashMap<>())
                  .put(key, prototype);
    }
    
    // 카테고리에서 프로토타입 가져오기
    public Prototype getPrototype(String category, String key) 
            throws CloneNotSupportedException {
        Map<String, Prototype> categoryMap = categories.get(category);
        if (categoryMap != null) {
            Prototype prototype = categoryMap.get(key);
            if (prototype != null) {
                return prototype.clone();
            }
        }
        throw new IllegalArgumentException(
            "Prototype not found: " + category + "." + key);
    }
    
    // 카테고리 목록 조회
    public Set<String> getCategories() {
        return categories.keySet();
    }
    
    // 특정 카테고리의 프로토타입 목록 조회
    public Set<String> getPrototypesInCategory(String category) {
        Map<String, Prototype> categoryMap = categories.get(category);
        return categoryMap != null ? categoryMap.keySet() : Set.of();
    }
}
```

## 사용 예제: 카테고리별 매니저

```java
public class CategorizedManagerDemo {
    public static void main(String[] args) {
        try {
            CategorizedPrototypeManager manager = new CategorizedPrototypeManager();
            
            // 도형 카테고리
            manager.registerPrototype("shapes", "circle", 
                new Shape("Circle", "Red", 0, 0));
            manager.registerPrototype("shapes", "rectangle", 
                new Shape("Rectangle", "Blue", 0, 0));
            
            // 사람 카테고리
            Address address = new Address("123 Main St", "Seoul", "12345");
            manager.registerPrototype("people", "employee", 
                new Person("Employee Template", 25, address));
            manager.registerPrototype("people", "customer", 
                new Person("Customer Template", 30, address));
            
            // 사용
            Shape circle = (Shape) manager.getPrototype("shapes", "circle");
            circle.setPosition(50, 60);
            circle.display();
            
            Person employee = (Person) manager.getPrototype("people", "employee");
            employee.addHobby("Coding");
            employee.display();
            
            // 카테고리 정보 출력
            System.out.println("Categories: " + manager.getCategories());
            System.out.println("Shapes: " + manager.getPrototypesInCategory("shapes"));
            
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
    }
}
```

## 성능 최적화 기법

### 지연 복제 (Lazy Cloning)

```java
public class LazyPrototypeManager {
    private Map<String, Prototype> prototypes = new HashMap<>();
    private Map<String, Prototype> cloneCache = new HashMap<>();
    
    public void registerPrototype(String key, Prototype prototype) {
        prototypes.put(key, prototype);
        cloneCache.remove(key);  // 캐시 무효화
    }
    
    public Prototype getPrototype(String key) throws CloneNotSupportedException {
        // 캐시에서 먼저 확인
        if (cloneCache.containsKey(key)) {
            return cloneCache.get(key).clone();
        }
        
        // 원본에서 복제하여 캐시에 저장
        Prototype original = prototypes.get(key);
        if (original != null) {
            Prototype cached = original.clone();
            cloneCache.put(key, cached);
            return cached.clone();
        }
        
        throw new IllegalArgumentException("Prototype not found: " + key);
    }
    
    public void clearCache() {
        cloneCache.clear();
    }
}
```

>[!tip] 프로토타입 매니저의 장점
>- 프로토타입들을 중앙에서 관리할 수 있다
>- 런타임에 동적으로 프로토타입을 등록/제거할 수 있다
>- 클라이언트 코드가 구체적인 프로토타입 클래스를 알 필요가 없다

>[!note] 사용 시나리오
>- 게임에서 다양한 유닛/아이템 템플릿 관리
>- UI 컴포넌트의 기본 설정 템플릿 관리
>- 설정 파일이나 데이터베이스에서 프로토타입 정보를 로드하는 경우

## 관련 노트
- [[06. Code Notes/Area/Java/⌨️ Java 프로토타입 패턴 - 얕은 복사 구현|⌨️ Java 프로토타입 패턴 - 얕은 복사 구현]]
- [[06. Code Notes/Area/Java/⌨️ Java 프로토타입 패턴 - 깊은 복사 구현|⌨️ Java 프로토타입 패턴 - 깊은 복사 구현]]
- [[03. Permanent Notes/📝 프로토타입 패턴의 구조와 참여자|📝 프로토타입 패턴의 구조와 참여자]]
- [[02. MOC/🏛️ 프로토타입 패턴|🏛️ 프로토타입 패턴]] 