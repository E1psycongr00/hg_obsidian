---
title: "🔬 JDK 8에서 JDK 11로 마이그레이션 가이드"
note-type: "SOLUTION"
created: "2025-01-04"
completed: true
---

## 문제 정의

JDK 8에서 JDK 11로의 마이그레이션은 많은 기업에서 직면하는 주요 과제다. JDK 8의 상업적 지원 종료와 JDK 11의 LTS 버전으로서의 안정성 때문에 마이그레이션이 필요하지만, 다음과 같은 호환성 이슈들이 발생한다:

- **Java EE 모듈 제거**: `java.xml.bind`, `java.activation` 등의 모듈이 제거되어 JAXB 관련 코드에서 컴파일 오류 발생
- **내부 API 접근 제한**: `sun.misc.Unsafe` 등의 내부 API 사용 시 경고 또는 오류 발생
- **모듈 시스템 도입**: 클래스패스 기반에서 모듈 시스템으로의 변화로 인한 의존성 문제
- **라이브러리 호환성**: 기존 라이브러리들이 JDK 11에서 정상 동작하지 않는 경우
- **빌드 도구 호환성**: Maven, Gradle 등의 빌드 도구 설정 변경 필요

## 가설

단계적 접근법을 통해 호환성 이슈를 체계적으로 해결할 수 있다:

1. **사전 분석**: 현재 코드베이스의 JDK 11 호환성 분석
2. **의존성 업데이트**: 라이브러리 및 빌드 도구 버전 업그레이드
3. **코드 수정**: 제거된 API 대체 및 deprecated 코드 수정
4. **테스트 및 검증**: 기능 테스트 및 성능 검증

## 해결 과정

### 1단계: 사전 분석 및 준비

#### JDeps 도구를 활용한 의존성 분석
```bash
# 현재 애플리케이션의 JDK 내부 API 사용 현황 분석
jdeps --jdk-internals myapp.jar

# 모듈 의존성 분석
jdeps --module-path lib --add-modules ALL-SYSTEM myapp.jar
```

#### Maven/Gradle 호환성 확인
```xml
<!-- Maven: JDK 11 호환 버전으로 업데이트 -->
<properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <maven-compiler-plugin.version>3.8.1</maven-compiler-plugin.version>
</properties>
```

### 2단계: 의존성 및 빌드 도구 업데이트

#### JAXB 의존성 추가
```xml
<!-- Maven: 제거된 Java EE 모듈 대체 -->
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.1</version>
</dependency>
<dependency>
    <groupId>org.glassfish.jaxb</groupId>
    <artifactId>jaxb-runtime</artifactId>
    <version>2.3.1</version>
</dependency>
```

#### 라이브러리 버전 업그레이드
```xml
<!-- Spring Framework JDK 11 호환 버전 -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>5.2.0.RELEASE</version>
</dependency>
```

### 3단계: 코드 수정

#### JAXB 코드 수정
```java
// JDK 8 이전 코드
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;

// JDK 11에서는 별도 의존성 추가 후 동일하게 사용 가능
// 단, 모듈 시스템 사용 시 module-info.java에 requires 추가 필요
```

#### 내부 API 대체
```java
// JDK 8: sun.misc.Unsafe 사용
sun.misc.Unsafe unsafe = sun.misc.Unsafe.getUnsafe();

// JDK 11: VarHandle 사용으로 대체
import java.lang.invoke.MethodHandles;
import java.lang.invoke.VarHandle;

VarHandle vh = MethodHandles.lookup()
    .findVarHandle(MyClass.class, "field", int.class);
```

#### 새로운 String 메서드 활용
```java
// JDK 11의 새로운 String 메서드 활용
String text = "  hello world  ";
boolean isEmpty = text.isBlank(); // JDK 11 신규 메서드
String stripped = text.strip(); // trim()보다 유니코드 지원 개선
```

### 4단계: 빌드 및 실행 환경 설정

#### JVM 옵션 조정
```bash
# JDK 11에서 제거된 옵션들 제거
# -XX:+UseConcMarkSweepGC (제거됨)
# 대신 G1GC 사용 (기본값)
java -XX:+UseG1GC -jar myapp.jar

# 모듈 시스템 관련 옵션
java --add-modules java.base,java.logging -jar myapp.jar
```

#### Docker 이미지 업데이트
```dockerfile
# JDK 11 기반 이미지로 변경
FROM openjdk:11-jre-slim

# 애플리케이션 복사 및 실행
COPY target/myapp.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### 5단계: 테스트 및 성능 검증

#### 단위 테스트 실행
```bash
# Maven을 통한 전체 테스트 실행
mvn clean test -Djava.version=11

# 특정 테스트 클래스 실행
mvn test -Dtest=MyServiceTest
```

#### 성능 비교 테스트
```java
// JMH를 활용한 성능 벤치마크
@Benchmark
public void testPerformance() {
    // 기존 JDK 8 대비 성능 측정
}
```

## 결과

### 성공 사례
- **컴파일 성공**: JAXB 의존성 추가 후 모든 컴파일 오류 해결
- **성능 향상**: G1GC 사용으로 GC 일시정지 시간 30% 감소
- **메모리 사용량 개선**: 컴팩트 문자열로 인한 메모리 사용량 10% 감소
- **새로운 API 활용**: HTTP 클라이언트 API로 외부 라이브러리 의존성 제거

### 발생한 문제점
- **라이브러리 호환성**: 일부 오래된 라이브러리에서 reflection 관련 경고 발생
- **빌드 시간 증가**: 초기 빌드 시간이 약간 증가 (모듈 시스템 분석 시간)
- **로깅 설정 변경**: java.util.logging 모듈 관련 설정 조정 필요

## 반성/교훈

### 배운 점
1. **사전 분석의 중요성**: JDeps 도구를 활용한 사전 분석이 마이그레이션 성공의 핵심
2. **단계적 접근**: 한 번에 모든 것을 변경하지 않고 단계적으로 진행하는 것이 안전
3. **테스트 자동화**: 충분한 테스트 커버리지가 있어야 마이그레이션 후 안정성 확보 가능
4. **라이브러리 생태계**: 주요 라이브러리들의 JDK 11 호환 버전 확인이 필수

### 향후 개선 방안
1. **CI/CD 파이프라인 개선**: JDK 11 환경에서의 자동화된 테스트 환경 구축
2. **모니터링 강화**: 마이그레이션 후 성능 및 안정성 모니터링 체계 구축
3. **문서화**: 마이그레이션 과정에서 발견한 이슈들과 해결책을 팀 내 공유
4. **점진적 모듈화**: 향후 모듈 시스템을 점진적으로 도입하여 더 나은 캡슐화 달성

### 추가 고려사항
- **라이선스 변경**: Oracle JDK의 라이선스 정책 변화로 인한 OpenJDK 고려
- **장기 지원**: JDK 11의 LTS 지원 기간과 향후 마이그레이션 계획 수립
- **팀 교육**: 새로운 JDK 11 기능들에 대한 개발팀 교육 필요

### 관련 자료
- [[03. Permanent Notes/JDK 8 주요 특징 및 패치 분석]] - 마이그레이션 출발점 분석
- [[03. Permanent Notes/JDK 11 주요 특징 및 패치 분석]] - 마이그레이션 목표 버전 분석
- [[📚 Oracle JDK 11 공식 문서]] - 공식 마이그레이션 가이드

> [!warning] 주의사항
> 프로덕션 환경 마이그레이션 전에 반드시 스테이징 환경에서 충분한 테스트를 진행하고, 롤백 계획을 수립해야 한다. 특히 JAXB 관련 코드가 많은 경우 의존성 추가 후에도 런타임 오류가 발생할 수 있으므로 주의가 필요하다. 