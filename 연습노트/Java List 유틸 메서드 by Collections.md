작성 날짜: 2023-10-23
작성 시간: 14:39

## 주제: #미완

----
## 원문
java 배열의 경우 Util 메서드가 부실한 경우가 많다. Collections에서는 보다 유틸 메서드가 풍부한데, Collections 에서 제공하는 List에 도움이 되는 유틸 클래스에 대해서 알아보자

Collections는 **java.util** 패키지에 있다.

### Collections.unmodifiableList

unmodifiableList는 변경 불가능한 List 컬렉션을 반환할 떄 사용된다. 주로 java의 일급 컬렉션처럼 내부의 컬렉션 정보 자체가 VO 처럼 쓰이는 경우 내부의 값이 변하면 안될 때 주로 사용된다.

```java
List<Integer> list = Arrays.asList(1,2,3,4,5);
List<Integer> unmodifiableList = Collections.unmodifiableList(list);
```

### Collections.sort(List\<T> list, Comparator\<? super T> c)

list를 정렬할 때 사용된다.  보통은 list.sort(comparator)처럼 사용한다.

```java
List<Integer> list = Arrays.asList(1,5,2,3,4);
Collections.sort(list, Collections.reverseOrder());
```

역순으로 정렬하고 싶다면 Collections.reverseOrder() 또는 Comparator.reverseOrder()를 사용하면 된다.
### Collections.max(), Collections.min()

이건 컬렉션 내부에서 최대값과 최소값을 구할 떄 사용된다.

```java
List<Integer> 
Collections.max(list)
```


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










