작성 날짜: 2023-12-18
작성 시간: 12:59

## 주제: #미완 #솔루션 #Error #Docker 

----

## 문제 & 원인
```yaml
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
  
networks:
  monitoring:
    external: true
```

이렇게 작성하는데 다음과 같은 에러 
## 해결 방안


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
