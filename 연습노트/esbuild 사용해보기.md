---
tags:
  - JS
  - Typescript
  - Bundler
  - esbuild
aliases: 
date: 2024-04-05
title: esbuild 사용해보기
---
작성 날짜: 2024-04-05
작성 시간: 15:41

#미완 #JS #Typescript #Bundler #esbuild

----
## 내용(Content)
### esbuild
>[!summary]
>esbuild는 Go 언어로 개발된 빠르게 build 가능한 번들러 프로젝트이다.

전통적인 js 번들러 도구는 상대적으로 느린 빌드 시간을 가지는데 esbuild는 굉장히 빠르게 빌드 가능하다.

공식 홈페이지에서도 빠른 빌드 시간을 장점으로 내세우고 있다. 

![[Pasted image 20240405160206.png]]

아직 현재 시간 기준(2024-04-05) 기준으로 공식 버전(1.0.0)이 나오지 않았기 때문에 완전히 안정적이라 볼 수도 없고 기능도 제한적일 수 있다. 그러나 최근 사람들이 빠른 빌드 속도와 편리함으로 인해 esbuild를 번들러를 활용한 포스팅이 꽤나 많이 보인다.

### esbuild 번들링
[공식 홈페이지 format](https://esbuild.github.io/api/#format)에서 format을 통해 어떤 목적으로 bundling 할지 선택할 수 있다. 그러나 쉽게 사용하는 방법은 [공식 홈페이지 platform](https://esbuild.github.io/api/#platform)을 활용하면 된다.

platform은 3가지를 제공한다.

- browser: default format
- node cjs: 형태로 출력되며, es6의 import/export 문법은 자동으로 변환됨
- neutral: ESM 형태로 출력된다.

esbuild 사용 예시는 다음과 같다.

```text
esbuild src/index.ts --bundle --platform=node --outdir=dist
```


>[!info] IIFE
> immediately-invoked function expression 약자로 브라우저에서 동작하는 포맷이다. 

>[!info] CJS
> commonJS의 약자로 Node에서 default로 동작하는 포맷이다.

>[!info] ESM
> ECMA Script 라는 뜻으로 import/export를 이용해 module를 관리할 수 있다. `.mjs` 확장자를 이용해야 사용가능하다.
>

### 빌드 스크립트 작성하기
esbuild 명령 사용시 옵션이 길어지면 작성하기 불편하고 관리하기 힘들 수 있다. 이런 경우 js를 활용해 빌드 스크립트를 작성할 수 있다. ( [공식 홈페이지 빌드 스크립트](https://esbuild.github.io/getting-started/#build-scripts) )

```mjs
```
## 질문 & 확장

(없음)

## 출처(링크)
- https://www.peterkimzz.com/extremely-faster-esbuild-than-webpack#esbuild-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0
- https://esbuild.github.io/
## 연결 노트










