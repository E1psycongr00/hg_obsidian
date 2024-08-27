---
tags:
  - JAVA
  - SQL
  - JOOQ
aliases: 
date: 2024-08-26
title: JOOQ 기본 사용해보기
---
작성 날짜: 2024-08-26
작성 시간: 21:02

#미완 #JAVA #SQL #JOOQ 

----
## 내용(Content)

### JOOQ 셋팅하기

#### 의존성 등록하기

Spring Boot에서 JOOQ 의존성을 쉽게 등록할 수 있다.

```kotlin
dependencies {
	implementation("org.springframework.boot:spring-boot-starter-jooq")
	implementation("org.springframework.boot:spring-boot-starter-web")
	compileOnly("org.projectlombok:lombok")
	runtimeOnly("com.h2database:h2")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}
```

JOOQ의 경우 spring-boot-starter-jooq 를 지원한다. 그렇기 떄문에 쉽게 의존성 등록이 가능하다.

#### 빈 등록하기

JOOQ Bean을 등록한다.

```java
import org.jooq.SQLDialect;
import org.jooq.impl.DataSourceConnectionProvider;
import org.jooq.impl.DefaultConfiguration;
import org.jooq.impl.DefaultDSLContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.TransactionAwareDataSourceProxy;

import javax.sql.DataSource;

@Configuration
public class JooqConfig {


    @Bean
    public DataSourceConnectionProvider connectionProvider(DataSource dataSource) {
        return new DataSourceConnectionProvider(new TransactionAwareDataSourceProxy(dataSource));
    }

    @Bean
    public DefaultDSLContext dsl(org.jooq.Configuration configuration) {
        return new DefaultDSLContext(configuration);
    }

    @Bean
    public DefaultConfiguration configuration(DataSourceConnectionProvider connectionProvider) {
        DefaultConfiguration jooqConfiguration = new DefaultConfiguration();
        jooqConfiguration.set(connectionProvider);
        jooqConfiguration.set(SQLDialect.H2);
        return jooqConfiguration;
    }
}
```


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트

- [[JOOQ 소개]]








