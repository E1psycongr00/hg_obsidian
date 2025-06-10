---
tags:
  - JAVA
aliases: 
title: JDK 11 주요 특징 및 패치 분석
note-type: COMMON
created: 2025-01-04
completed: true
---

### JDK 11 주요 변경 사항 요약

| 기능 분야        | 주요 변경 사항                                  | 개발자 관점 핵심                                                                 |
| ---------------- | ----------------------------------------------- | ------------------------------------------------------------------------------ |
| **언어/API**     | `var` 키워드 확장 (람다 파라미터)                 | 람다 표현식의 가독성 및 어노테이션 사용 편의성 증대                                     |
|                  | `String` 클래스 유틸리티 메서드 추가              | `isBlank()`, `lines()`, `strip()`, `repeat()` 등으로 문자열 처리 간소화 및 효율 증대        |
|                  | HTTP 클라이언트 API 정식 도입 (`java.net.http`) | HTTP/1.1, HTTP/2, WebSocket 지원, 동기/비동기 처리 가능한 현대적 HTTP 클라이언트 제공        |
|                  | 단일 파일 소스 코드 실행                        | 컴파일 없이 `java` 명령으로 `.java` 파일 바로 실행 가능 (스크립팅, 간단 테스트 용이)          |
|                  | 파일 I/O 개선 (`Files.readString/writeString`)  | 텍스트 파일 읽기/쓰기 간결화로 개발 생산성 향상                                       |
| **보안**         | TLS 1.3 기본 지원                               | 네트워크 통신 보안 강화 및 성능 향상                                                |
|                  | ChaCha20, Poly1305 암호화 알고리즘 추가         | 다양한 최신 암호화 옵션 제공                                                       |
| **성능**         | ZGC (Z Garbage Collector) 실험적 도입           | 매우 낮은 지연 시간(10ms 미만 목표)을 제공하는 확장 가능한 GC (대용량 힙에 적합)             |
|                  | Epsilon GC (No-Op GC) 실험적 도입               | GC 없이 메모리 할당만 수행 (특수 성능 테스트 용도)                                     |
|                  | Application Class-Data Sharing (AppCDS) 개선    | 애플리케이션 시작 시간 단축 및 메모리 사용량 최적화                                       |
| **제거/변경**    | Java EE 및 CORBA 모듈 제거                      | `javax.xml.bind`, `javax.xml.ws` 등 사용 시 별도 라이브러리 추가 필요                      |
|                  | JavaFX JDK에서 분리                             | 별도 모듈로 제공, 필요시 별도 설치                                                    |
|                  | Nashorn JavaScript 엔진 Deprecated              | 향후 제거 예정, 대안 검토 필요                                                      |

### 버전 개요

JDK 11은 2018년 9월에 출시된 Oracle의 두 번째 LTS(Long Term Support) 버전으로, JDK 8 이후 3년 만에 나온 장기 지원 버전이다. Oracle의 새로운 6개월 릴리즈 주기 정책에서 첫 번째 LTS 버전이며, 2026년까지 상업적 지원이 제공된다. 많은 기업들이 JDK 8에서 마이그레이션하는 주요 대상 버전으로, 현대적인 자바 개발의 기준점이 되고 있다.

### 개발자 관점의 주요 기능 심층 분석

#### HTTP 클라이언트 API 정식 도입: 현대적 웹 통신 지원

JDK 9부터 인큐베이팅 과정을 거친 HTTP 클라이언트 API가 `java.net.http` 패키지로 정식 포함되었다. 이는 기존 `HttpURLConnection`의 단점을 개선하고 최신 웹 환경에 필요한 기능을 제공한다.

*   **핵심 이점**: HTTP/1.1 및 HTTP/2 프로토콜을 모두 지원하며, 동기 및 비동기 방식의 요청 처리가 가능하다. WebSocket도 지원하여 실시간 양방향 통신 애플리케이션 개발이 용이해졌다. Fluent API 스타일로 사용 편의성이 높다.
*   **개발자 영향**: 기존 `HttpURLConnection` 대비 더 직관적이고 유연한 코드로 HTTP 통신 로직을 작성할 수 있으며, HTTP/2 지원으로 성능 개선 효과도 기대할 수 있다.

```java
// JDK 11 HTTP Client 예시 (비동기 GET 요청)
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://openjdk.java.net/"))
        .build();

CompletableFuture<HttpResponse<String>> responseFuture =
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

responseFuture.thenApply(HttpResponse::body)
        .thenAccept(System.out::println)
        .join();
```

#### `var` 키워드 확장 및 새로운 `String` 메서드: 개발 편의성 향상

지역 변수 타입 추론을 위한 `var` 키워드가 람다 표현식의 매개변수에도 사용 가능해져, 매개변수에 어노테이션을 붙일 때 유용하다. 또한 `String` 클래스에 `isBlank()`, `lines()`, `strip()`, `repeat()` 등 실용적인 메서드들이 추가되어 문자열 조작 코드가 훨씬 간결해졌다.

*   **개발자 영향**: 반복적인 타입 선언을 줄이고, 문자열 관련 일반적인 작업을 표준 API로 처리할 수 있어 코드 가독성과 생산성이 향상된다.

#### 단일 파일 소스 코드 실행: 스크립팅 및 교육용으로 유용

단일 `.java` 파일로 구성된 소스 코드를 별도의 컴파일 과정 없이 `java MyProgram.java` 명령으로 바로 실행할 수 있게 되었다. 이는 간단한 유틸리티 작성이나 학습 과정에서 자바를 처음 접하는 이들에게 편의성을 제공한다.

*   **활용 방안**: 간단한 스크립트 작성, 알고리즘 문제 풀이, 교육 자료 작성 시 유용하게 활용될 수 있다.

#### ZGC (Z Garbage Collector) 실험적 도입: 낮은 지연 시간 목표

ZGC는 수백 GB에서 수 TB에 이르는 대용량 힙에서도 매우 짧은 GC 일시정지 시간(10ms 미만 목표)을 제공하도록 설계된, 확장 가능하고 지연 시간이 낮은 가비지 컬렉터다. JDK 11에서는 실험적으로 도입되었다.

*   **주요 특징**: 힙 크기에 관계없이 일정한 일시정지 시간을 제공하며, NUMA-aware하고 동시(Concurrent) 작업 위주로 설계되었다. 애플리케이션 스레드 실행 중에 대부분의 GC 작업을 수행한다.
*   **적용 고려**: 매우 낮은 응답 시간을 요구하는 대규모 서비스에 적합하지만, JDK 11에서는 실험적 기능이므로 운영 환경 적용 시 충분한 테스트가 필요하다.

### 호환성 및 마이그레이션 주의사항

JDK 11로 마이그레이션 시 가장 큰 변화는 Java EE 및 CORBA 모듈의 제거와 JavaFX의 분리이다. `javax.xml.bind` (JAXB), `javax.xml.ws` (JAX-WS) 등 기존 Java EE API를 사용하던 애플리케이션은 `pom.xml`이나 `build.gradle`에 해당 라이브러리 의존성을 명시적으로 추가해야 한다. Nashorn JavaScript 엔진도 deprecated 되었으므로 향후 제거에 대비해야 한다.

> [!warning] 마이그레이션 주의사항
> JDK 8에서 JDK 11로 마이그레이션할 때는 제거된 Java EE 모듈들과 JavaFX 분리에 특히 주의해야 한다. 또한 모듈 시스템으로 인한 접근성 변경사항도 사전에 검토해야 한다. `sun.misc.Unsafe`와 같은 내부 API 사용은 지양하고 표준 API로 대체하는 것이 좋다.

### 질문 & 확장

- JDK 11의 HTTP 클라이언트 API와 Apache HttpClient, OkHttp 등 서드파티 라이브러리와의 성능 및 기능 비교는?
- ZGC가 JDK 11 (실험적) 대비 이후 LTS 버전에서 어떻게 발전했는가?
- Java EE 모듈 제거에 따른 애플리케이션 마이그레이션 시 구체적인 의존성 관리 전략은?
- 단일 파일 실행 기능이 자바 생태계에 미친 영향은?

### 관련 노트

- [[05. Reference Notes/Area/Web/📚 Oracle JDK 11 공식 문서]] - 공식 문서 참조
- [[03. Permanent Notes/Area/JDK 8 주요 특징 및 패치 분석|JDK 8 주요 특징 및 패치 분석]] - 이전 LTS 버전과의 비교
- [[자바 버전 간 마이그레이션 가이드]] - 마이그레이션 전략 