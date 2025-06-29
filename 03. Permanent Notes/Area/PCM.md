---
tags:
  - DSP
aliases:
  - Pulse Code Modulation
title: PCM
created: 2024-06-21T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-06-21
작성 시간: 00:54


----
## 내용(Content)

### Pulse Code Modulation

>[!summary]
>펄스 부호 변조는 아날로그 신호를 0과 1의 디지털 신호로 변환하는 방법이다.

### PCM 단계

#### 1. 샘플링(표본화)

음성과 같은 아날로그 신호를 디지털화하기 위해 일정한 간격을 표본화한다. 음악 파일에서 샘플링 레이트라고 하는 것이 이 샘플링의 간격을 의미하며, 1초당 샘플 갯수 Hz(Hertz)단위로 표기한다. CD를 샘플링 레이트인 44100hz는 1초 동안의 아날로그 신호를 44100개의 샘플로 조각내서 디지털 신호로 표현함.

#### 2. 양자화(Quantization)

샘플링된 매우 작은 길이(CD 44.1khz)의 아날로그 신호를, 크기를 나타내는 디지털 신호로 바꾼다.

>[!info] 
>`가청 주파수`는 대략 20hz ~ 20.000hz이다.

>[!info]
>아날로그를 디지털 데이터로 바꿀 때 [나이퀴스트 이론](https://ralasun.github.io/signal%20analysis/2021/07/01/nyq/)에 따르면 디지털 신호로 바꾸고자 하는 주파수의 2배로 샘플링하여 양자화하면 나중에 얻고자하는 신호로 되돌릴 수 있다. 이론상 가청주파수의 2배인 40khz 정도로 샘플을 양자화하면 가청 주파수 대역의 음을 거의 손실없이 복원 가능하다.

#### 3. 부호화(인코딩)

양자화된 값들을 Binary Bit Sequence 로 표현한다.

>[!example]
>CD의 양자화 크기는 16bit, 2 Byte 이므로 각 샘플별로 2 Byte를 사용하게 된다. CD 수준의 음질(16bit, 44.1khz)에서 1초의 음악을 기록하는 데 필요한 용량은 
>$2(스테레오) \cdot 2(양자화 크기) \cdot 44100(샘플링레이트) = 176,00 Byte$
>

가요들이 보통 플레이 타임 4분(240초) 정도를 가지는데, 이를 기록하려고 하면 176,400 * 240 계산으로 대략 42 M Byte 정도의 용량이 필요함을 알 수 있다.

## 질문 & 확장

(없음)

## 출처(링크)

- https://namu.wiki/w/%ED%8E%84%EC%8A%A4%20%EB%B6%80%ED%98%B8%20%EB%B3%80%EC%A1%B0
- https://ralasun.github.io/signal%20analysis/2021/07/01/nyq/
- https://blog.naver.com/lagrange0115/220621104750
## 연결 노트










