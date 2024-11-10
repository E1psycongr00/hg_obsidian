---
tags:
  - 완성
  - 솔루션
  - JAVA
  - Spring
aliases: 
date: 2024-11-08
title: 동적으로 Configuration 처리하기 by @ImportSelector
---
작성 날짜: 2024-11-08
작성 시간: 15:11


----

## 문제 & 원인

멀티 모듈을 사용하는 경우, 특정 모듈에 따라 동적으로 Container에 Configuration 빈을 등록해야 하는 일이 있을 수 있다. 일반적으로 다음과 같은 `자동 빈 등록 방식`을 사용한다.

```java
@Configuration(proxyBeanMethods = false)
@ComponentScan("com.example.appstore")
class InfraConfig {

}
```

이것의 문제는 인프라 구성 중에 여러 데이터베이스 또는 다른 Configuration 정보들도 있는데 ComponentScan을 사용해서 자동으로 Configuration bean들을 자동으로 등록하면, 불필요한 설정들이 Spring Container에 올라가게 된다. 그 과정에서 불필요한 Connection이 생길 수도 있다.


## 해결 방안

동적으로 다른 모듈에서 Configuration을 Import 하기 위해 Spring에서 `@ImportSelector` 를 지원한다.

### 인터페이스 정의하기

```java
public interface AppStoreConfig {

}
```

Infra 타입을 추상화한 인터페이스를 정의한다. 해당 인터페이스의 구현체는 다른 모듈에 적용될 수 있음을 의미한다.

### 인터페이스 구현

```java
@EnableAsync
public class AsyncConfig implements AppStoreConfig {
	// ...
}

@EnableTransactionManagement
@EntityScan("com.example.appstore")
@EnableJpaRepories("com.example.appstore")
public class JpaConfig implements AppStoreConfig {

}
```

>[!help] @EnableAsync
>- Spring에게 `@Async` 가 붙은 메서드가 비동기적으로 실행될 수 있도록 허용하는 어노테이션
>- `@Async`는 Spring AOP Proxy 기반으로 동작한다.
>	- 해당 호출을 가로채서 비동기 실행 처리를 위한 프록시 객체 생성
>	- TeskExecutor에 의해 스레드풀에 작업으로 등록
>- public 메서드만 적용 가능
>- self invocation 불가
>- [EnableAsync 관련 정리 블로그](https://xxeol.tistory.com/44#%EB%B9%84%EB%8F%99%EA%B8%B0%20%EC%B2%98%EB%A6%AC%20without%20%40Async-1)

### 구현체들을 관리할 Enum 객체 정의

```java
@Getter
@RequiredArgsConstructor
public enum AppStoreConfigGroup {
	ASYNC(AsyncConfig.class),
	JASYPT(JasyptConfig.class),
	JPA(JpaConfig.class)
	;

	private final Class<? extends AppStoreConfig> configClass;
}
```

### ImportSelector가 인식할 어노테이션 선언

```java
@Target(ElementType.TYPE)
@Retension(RetentionPolicy.RUNTIME)
@Import(AppStoreConfigImportSelector.class)
public @interface EnableAppStoreConfig {
	AppStoreConfigGroup[] value();
}
```

### ImportSelector 구현체 구현하기

```java
class AppStoreConfigImportSelector implements DeferredImportSelector {

	@Override
	public String[] selectImports(AnnotationMetadata metadata) {
		return Arrays.stream(getValues(metadata))
			.map(v -> v.getConfigClass().getName())
			.toArray(String[]::new);
	}

	private AppStoreConfigGroup[] getValues(AnnotationMetadata metadata) {
		Map<String, Object> attributes = metadata.getAnnotationAttributes(EnableAppStoreConfig.class.getName());
		return (AppStoreConfigGroup[]) MapUtils.getObject(attributes, "value", new AppStoreConfigGroup[]{});
	}
}
```

### 사용하기

```java
@Configuration(proxyBeanMethods = false)
@EnableAppStoreConfig({
    AppStoreConfigGroup.ASYNC,
    AppStoreConfigGroup.JASYPT,
    AppStoreConfigGroup.JPA,
})
class InfraConfig {

}
```


## 질문 & 확장

(없음)

## 출처(링크)

- https://mangkyu.tistory.com/304
- https://xxeol.tistory.com/44#%EB%B9%84%EB%8F%99%EA%B8%B0%20%EC%B2%98%EB%A6%AC%20without%20%40Async-1
- https://cornswrold.tistory.com/m/635

## 연결 노트
