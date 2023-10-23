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

### Record compact 생성자

record 콤팩트 생성자를 이용하면 생성자 인자를 넣지 않고 쉽게 생성자의 validation을 구현할 수 있다.

```java
public record Person(String name, int age) {  
  
    public Person {  
       if (age < 0) {  
          throw new IllegalArgumentException("나이는 0보다 작을 수 없습니다.");  
       }  
       if (name == null) {  
          throw new IllegalArgumentException("이름은 null일 수 없습니다.");  
       }  
    }  
}
```

호출 순서는 컴팩트 생성자 호출 이후, 변수 초기화 작업을 수행한다. 위의 코드는 다음과 같다.



### 게어 비어만의 컴팩트 생성자 의도



## 질문 & 확장

(없음)

## 출처(링크)
- https://blog.hexabrain.net/399#%EC%BB%B4%ED%8C%A9%ED%8A%B8-%EC%83%9D%EC%84%B1%EC%9E%90compact-constructor

## 연결 노트










