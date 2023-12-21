작성 날짜: 2023-12-21
작성 시간: 17:37

## 주제: #미완 #Docker #DataBase 

----
## 내용(Content)
### influxdb v2
influxdb v2는 influxdb v1과 달리 web ui로 손 쉽게 상호 작용이 가능하고,  좀 더 쉬운 쿼리를 제공한다.  web ui 제공은 dashboard도 제공하기 때문에 데이터 시각화도 Flux와 함께 표현 가능하다.

[Influx v2 공식 사이트](https://docs.influxdata.com/influxdb/v2/)

### docker compose 로 influxdb v2 build하기
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
      - INFLUXDB_ADMIN_USER_PASSWORD=admin123
      - INFLUXDB_ADMIN_USER_TOKEN=admintoken123
      - INFLUXDB_HTTP_AUTH_ENABLED=false
      - INFLUXDB_DB=myk6db
    volumes:
      - ./influx-persistance:/bitnami/influxdb
  grafana:
    image: bitnami/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    networks:
      - monitoring
    depends_on:
      - influxdb
    volumes:
      - ./data:/var/lib/grafana
  
networks:
  monitoring:
    external: true
```

bitnami는 최신 influxdb를 간단하게 image로 빌드가 가능하다. 

### xk6 build하기

k6 만으로는 Influxdb v2에 접근할 수 없다. extend 버전이 필요한데 이것은 Go를 이용해 xk6 바이

## 질문 & 확장

(없음)

## 출처(링크)
- https://docs.influxdata.com/platform/
- https://k6.io/docs/results-output/real-time/influxdb/


## 연결 노트










