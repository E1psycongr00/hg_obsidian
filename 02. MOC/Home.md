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


- 📖 **작성 노트 갯수**
```dataview
TABLE length(rows) AS "총 갯수"
FROM ""
WHERE completed = false
group by "완료하지 못한 노트"
```

- 📖 **작성 중인 노트**
```dataview
TABLE file.name AS "파일명", created AS "작성 완료 날짜" FROM "" WHERE completed = false SORT file.mtime DESC LIMIT 9
```

- 📖 **최근 작성한 노트 (상위 5개)**
```dataview
TABLE file.name AS "파일명", created AS "작성 완료 날짜" FROM "" SORT created DESC LIMIT 5
```

- 📖 **노트 작성 및 관리 가이드**
```dataview
LIST file.name
where contains(file.name, "Guides")
```


## 학습

### 전기 관련

- 📖 **전기기사**
	- [[🏛️ 전기 기사]]
	

### IT

- 📖 **객체지향**
	- [[02. MOC/🏛️ 오브젝트 - 조용호|🏛️ 오브젝트 - 조용호]]
- 📖 **Java**
	- [[02. MOC/🏛️ Java 버전별 패치 및 마이그레이션 가이드|🏛️ Java 버전별 패치 및 마이그레이션 가이드]]
- 📖 **클린 코드**
	- [[02. MOC/🏛️ GoF 디자인 패턴|🏛️ GoF 디자인 패턴]]