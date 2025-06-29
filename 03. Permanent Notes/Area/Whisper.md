---
tags:
  - AI
  - OpenAI
  - Whisper
  - STT
aliases: null
title: Whisper
created: 2024-05-21T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2024-05-21
작성 시간: 17:03


----
## 내용(Content)

### Whisper

>[!summary]
>Whisper는 범용 음성 인식 모델입니다. 다양한 오디오의 대규모 데이터 세트에 대해 훈련되었으며 다국어 음성 인식, 음성 번역 및 언어 식별을 수행할 수 있는 멀티태스킹 모델이기도 하다.

Whisper는 OpenAI에서 만든 오픈소스로 TTS, STT등에 사용된다. chatgpt 모바일 버전에서 대화 음성을 인식할 때 Whisper를 사용한다.

### Whisper로 Speech To Text

Whisper를 사용하면 3가지 환경으로 음성 파일에서 텍스트를 추출할 수 있다.

1. 로컬 환경
2. Colab을 이용한 환경
3. Whisper API를 활용하기

3번이 가장 효율이 좋지만 유료다. 1번의 경우 본인이 가진 GPU의 성능에 따라 추출 속도가 좌우되는데 높은 성능이 요구되기 때문에 초기 투자 비용이 높다. 2번 Colab의 경우, 무료이면서 꽤나 성능이 괜찮은 GPU를 무료로 사용할 수 있기 때문에 가장 비용이 저렴하다는 특성이 있다.

|             | 초기 비용 | 비용                    | 속도  |
| ----------- | ----- | --------------------- | --- |
| Local       | 높음    | 없음(전기비?)              | 가변  |
| Colab       | X     | 없음                    | 중간  |
| Whisper API | X     | 음성 파일에 따라 발생하는 비용이 발생 | 빠름  |


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트

- [[03. Permanent Notes/Area/Colab으로 Whisper 이용해 STT 수행하기]]









