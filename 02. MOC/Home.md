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

- 📖 **작성해야 할 노트 갯수**
```dataview
TABLE length(rows) AS "총 갯수"
FROM ""
WHERE completed = false
group by "완료하지 못한 노트"
```

- **최근 작성을 완료 못한 노트**
```dataview
TABLE file.name AS "파일명", file.mtime AS "수정 시간" FROM "" WHERE completed = false SORT file.mtime DESC LIMIT 9
```


- **최근 작성 완료된 노트**
```dataview

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