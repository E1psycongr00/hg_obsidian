작성 날짜: 2023-11-13
작성 시간: 16:07

## 주제: #미완

----
## 원문

Spring Jdbc를 사용하면 JdbcTemplate를 활용해 sql 쿼리를 실행 할 수 있다. 이 때 Java 객체 (DAO)와 매핑 할 수 있는 SqlMapper를 작성해야 하며, SQL문과 함께 요청하면 DB에 있는 데이터를 자바 객체에 담아 올 수 있다.


### Mapper 작성하기

```java
@Data  
public class Member {  
  
    private final Long id;  
    private final String name;  
    private final int age;  
  
}
```

다음과 같은 Member 객체가 있다고 가정하자. 

이 때 id, name, age에 DB 데이터를 전달하기 위해 다음과 같이 Mapper를 작성한다.

```java
public class MemberMapper implements RowMapper<Member>  {  
  
    @Override  
    public Member mapRow(ResultSet rs, int rowNum) throws SQLException {  
       return new Member(  
          rs.getLong("id"),  
          rs.getString("name"),  
          rs.getInt("age")  
       );  
    }  
}
```

### select 문

JdbcTemplate의 query 메서드를 활용한다. 


## 질문 & 확장

(없음)

## 출처(링크)
- https://gmlwjd9405.github.io/2018/12/19/jdbctemplate-usage.html

## 연결 노트










