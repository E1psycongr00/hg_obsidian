---
tags:
  - OS
aliases: null
title: Program vs Process
created: 2024-12-09T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-12-09
작성 시간: 12:39


----
## 내용(Content)

### 프로그램과 프로세스의 차이

[[03. Permanent Notes/Area/프로그램#^08f0b8|프로그램]] 과 [[03. Permanent Notes/Area/Process Basic#^e8fa94|프로세스]]를 표를 통해 비교해서 살펴보자.

| 프로그램                             | 프로세스                                     |
| -------------------------------- | ---------------------------------------- |
| 어떤 작업을 위해 실행할 수 있는 파일 또는 명령어 집합  | 실행되어 작업 중인 프로그램의 인스턴스                    |
| 저장 장치에는 있지만 메모리에는 로드되지 않은 정적인 상태 | 메모리에 적재되고 CPU에 로드되어 자원을 할당 받아 실행되고 있는 상태 |
| 코드와 같음                           | 인스턴스와 같음                                 |

### 예시

```java
public class Hello {
	public void greeting() {
		System.out.println("Hello, World!!");
	}
}
```

이런 자바 자체는 프로그램이 되며 코드 실행 시 Hello에 인스턴스가 할당되는 상태는 프로세스와 같다고 보면 쉽게 이해할 수 있다.

## 질문 & 확장

(없음)

## 출처(링크)

- [컴퓨터공학 기술면접 필수 \| 프로세스와 스레드 차이 \| 패스트캠퍼스](https://fastcampus.co.kr/media_branding_cs)

## 연결 노트










