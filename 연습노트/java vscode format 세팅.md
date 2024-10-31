---
tags:
  - 미완
  - VSCode
  - JAVA
aliases: 
date: 2024-10-31
title: java vscode format 세팅
---
작성 날짜: 2024-10-31
작성 시간: 17:25


----
## 내용(Content)

### java check style

코드를 짜다 보면 format Convention이 중요해질 때가 있다. 이럴 때 적용할 수 있는 것이 Java Style Convention인데, 대표적으로는 Google Style 또는 Sun's Style 이 있다.

### Vscode에서 제공하는 Java Formatter 활용하기

`ctrl + shift + p` 를 누르고 Format Document를 누르면 적용된 기본 스타일로 정렬된다.

![[Pasted image 20241031173551.png]]
https://code.visualstudio.com/docs/java/java-linting/formatting.mp4

### formatter 세팅 적용 방법

#### URL 적용하는 방법
```text
"java.format.settings.url": "https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml",

```

#### XML에 여러 Profile이 있는 경우

```text
"java.format.settings.profile": "GoogleStyle",
```

프로파일 이름을 특정 가능하다.

## 질문 & 확장

(없음)

## 출처(링크)

- https://code.visualstudio.com/docs/java/java-linting
- https://medium.com/echo-devblog/vscode-java-formatting-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-56d89ce1ec4d

## 연결 노트


