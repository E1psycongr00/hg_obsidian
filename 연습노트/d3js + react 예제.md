---
tags:
  - d3js
  - DataVisualization
aliases: 
date: 2024-03-03
title: d3js + react 예제
---
작성 날짜: 2024-03-03
작성 시간: 11:06

#미완 #d3js #DataVisualization

----
## 내용(Content)
### D3js + React + Typescript
D3js는 처음 사용하면 너무 어렵게 느껴지는데 TypeScript로 예제를 분석하면서 라이브러리가 어떤 방식으로 동작하는 지 조금씩 이해해보자.

[Getting Start의 LineChart](https://d3js.org/getting-started) 예제를 typescript로 바꿔서 작성하면서 코드를 분석한다.

### 설치하기
npm 환경에서 예제 코드를 테스트 할 것이기 떄문에  다음과 같이 설치한다.

```shell
npm install d3
```

이것 만으로는 타입스크립트에서 타입을 인식할 수가 없다. 그래서 개발 의존성에 다음을 추가한다.

```shell
npm i -D @types/d3
```

그 외에 React 환경을 설치해준다.
### LinePlot 입력 정의하기

```ts
interface LinePlotProps {
	data: number[];
	width?: number;
	height?: number;
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;
}
```

React 컴포넌트의 입력을 위해 Props 타입을 정의한다.

### useRef 사용한 이유
```ts
	const gx = useRef<SVGSVGElement | null>(null);
	const gy = useRef<SVGSVGElement | null>(null);

```

![[Pasted image 20240303144131.png]]

기본적으로 D3js는 DOM을 직접 조작한다. React에서는 직접 DOM 조작을 추천하지 않는다. 그래서 useRef를 사용한다.

>[!info] useRef
### d3-scale
```ts
	const x = d3
		 .scaleLinear()
		.domain([0, data.length - 1])
		.range([marginLeft, width - marginRight]);

	const y = d3
		.scaleLinear()
		.domain(d3.extent(data) as [number, number])
		.range([height - marginBottom, marginTop]);

	const line = d3
		.line<number>()
		.x((d, i) => x(i) as number)
		.y(d => y(d) as number);
```
### 전체 코드

```ts
import * as d3 from "d3";
import { useRef, useEffect } from "react";

interface LinePlotProps {
	data: number[];
	width?: number;
	height?: number;
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;
}

export default function LinePlot({
	data,
	width = 640,
	height = 400,
	marginTop = 20,
	marginRight = 20,
	marginBottom = 30,
	marginLeft = 40,
}: LinePlotProps) {
	const gx = useRef<SVGSVGElement | null>(null);
	const gy = useRef<SVGSVGElement | null>(null);
	const x = d3
		.scaleLinear()
		.domain([0, data.length - 1])
		.range([marginLeft, width - marginRight]);
	const y = d3
		.scaleLinear()
		.domain(d3.extent(data) as [number, number])
		.range([height - marginBottom, marginTop]);
	const line = d3
		.line<number>()
		.x((d, i) => x(i) as number)
		.y(d => y(d) as number);

	useEffect(() => {
		if (gx.current) {
			d3.select(gx.current).call(d3.axisBottom(x));
		}
	}, [gx, x]);
	useEffect(() => {
		if (gy.current) {
			d3.select(gy.current).call(d3.axisLeft(y));
		}
	}, [gy, y]);
	return (

		<svg width={width} height={height}>
	
			<g ref={gx} transform={`translate(0,${height - marginBottom})`} />
	
			<g ref={gy} transform={`translate(${marginLeft},0)`} />
			<path
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				d={line(data) || ""}
			/>
			<g fill="white" stroke="currentColor" strokeWidth="1.5">
				{data.map((d, i) => (
					<circle
						key={i}
						cx={x(i) as number}
						cy={y(d) as number}
						r="2.5"
					/>
				))}
			</g>
		</svg>
	);
}
```

## 질문 & 확장

(없음)

## 출처(링크)
- https://d3js.org/d3-scale
- https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement
## 연결 노트
- [[typescript question mark parameter]]









