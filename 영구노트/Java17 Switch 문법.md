

작성 날짜: 2023-10-21
작성 시간: 00:18

## 주제: #완성  #IT #JAVA

----
## 원문
```java
String x = "MON";  
switch (x) {  
    case "MON":  
       System.out.println("월요일");  
       break;    
   case "TUE":  
       System.out.println("화요일");  
       break;    
   case "WED":  
       System.out.println("수요일");  
       break;    
   case "THU":  
       System.out.println("목요일");  
       break;    
   case "FRI":  
       System.out.println("금요일");  
       break;    
   case "SAT":  
       System.out.println("토요일");  
       break;    
   case "SUN":  
       System.out.println("일요일");  
       break;    
   default:  
       throw new IllegalStateException("Unexpected value: " + x);  
}
```

굉장히 코드가 길고 비효율적이다. 이를 java 12, 13을 거치면서 switch문이 많이 개선됬다.

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










