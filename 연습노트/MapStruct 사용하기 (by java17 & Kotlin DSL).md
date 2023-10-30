
작성 날짜: 2023-10-26
작성 시간: 22:29

## 주제: #미완

----
## 원문

MapStruct 1.5.5 Final을 기준으로 사용 방법을 알아보자


### MapStruct를 사용하는 이유

비즈니스 로직을 짜다 보면 특정 data class가 필요한 경우가 생길 수 있다. 예를 들면 MVC 패턴으로 코드를 짤 때 컨트롤러에서는 DTO를 사용한다. 단순 데이터를 전달하는 목적으로 사용하므로, 만약 domain 영역에서 사용하려면 dto가 아닌 엔티티도 변환해야 할 일이 생긴다. dto는 보통 프로젝션 목적으로 많이 사용하는 데 매 번 이렇게 변환하고 검증하는 것은 피곤한 일이다. 이런 문제를 Mapstruct를 활용해 해결할 수 있다.

### build.gradle
```kotlin
dependencies {
	implementation("org.mapstruct:mapstruct:1.5.5.Final")
	annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")
}
```


💡 **롬복을 사용하는 경우 롬복 의존성을 mapstruct보다 위에 배치해줘야한다.**
### Mapper 활용하기

가장 기본적인 사용법은 다음과 같다.

```java
@Builder  
public record HelloDto(@NotNull String name, @PositiveOrZero int age, @Size(min = 5, max = 10) String message) {  
}
```

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

```java
@Mapper  
public interface HelloMapper {  
  
    HelloMapper INSTANCE = Mappers.getMapper(HelloMapper.class);  
  
    HelloDto helloToHelloDto(Hello hello);  
  
    Hello helloDtoToHello(HelloDto helloDto);  
}
```



## 질문 & 확장

(없음)

## 출처(링크)
- https://mapstruct.org/documentation/installation/
- https://mapstruct.org/documentation/stable/reference/html/#basic-mappings

## 연결 노트










