---
tags:
  - 솔루션
  - "#React"
  - Typescript
aliases:
date:
title: React Props 컴포넌트간 상태 공유하기
---
작성 날짜: 2024-03-07
작성 시간: 15:57

#미완 #솔루션 #React #Typescript

----

## 문제 & 원인
억지로 만든 예일 수 있지만 2개의 컴포넌트의 number가 동기화되어야 한다고 가정하자

![[컴포넌트 동기화(draw).svg]]

다음과 같이 컴포넌트가 주어져 있고 컴포넌트 내부에는 score가 있다.  컴포넌트의 코드는 다음과 같다.

```ts
import { useState } from "react";


export default function Counter() {
	const [score, setScore] = useState(0);
	return (
		<div className="border border-black w-20">
			<h1>{score}</h1>
			<button onClick={() => setScore(score + 1)}>Increment</button>
		</div>
	);
}
```

```ts
import React from "react"
import Counter from "./Counter";


export default function Controller() {
	return (
		<div>
			<Counter />
			<Counter />
		</div>
	);
}
```


useState는 둘 간의 상태를 동기화하지 않는다. 완전히 다른 각자 만의 컴포넌트로
## 해결 방안


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트