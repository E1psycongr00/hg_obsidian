작성 날짜: 2023-10-16
작성 시간: 23:43

## 주제: #미완 #IT #Gradle 

----
## 원문

Gradle과 intellij를 활용하면 MultiModule를 쉽게 설계 할 수 있다. 실제 실습을 통해 멀티 모듈 적용 방법 알아보자

### 멀티 모듈 만들기

new 탭에서 new module 만들기를 들어가면 다음과 같은 화면을 볼 수 있다.


![[Pasted image 20231017104637.png]]

여기서 모듈을 생성하면 자동으로 setting.gradle.kts에 다음과 같이 등록된다.

![[Pasted image 20231017105157.png]]
IDE가 똑똑하게도 자동으로 입력해주는데 include("app")을 통해서 app이라고 만들어둔 module에 자동으로 등록된다.

이를 등록하지 않으면 만들어둔 서브 모듈의 app을 인식하지 못하므로

## 질문 & 확장

(없음)

## 출처(링크)
- https://docs.gradle.org/current/userguide/multi_project_builds.html

## 연결 노트










