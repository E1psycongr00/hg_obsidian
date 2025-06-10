---
tags: 
  - 디자인패턴
  - 프로토타입패턴
  - Java
  - Cloneable
  - 얕은복사
aliases: []
created: 2025-06-09
title: ⌨️ Java 프로토타입 패턴 - 얕은 복사 구현
note-type: CODE
language: "java"
environment: "JDK 8+"
---

# ⌨️ Java 프로토타입 패턴 - 얕은 복사 구현

## 기본 프로토타입 인터페이스

Java의 `Cloneable` 인터페이스를 활용한 기본적인 프로토타입 패턴 구현이다.

```java
// 프로토타입 인터페이스
public interface Prototype extends Cloneable {
    Prototype clone() throws CloneNotSupportedException;
    void display();
}
```

## 얕은 복사 구현 예제

### Shape 클래스 구현

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

### 사용 예제

```java
public class ShallowCopyDemo {
    public static void main(String[] args) {
        try {
            // 원본 객체 생성
            Shape original = new Shape("Circle", "Red", 10, 20);
            
            // 얕은 복사로 복제
            Shape cloned = (Shape) original.clone();
            cloned.setPosition(30, 40);
            
            // 결과 확인
            original.display();  // Circle at (10, 20)
            cloned.display();    // Circle at (30, 40)
            
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
    }
}
```

## 성능 최적화: 복사 생성자 활용

`clone()` 메소드 대신 복사 생성자를 사용하면 더 안전하고 명확한 코드를 작성할 수 있다.

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

## 주의사항

### CloneNotSupportedException 처리

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

>[!note] 얕은 복사의 특징
>얕은 복사는 객체의 기본 타입 필드만 복사하고, 참조 타입 필드는 같은 객체를 가리킨다. 따라서 참조 타입 필드가 있는 복잡한 객체에서는 깊은 복사를 고려해야 한다.

## 관련 노트
- [[06. Code Notes/Area/Java/⌨️ Java 프로토타입 패턴 - 깊은 복사 구현|⌨️ Java 프로토타입 패턴 - 깊은 복사 구현]]
- [[03. Permanent Notes/Area/📝 얕은 복사와 깊은 복사|📝 얕은 복사와 깊은 복사]]
- [[02. MOC/🏛️ 프로토타입 패턴|🏛️ 프로토타입 패턴]] 