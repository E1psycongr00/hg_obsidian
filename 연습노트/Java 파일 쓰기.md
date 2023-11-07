작성 날짜: 2023-11-07
작성 시간: 13:08

## 주제: #미완

----
## 원문

File에 쓰기 위해서 2가지 타입을 사용한다.


| 클래스          | 공통점    | 차이점               | 용도                      |
| --------------- | --------- | -------------------- | ------------------------- |
| FileWriter      | 파일 쓰기 | 인코딩 처리가 가능   | 문자 파일                 |
| FileOutputStream | 파일 쓰기 | 바이너리 형태로 씀 | 이미지 같은 바이너리 파일 |

```java
public class Main {  
    private static final String SYSTEM_PATH = System.getProperty("user.dir");  
    private static final String DIRECTORY = "src/backjoon";  
  
    private static final String CURRENT_DIRECTORY = SYSTEM_PATH + File.separator + DIRECTORY;  
  
    public static void main(String[] args) throws IOException {  
       String currentPath = CURRENT_DIRECTORY + File.separator + "hello.txt";  
       try (BufferedWriter buffer = new BufferedWriter(new FileWriter(currentPath, StandardCharsets.UTF_8))) {  
          buffer.write("Hello asd!!!!");  
       }  
    }  
}
```

**FileWriter를 사용해서 BuffedWriter를 사용하는 경우 write, append가 제대로 동작하지 않는다.** FileWriter를 기반으로 동작하는데 FileWriter 생성시 append이냐 append가 아니냐에 따라 다르게 동작하기 때문이다. 



## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










