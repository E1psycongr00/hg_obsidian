작성 날짜: 2023-11-06
작성 시간: 16:45

## 주제: #미완 #IT #JAVA 

----
## 원문

### HttpHandler란

**com.sun.net.httpserver** 패키지에 위치한다.

> A handler which is invoked to process HTTP exchanges. Each HTTP exchange is handled by one of these handlers.
> 

Http 교환시 일어나는 과정을 처리하기 위해 존재하는 핸들러이다. 인터페이스로 이루어져있다. 
이 때 인자로 HttpExchange 타입을 인자로 받는다.

```java
public interface HttpHandler {  
     public abstract void handle (HttpExchange exchange) throws IOException;  
}
```

### HttpExchange
> This class encapsulates a HTTP request received and a response to be generated in one exchange. It provides methods for examining the request from the client, and for building and sending the response.

이 클래스는 수신된 HTTP 요청과 한 번의 교환으로 생성될 응답을 캡슐화한다. 클라이언트의 요청을 검사하고 응답을 작성 및 보내는 방법을 제공한다.

**HttpExchange가 제공하는 메서드**

- getRequestMethod(): requestMethod를 string 타입으로 가져옴
- getRequestHeaders() 사용하여 요청 헤더를 검사합니다(필요한 경우).
- getRequestBody() 요청 본문을 읽기 위한 InputStream 반환합니다. 요청 본문을 읽은 후 스트림을 닫아야 합니다.
- getResponseHeaders() 콘텐츠 길이를 제외한 모든 응답 헤더를 설정하기위한 Headers를 가져옴
- sendResponseHeaders(int, long) 사용하여 응답 헤더를 보냅니다. 다음 단계 전에 호출해야 합니다.
- getResponseBody() 사용하여 OutputStream 가져와서 응답 본문을 보냅니다. 응답 본문이 작성되면 교환을 종료하려면 스트림을 닫아야 합니다.

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










