---
tags:
  - Guide
aliases: 
created: 2025-03-24
title: Note Guides
note-type: GUIDE
---


---

## Note Guide
### 📅 Daily Notes (일상 노트)

#### Rule

- **역할**: 하루 동안의 짧고 빠른 기록. 생각, 감정, 간단한 할 일, 또는 순간적인 아이디어를 정리.
- **특징**: 형식에 구애받지 않고, 간결하고 즉흥적. 시간 순으로 기록하거나 날짜 별로 묶음.
- **예시**:
    - "2025.04.06 - 아침에 커피 마시며 아이디어 떠올림: 앱 UI 개선."
    - "점심 약속 후 느낀 점: 팀워크 중요성."
- **가이드**: 깊이 생각하지 말고, 그날의 흐름을 가볍게 남기는 데 초점. 세부 분석은 다른 노트로 넘김.

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

- **역할**: 특정 문제나 도전에 대한 나만의 해결책을 체계적으로 정리. 실험적이거나 창의적인 접근 포함.
- **특징**: 문제 정의 → 가설 → 해결 과정 → 결과/반성으로 구조화. 분석적이고 실용적.
- **예시**:
    - 문제: "웹사이트 로딩 속도 느림."
    - 해결책: "이미지 압축 도구 사용 → 30% 속도 개선."
    - 반성: "다음엔 CDN도 고려."
- **가이드**: 연구나 프로젝트 중 구체적인 문제 해결에 집중. Review Notes와 달리, 이론보다는 실행과 결과 중심.

#### 템플릿

```markdown
---
tags:
aliases:
created:YYYY-MM-DD
title: [문제 제목]
note-type: SOLUTION
---

## 문제 정의
- [문제 설명]

## 가설
- [해결을 위한 예상 접근법]

## 해결 과정
1. [단계 1]
2. [단계 2]
3. [단계 3]

## 결과/반성
- [결과]
- [개선점 또는 느낀 점]
```

#### 예시

```markdown
---
tags:
aliases:
created:2015-02-11
title: 웹사이트 로딩 속도 느림
note-type: SOLUTION
---

## 문제 정의
- 웹사이트 로딩 속도가 평균 5초 이상 걸림

## 가설
- 이미지 파일 크기가 주요 원인일 가능성

## 해결 과정
1. 이미지 파일 크기 확인
2. 이미지 압축 도구 사용
3. 압축 후 로딩 속도 테스트

## 결과/반성
- 30% 속도 개선됨
- 다음엔 CDN 도입도 고려
```

---

### 📝 Common Notes (공부 노트)

- **역할**: 기본적인 학습 내용을 정리. 교과서, 강의, 책 등에서 배운 지식을 체계적으로 기록.
- **특징**: 범용적이지만 구조화된 형식(목차, 요약, 키워드 등)으로 깔끔하게 정리.
- **예시**:
    - 주제: "머신러닝 기초."
    - 내용: "1. 지도 학습: 정의와 예시 (회귀, 분류). 2. 비지도 학습: 클러스터링."
- **가이드**: Common이라는 이름이 너무 포괄적이라 "공부 노트"로 한정. 일상 기록(Daily)이나 프로젝트와 구분되도록 학습 중심으로.

```markdown
---
tags:
aliases:
created:YYYY-MM-DD
title: [문제 제목]
note-type: COMMON
---

## 내용
- [주요 학습 내용]

## 질문 & 확장
- [궁금한 점 또는 추가 탐구 방향]

## 출처
```

#### 예시

```
---
tags:
aliases:
created: 2025-04-06
title: 머신러닝 기초
note-type: COMMON
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

```markdown
---
tags:
aliases:
created:YYYY-MM-DD
title: [프로젝트 이름]
note-type: PROJECT
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
title: [프로젝트 이름]
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

- **역할**: 외부 자료(인터넷, 논문, 블로그 등)에서 발췌한 내용을 기록. 출처와 함께 간략한 요약 포함.
- **특징**: 원문 인용 + 내 생각 추가. 나중에 다시 참고할 수 있도록 정리.
- **가이드**: 공부 노트와 달리, 내 창작이 아닌 외부 지식의 저장소 역할. 반드시 출처 명시.

#### 제목 규칙

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
created:YYYY-MM-DD
title: 참고 자료 제목
note-type: REF
from:
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
title: AI Ethics Explained (TED Talks)
note-type: REFERENCE
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
title: Machine Learning Basics (Coursera - Andrew Ng)
note-type: REFERENCE
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
created: 2025-04-06
title: Deep Work (Cal Newport)
note-type: REFERENCE
from: Book
---

## 출처
- Deep Work by Cal Newport, ISBN: 978-1455586691

## 요약
- 집중력을 높이는 작업 방식 제안

## 코멘트
- 노트 작성 시 Deep Work 원칙 적용 가능성
```

##### 4. 블로그

```markdown
---
tags:
aliases: 
created: 2025-04-06
title: Git Best Practices (Medium - John Doe)
note-type: REFERENCE
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
created: icycles: 
created: 2025-04-06
title: Attention Is All You Need (Vaswani et al., 2017)
note-type: REFERENCE
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

### 💻 Code Notes (코드 노트)

#### Rule

- **역할**: 코딩 관련 기록. 코드 스니펫, 디버깅 과정, 라이브러리 사용법 등 포함.
- **특징**: 코드 + 주석 + 실행 결과로 구성. 기술적인 세부사항 중심.
- **예시**:
    - 코드: def calculate_sum(a, b): return a + b
    - 주석: "간단한 합계 함수."
    - 결과: "calculate_sum(3, 4) → 7."
- **가이드**: 프로젝트 노트와 달리, 특정 기능 구현이나 코드 학습에 초점. 가독성을 위해 주석 필수.
- **제목 형식:** `제목_ㅇ`
#### 템플릿

```markdown
---
tags:
aliases: 
created: 2025-04-06
title: 제목
note-type: CODE
language: py
completed: false
archive: false
---

## 코드

### Code

### 결과

## 설명
```

#### 예시

```
---
tags:
aliases: 
created: 2025-04-10
title: hello world_py (2025-04-10)
note-type: CODE
language: py
completed: false
archive: false
---

## 코드

### Code

\```python
def calculate_sum(a, b):
    return a + b
\'''    

### 결과

calculate_sum(3, 7) = 7

## 설명
calculate_sum 함수를 만들어 호출하면 정상적으로 7을 얻는다.
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

#### 템플릿

```markdown
---
tags:
aliases:
created: YYYY-MM-DD
title: 검토 대상
note-type: REVIEW
completed: false
---

## 분석

## 개선점
```

```markdown
---
tags:
aliases:
created: 2015-04-10
title: 3월 프로젝트
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
- **특징**: 단계별 설명 + 시각적 보조(다이어그램 등 가능). 실용적이고 명확. 끝에 Guides
- **예시**:
    - 주제: "Git 사용 가이드."
    - 내용: "1. git clone으로 시작. 2. git add/commit으로 변경 저장."
    - 팁: "커밋 메시지는 간결하게!"
- **가이드**: 추상적이지 않도록, 특정 주제에 대한 명확한 지침서로 한정. 다른 노트와 달리 "전달" 목적.

#### 템플릿

```markdown
---
tags:
  - Guide
aliases: 
created: 2025-03-24
title: [제목 Guides]
note-type: GUIDE
---

## 가이드 헤더
```

#### 예시

```markdown
---
tags:
  - Guide
aliases: 
created: 2025-03-24
title: Note Guides
note-type: GUIDE
---

## 노트 작성 시 유의할 점
1.
2.
3.

```