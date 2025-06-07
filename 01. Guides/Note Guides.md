---
tags:
  - Guide
aliases: 
created: 2025-03-24
title: Note Guides
note-type: GUIDE
---


## Note Guide

### 📅 Daily Notes (일상 노트)

#### Rule

- **역할**: 하루 동안의 짧고 빠른 기록. 생각, 감정, 간단한 할 일, 또는 순간적인 아이디어를 정리.
- **특징**: 형식에 구애받지 않고, 간결하고 즉흥적. 시간 순으로 기록하거나 날짜 별로 묶음.
- **가이드**: 깊이 생각하지 말고, 그날의 흐름을 가볍게 남기는 데 초점. 세부 분석은 다른 노트로 넘김.
- **템플릿 안내**: 별도의 자동화 템플릿 파일은 제공되지 않습니다. 아래는 수동 작성을 위한 기본 구조입니다.

#### 템플릿

```markdown
---
tags: 
  - daily
aliases: 
created: YYYY-MM-DD
title: Daily Notes - YYYY.MM.DD
note-type: DAILY
---

- **[시간]**: [생각/감정/할 일/아이디어]
- **[시간]**: [생각/감정/할 일/아이디어]
- **[시간]**: [생각/감정/할 일/아이디어]
```

#### 예시

```markdown
---
tags: 
  - daily
aliases: 
created: 2025-04-06
title: Daily Notes - 2025.04.06
note-type: DAILY
---

- **08:30**: 아침 커피 마시며 앱 UI 개선 아이디어 떠올림
- **12:00**: 점심 약속 후 팀워크의 중요성 느낌
- **15:00**: 산책 중 새로운 프로젝트 구상
```

---

### 🔬 Solution Notes (솔루션 노트)

#### Rule

- **역할**: **하나의 구체적이고 명확한 문제**나 도전에 대한 나만의 해결책을 체계적으로 정리. 실험적이거나 창의적인 접근 포함.
- **특징**: 문제 정의 → 가설 → 해결 과정 → 결과/반성으로 구조화. 분석적이고 실용적.
- **⚠️ 핵심 제약사항**: 반드시 하나의 문제 인스턴스만 다루며, 여러 관련 문제를 발견할 경우 각각 별도의 Solution Note로 분리해야 함.
- **예시**:
    - ✅ **좋은 예**: "웹사이트 로딩 속도 느림" → 단일 문제에 집중
    - ❌ **나쁜 예**: "웹사이트 성능 최적화" → 너무 포괄적 (로딩 속도, 메모리 사용량, SEO 등 여러 문제 포함 가능)
    - 해결책: "이미지 압축 도구 사용 → 30% 속도 개선."
    - 반성: "다음엔 CDN도 고려."
- **가이드**: 연구나 프로젝트 중 구체적인 문제 해결에 집중. Review Notes와 달리, 이론보다는 실행과 결과 중심.
- **템플릿 사용**: `Solution 템플릿` (예: Templater 플러그인 사용 시) 제목에 🔬 아이콘이 추가되고, 파일은 `04. Practice Notes` 폴더로 자동 이동될 수 있습니다.

#### 템플릿

```markdown
---
tags:
aliases:
created: YYYY-MM-DD
title: 🔬 [문제 제목]
note-type: SOLUTION
completed: false
archive: false
area-reason: "" # 특정 기술 분야나 문제 영역 명시 (예: 웹 성능 최적화)
---

## 문제 정의
- [하나의 구체적인 문제만 명확히 기술]

## 가설
- [해결을 위한 예상 접근법]

## 해결 과정
1. [단계 1]
2. [단계 2]
3. [단계 3]

## 결과/반성
- [결과]
- [개선점 또는 느낀 점]

## 관련 문제
- [해결 과정에서 발견된 추가 문제들은 여기에 나열하고 별도 노트로 작성 예정]
```

#### 예시

**✅ 단일 문제 집중 - 좋은 예시:**

```markdown
---
tags:
aliases:
created: 2025-01-10
title: 🔬 웹사이트 로딩 속도 5초 이상 지연 문제
note-type: SOLUTION
completed: true
archive: false
area-reason: 웹 성능 최적화
---

## 문제 정의
- 메인 페이지 로딩 속도가 평균 5.2초로 너무 느림 (목표: 3초 이내)

## 가설
- 이미지 파일 크기(평균 2MB)가 주요 원인일 가능성
- 압축하지 않은 고해상도 이미지들이 병목 구간

## 해결 과정
1. 페이지 로딩 시간 분석 (Chrome DevTools 사용)
2. 이미지 파일 크기 확인: 평균 2MB → 압축 대상 확인
3. WebP 형식으로 변환 및 압축 (TinyPNG 도구 사용)
4. 압축 후 로딩 속도 재측정

## 결과/반성
- **결과**: 로딩 속도 5.2초 → 3.6초 (30% 개선)
- **성공 요인**: 이미지 압축이 주요 병목이었음을 정확히 파악
- **개선점**: 목표 3초에는 미달, 추가 최적화 필요

## 관련 문제
- CSS 파일 크기 최적화 (별도 노트 예정)
- 서버 응답 시간 개선 (별도 노트 예정)
```

---

### 📝 Common Notes (공부 노트)

#### Rule
- **역할**: 기본적인 학습 내용을 정리. 교과서, 강의, 책 등에서 배운 지식을 체계적으로 기록.
- **특징**: 범용적이지만 구조화된 형식(목차, 요약, 키워드 등)으로 깔끔하게 정리.
- **예시**:
    - 주제: "머신러닝 기초."
    - 내용: "1. 지도 학습: 정의와 예시 (회귀, 분류). 2. 비지도 학습: 클러스터링."
- **가이드**: Common이라는 이름이 너무 포괄적이라 "공부 노트"로 한정. 일상 기록(Daily)이나 프로젝트와 구분되도록 학습 중심으로.
- **템플릿 사용**: `Common 템플릿` (예: Templater 플러그인 사용 시) 파일은 `04. Practice Notes` 폴더로 자동 이동될 수 있습니다. (제목 아이콘 없음)

#### 템플릿

```markdown
---
tags:
aliases:
created: YYYY-MM-DD
title: [학습 주제]
note-type: COMMON
completed: false
---

## 내용
- [주요 학습 내용]

## 질문 & 확장
- [궁금한 점 또는 추가 탐구 방향]

## 출처
```

#### 예시

```markdown
---
tags:
aliases:
created: 2025-04-06
title: 머신러닝 기초
note-type: COMMON
completed: false
---

## 내용
- 1. 지도 학습: 정의와 예시 (회귀, 분류)
- 2. 비지도 학습: 클러스터링

## 질문 & 확장
- 오버피팅 방지 방법은?
```


---


### 🚀 Project Notes (프로젝트 노트)

#### Rule

- **역할**: 진행 중인 프로젝트의 계획, 진행 상황, 마일스톤, 문제점 등을 기록.
- **특징**: 목표 설정 → 타임라인 → 작업 로그 → 피드백으로 구성. 팀 작업 포함 가능.
- **예시**:
    - 프로젝트: "개인 블로그 개발."
    - 목표: "4월 말까지 배포."
    - 진행: "4/6 - 프론트엔드 레이아웃 완성."
    - 문제: "반응형 디자인 미흡."
- **가이드**: 프로젝트의 전반적인 흐름과 상태를 추적. Solution Notes와 달리 단일 문제 해결이 아닌 전체 프로세스 관리.
- **템플릿 안내**: 별도의 자동화 템플릿 파일은 제공되지 않습니다. 아래는 수동 작성을 위한 기본 구조입니다.

#### 템플릿

```markdown
---
tags:
aliases:
created: YYYY-MM-DD
title: [프로젝트 이름]
note-type: PROJECT
status: (예: 진행중, 완료, 보류)
---

## 목표
- [프로젝트 목표]

## 타임라인
- [날짜]: [작업 내용]
- [날짜]: [작업 내용]

## 진행 상황
- [현재 상태/완료된 작업]

## 문제점/피드백
- [발생 문제 또는 개선 필요 사항]
```

#### 예시

```markdown
---
tags:
aliases:
created: 2025-04-05
title: 개인 블로그 개발
note-type: PROJECT
status: 진행중
---

## 목표
- 4월 말까지 배포 완료

## 타임라인
- 2025.04.06: 프론트엔드 레이아웃 설계
- 2025.04.10: 백엔드 API 연결

## 진행 상황
- 프론트엔드 레이아웃 완성

## 문제점/피드백
- 반응형 디자인이 미흡함
```

---

### 📚 Reference Notes (참고 노트)

#### Rule

- **역할**: 외부 자료(인터넷, 논문, 블로그 등)에서 발췌한 내용을 기록. 출처와 함께 간략한 요약 포함.
- **특징**: 원문 인용 + 내 생각 추가. 나중에 다시 참고할 수 있도록 정리.
- **가이드**: 공부 노트와 달리, 내 창작이 아닌 외부 지식의 저장소 역할. 반드시 출처 명시.
- **템플릿 사용**: `Reference 템플릿` (예: Templater 플러그인 및 관련 스크립트 설정 시) 제목에 📚 아이콘이 추가되고, 선택한 `from` 유형에 따라 `05. Reference Notes` 하위 폴더(예: `05. Reference Notes/Book`)로 자동 이동될 수 있습니다.

#### 제목 규칙 및 Frontmatter
- **파일 제목 (자동 생성)**: `📚 [자료 제목]`
- **`from` 필드 (필수)**: 자료의 유형을 `VIDEO`, `Lecture`, `Book`, `Blog`, `Paper`, `Web` 중에서 선택하여 frontmatter의 `from` 필드에 기록합니다. 이 값에 따라 저장 폴더가 결정됩니다.

- **형식**: 자료 제목 (출처 정보)
    - 자료 제목: 자료의 실제 제목이나 주제를 간략히 요약.
    - (출처 정보): 출처의 구체적인 이름, 저자, 플랫폼 등 간단히 포함.
- **from:** - [유형]: 자료의 형태를 나타냄 (예: Video, Book, Blog, Paper, Lecture 등)
- **목적**: 제목만 봐도 자료 유형과 출처를 파악할 수 있도록 함.
- **추가 고려사항**:
    - 연도나 버전이 중요한 경우 (출처 정보) 뒤에 (YYYY) 추가 가능.
    - 제목이 너무 길면 핵심만 남기고 축약.

#### 제목 예시

1. **유튜브 동영상**: [Video] AI Ethics Explained (TED Talks)
2. **강의**: [Lecture] Machine Learning Basics (Coursera - Andrew Ng)
3. **책**: [Book] Deep Work (Cal Newport)
4. **블로그**: [Blog] Git Best Practices (Medium - John Doe)
5. **논문**: [Paper] Attention Is All You Need (Vaswani et al., 2017)
6. **기타 웹사이트**: [Web] Python Tips (Real Python)



```markdown
---
tags:
aliases:
created: YYYY-MM-DD
title: 📚 [자료 제목]
note-type: REF
from: [VIDEO|Lecture|Book|Blog|Paper|Web]
---

## 출처
- [링크 또는 출처 정보]

## 요약
- [내용 요약]

## 코멘트
- [내 생각 또는 활용 방안]
```

#### 예시

##### 1. 유튜브 동영상

```markdown
---
tags:
aliases: 
created: 2025-04-06
title: 📚 AI Ethics Explained (TED Talks)
note-type: REF
type: Video
---

## 출처
- https://www.youtube.com/watch?v=xxxx

## 요약
- AI 윤리 문제와 실질적인 해결 방안 제시

## 코멘트
- 내 프로젝트에서 윤리적 데이터 사용 고민 필요
```

##### 2. 강의

```markdown
---
tags:
aliases: 
created: 2025-04-06
title: 📚 Machine Learning Basics (Coursera - Andrew Ng)
note-type: REF
from: Lecture
---

## 출처
- Coursera 강의: Machine Learning by Andrew Ng

## 요약
- 지도 학습과 비지도 학습의 기본 개념 설명

## 코멘트
- 오버피팅 방지법 추가 학습 필요
```

##### 3. 책

```markdown
---
tags:
aliases: 
created: 2025-04-12
title: 📚 아토믹 해비츠 - 제1장 요약
note-type: REF
from: Book
---

## 출처
- 아토믹 해비츠, 제1장: 작은 변화의 놀라운 힘, pp. 15-30

## 요약
- **핵심 주제**: 작은 습관의 지속이 삶에 큰 변화를 만든다.
- **주요 내용**:
  - 매일 조금씩 개선하면 장기적으로 놀라운 결과를 얻는다.
  - 습관은 결과보다 시스템에 집중할 때 효과적이다.
  - 작은 변화는 처음엔 눈에 띄지 않지만 복리처럼 누적된다.
- **키워드**: 1% 개선, 복리 효과, 시스템 중심

## 주요 인용
- "매일 1%씩 나아지면 1년 뒤 당신은 37배 더 나아질 것이다." (p. 16)
- "습관은 복리의 마법과 같다. 처음엔 눈에 띄지 않지만 시간이 갈수록 엄청난 결과를 낸다." (p. 18)
- "결과에 집중하지 말고 시스템에 집중하라." (p. 25)
- "작은 변화는 대개 즉각적인 보상을 주지 않는다. 하지만 인내하면 보상이 온다." (p. 27)

## 코멘트
- **인사이트**: 내가 실패했던 건 큰 목표만 쫓아서였다는 점을 깨달음.
- **활용 방안**: 매일 아침 5분 명상으로 습관 쌓기 시작.
- **질문**: 습관을 놓쳤을 때 다시 시작하는 법은?
```

##### 4. 블로그

```markdown
---
tags:
aliases: 
created: 2025-04-06
title: 📚 Git Best Practices (Medium - John Doe)
note-type: REF
from: Blog
---

## 출처
- https://medium.com/@johndoe/git-best-practices

## 요약
- Git 커밋 메시지 작성법과 브랜치 전략

## 코멘트
- 팀 프로젝트에서 브랜치 전략 참고
```

##### 5. 논문

```markdown
---
tags: [reference]
aliases: 
created: 2025-04-06
title: 📚 Attention Is All You Need (Vaswani et al., 2017)
note-type: REF
from: Paper
---

## 출처
- 논문: "Attention Is All You Need", DOI: 10.48550/arXiv.1706.03762

## 요약
- Transformer 모델의 Attention 메커니즘 소개

## 코멘트
- NLP 프로젝트에 적용 가능성 탐구
```


---

### ⌨️ Code Notes (코드 노트)

#### Rule

- **역할**: 코딩 관련 기록. 코드 스니펫, 디버깅 과정, 라이브러리 사용법 등 포함.
- **특징**: 코드 + 주석 + 실행 결과로 구성. 기술적인 세부사항 중심.
- **예시**:
    - 코드: def calculate_sum(a, b): return a + b
    - 주석: "간단한 합계 함수."
    - 결과: "calculate_sum(3, 4) → 7."
- **가이드**: 프로젝트 노트와 달리, 특정 기능 구현이나 코드 학습에 초점. 가독성을 위해 주석 필수.
- **템플릿 사용**: `Code 템플릿` (예: Templater 플러그인 사용 시) 제목이 `⌨️ [원래 제목]_[언어] (YYYY-MM-DD)` 형식으로 자동 생성 (이때 `language` 필드 값 참조 가능)되고, 파일은 `04. Practice Notes` 폴더로 자동 이동될 수 있습니다.

#### 템플릿

```markdown
---
tags:
aliases: 
created: YYYY-MM-DD
title: ⌨️ [코드 주제]_[언어] (YYYY-MM-DD) # 예: ⌨️ 데이터 정렬_python (2024-07-15)
note-type: CODE
language: "" # 프로그래밍 언어 약자 (예: py, js, java)
completed: false
archive: false
area-reason: "" # 특정 기술 스택이나 프로젝트 영역 명시 (예: Django, 개인 프로젝트)
---

## 코드

### Code
```[언어] 
# 여기에 코드를 작성하세요.
print("Hello, World!")
```

### 결과
```text
# 코드 실행 결과를 여기에 작성하세요.
Hello, World!
```

## 설명
[코드에 대한 상세 설명, 주요 로직, 사용법 등을 작성합니다.]
```

#### 예시

```markdown
---
tags:
  - python
  - algorithm
aliases: 
created: 2025-04-10
title: ⌨️ 간단한 합계 함수_py (2025-04-10)
note-type: CODE
language: py
completed: true
archive: false
area-reason: Python 기본 학습
---

## 코드

### Code
```python
def calculate_sum(a, b):
    """두 숫자를 더한 값을 반환합니다."""
    return a + b
```

### 결과
```text
result = calculate_sum(3, 4)
# result는 7이 됩니다.
```

## 설명
`calculate_sum` 함수는 두 개의 숫자 인자 `a`와 `b`를 받아 그 합을 반환하는 간단한 Python 함수입니다. 
예시로 `calculate_sum(3, 4)`를 호출하면 `7`이 반환됩니다.
```

---

### 🔍 Review Notes (검토 노트)

#### Rule

- **역할**: 기존 작업, 자료, 프로젝트 등을 되돌아보며 분석하고 개선점을 찾는 노트.
- **특징**: 회고적이고 탐색적. "무엇이 잘됐나? 무엇을 바꿀까?"에 집중.
- **예시**:
    - 검토 대상: "3월 프로젝트."
    - 분석: "UI는 만족스러웠으나 서버 비용 초과."
    - 개선: "클라우드 최적화 필요."
- **가이드**: Solution Notes와 달리, 실행보다는 반성과 평가 중심. 과거를 돌아보고 미래를 준비.
- **템플릿 사용**: `Review 템플릿` (예: Templater 플러그인 사용 시) 제목에 🔍 아이콘이 추가되고, 파일은 `04. Practice Notes` 폴더로 자동 이동될 수 있습니다.

#### 템플릿

```markdown
---
tags:
aliases:
created: YYYY-MM-DD
title: 🔍 [검토 대상]
note-type: REVIEW
completed: false
---

## 분석
- [분석 내용]

## 개선점
- [개선할 점]
```

#### 예시

```markdown
---
tags:
aliases:
created: 2025-04-10
title: 🔍 3월 프로젝트 회고
note-type: REVIEW
completed: true
---

## 분석
- UI는 사용자 만족도 높았음
- 서버 비용이 예산 초과

## 개선점
- 클라우드 사용 최적화 필요
```

#### 예시

---

### 🗺️ Guide Notes (가이드 노트)

- **역할**: 다른 사람이나 미래의 나를 위한 안내서. 절차, 팁, 지침 등을 상세히 작성.
- **특징**: 단계별 설명 + 시각적 보조(다이어그램 등 가능). 실용적이고 명확.
- **가이드**: 추상적이지 않도록, 특정 주제에 대한 명확한 지침서로 한정. 다른 노트와 달리 "전달" 목적. 이 `Note Guides` 파일 자체가 Guide 노트의 예시입니다.
- **템플릿 안내**: 별도의 자동화 템플릿 파일은 제공되지 않습니다. 아래는 수동 작성을 위한 기본 구조이며, 현재 이 `Note Guides` 파일의 frontmatter를 참고할 수 있습니다.

#### 템플릿

```markdown
---
tags:
  - Guide
aliases: 
created: YYYY-MM-DD
title: [가이드 제목]
note-type: GUIDE
---

## [가이드 섹션 1 제목]
- [내용]

## [가이드 섹션 2 제목]
- [내용]
```

#### 예시

```markdown
---
tags:
  - Guide
aliases: 
created: 2025-03-24
title: Obsidian 초기 설정 가이드
note-type: GUIDE
---

## 설치 및 기본 설정
1. Obsidian 설치
2. 기본 테마 설정
3. 자주 사용하는 플러그인 설치

## 노트 작성 규칙 안내
- 폴더 구조
- 파일명 규칙
```

---

### 🏛️ MOC Notes (Map of Content 노트)

#### Rule
- **역할**: 관련된 개별 노트들을 주제별, 카테고리별로 연결하여 구조화하는 인덱스 페이지.
- **특징**: 개별 노트로의 링크 중심으로 구성. 내용보다는 연결과 구조에 집중.
- **가이드**: `01. Guides/MOC Guides.md` 파일에서 MOC 작성 원칙 및 활용법을 참고하십시오.
- **템플릿 사용**: `MOC 템플릿` (예: Templater 플러그인 사용 시) 제목에 🏛️ 아이콘이 추가되고, `cssclasses: dashboard`가 적용되며, 파일은 `02. MOC` 폴더로 자동 이동될 수 있습니다.
