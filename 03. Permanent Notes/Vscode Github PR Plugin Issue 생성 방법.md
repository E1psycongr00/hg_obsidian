---
tags:
  - 완성
  - VSCode
  - Github
  - Plugin
aliases: null
title: Vscode Github PR Plugin Issue 생성 방법
created: 2024-11-06T00:00:00.000Z
---
작성 날짜: 2024-11-06
작성 시간: 19:09


----
## 내용(Content)

### GItHub 이슈 생성 방법

1. `+` 아이콘이나 명령 팔레트 창에서 `Github Issues: Create an Issue` 사용
2. `Github Issues: Create Issue From Selection` 사용
3. 주석을 이용한 방법

### 기본 생성

`+` 아이콘이나 `Github Issues: Create an Issue` 를 사용하는 경우

![[Pasted image 20241106190412.png]]

위와 같은 창이 뜨는데 `v` 표시를 누르면 Issue가 생성된다.

### 코드 블럭 링크 Issue

코드 블럭을 링크로 만들어서 Issue를 쉽게 생성 가능하다.

![[Pasted image 20241106191630.png]]

드래그를 해서 `Github Issues: Create Issue From Selection` 를 클릭하면 Issue title 입력 칸이 나오고 입력하면 간단하게 Issue가 생성된다.

![[Pasted image 20241106191728.png]]

이렇게 생성된 issue는 링크를 들어가면

![[Pasted image 20241106191907.png]]

이렇게 영역이 Hilight 된 것을 볼 수 있다. 사실 플러그인에서 제공하는 이 기능은

좌측 code number line을 `Shift + 드래그`를 이용하면 배경이 하이라이트 되는데 `...` 아이콘을 눌러서 Reference in new issue 한 것과 동일하다.

![[Pasted image 20241106192020.png]]

Github Page에서도 할 수 있지만 에디터에서 개발 중에 아주 쉽게 issue를 생성할 수 있어서 편리하다.


![[Pasted image 20241106192157.png]]

그리고 이렇게 생성된 issue는 우클릭 누르면 Go to Linked Code 라는 것이 생기고 누르면

![[Pasted image 20241106192236.png]]

VSCode 내에서 드래그 된 상태로 해당 코드로 이동하게 된다.

### 주석으로 Issue 생성

![[Pasted image 20241106192556.png]]

TODO 같은 키워드를 넣고 문자열을 작성하면 라인 좌측 상단에 전구 모양 아이콘이 들어오고, 누르면 Create Github Issue가 보임을 알 수 있다. 누르면 제목을 지정할 수 있고, 최종적으로 다음과 같은 Issue가 생성된다.

![[Pasted image 20241106192703.png]]

From Selection과 같이 코드 링크가 생성되며, 동일하게 접근 가능하다. 다만 한 줄 라인이라는 차이점이 있다.

주석 Issue는 Keyword를 환경 설정에서 추가할 수도 있다.

![[Pasted image 20241106192905.png]]

## 질문 & 확장

Github Page에 들어 가서 할 수 있는 기능을 모두 에디터에서 Issue 생성 및 해결 가능하기 때문에, 쉽고 빠르게 Issue 기반 개발을 할 수 있다.

요즘 트렌드는 AI도 그렇고, 형상 관리도 그렇고 따로 사이트가서 처리하는 것이 아닌 에디터에서 빠르고 쉽게 처리하는 것 같다.

## 출처(링크)

- https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github
- https://www.youtube.com/watch?v=VWbHiXN3mno

## 연결 노트










