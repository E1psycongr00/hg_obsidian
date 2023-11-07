작성 날짜: 2023-11-07
작성 시간: 14:17

## 주제: #미완

----
## 원문

### Path 란
파일 시스템에서 파일을 찾는 데 사용할 수 있는 개체다. 이는 일반적으로 시스템 종속 파일 경로를 나타낸다.

Files 클래스와 함께 사용한다.

**Path 특징**
- Path는 계층적이고 특수 구분 기호로 구분된 일련의 디렉터리 및 파일 이름 요소로 구성된 경로를 나낼 수 있다.
- 파일 시스템 계층 구조를 식별하는 루트 구성 요소 도 존재할 수 있다.
- Path 루트, 루트 및 이름 시퀀스 또는 단순히 하나 이상의 이름 요소를 나타낼 수 있습니다.
- Path가 하나의 비어 있는 이름 요소로만 구성된 경우 Path 빈 경로로 간주된다.
	- 빈 경로를 사용하여 파일에 액세스하는 것은 파일 시스템의 기본 디렉터리에 액세스하는 것과 같다.
- Path 경로 구성 요소 또는 해당 이름 요소의 하위 시퀀스에 액세스하기 위한 getFileName , getParent , getRoot 및 subpath 메서드를 정의합니다.


### Path 생성하기

```java
String currentPath = "/home/project/src";
Path path = Paths.get(currentPath);
```


### getRoot()

```java
Path path = Paths.g
path.getRoot()
```
## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
- https://www.baeldung.com/java-path-vs-file









