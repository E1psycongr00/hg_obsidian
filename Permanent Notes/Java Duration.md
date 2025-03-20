---
tags:
  - 완성
  - JAVA
aliases: 
date: 2024-12-27
title: Java Duration
---
---

## 내용(Content)

### Duration 이란

`java.time`에 속한 패키지로 **시간의 양에 대해서 제어**하고 싶을 때 사용하는 값 객체이다.

값 객체이기 때문에 불변 클래스이며, 쓰레드에 안전하다.

### Duration의 주요 용도

- 시, 분, 초 간 간격이나, 양을 측정하고 변화시키고 싶을 때
- 시간의 양을 제어한 후, LocalDateTime과 같은 시간대가 포함된 객체에 시간의 양을 적용해 업데이트 하고 싶을 때

### Duration  사용 예시

#### 초기화

```java
Duration.of(10L, ChronoUnit.SECONDS); // 량과 Seconds를 이용해 초기화
Duration.ofMinutes(10L);
Duration.ofSeconds(10L);
Duration.ofHours(10L);
Duration.ofMillis(10L);
Duration.ofDays(10L);
Duration.ofNanos(10L);
```

#### 시간 간격

```java
Duration a = Duration.ofSeconds(10L);
Duration b = Duration.ofSeconds(12L);
Duration.between(a, b) // 결과 => Duration.ofSeconds(2L);

```

#### 시간 비교

```java
Duration a = Duration.ofSeconds(10L);
a.isNegative(); // false
a.isPositive(); // true
a.compareTo(); // compareTo 비교
a.isZero(); // a == Duration.ZERO  ==> false
```

#### 시간 업데이트

```java
Duration a = Duration.ofSeconds(10L);
Duration delta = Duration.ofSeconds(5L);

a.plusSeconds(10L) // Duration.ofSeconds(10L);
a.plusMinutes(1L);
a.plusHours(1L);
a.plus(delta) // Duration간 plus, minus 가능
```

minus도 동일하게 적용 가능하다.

#### 출력

시간 총량을 각 시간 단위에 맞게 출력하며 내림으로 정수형으로 출력:

```java
Duration a = Duration.ofSeconds(5000L);
a.toDays() // 0
a.toHours() // 1
a.toMinutes() // 83
a.toSeconds() // 5000
```


모듈러 연산을 통해 항상 시간 단위 이내의 값을 출력:

```java
Duration a = Duration.ofSeconds(5000L);
a.toDaysPart() //  0
a.toHoursPart() // 1
a.toMinutesPart() // 23
a.toSecondsPart() // 20
```

## 질문 & 확장

(없음)

## 출처(링크)

- javadocs

## 연결 노트










