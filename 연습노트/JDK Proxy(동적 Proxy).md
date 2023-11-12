작성 날짜: 2023-10-26
작성 시간: 22:22

## 주제: #미완 #IT #JAVA 

----
## 원문

### 정적 프록시의 단점

프록시 패턴을 설계해보면 알지만 귀찮은 점이 첫번쨰이고, 사실 프록시는 프레임워크에서 lazy loading 또는 객체를 래핑해서 객체의 기능은 보존하고 부가적인 기능을 지원하기 위해 많이 사용한다. 그런데 정적 프록시만으로는 이러한 요구사항에 한계점이 있기 떄문에 동적 프록시가 필요하다.

### 프록시 종류

- JDK Dynamic Proxy
	- 인터페이스 기반
- CGLib
	- 클래스 기반

### JDK 프록시 사용법

JDK 프록시는 자바의 Reflection 패키지에 포함되어 있다. 사용하기 위해서는 InvocationHandler를 작성해야 한다.

```java
```java
@Slf4j
public class TransactionInvocationHandler implements InvocationHandler {

    private final Object target;

    public TransactionInvocationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        log.info("InvocationHandler parameter: proxy={}, method={}, args={}", proxy, method, args);

        try {
            log.info("--- 트랜잭션 커밋 시작 ---");

            Object result = method.invoke(target, args);

            log.info("--- 트랜잭션 커밋 완료 ---");
            return result;
        } catch (Exception e) {
            log.info("--- 트랜잭션 롤백 ---");
            throw e;
        } finally {
            log.info("--- DB 커넥션 자원 반환 ---");
        }
    }
}
```



## 질문 & 확장


## 출처(링크)
- https://velog.io/@codemcd/%EB%8F%99%EC%A0%81-%ED%94%84%EB%A1%9D%EC%8B%9CDynamic-Proxy-with-Spring
- https://velog.io/@newtownboy/%EB%94%94%EC%9E%90%EC%9D%B8%ED%8C%A8%ED%84%B4-%ED%94%84%EB%A1%9D%EC%8B%9C%ED%8C%A8%ED%84%B4Proxy-Pattern

## 연결 노트

- [[프록시 패턴이란]]









