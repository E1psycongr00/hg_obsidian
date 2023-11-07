작성 날짜: 2023-11-07
작성 시간: 14:07

## 주제: #미완

----
## 원문

Files는 파일, 디렉토리 생성부터 복제, 삭제, 쓰기, 읽기 등을 굉장히 편하게 활용할 수 있는 유틸 클래스이다. **Path 기반으로 동작**한다.

Files의 장점은 코드의 실수를 줄여주고 읽기 쓰기 등 File 관련해서 선언해야 할 긴 코드들을 줄여주기 때문에 가독성이 높은 특징이 있다.


### 파일 및 디렉토리 생성하기

#### Files.createFile(path)

```java
Path base = Paths.get(DIRECTORY);  
Files.createFile(base.resolve("hello5.txt"));
```

createNewFile은 true false 인 반면 해당 메서드는 해당 경로에 파일이 존재한다면 
**java.nio.file.FileAlreadyExistsException** 예외가 발생한다.

#### Files.createDirectory(path)

```java
Path base = Paths.get(DIRECTORY);  
Files.createDirectory(base.resolve("backjoon"));
```


디렉토리 생성시 실제 부모 디렉토리가 존재하지 않는다면 **java.nio.file.NoSuchFileException** 예외가 발생한다.

#### Files.createDirectories(path)


### 

## 질문 & 확장

(없음)

## 출처(링크)
- https://www.baeldung.com/java-nio-2-file-api
- https://www.baeldung.com/java-path-vs-file
## 연결 노트

- [[java.nio.file.Path 사용하기]]








