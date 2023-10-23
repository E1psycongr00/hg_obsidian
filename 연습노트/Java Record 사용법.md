작성 날짜: 2023-10-23
작성 시간: 12:01

## 주제: #미완

----
## 원문

### 기존 코드의 불편함

```java
public class Person {  
    private final String name;  
    private final int age;  
  
    public Person(String name, int age) {  
       this.name = name;  
       this.age = age;  
    }  
  
    public String getName() {  
       return this.name;  
    }  
  
    public int getAge() {  
       return this.age;  
    }  
  
    @Override  
    public boolean equals(Object o) {  
       if (this == o)  
          return true;  
       if (o == null || getClass() != o.getClass())  
          return false;  
       Person person = (Person)o;  
       return age == person.age && Objects.equals(name, person.name);  
    }  
  
    @Override  
    public int hashCode() {  
       return Objects.hash(name, age);  
    }  
  
    @Override  
    public String toString() {  
       return "Person{" +  
          "name='" + name + '\'' +  
          ", age=" + age +  
          '}';  
    }  
}
```

기존에 Person이라는 VO 객체를 만드려면 다음과 같이 보일러플레이트 코드가 많았다.
VO를 구현하기 위해서는 getter와 불변 속성, equals & hash를 구현해야 하기 때문이다.

이를 Record를 이용하면 간단하게 바꿀 수 있다.

```java
public record Person(String name, int age) {}
```

### Record constructor


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










