작성 날짜: 2023-10-04
작성 시간: 13:22

## 주제: #미완 #IT #JAVA 

----
## 원문

Java 11에서부터 가장 낮은 GC 오버헤드를 약속하는 Epsilon 이라는 No Op GC를 도입했다. 

```java
class MemoryPolluter { 
	static final int MEGABYTE_IN_BYTES = 1024 * 1024;
	static final int ITERATION_COUNT = 1024 * 10;
	
	static void main(String[] args) { 
		System.out.println("Starting pollution"); 
		for (int i = 0; i < ITERATION_COUNT; i++) { 
			byte[] array = new byte[MEGABYTE_IN_BYTES]; 
		} 
		System.out.println("Terminating");
	}
}
```

위 코드는 1 MB 배열을 생성하고 이를 10240번 반복하므로 10GB 메모리를 할당한다는 의미이다. 이 정도면 heap이 보관할 수 있는 메모리를 초과할 수 있다.

이를 표준 GC를 돌려서 확인하면 예외 발생 없이 잘 동작한다. 그러나 다음과 같은 명령어를 사용해보자

```
-XX:+UnlockExperimentalVMOptions -XX:+UseEpsilonGC
```

그럼 
```
Terminating due to java.lang.OutOfMemoryError: Java heap space
```

다음과 같은 예외가 발생할 것이다.

## 질문 & 확장

(없음)

## 출처(링크)
- https://www.baeldung.com/jvm-epsilon-gc-garbage-collector

## 연결 노트










