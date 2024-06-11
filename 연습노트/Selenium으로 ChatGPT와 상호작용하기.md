---
tags:
  - 솔루션
  - AI
  - OpenAI
  - 크롤링
  - Selenium
aliases: 
date: 2024-05-22
title: Selenium으로 ChatGPT와 상호작용하기
---
작성 날짜: 2024-05-22
작성 시간: 21:33

#미완 #솔루션 #AI #OpenAI #크롤링 #Selenium

----

## 문제 & 원인

1. Selenium을 이용해서 구글에 로그인을 하면 오류가 발생.
2. 로그인 이후 ChatGPT에서 데이터를 크롤링 해야 함.

ChatGPT에서 데이터를 크롤링하는 이유는 API는 비싸고, 프롬프트를 적용하기 어렵기 때문이다.(방법이 있을 것 같은데.. 찾아봐야 겠다.) 크롤링의 장점은 마치 GPT에 직접 접속해서 채팅하고 데이터를 얻어오기 때문에 API 요금이 소비되지 않고, 추가적인 비용 없이 Chat GPT를 이용해 소통할 수 있다. 단점은 API를 호출하는 것이 아니기 때문에 접속에 필요한 아이디로 로그인을 해야하며, API로 호출하는 것이 아니기 때문에, 추가적으로 Chrome을 띄워서 실행해야 한다.

2번이 메인 목표이지만, 로그인이 선행되지 않으면, 내가 만든 커스텀 GPT를 활용할 수 없다. 그리고 커스텀 GPT를 불러오더라도, GPT에서 채팅창에서 입력하고 입력 대기 동안 응답이 출력되고 응답이 완료되면 응답을 가져와야 한다. 
## 해결 방안

ChatGPT에서 나만의 GPT와 소통하고 그 결과를 크롤링할려면 로그인이 필요하다. 그러나 자동 로그인은 OAuth의 경우 막아 놓기 때문에 우회하는 방법이 필요하다.


1. undetected_chromedriver 사용한다.
2. 구글 프로필을 사용한다.

### 로그인 및 로그인 정보를 프로필에 저장하기

자동으로 입력하고 로그인하는 방법이 있지만 python을 활용하는 경우, undetected_chromedriver를 사용하면 디텍되지 않고 손쉽게 로그인이 가능하다.

```shell
pip install undetected_chromedriver
```

>[!caution]
>가끔 undetected_chromedriver를 사용할 때, 크롬 버전이 구식이거나 호환되지 않는 경우 오류가 발생할 수 있으니 해당 라이브러리 

```python
import undetected_chromedriver as uc

options = uc.ChromeOptions()
# 팝업 차단
options.add_argument("--disable-popup-blocking")

# 웹 드라이버 객체 생성
driver = uc.Chrome(options=options, user_data_dir="path/to/profile")
```

### gasds

## 질문 & 확장


## 출처(링크)



## 연결 노트
