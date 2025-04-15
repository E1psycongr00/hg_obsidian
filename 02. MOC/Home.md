---
tags:
  - MOC
aliases: 
date: 2025-03-20
title: Home
cssclasses:
  - dashboard
---

## 노트 리스트

- 📖 **작성 현황**
```dataviewjs
// 데이터 수집: completed = true인 파일을 created 날짜 기준으로 주 단위 그룹화
const pages = dv.pages("")
  .where(p => p.completed === true && p.created != null);

// 주 단위로 그룹화 (yyyy-WW 포맷)
const grouped = pages
  .groupBy(p => dv.date(p.created).toFormat("yyyy-WW"))
  .sort(g => g.key, "asc");

// 라벨 (날짜: yyyy-WW)과 데이터 (완료된 파일 수) 준비
const weekLabels = grouped.map(g => g.key).values;
const noteCounts = grouped.map(g => g.rows.length).values;

// 차트 데이터 구성
const chartData = {
    type: 'line',
    data: {
        labels: weekLabels,
        datasets: [{
            label: '완료된 노트 수',
            data: noteCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            fill: false,

window.renderChart(chartData, this.container);
```


- 📖 **작성 노트 갯수**
```dataview
TABLE length(rows) AS "총 갯수"
FROM ""
WHERE completed = false
group by "완료하지 못한 노트"
```

- 📖 **작성 중인 노트**
```dataview
TABLE file.name AS "파일명", file.mtime AS "수정 시간" FROM "" WHERE completed = false SORT file.mtime DESC LIMIT 9
```

- 📖 **최근 작성했된 노트**
```dataview
TABLE file.name AS "파일명", created AS "작성 완료 날짜" FROM "" WHERE completed = true SORT created DESC LIMIT 5
```

- 📖 **노트 작성 및 관리 가이드**
```dataview
LIST file.name
where contains(file.name, "Guides")
```


## 학습 가이드

### 전기 관련

- 📖 **전기기사**
	- [[전기 기사 MOC]]
	- [[전자기학 MOC]]
	- [[전력 공학 MOC]]
	- [[전기 기기 MOC]]
	- 회로 이론 MOC
	- 제어 공학 MOC