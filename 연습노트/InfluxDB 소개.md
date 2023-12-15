작성 날짜: 2023-12-15
작성 시간: 12:54

## 주제: #미완 #DataBase

----
## 내용(Content)

- InfluxDB는 Time Series Data를 처리하기 위해 고안된 TSDB 중 하나이다. 
- 2013년에 Go 언어로 개발된 오픈소스 DB이다. 
- InfluxDB는 Tick Stack (Telegrapf, InfluxDB, CronoGraf, Kapacitor)의 필수 컴포넌트 중 하나로 쓰인다. 
- 분산환경과 스케일링을 지원하며 Restful API를 제공해서 API 통신이 가능하다.

![[Pasted image 20231215163308.png]]

TICK Stack 기반으로 구축한 시스템

- Telegraf는 Metrics와 Events를 수집
- InfluxDB는 TimeSeries Data를 관리
- Kapacitor: Real - time 스트리밍 전송 엔진
- Chronograf: 시각화 도구

### InfluxDB가 제공하는 핵심 기능

- 일정 주기마다 자동으로 새롭게 데이터를 저장
- 일정 주기마다 자동으로 오래된 데이터를 삭제

### InfluxDB와 RDB 용어 비교

| RDB               | Influx DB              |
| ----------------- | ---------------------- |
| database          | database               |
| table             | measurement            |
| row               | point                  |
| indexed columns   | tags(string type only) |
| unindexed columns | fields                 |

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
- [[TSDB란]]









