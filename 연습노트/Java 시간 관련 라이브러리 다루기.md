
작성 날짜: 2023-11-30
작성 시간: 16:12

## 주제: #미완

----
## 원문

### LocalTime

#### 기본 사용법

LocalTime을 이용해서 시간 형태로 이루어진 문자열을 시계열 데이터로 파싱 가능하다.

```java
String log = "01:12:24";
LocalTime time = LocalTime.parse(log);
System.out.println(time);  
System.out.println(time.getHour());  
System.out.println(time.getMinute());  
System.out.println(time.getSecond());
```

plusMinutes, plusHours, plusSeconds를 활용해서 시, 분, 초를 바꿀 수 있다.

#### 초 단위로 변환 및 초를 시간 데이터로 파싱하기

```java
String log = "00:12:24";
LocalTime time = LocalTime.parse(log);

// LocalTime -> seconds
int seconds = time.toSecondOfDay();

// seconds -> LocalTime
LocalTime nowTime = LocalTime.ofSecondOfDay(seconds);
```

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










