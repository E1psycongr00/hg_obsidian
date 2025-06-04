---
tags: 
aliases: 
title: 📚 Oracle JDK 11 공식 문서
note-type: REF
created: 2025-01-04
from: Web
---

### 출처

- [JDK 11 Release Notes](https://www.oracle.com/java/technologies/javase/11-relnotes.html
- [JDK 11 Migration Guide](https://docs.oracle.com/en/java/javase/11/migrate/index.html)
- [OpenJDK 11 Release Notes](https://openjdk.java.net/projects/jdk/11/)

### 요약

#### LTS 버전으로서의 중요성

JDK 11은 2018년 9월에 출시된 두 번째 LTS(Long Term Support) 버전으로, JDK 8 이후 3년 만에 나온 장기 지원 버전이다. Oracle의 새로운 6개월 릴리즈 주기에서 첫 번째 LTS 버전이며, 2026년까지 상업적 지원이 제공된다. 많은 기업들이 JDK 8에서 JDK 11로 마이그레이션하는 주요 대상 버전이다.

#### 주요 언어 및 API 개선사항

JDK 11에서는 var 키워드가 람다 매개변수에서도 사용 가능해졌으며, String 클래스에 여러 유용한 메서드들이 추가되었다. `isBlank()`, `lines()`, `strip()`, `stripLeading()`, `stripTrailing()`, `repeat()` 등의 메서드가 문자열 처리를 더욱 편리하게 만들어준다. Files 클래스에도 `readString()`, `writeString()` 메서드가 추가되어 파일 I/O가 간소화되었다.

#### HTTP 클라이언트 API 정식 도입

JDK 9에서 인큐베이터 모듈로 도입되었던 HTTP 클라이언트 API가 `java.net.http` 패키지로 정식 포함되었다. 이는 HTTP/1.1과 HTTP/2를 모두 지원하며, 동기/비동기 요청 처리가 가능하다. WebSocket 지원도 포함되어 있어 현대적인 웹 애플리케이션 개발에 필수적인 기능을 제공한다.

#### 모듈 시스템 안정화

JDK 9에서 도입된 모듈 시스템(Project Jigsaw)이 JDK 11에서 더욱 안정화되었다. 여러 모듈 관련 버그가 수정되었고, 모듈 경로와 클래스 경로 간의 상호 운용성이 개선되었다. 또한 단일 파일 소스 코드 프로그램을 직접 실행할 수 있는 기능이 추가되어 스크립팅 용도로도 활용 가능해졌다.

#### 성능 및 가비지 컬렉션 개선

ZGC(Z Garbage Collector)가 실험적 기능으로 도입되어 매우 낮은 지연 시간을 제공한다. Epsilon GC도 추가되어 메모리 할당만 수행하고 수집은 하지 않는 특수한 용도로 사용할 수 있다. 또한 애플리케이션 클래스 데이터 공유(Application Class-Data Sharing)가 개선되어 시작 시간과 메모리 사용량이 최적화되었다.

#### 제거된 기능들

JDK 11에서는 여러 기능들이 제거되었다. Java EE와 CORBA 모듈들이 완전히 제거되었고, JavaFX도 별도 모듈로 분리되었다. Nashorn JavaScript 엔진은 deprecated 되었으며, Applet API도 deprecated 상태가 되었다. 이러한 변경사항들은 마이그레이션 시 주의 깊게 고려해야 할 부분이다.

### 코멘트

> [!important] JDK 8에서 JDK 11로의 마이그레이션
> JDK 11은 JDK 8 사용자들이 가장 많이 고려하는 마이그레이션 대상이다. 새로운 6개월 릴리즈 주기에서 첫 번째 LTS 버전이므로, 안정성과 장기 지원을 원하는 기업들에게 적합하다. 하지만 제거된 기능들과 모듈 시스템 도입으로 인한 호환성 이슈를 사전에 검토해야 한다.

JDK 11은 현대적인 자바 개발의 기준점이 되는 버전으로, HTTP 클라이언트 API와 향상된 문자열 처리 기능 등이 개발 생산성을 크게 향상시킨다. 특히 var 키워드의 확장과 단일 파일 실행 기능은 자바를 더욱 간결하고 사용하기 쉬운 언어로 만들어준다. 