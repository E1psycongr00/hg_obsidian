작성 날짜: 2023-11-06
작성 시간: 16:45

## 주제: #미완 #IT #JAVA 

----
## 원문

### HttpServer란
**com.sun.net.httpserver** 패키지에서 제공하는 클래스이다. 자세한 설명은 javadocs에 다음과 같이 적혀있다.

> This class implements a simple HTTP server. **A HttpServer is bound to an IP address and port number and listens for incoming TCP connections from clients on this address.** The sub-class HttpsServer implements a server which handles HTTPS requests.

핵심은 HttpServer는 IP 주소와 포트 번호로 바인딩되어 있고(묶여 있음) 클라이언트로부터 들어오는 TCP 연결을 수신한다고 볼 수 있다.

### HttpServer 사용법

> **One or more HttpHandler objects must be associated with a server in order to process requests.** Each such HttpHandler is registered with a root URI path which represents the location of the application or service on this server. The mapping of a handler to a HttpServer is encapsulated by a HttpContext object. **HttpContexts are created by calling createContext(String, HttpHandler)**. **Any request for which no handler can be found is rejected with a 404 response.** Management of threads can be done external to this object by providing a Executor object. If none is provided a default implementation is used.

특정 요청에 대해서 처리하려면 HttpHandler를 서버와 연결해야 한다.  createContext(String, HttpHandler) 메서드를 사용해서 경로와 요청을 처리하는 로직을 담당하는 Handler와 server를 uri 경로와 함께 연결할 수 있다.


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










