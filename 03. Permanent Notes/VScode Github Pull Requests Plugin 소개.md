---
tags:
  - VSCode
  - Github
  - Plugin
aliases: null
title: VSCode Github Pull Requests Plugin 소개
created: 2024-11-06T00:00:00.000Z
---
작성 날짜: 2024-11-06
작성 시간: 18:44


----
## 내용(Content)

### Github PR Plugin

![[Pasted image 20241106184625.png]]

Github PR과 Issue를 쉽게 관리할 수 있도록 해주는 Plugin이다. 간단하게 설치하고 Github 인증만 해주면 된다.

내가 사용하면서 강력하게 생각했던 기능은 다음과 같다.

- Github PR관리를 vscode 창에서 쉽게 할 수 있음
- 간단한 Issue 관리 가능
- VSCode 내에서 Github Issue 기반 개발을 쉽게 할 수 있음

### VSCode 내에서 쉬운 PR 관리

![[Pasted image 20241106185838.png]]

Github PR 아이콘에서 원으로 표시한 아이콘을 누르면, 

![[Pasted image 20241106185941.png]]

이렇게 PR을 Create할 수 있는 창이 나오고 create 하면, 실제 Github Page에 동일한 PR 화면이 표시된다. 그래서 PR을 따로 GIthub 사이트에 가지 않아도 쉽게 할 수 있고, 필요하다면 링크로 쉽게 접근 가능하다.

### 간단한 Issue 관리

#### 편리한 이슈 생성

![[Pasted image 20241106190226.png]]

이렇게 Issue tab이 있고, `+` 아이콘을 이용해 Issue를 쉽게 생성 가능하다.  해당 아이콘을 누르면

![[Pasted image 20241106190412.png]]

이와 같은 창이 열리고, 템플릿 대로 기입한 후, 우측 상단에  `v` 아이콘을 누르면 Issue가 생성된다.

이것 외에도 코드 selection 기반 issue 생성이나, `TODO 내용 @username`을 이용해서 inline 코드를 링크로 하는 issue를 생성 가능하다.

자세한 내용은 [[Vscode Github PR Plugin Issue 생성 방법]] 을 참고하자.

#### 이슈 링크

지구본 모양을 클릭하면 깃헙 페이지의 issue로 리다이렉트된다.

#### 브랜치 생성

우측 화살표 모양을 누르면, Issue 기반 Branch를 생성 가능하다. 기본 규칙은 
`${user}/issue${issueNumber}` 이다. 설정에서 커스텀 가능하다.

## 질문 & 확장

(없음)

## 출처(링크)

- https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github
- https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github
- https://www.youtube.com/watch?v=VWbHiXN3mno

## 연결 노트

- [[Vscode Github PR Plugin Issue 생성 방법]]









