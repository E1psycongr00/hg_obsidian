작성 날짜: 2023-10-26
작성 시간: 17:07

## 주제: #미완 #IT #JAVA #JPA

----
## 원문

### Projection이란

프로젝션은 DB 테이블에서 원하는 데이터 컬럼만 조회하는 것을 의미한다. 

### 전체 컬럼에서 일부 속성만 쿼리하고 싶다

원하는 Projection을 만들기 위해서는 get필드명으로 작성하면 된다.

예를 들어 다음과 같은 엔티티가 있다고 가정하자

```java
@Entity  
@Table(name = "hello")  
@Getter  
@AllArgsConstructor(staticName = "of")  
@NoArgsConstructor(access = AccessLevel.PRIVATE)  
public class Hello {  
  
    @Id  
    @GeneratedValue(strategy = GenerationType.UUID)  
    @Column(name = "id", nullable = false)  
    private UUID id;  
  
    @Column(name = "name", nullable = false)  
    private String name;  
  
    @Column(name = "age", nullable = false)  
    private int age;  
  
    @Column(name = "message", nullable = false)  
    private String message;  
  
    @Builder()  
    public Hello(String name, int age, String message) {  
       this.name = name;  
       this.age = age;  
       this.message = message;  
    }  
}
```

그러면 id, name, age, message 이렇게 4개의 컬럼이 등록된다. 그러나 여기서 4개의 속성 중 일부의 속성만 가져오고 싶을 수 있다. 

실제 쿼리를 작성하거나, Projection 인터페이스를 활용해 데이터를 가져올 수 있다. 본 포스트에서는 Projection 인터페이스를 활용해 가져와 보자


### Closed Projection
지정된 요소만을 가져오고 싶을 때 사용 가능하다.

위의 예시의 경우에서 name과 age만을 projection해서 가져오고 싶다면 다음과 같이 작성할 수 있다.
```java
/**  
 * Projection for {@link com.example.restdocs.hello.domain.entity.Hello}  
 */
 public interface HelloInfo {  
    String getName();  
  
    int getAge();  
  
    String getMessage();  
}
```

Spring Data Jpa 문서에 따르면 중첩 interface를 통해 Projection을 표현할 수 있다고 한다.

```java
interface Person {
	String getName();
	int getAge();
	interface Address {
		String getStreetName;
		String getCity;
	}
}
```

### Interface로 data jpa repostory를 활용해 조회해본다면?

```java
public interface HelloInfo {  
    String getName();  
  
    int getAge();  
  
    String getMessage();  
}
```

위와 같은 Closed Projection을 만들고 적용해보자.

```java
Optional<HelloInfo> findHelloInfoByName(String name);
```



## 질문 & 확장

(없음)

## 출처(링크)
- https://velog.io/@pjh612/Spring-Data-JPA%EC%97%90%EC%84%9C%EC%9D%98-Projection-%EB%B0%A9%EB%B2%95
- https://velog.io/@max9106/JPA-Projection
## 연결 노트










