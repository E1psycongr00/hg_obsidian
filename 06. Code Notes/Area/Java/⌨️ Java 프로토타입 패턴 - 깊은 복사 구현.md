---
tags: 
  - 디자인패턴
  - 프로토타입패턴
  - Java
  - Cloneable
  - 깊은복사
aliases: []
created: 2025-06-09
title: ⌨️ Java 프로토타입 패턴 - 깊은 복사 구현
note-type: CODE
language: "java"
environment: "JDK 8+"
---

# ⌨️ Java 프로토타입 패턴 - 깊은 복사 구현

## 참조 타입 필드의 깊은 복사

참조 타입 필드를 포함한 복잡한 객체의 깊은 복사 구현 방법이다.

### Address 클래스 (참조 타입)

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
```

### Person 클래스 (깊은 복사 구현)

```java
import java.util.ArrayList;
import java.util.List;

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

## 사용 예제

### 깊은 복사 동작 확인

```java
public class DeepCopyDemo {
    public static void main(String[] args) {
        try {
            // 원본 객체 생성
            Address address = new Address("123 Main St", "Seoul", "12345");
            Person original = new Person("John", 25, address);
            original.addHobby("Reading");
            
            // 깊은 복사로 복제
            Person cloned = original.clone();
            cloned.addHobby("Gaming");
            cloned.getAddress().setCity("Busan");
            
            // 결과 확인 - 서로 독립적
            System.out.println("=== Original ===");
            original.display();  // Seoul, [Reading]
            
            System.out.println("=== Cloned ===");
            cloned.display();    // Busan, [Reading, Gaming]
            
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
    }
}
```

## 고급 기법: 선택적 깊은 복사

필요에 따라 일부 필드만 깊은 복사하는 방법이다.

```java
public class SelectiveClonePerson implements Prototype {
    private String name;
    private Address address;
    private List<String> hobbies;
    
    public SelectiveClonePerson(String name, Address address) {
        this.name = name;
        this.address = address;
        this.hobbies = new ArrayList<>();
    }
    
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
    
    @Override
    public void display() {
        System.out.println("SelectivePerson: " + name + 
                          ", Address: " + address + 
                          ", Hobbies: " + hobbies);
    }
    
    public void addHobby(String hobby) { hobbies.add(hobby); }
    public Address getAddress() { return address; }
}
```

## 순환 참조 처리

복잡한 객체 그래프에서 순환 참조를 안전하게 처리하는 방법이다.

```java
import java.util.HashMap;
import java.util.Map;

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
    
    public void clearCache() {
        cloneMap.clear();
    }
}
```

>[!warning] 깊은 복사 주의사항
>- 모든 참조 타입 필드가 `Cloneable`을 구현해야 한다
>- 순환 참조가 있는 경우 무한 루프에 빠질 수 있다
>- 성능 오버헤드가 얕은 복사보다 크다

>[!tip] 성능 최적화 팁
>선택적 깊은 복사를 사용하여 필요한 필드만 깊은 복사하면 성능을 개선할 수 있다.

## 관련 노트
- [[06. Code Notes/Area/Java/⌨️ Java 프로토타입 패턴 - 얕은 복사 구현|⌨️ Java 프로토타입 패턴 - 얕은 복사 구현]]
- [[06. Code Notes/Area/Java/⌨️ Java 프로토타입 패턴 - 프로토타입 관리자 구현|⌨️ Java 프로토타입 패턴 - 프로토타입 관리자 구현]]
- [[03. Permanent Notes/📝 얕은 복사와 깊은 복사|📝 얕은 복사와 깊은 복사]]
- [[02. MOC/🏛️ 프로토타입 패턴|🏛️ 프로토타입 패턴]] 