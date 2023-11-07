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

```java
Path base = Paths.get(DIRECTORY);  
Files.createDirectories(base.resolve("backjoon").resolve("input"));
```

중간에 디렉토리가 존재하지 않아도 계속해서 디렉토리를 생성한다.

### 속성 조회하기

#### Files.readAttributes(path, attribute)

```java
Path base = Paths.get(DIRECTORY);  
BasicFileAttributes attributes = Files.readAttributes(base.resolve("hello.txt"),  
    BasicFileAttributes.class);
```


파일 접근 시간, 생성 시간 등등에 대해서 접근할 수 있다.


### 파일 복제하기

```java
Path base = Paths.get(DIRECTORY);  
Files.copy(base.resolve("hello.txt"), base.resolve("hello2.txt"));
```

이미 target 경로에 파일이 존재한다면 **java.nio.file.FileAlreadyExistsException** 예외가 발생한다

3번째 인자로 CopyOption을 줄 수도 있다.

**CopyOption 종류**
- StandardCopyOption.REPLACE_EXISTING => 기존에 파일이 존재한다면 덮어 씌움
- StandardCopyOption.COPY_ATTRIBUTES => 기존 파일이 존재하면 예외 발생
- StandardCopyOption.ATOMIC_MOVE



## 질문 & 확장

(없음)

## 출처(링크)
- https://www.baeldung.com/java-nio-2-file-api
- https://www.baeldung.com/java-path-vs-file
- https://velog.io/@dailylifecoding/Java-nio-package-Files-usage#%F0%9F%A5%9D-%ED%8A%B9%EC%A0%95-%ED%99%95%EC%9E%A5%EC%9E%90%EC%9D%98-%ED%8C%8C%EC%9D%BC%EB%93%A4%EB%A7%8C-%EC%B0%BE%EC%95%84%EB%82%B4%EA%B8%B0
## 연결 노트

- [[java.nio.file.Path 사용하기]]








