---
title: "📚 Oracle JDK 17 공식 문서"
note-type: "REF"
created: "2025-01-04"
from: "Web"
---

### 출처

- [JDK 17 Release Notes](https://www.oracle.com/java/technologies/javase/17-relnotes.html)
- [What's New in JDK 17](https://www.oracle.com/java/technologies/javase/17-whats-new.html)
- [JDK 17 Migration Guide](https://docs.oracle.com/en/java/javase/17/migrate/index.html)
- [OpenJDK 17 Release Notes](https://openjdk.java.net/projects/jdk/17/)

### 요약

#### LTS 버전으로서의 중요성

JDK 17은 2021년 9월에 출시된 세 번째 LTS(Long Term Support) 버전으로, JDK 11 이후 3년 만에 나온 장기 지원 버전이다. Oracle에서 2029년까지 상업적 지원을 제공하며, 현재 많은 기업들이 JDK 8이나 JDK 11에서 마이그레이션하는 주요 대상 버전이다. 현대적인 자바 개발의 새로운 표준으로 자리잡고 있다.

#### 주요 언어 기능 개선

JDK 17에서는 sealed 클래스와 인터페이스가 정식 기능으로 도입되어 상속 계층을 더욱 엄격하게 제어할 수 있게 되었다. 패턴 매칭이 instanceof에서 정식 지원되어 타입 검사와 캐스팅을 더욱 간결하게 작성할 수 있다. switch 표현식도 개선되어 더욱 강력한 패턴 매칭을 지원한다.

#### 성능 및 메모리 관리 개선

ZGC(Z Garbage Collector)와 Shenandoah GC가 정식 기능으로 승격되어 대용량 힙 메모리에서도 낮은 지연시간을 보장한다. 컴팩트 문자열(Compact Strings) 최적화가 더욱 개선되어 메모리 사용량이 감소했다. JIT 컴파일러의 최적화도 강화되어 전반적인 애플리케이션 성능이 향상되었다.

#### 보안 강화

TLS 1.3이 기본적으로 활성화되어 네트워크 통신의 보안성이 크게 향상되었다. 새로운 암호화 알고리즘들이 추가되었으며, 보안 관련 API들이 개선되어 더욱 안전한 애플리케이션 개발이 가능하다. 정기적인 보안 업데이트를 통해 최신 보안 위협에 대응하고 있다.

#### 플랫폼 및 도구 개선

macOS/AArch64 포트가 정식 지원되어 Apple Silicon Mac에서도 네이티브 성능을 제공한다. jpackage 도구가 정식 포함되어 자바 애플리케이션을 플랫폼별 설치 패키지로 쉽게 배포할 수 있다. 새로운 벡터 API가 인큐베이터로 도입되어 SIMD 연산을 활용한 고성능 계산이 가능하다.

### 코멘트

> [!important] LTS 버전의 전략적 중요성
> JDK 17은 현재 가장 권장되는 LTS 버전으로, JDK 8의 오래된 기술 스택에서 벗어나 현대적인 자바 개발 환경으로 전환하려는 기업들의 주요 선택지다. sealed 클래스, 패턴 매칭, 개선된 GC 등의 기능들이 개발 생산성과 애플리케이션 성능을 크게 향상시킨다.

JDK 17은 자바 플랫폼의 현대화를 대표하는 버전으로, 언어 기능의 발전과 성능 개선이 균형있게 이루어진 안정적인 LTS 버전이다. 특히 sealed 클래스와 패턴 매칭은 타입 안전성을 높이고 코드의 표현력을 크게 향상시켜, 함수형 프로그래밍과 객체지향 프로그래밍의 장점을 모두 활용할 수 있게 해준다. 성능 면에서도 ZGC와 Shenandoah의 정식 지원으로 대규모 애플리케이션에서도 안정적인 성능을 보장한다. 