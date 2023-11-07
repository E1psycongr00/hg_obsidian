작성 날짜: 2023-11-07
작성 시간: 10:47

## 주제: #미완

----
## 원문

### Java.io.File

```java
public static void main(String[] args) throws IOException {  
    String path = System.getProperty("user.dir");  
    
    File file = new File(path + "/src/backjoon.txt");  
    boolean newFile = file.createNewFile();  
    if (newFile) {  
       System.out.println("파일 생성 성공");  
    } else {  
       System.out.println("파일 생성 실패");  
    }  
}
```

File 인스턴스를 생성하고 createNewFile()을 이용해 파일을 생성할 수 있다.


### java.io.FileOutputStream



## 질문 & 확장

(없음)

## 출처(링크)
- https://hianna.tistory.com/588
- https://mimah.tistory.com/entry/Java-%EC%9E%90%EB%B0%94%EB%A1%9C-%ED%8F%B4%EB%8D%94%EC%99%80-%ED%8C%8C%EC%9D%BC-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
## 연결 노트










