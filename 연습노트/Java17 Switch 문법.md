

작성 날짜: 2023-10-21
작성 시간: 00:18

## 주제: #미완 #IT #JAVA

----
## 원문
```java
String x = "MON";  
String value = switch (x) {  
    case "MON" -> "월요일";  
    case "TUE" -> "화요일";  
    case "WED" -> "수요일";  
    case "THU" -> "목요일";  
    case "FRI" -> "금요일";  
    case "SAT" -> "토요일";  
    case "SUN" -> "일요일";  
    default -> throw new IllegalStateException("Unexpected value: " + x);  
};  
System.out.println(value);
```

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










