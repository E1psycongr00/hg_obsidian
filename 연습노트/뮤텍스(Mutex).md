---
tags:
  - OS
  - Synchronization
aliases:
---
작성 날짜: 2024-01-11
작성 시간: 21:47

## 주제: #미완 #OS #Synchronization 

----
## 내용(Content)
### 뮤텍스의 의미
동기화의 기본적인 기법 중 하나이다.

Mutex는 Mutual(상호간의) + Exclusion(제외, 배제)의 합성어이다. 단어 의미 그대로 공유 자원(Critical Section)에 한번에 하나의 프로세스만 접근하도록 하는 기법이다. 

이렇게 하는 이유는 공유 자원을 여럿이 접근할 때 발생하는 [[race condition]] 상황을 방지하기 위해서 사용한다.

### 활용 예
#### Java
Java에서는 동기화 문제를 해결하기 위해 Synchronized 키워드나 Lock 인터페이스를 사용한다.
##### Synchronized
이 키워드를 사용하면 메서드 블록 내에 하나의 스레드만 접근 가능하다.  Synchronized 키워드는 내부적으로 Lock을 관리하기 떄문에 사용자가 임의로 Lock을 취득할 필요가 없다.

```java
class SharedResource {
	synchronized void accessResource() {
		// Critical Section
	}
}
```


```java
class SharedResource {
	synchronized void access(String threadName) {
		System.out.println(threadName + "is accessing shared resource");
		// 동작 코드
		System.out.println(threadName + "is leaving shared resource");
	}
}
```


##### Lock 인터페이스 (ReentrantLock 클래스)
java.util.concurrent.locks 패키지에 있는 Lock 인터페이스와 그 구현체인 ReentrantLock 클래스를 사용하면 뮤텍스 락을 구현 가능하다.

명시적으로 Lock을 제어할 수 있기 때문에 데드락을 피하는데 큰 도움을 줄 수 있다.

```java
class SharedResource {
	private Lock lock = new ReentrantLock();

	public void accessResource() {
		lock.lock();
		try {
			// critical section
		} finally {
			lock.unlock();
		}
	}
}
```




## 질문 & 확장

(없음)

## 출처(링크)
- https://taeyoungcoding.tistory.com/346#:~:text=Mutex%EB%9E%80%20'Mutual%20Exclusion'%EC%9D%98%20%EC%95%BD%EC%9E%90%EB%A1%9C%2C%20%ED%95%9C%20%EB%B2%88%EC%97%90%20%ED%95%98%EB%82%98%EC%9D%98,%ED%95%A0%20%EB%95%8C%20%EB%B0%9C%EC%83%9D%ED%95%98%EB%8A%94%20%EA%B2%BD%EC%9F%81%20%EC%A1%B0%EA%B1%B4%EC%9D%84%20%EB%B0%A9%EC%A7%80%ED%95%98%EB%8A%94%EB%8D%B0%20%EC%82%AC%EC%9A%A9%EB%90%9C%EB%8B%A4.


## 연결 노트










