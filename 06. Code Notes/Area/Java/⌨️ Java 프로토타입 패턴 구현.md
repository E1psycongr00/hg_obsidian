---
tags: 
  - 디자인패턴
  - 프로토타입패턴
  - Java
  - Cloneable
  - 객체복사
aliases: []
created: 2025-06-09
title: ⌨️ Java 프로토타입 패턴 구현
note-type: CODE
language: "java"
environment: "JDK 8+"
---

# ⌨️ Java 프로토타입 패턴 구현

## 기본 구현: Cloneable 인터페이스

### 1. 프로토타입 인터페이스 정의

```java
// 프로토타입 인터페이스
public interface Prototype extends Cloneable {
    Prototype clone() throws CloneNotSupportedException;
    void display();
}
```

### 2. 구체적 프로토타입 구현

```java
// 구체적 프로토타입 - 도형 클래스
public class Shape implements Prototype {
    private String type;
    private String color;
    private int x, y;
    
    public Shape(String type, String color, int x, int y) {
        this.type = type;
        this.color = color;
        this.x = x;
        this.y = y;
    }
    
    // 얕은 복사 구현
    @Override
    public Prototype clone() throws CloneNotSupportedException {
        return (Shape) super.clone();
    }
    
    @Override
    public void display() {
        System.out.println("Shape: " + type + ", Color: " + color + 
                          ", Position: (" + x + ", " + y + ")");
    }
    
    // Getters and Setters
    public void setPosition(int x, int y) {
        this.x = x;
        this.y = y;
    }
    
    public String getType() { return type; }
    public String getColor() { return color; }
}
```

## 깊은 복사 구현

### 복잡한 객체의 깊은 복사

```java
// 주소 클래스 (참조 타입)
public class Address implements Cloneable {
    private String street;
    private String city;
    private String zipCode;
    
    public Address(String street, String city, String zipCode) {
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }
    
    @Override
    public Address clone() throws CloneNotSupportedException {
        return (Address) super.clone();
    }
    
    // Getters and Setters
    public void setCity(String city) { this.city = city; }
    public String getCity() { return city; }
    
    @Override
    public String toString() {
        return street + ", " + city + " " + zipCode;
    }
}

// 사람 클래스 (깊은 복사 구현)
public class Person implements Prototype {
    private String name;
    private int age;
    private Address address;  // 참조 타입
    private List<String> hobbies;  // 컬렉션
    
    public Person(String name, int age, Address address) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.hobbies = new ArrayList<>();
    }
    
    // 깊은 복사 구현
    @Override
    public Person clone() throws CloneNotSupportedException {
        Person cloned = (Person) super.clone();
        
        // 참조 타입 필드들을 새로 생성
        cloned.address = this.address.clone();
        cloned.hobbies = new ArrayList<>(this.hobbies);
        
        return cloned;
    }
    
    @Override
    public void display() {
        System.out.println("Person: " + name + ", Age: " + age + 
                          ", Address: " + address + 
                          ", Hobbies: " + hobbies);
    }
    
    public void addHobby(String hobby) {
        hobbies.add(hobby);
    }
    
    public Address getAddress() { return address; }
}
```

## 프로토타입 매니저 패턴

### 프로토타입 레지스트리

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
}
```

## 실사용 예제

### 클라이언트 코드

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

## 성능 최적화 기법

### 1. 복사 생성자 활용

```java
public class OptimizedShape implements Prototype {
    private String type;
    private String color;
    private int x, y;
    
    // 기본 생성자
    public OptimizedShape(String type, String color, int x, int y) {
        this.type = type;
        this.color = color;
        this.x = x;
        this.y = y;
    }
    
    // 복사 생성자 (clone() 대신 사용)
    public OptimizedShape(OptimizedShape other) {
        this.type = other.type;
        this.color = other.color;
        this.x = other.x;
        this.y = other.y;
    }
    
    @Override
    public OptimizedShape clone() {
        return new OptimizedShape(this);  // 복사 생성자 활용
    }
    
    @Override
    public void display() {
        System.out.println("OptimizedShape: " + type + ", " + color + 
                          " at (" + x + ", " + y + ")");
    }
}
```

### 2. 선택적 깊은 복사

```java
public class SelectiveClonePerson implements Prototype {
    private String name;
    private Address address;
    private List<String> hobbies;
    
    // 선택적 복사 메소드
    public SelectiveClonePerson clone(boolean deepCopyAddress, boolean deepCopyHobbies) 
            throws CloneNotSupportedException {
        SelectiveClonePerson cloned = (SelectiveClonePerson) super.clone();
        
        if (deepCopyAddress) {
            cloned.address = this.address.clone();
        }
        
        if (deepCopyHobbies) {
            cloned.hobbies = new ArrayList<>(this.hobbies);
        }
        
        return cloned;
    }
    
    @Override
    public SelectiveClonePerson clone() throws CloneNotSupportedException {
        return clone(true, true);  // 기본적으로 모든 것을 깊은 복사
    }
}
```

## 주의사항 및 베스트 프랙티스

### 1. CloneNotSupportedException 처리

```java
public class SafeCloneExample {
    public static <T extends Prototype> T safeClone(T prototype) {
        try {
            return (T) prototype.clone();
        } catch (CloneNotSupportedException e) {
            throw new RuntimeException("Clone not supported", e);
        }
    }
}
```

### 2. 순환 참조 처리

```java
public class CircularReferenceHandler {
    private Map<Object, Object> cloneMap = new HashMap<>();
    
    public Object deepClone(Object obj) throws CloneNotSupportedException {
        if (cloneMap.containsKey(obj)) {
            return cloneMap.get(obj);  // 이미 복제된 객체 반환
        }
        
        Object cloned = ((Prototype) obj).clone();
        cloneMap.put(obj, cloned);
        return cloned;
    }
}
```

## 관련 노트
- [[03. Permanent Notes/📝 얕은 복사와 깊은 복사|📝 얕은 복사와 깊은 복사]]
- [[03. Permanent Notes/📝 프로토타입 패턴의 구조와 참여자|📝 프로토타입 패턴의 구조와 참여자]]
- [[02. MOC/🏛️ 프로토타입 패턴|🏛️ 프로토타입 패턴]] - 상위 MOC 