---
tags:
  - DataBase
aliases: null
title: TSDB
created: 2023-12-15T00:00:00.000Z
note-type: COMMON
completed: true
---
작성 날짜: 2023-12-15
작성 시간: 13:01


----
## 내용(Content)

### 시계열 데이터란(Time Series Data)
시계열 데이터는 시간에 따라 저장된 데이터이다. 시계열 데이터는 시간이 지남에 따라 만들어지는 데이터들로 구성되기 때문에 시간 경과에 따른 결과를 추적하는데 용이하다.

시계열 데이터는 많은 곳에서 쉽게 찾아볼 수 있다. 예를 들면 환자의 심장 박동수, 회사의 주가 또는 IOT 센서의 시간별로 온도, 습도 측정과 같은 것이다.

시계열 데이터를 저장하는 이유는 시간의 흐름에 따라 데이터를 분석하고 특정 상황에 대해 예측하기 위함일 것이다.

<br></br>
### 시계열 데이터베이스(Time Series Database)
TSDB는 Time Series DataBase 의 약자로 시계열 데이터를 저장하고 처리하는데 최적화된 데이터베이스이다. 실시간으로 쌓이는 데이터를 빠르고 정확하게 처리할 수 있도록 고안되었다. 시계열 데이터를 목적으로 처리하기 때문에 주된 작업은 Insert와 Delete이다.

TSDB가 중요해진 이유는 오늘날에 많은 시계열 데이터들을 수집하고 있기 때문이다.  AI발달에 따라 데이터의 수요와 공급이 급증하고, 이를 처리하기에는 RDB나 NoSQL로도 한계가 있다.
예를 들어 자율주행과 같은 데이터는 엄청난 용량의 데이터를 만들어낸다.  시계열 데이터에서는 분기 또는 개월별로 데이터를 요약하는 통계 관련 처리 및 샘플링 관련해서 굉장히 빠르게 처리되도록 만들어졌다.

<br></br>
### TSDB의 특징

#### Time Based Storage
TSDB가 다른 DB와 차별되는 아키텍처 디자인 특징이 있다. 바로 time-stamp를 기반으로 하는 저장소를 가지고 있다는 점이다. 이를 통해 대규모의 데이터를 압축하고 요약하는 등의 작업을 진행하고, 대규모의 시간 데이터들을 쉽게 다루고, 시간 기반 쿼리를 빠르게 수행할 수 있다.

![[InfluxDB 저장 방식(draw).svg]]

이렇게 시간을 기반으로 데이터를 분할해서 저장하기 때문에 메모리에 로드되는 데이터 양을 줄일 수 있고, 자체적으로 최적화된 압축 알고리즘을 사용해서 비용을 최소화한다.

#### 빠른 쿼리 속도

[Comparison of Relational and Time-Series Databases for Real-Time Massive Datasets](https://bib.irb.hr/datoteka/1015968.06_cts_5558.pdf) 해당 자료에 의하면 시계열 데이터가 많아질수록 기존 db들과 tsdb의 차이점이 두드러진다.

![[Pasted image 20231215144042.png]]

![[Pasted image 20231215144050.png]]


tsdb(InfluxDB)와 NoSQL 비교 그래프이다. 이것 말고도 여러가지 비교들이 있지만 성능을 보았을 때 데이터가 쌓이면 InfluxDB가 성능이 좋음을 알 수 있다.

#### 다양한 자동화 기능

시계열 데이터 분석에는 데이터 요약이나, 통계와 같은 작업이 요구된다. TSDB는 특정 주기마다 자동으로 데이터를 처리하거나 오래된 데이터는 삭제하는 등 편의성을 제공한다.(InfluxDB)

#### 단점

TSDB는 시계열데이터 맞춤으로 설계된 DB이기 때문에 다음과 같은 단점들이 존재한다.

- INSERT와 SELECT 최적화를 위해 DELETE나 UPDATE가 제한된다
- 시간에 따른 데이터를 오름차순으로 정렬하기 때문에 임의 시간에 대해서 읽고 쓰는 작업은 효율이 떨어짐

## 질문 & 확장

(없음)

## 출처(링크)
- https://www.influxdata.com/time-series-database/
- https://mangkyu.tistory.com/188

## 연결 노트










