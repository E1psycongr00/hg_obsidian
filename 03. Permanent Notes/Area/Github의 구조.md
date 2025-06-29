---
tags:
  - Github
aliases: null
title: Github의 구조
created: 2024-09-11T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-09-11
작성 시간: 19:56


----
## 내용(Content)

### Github란

>[!summary]
>깃허브는 Git을 기반으로 한 웹 기반 호스팅 서비스이다.

Git은 로컬 환경에서 버전 관리를 위한 (VCS)로 개발자들의 작업하는 프로젝트 공간 내에서 변경점을 자동 추적하고 여러 버전 간의 관리를 용이하게 해준다.
로컬 환경에서 실행되기 때문에 오프라인에서도 사용가능하다.

반면에, Github는 Git을 기반으로 한 웹 호스팅 서비스로 GIt을 클라우드에 옮겨 놓은 것이라 이해하면 된다. 온라인 상에서 버전 관리가 가능하기 때문에 전 세계 어디에서나 접근이 가능한 장점이 있다. 그래서 오픈소스를 보통 Github으로 많이 관리한다.

### Git의 필요성(버전 관리)

- 파일을 Commit 단위로 스냅샷을 찍을 수 있기 때문에 특정 상태로 안전하게 되돌릴 수 있다.(개발 속도 향상, 안전한 개발)
- 시간에 따라 수정 내용을 비교 가능하다.
- 누가 문제를 일으켰는지 추적이 가능하다.
- 프로젝트 단위로 복구가 가능하다.

>[!info]
>웹 호스팅 서비스란 웹사이트나 웹 애플리케이션을 인터넷에 게시하고 접근할 수 있게 해주는 서비스이다.


### Git & Github 동작 원리

![[Github 동작 원리(draw).svg]]

Git은 파일이 변경된 걸 감지하고 ignore 확인해서 추적하지 않는 파일은 변경을 감지하지 않는다. 감지된 변경된 파일은 add라는 명령어를 통해서 staging area에 올리게 되고 이렇게 staging area에 올려진 파일들은 덩어리채로 커밋이 가능하다. 그러면 local repository에 버전별로 코드를 관리할 수 있고 commit 단위로 코드를 복구하거나 이전으로 쉽게 되돌 수 있게 된다. 

이런 Repository를 Web을 통해 Remote로 관리하고 싶은 경우 pull, push, clone등을 활용할 수 있다.

## 질문 & 확장

(없음)

## 출처(링크)

- https://inpa.tistory.com/entry/GIT-%E2%9A%A1%EF%B8%8F-%EA%B0%9C%EB%85%90-%EC%9B%90%EB%A6%AC-%EC%89%BD%EA%B2%8C%EC%9D%B4%ED%95%B4
- https://aipoque.com/git-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC/

## 연결 노트










