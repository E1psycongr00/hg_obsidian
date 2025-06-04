---
title: "📚 Oracle JDK 8 공식 문서"
note-type: "REF"
created: "2025-01-04"
from: "Web"
---

### 출처

- [JDK 8 Update Release Notes](https://www.oracle.com/java/technologies/javase/8u-relnotes.html)
- [What's New in JDK 8](https://www.oracle.com/java/technologies/javase/8-whats-new.html)
- [JDK 8 Release Notes](https://www.oracle.com/java/technologies/javase/8-relnotes.html)
- [JDK 8 Adoption Guide](https://www.oracle.com/java/technologies/javase/8-adoption-guide.html)

### 요약

#### 주요 언어 기능

JDK 8은 자바 플랫폼의 주요 기능 릴리즈로, 람다 표현식(Lambda Expressions)이 가장 핵심적인 새 기능이다. 람다 표현식은 함수형 인터페이스의 인스턴스를 더 간결하게 표현할 수 있게 해주며, 메서드 참조(Method References)와 함께 코드의 가독성을 크게 향상시킨다.

#### 스트림 API와 컬렉션 개선

`java.util.stream` 패키지의 새로운 Stream API는 함수형 스타일의 연산을 지원하며, 컬렉션에서 순차적 또는 병렬 map-reduce 변환과 같은 대량 연산을 가능하게 한다. HashMap의 키 충돌 성능도 크게 개선되었다.

#### 보안 및 암호화 강화

클라이언트 측 TLS 1.2가 기본적으로 활성화되고, 패스워드 기반 암호화를 위한 더 강력한 알고리즘이 도입되었다. AES/GCM/NoPadding 암호 구현과 AEAD 모드 기반 암호 스위트가 지원된다.

#### 성능 및 메모리 개선

HotSpot VM에서 PermGen이 제거되어 메모리 관리가 개선되었고, Intel 하드웨어용 AES 하드웨어 인트린직이 추가되어 암호화 성능이 향상되었다. 병렬 배열 정렬과 Base64 인코딩/디코딩 표준 지원도 포함되었다.

### 코멘트

JDK 8은 자바 생태계에서 가장 중요한 릴리즈 중 하나로 평가받는다. 람다 표현식과 스트림 API의 도입으로 함수형 프로그래밍 패러다임이 자바에 본격적으로 도입되었으며, 이는 현재까지도 많은 개발자들이 사용하는 핵심 기능이다. 특히 LTS(Long Term Support) 버전으로서 많은 기업에서 여전히 사용 중이며, 향후 버전으로의 마이그레이션을 계획할 때 반드시 고려해야 할 기준점이 된다.

>[!important] LTS 버전의 중요성
>JDK 8은 첫 번째 LTS 버전으로, 2030년까지 Oracle의 상업적 지원이 제공된다. 이로 인해 많은 기업에서 안정성을 위해 JDK 8을 계속 사용하고 있으며, 마이그레이션 계획 수립 시 이를 고려해야 한다. 