작성 날짜: 2023-12-18
작성 시간: 12:19

## 주제: #미완 #Docker #Grafana #인프라 
----
## 내용(Content)
### influxdb와 grafana를 연결하는 이유
influxdb는 TSDB로 대규모 시계열 데이터를 처리하는데 특화된 Database이다. 시계열 데이터에 대한 쿼리나 데이터 삽입의 편의성을 제공하지만, 단점은 시각화를 지원하지 않는다. Grafana는 공식적으로 InfluxDB에 대한 시각화 대시보드를 제공한다

### Docker를 이용해 인프라 구축하기

Docker를 활용하면 로컬 환경, 배포 환경에 상관없이 구축 가능하기 때문에 매우 편리하다.  Docker를 이용해 InfluxDB와 Grafana 이미지를 생성하고 인프라를 구축해보자

#### docker-compose

```yml
version: "3.7"

services:
  influxdb:
    image: bitnami/influxdb:latest
    container_name: influxdb
    ports:
      - "8086:8086"
    networks:
      - monitoring
    environment:
      - INFLUXDB_ADMIN_USER_PASSWORD=bitnami123
      - INFLUXDB_ADMIN_USER_TOKEN=admintoken123
      - INFLUXDB_HTTP_AUTH_ENABLED=false
      - INFLUXDB_DB=myk6db
  grafana:
    image: bitnami/grafana:latest
    container_name: grafana
    ports:
      - "3005:3005"
    networks:
      - monitoring
    depends_on:
      - influxdb
```

docker container들을 편리하게 생성 및 관리하기 위해 docker-compose를 작성해준다.

그 이후 실행하면 다음과 같다.

## 질문 & 확장

(없음)

## 출처(링크)
- https://velog.io/@makengi/InfluxDB-InFluxDB-Java-%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8
- https://2juhyunju.tistory.com/46

## 연결 노트
- [[InfluxDB 소개]]


