작성 날짜: 2023-11-09
작성 시간: 11:21

#완성 #IT #JAVA #Lombok

----
## 내용(Content)

Lombok을 배포, 테스트 코드에서 모두 사용하려면 다음과 같이 종속성을 등록해준다.

```kotlin
// lombok  
compileOnly("org.projectlombok:lombok")  
annotationProcessor("org.projectlombok:lombok")  
  
testCompileOnly("org.projectlombok:lombok")  
testAnnotationProcessor("org.projectlombok:lombok")
```


## 질문 & 확장

(없음)

## 출처(링크)
- https://jundragon.tistory.com/9

## 연결 노트










