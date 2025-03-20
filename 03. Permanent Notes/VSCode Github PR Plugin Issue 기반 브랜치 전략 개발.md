---
tags:
  - 솔루션
  - VSCode
  - Github
  - Plugin
aliases: null
title: VSCode Github PR Plugin Issue 기반 브랜치 전략 개발
created: 2024-11-06T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-11-06
작성 시간: 19:31


----

## 문제 & 원인

기존에 Issue 기반 브랜치 전략을 사용하기 위해서는, Issue를 page에서 작성하고, 이슈 번호를 기억한다음, 브랜치 전략에 맞게 issue 번호와 같이 적어서 branch 생성 후, 개발 이후 PR해서 Merge 하고 issue를 닫는 과정을 거쳤다. 문제는 이 과정을 매 번 사이트가서 하니 피곤하다.


## 해결 방안

Github PR Plugin을 이용하면, Github 페이지를 최소한으로 이용하고, 에디터에서 모두 처리하고, 개발할 수 있다.

### 이슈 기반 브랜치 전략

이슈 기반 브랜치 전략을 수행하기 위해서는 다음과 같은 단계를 따른다.

1. Issue를 생성한다.
2. Issue를 담은 Branch를 새로 생성한다.
3. 해당 브랜치에서 커밋을 진행한 뒤, Push한다.
4. PR 요청을 통해 원래 브랜치와 합친다.(dev or main)

### 1. Issue 생성하기

자세한 내용은 [[Vscode Github PR Plugin Issue 생성 방법]]을 참고하자.

### 2. Issue를 담은 Branch 생성

#### 환경 설정

![[Pasted image 20241106193755.png]]

vscode setting을 들어가면 위 그림과 같은 설정을 볼 수 있다. 기본은 `${sanitizedIssueTitle}`은 없다. 내 경우에는 브랜치가 무슨 역할인지 가독성을 높이기 위해서 Issue 번호 뒤에 Issue 타이틀을 추가하도록 수정했다.

#### Branch 생성하기

![[Pasted image 20241106193924.png]]

우측 화살표는 누르면

![[Pasted image 20241106193943.png]]

체크 표시와 함께 오른쪽 아이콘이 `ㅁ` 아이콘으로 바뀌면서,하단에 branch가 생성되고 checkout 됨을 알 수 있다. 이렇게 빠르게 branch를 생성해서 Issue 기반으로 작업 가능하다.

### 3. Commit & Push

이건 기본 VSCode 소스 코드 관리로 쉽게 할 수 있기 때문에 새략

### 4. PR 요청

[[VScode Github Pull Requests Plugin 소개]] 에서 PR 부분을 참고하자.

## 질문 & 확장

PR Plugin을 이용하면 Issue 기반 브랜치 전략을 Editor만 이용해서 매우 빠르고 쉽게 개발할 수 있다. 솔직히 Issue 기반 솔로 프로젝트는 귀찮아서 적용 안하는데, 위 플러그인과 함께하면, 쉽고 빠르게 가능해서 솔로 프로젝트에서도 자주 쓸 것 같다.

## 출처(링크)


## 연결 노트
