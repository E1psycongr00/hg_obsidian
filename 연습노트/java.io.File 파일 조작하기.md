작성 날짜: 2023-11-07
작성 시간: 12:03

## 주제: #미완 #IT #JAVA 

----
## 원문

**java.io.File은 String 타입의 path와 File 인스턴스를 생성**해서 동작한다. 이를 이용해서 Diretory와 File 생성이 가능하다.

### 디렉토리  & 파일 생성하기

디렉토리를 생성하는데는 mkdir() 메서드와 mkdirs() 메서드 2개가 존재한다.

| 메서드   | 용도                                                 |
| -------- | ---------------------------------------------------- |
| mkdir()  | 단일 디렉토리 생성(상위 디렉토리가 없을 경우 생성 X) |
| mkdirs() | 재귀적으로 디렉토리 생성(상위 디렉토리가 없는 경우 직접 생성) |


```java
import java.io.File;  
import java.io.IOException;  
  
public class Main {  
  
    public static void main(String[] args) throws IOException {  
       String path = System.getProperty("user.dir");  
       makeDirectory(path + "/src/backjoon");  
       makeFile(path + "/src/backjoon/hello.txt");  
    }  
  
    private static boolean makeDirectory(String directory) {  
       File file = new File(directory);  
       return file.mkdirs();  
    }  
  
    private static boolean makeFile(String path) {  
       File file = new File(path);  
       try {  
          return file.createNewFile();  
       } catch (IOException e) {  
          e.printStackTrace();  
       }  
       return false;  
    }  
}
```

### 하위 디렉토리 파일 읽기

```java

```

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










