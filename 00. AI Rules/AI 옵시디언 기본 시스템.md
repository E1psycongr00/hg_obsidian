## 1. 가이드 목적

이 문서는 AI가 Obsidian에서 노트를 관리하고 생성할 때 필요한 모든 **기본 시스템 규칙**을 정의하는 **단일 참조점(Single Source of Truth)** 입니다. AI는 이 문서에 명시된 모든 규칙을 절대적인 기준으로 삼아 일관성 있는 지식 관리 시스템을 구축해야 합니다.

## 2. Frontmatter 규칙

AI는 노트 생성 시, 다음 각 `note-type`에 맞는 Frontmatter 구조를 **반드시 엄격하게 준수**해야 합니다. 모든 필드와 값은 아래에 정의된 형식을 따라야 하며, 특히 `created` 필드는 **실제 생성 당일의 날짜**를 `YYYY-MM-DD` 형식으로 사용해야 합니다.

---

### 📅 DAILY Note
```yaml
---
tags:
  - daily
aliases: []
created: YYYY-MM-DD
title: "Daily Notes - YYYY.MM.DD"
note-type: DAILY
---
```

### 🔬 SOLUTION Note
```yaml
---
tags: []
aliases: []
created: YYYY-MM-DD
title: "🔬 [문제 제목]"
note-type: SOLUTION
completed: false
archive: false
area-reason: ""
---
```

### 📝 COMMON Note
```yaml
---
tags: []
aliases: []
created: YYYY-MM-DD
title: "[학습 주제]"
note-type: COMMON
completed: false
---
```

### 🚀 PROJECT Note
```yaml
---
tags: []
aliases: []
created: YYYY-MM-DD
title: "[프로젝트 이름]"
note-type: PROJECT
status: "진행중"
---
```

### 📚 REF Note
```yaml
---
tags: []
aliases: []
created: YYYY-MM-DD
title: "📚 [자료 제목]"
note-type: REF
from: "" # [VIDEO|Lecture|Book|Blog|Paper|Web]
---
```

### ⌨️ CODE Note
```yaml
---
tags: []
aliases: []
created: YYYY-MM-DD
title: "⌨️ [코드 주제]_[언어] (YYYY-MM-DD)"
note-type: CODE
language: "" # [py|js|java|etc.]
completed: false
archive: false
area-reason: ""
---
```

### 🔍 REVIEW Note
```yaml
---
tags: []
aliases: []
created: YYYY-MM-DD
title: "🔍 [검토 대상]"
note-type: REVIEW
completed: false
---
```

### 🗺️ GUIDE Note
```yaml
---
tags:
  - Guide
aliases: []
created: YYYY-MM-DD
title: "[가이드 제목]"
note-type: GUIDE
---
```

### 🏛️ MOC Note
```yaml
---
tags: []
aliases: []
created: YYYY-MM-DD
title: "🏛️ [주제명] MOC"
note-type: MOC
cssclasses:
  - dashboard
scope: ""
---
```

## 3. 폴더 구조 및 배치 규칙

모든 노트는 다음 폴더 구조 및 규칙에 따라 정확한 위치에 생성되거나 이동되어야 합니다.

### System (시스템 폴더)
- **`attachments`**: 이미지, PDF 등 모든 외부 파일 저장
- **`excalidraw`**: Excalidraw 다이어그램 파일 저장
- **`templates`**: 마크다운 템플릿 파일 저장

### My Notes (개인 노트 폴더)
| 폴더 경로 | 노트 유형 (`note-type`) | 설명 |
|---|---|---|
| **`01. Guides`** | `GUIDE` | 각종 가이드 문서 보관 |
| **`02. MOC`** | `MOC` | Map of Content 노트 보관 |
| **`03. Permanent Notes`** | - | 내용 작성이 완료된 영구 보관용 노트 |
| **`04. Practice Notes`** | `SOLUTION`, `COMMON`, `CODE`, `REVIEW` | 아이디어를 발전시키거나 작성 중인 노트의 작업 공간 |
| **`05. Reference Notes`** | `REF` | 외부 자료에서 발췌/요약한 참고용 노트 보관 |
| **`06. Code Notes`** | - | 재사용 가능한 코드 스니펫 아카이브 |
| **`07. Solution Notes`**| - | 솔루션 노트 아카이브 (현재 `03`으로 통합) |
| **`09. PARA/1.Projects/`**| `PROJECT` | 프로젝트별 폴더에 프로젝트 노트 저장 |
| (일일 노트 설정 폴더) | `DAILY` | Daily Note 플러그인 설정에 따름 |


## 4. 태그 사용 지침

### 기본 원칙
1. **소문자 사용**: 모든 태그는 소문자로 작성합니다.
2. **하이픈(-) 연결**: 여러 단어는 하이픈으로 연결합니다 (예: `web-development`).
3. **일관성 유지**: 동일 주제에는 일관된 태그를 사용합니다 (예: `js` 대신 `javascript`).
4. **띄어쓰기 금지**: 태그에는 띄어쓰기를 사용하지 않습니다.

### 주요 사용 태그 예시
- **노트 타입 관련**: `daily`, `guide` 등
- **기술 스택 관련**: `python`, `javascript`, `java`, `spring`, `react`
- **학문 분야 관련**: `algorithm`, `web-development`, `database`, `network`
- **상태 관련**: `completed`, `in-progress`, `archived`

## 5. MOC (Map of Content) 핵심 원칙

### MOC 정의
MOC(Map of Content)는 개별 노트들을 주제별로 연결하여 구조화하는 **인덱스 페이지**입니다. 내용 요약보다는 링크 중심으로 전체적인 맥락과 관계를 보여주는 데 중점을 둡니다.

### 5가지 핵심 원칙
1. **연결 중심**: 개별 노트로의 링크를 중심으로 구성하며, 상세 내용은 링크된 노트에 위임합니다.
2. **구조화**: 주제별, 카테고리별로 체계적으로 분류하여 접근성을 높입니다.
3. **간결성**: 내용보다는 연결과 구조에 집중합니다.
4. **계층성**: 필요시 하위 MOC를 만들어 계층적 구조를 형성할 수 있습니다.
5. **지속적 업데이트**: 새로운 노트가 생성되면 관련 MOC에 링크를 추가하여 항상 최신 상태를 유지합니다.

### MOC 템플릿
```markdown
---
tags: []
aliases: []
created: YYYY-MM-DD
title: "🏛️ [주제명] MOC"
note-type: MOC
cssclasses:
  - dashboard
scope: "[이 MOC가 다루는 주제의 구체적인 범위 명시]"
---

## 개요
[이 MOC가 다루는 주제에 대한 간략한 설명]

## 핵심 노트
- [[링크]]

## 하위 주제
### [하위 주제 1]
- [[링크]]

### [하위 주제 2]
- [[링크]]

## 참고 자료
- [[링크]]
```

## 6. 노트 유형별 핵심 정의

| 아이콘 | 노트 유형 (`note-type`) | 핵심 목적 및 역할 |
|:---:|---|---|
| 📅 | **DAILY** | 하루 동안의 생각, 감정, 할 일 등을 **신속하게 기록**하는 휘발성 메모 |
| 🔬 | **SOLUTION** | **하나의 구체적인 문제**에 대한 해결책을 탐구하고 기록 |
| 📝 | **COMMON** | 새로운 지식을 학습하고 이해한 내용을 **자신의 언어로 체계적으로 정리** |
| 🚀 | **PROJECT** | 특정 목표를 가진 프로젝트의 **전 과정을 추적하고 관리** |
| 📚 | **REF** | 외부 자료(책, 논문, 웹 등)의 핵심 내용을 **요약, 인용, 기록** |
| ⌨️ | **CODE** | 코드 스니펫, 알고리즘, 라이브러리 사용법 등 **재사용 가능한 기술 정보 기록** |
| 🔍 | **REVIEW** | 완료된 작업, 프로젝트, 학습 과정 등을 **되돌아보며 분석하고 평가** |
| 🗺️ | **GUIDE** | 특정 절차나 지식을 다른 사람이나 미래의 나를 위해 **안내하는 문서** |
| 🏛️ | **MOC** | 관련된 개별 노트들을 주제별로 **연결하고 구조화하는 허브** | 