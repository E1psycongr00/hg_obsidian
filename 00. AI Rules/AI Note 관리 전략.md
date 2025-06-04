## 1. AI 노트 관리 기본 원칙

AI는 다음 원칙에 따라 사용자님의 Obsidian 볼트 내 노트 관리를 지원해야 합니다. 모든 작업은 사용자님의 기존 가이드 문서들(`01. Guides/Folder Guides.md`, `01. Guides/Note Guides.md`, `01. Guides/MOC Guides.md`, `01. Guides/Tag Guides.md`)을 최우선으로 참고합니다.

1.  **폴더 구조 준수**: 모든 노트는 `01. Guides/Folder Guides.md`에 정의된 폴더 구조 및 규칙에 따라 정확한 위치에 생성되거나 이동되어야 합니다.
2.  **노트 유형별 구조 준수**: 각 노트는 `01. Guides/Note Guides.md`에 명시된 해당 `note-type`별 템플릿(frontmatter, 제목 규칙, 내용 구조 등)을 정확히 따라야 합니다.
3.  **MOC 관리 규칙 준수**: MOC 생성 및 업데이트는 `01. Guides/MOC Guides.md`의 규칙을 따릅니다.
4.  **태그 일관성 유지**: 태그는 `01. Guides/Tag Guides.md`의 지침에 따라 일관되게 적용되어야 합니다.
5.  **Frontmatter의 엄격한 준수**: 모든 노트는 `01. Guides/Note Guides.md`에 정의된 해당 `note-type`별 frontmatter 규칙(필수 필드, 선택적 필드, 값의 형식 및 허용 범위 등)을 **반드시, 그리고 정확하게** 준수해야 합니다. 이는 `title`, `created`, `note-type`과 같은 필수 필드뿐만 아니라, `tags`, `aliases`, `completed`, `cssclasses`, `from`, `language`, `archive`, `area-reason` 등 모든 관련 필드에 적용됩니다. 특히, `tags`와 `aliases` 필드는 내용이 없더라도 그 키(key)는 항상 frontmatter에 존재해야 합니다.
6.  **아이콘 일관성**: 노트 제목에 사용되는 아이콘(예: 🏛️, 🔬, 📚, ⌨️, 🔍)은 `01. Guides/Note Guides.md`의 규칙을 따릅니다.
7.  **자동 링크 (제안 후 실행)**: 신규 노트 생성 시 관련 MOC에 링크를 추가하거나, 특정 조건 충족 시 노트 이동을 제안하는 등 노트 간의 유기적 연결을 지원합니다.

## 2. AI를 위한 노트 유형별 생성 및 관리 프롬프트

AI는 다음 프롬프트를 참고하여 각 유형의 노트 생성 및 초기 관리를 수행합니다. (YYYY-MM-DD는 실제 생성일로 대체) **모든 frontmatter 필드와 값은 `01. Guides/Note Guides.md`에 정의된 해당 노트 유형의 규칙을 반드시 엄격하게 준수해야 합니다.**

---

### 📅 Daily Notes (일상 노트)

-   **AI 프롬프트**: "새로운 '일일 노트' 생성 요청 시:
    1.  `01. Guides/Note Guides.md`의 'Daily Notes' 섹션에 명시된 frontmatter 규칙을 **엄격하게** 따릅니다.
    2.  `title`: `Daily Notes - YYYY.MM-DD` 형식으로 설정합니다.
    3.  `created`: `YYYY-MM-DD` 형식으로 설정합니다.
    4.  `note-type: DAILY` 로 설정합니다.
    5.  `tags`: `daily` 를 포함합니다. (그 외 `Note Guides.md`에서 정의된 태그가 있다면 포함)
    6.  내용은 시간대별 항목으로 구성될 수 있도록 기본 틀을 제공합니다.
    7.  **저장 폴더**: 사용자의 Obsidian '일일 노트' 플러그인 설정에 지정된 폴더를 우선적으로 따릅니다. 해당 설정이 없거나 비활성화된 경우, 사용자에게 기본 저장 위치(예: Obsidian 볼트 최상위 `/` 또는 `Journal/YYYY/MM`과 같은 특정 폴더 구조)를 확인받아 해당 위치에 생성합니다."
    *   *참고: `01. Guides/Note Guides.md` - Daily Notes 섹션*

---

### 🔬 Solution Notes (솔루션 노트)

-   **AI 프롬프트**: "문제 해결을 위한 '솔루션 노트' 생성 요청 시 (예: '웹사이트 로딩 속도 문제 해결 노트'):
    1.  `01. Guides/Note Guides.md`의 'Solution Notes' 섹션에 명시된 frontmatter 규칙을 **엄격하게** 따릅니다.
    2.  `title`: `🔬 [제공된 문제 제목]` 형식으로 설정합니다.
    3.  `note-type: SOLUTION` 으로 설정합니다.
    4.  `created`: `YYYY-MM-DD` 형식으로 설정합니다.
    5.  `completed: false` (기본값), `archive: false` (기본값)으로 설정합니다. (사용자 요청 시 변경 가능)
    6.  `area-reason: ""` (사용자가 관련 기술 분야나 문제 영역을 명시할 수 있도록 비워둡니다. `Note Guides.md` 참조).
    7.  **저장 폴더**: `04. Practice Notes`
    8.  **기본 구조**:
        ```markdown
        ## 문제 정의
        - 

        ## 가설
        - 

        ## 해결 과정
        1. 
        2. 

        ## 결과/반성
        - 
        ```
    *   *참고: `01. Guides/Note Guides.md` - Solution Notes 섹션*

---

### 📝 Common Notes (공부 노트)

-   **AI 프롬프트**: "학습 내용 정리를 위한 '공부 노트' 생성 요청 시 (예: '머신러닝 기본 개념 정리 노트'):
    1.  `01. Guides/Note Guides.md`의 'Common Notes' 섹션에 명시된 frontmatter 규칙을 **엄격하게** 따릅니다.
    2.  `title`: `[제공된 학습 주제]` 형식으로 설정합니다.
    3.  `note-type: COMMON` 으로 설정합니다.
    4.  `created`: `YYYY-MM-DD` 형식으로 설정합니다.
    5.  `completed: false` (기본값)으로 설정합니다. (사용자 요청 시 변경 가능)
    6.  **저장 폴더**: `04. Practice Notes`
    7.  **기본 구조**:
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
        - 

        ## 질문 & 확장
        - 

        ## 출처
        ```
    *   *참고: `01. Guides/Note Guides.md` - Common Notes 섹션*

---

### 🚀 Project Notes (프로젝트 노트)

-   **AI 프롬프트**: "특정 프로젝트에 대한 '프로젝트 노트' 생성 요청 시 (예: '개인 블로그 개발 프로젝트 노트'):
    1.  `01. Guides/Note Guides.md`의 'Project Notes' 섹션에 명시된 frontmatter 규칙을 **엄격하게** 따릅니다.
    2.  `title`: `[제공된 프로젝트 이름]` 형식으로 설정합니다.
    3.  `note-type: PROJECT` 으로 설정합니다.
    4.  `created`: `YYYY-MM-DD` 형식으로 설정합니다.
    5.  `status: 진행중` (또는 사용자가 지정한 초기 상태. `Note Guides.md`의 예시 참조)으로 설정합니다.
    6.  **저장 폴더**: `09. PARA/1.Projects/[프로젝트 이름 폴더]`. 해당 폴더가 존재하지 않을 경우, 사용자에게 생성 여부를 확인한 후 생성하고 노트를 저장합니다.
    7.  **기본 구조**:
        ```markdown
        ## 목표
        - 

        ## 타임라인
        - [날짜]: 

        ## 진행 상황
        - 

        ## 문제점/피드백
        - 
        ```
    *   *참고: `01. Guides/Note Guides.md` - Project Notes 섹션 및 사용자 폴더 구조*

---

### 📚 Reference Notes (참고 노트)

-   **AI 프롬프트**: "외부 자료(웹, 책, 논문 등)에 대한 '참고 노트' 생성 요청 시 (예: '클린 코드 책 요약 노트'):
    1.  `01. Guides/Note Guides.md`의 'Reference Notes' 섹션에 명시된 frontmatter 규칙을 **엄격하게** 따릅니다.
    2.  사용자로부터 자료 제목과 자료 유형(`from` 필드 값: `VIDEO`, `Lecture`, `Book`, `Blog`, `Paper`, `Web` 중 하나. **`Note Guides.md`에 정의된 정확한 값 중 하나를 반드시 입력받습니다.**)을 반드시 입력받습니다.
    3.  `title`: `📚 [제공된 자료 제목]` 형식으로 설정합니다.
    4.  `note-type: REF` 으로 설정합니다.
    5.  `created`: `YYYY-MM-DD` 형식으로 설정합니다.
    6.  `from`: 입력받은 자료 유형으로 설정합니다.
    7.  **저장 폴더**: `05. Reference Notes/[from 필드값(첫 글자 대문자)]/` (예: `from: Book`이면 `05. Reference Notes/Book/`). (Templater 등 자동화 도구 설정과 연동)
    8.  **기본 구조**:
        ```markdown
        ## 출처
        - 

        ## 요약
        - 

        ## 코멘트
        - 
        ```
    *   *참고: `01. Guides/Note Guides.md` - Reference Notes 섹션*

---

### ⌨️ Code Notes (코드 노트)

-   **AI 프롬프트**: "코드 스니펫 또는 코드 학습 관련 '코드 노트' 생성 요청 시 (예: '파이썬 리스트 정렬 함수 코드 노트', 언어: 'python'):
    1.  `01. Guides/Note Guides.md`의 'Code Notes' 섹션에 명시된 frontmatter 규칙을 **엄격하게** 따릅니다.
    2.  사용자로부터 코드 주제와 프로그래밍 언어(`language` 필드 값, 예: `py`, `js`, `java`. **`Note Guides.md`에 명시된 형식 또는 사용자 지정 규칙을 따릅니다.**)를 입력받습니다.
    3.  `title`: `⌨️ [입력된 코드 주제]_[입력된 언어 약자] (YYYY-MM-DD)` 형식으로 설정합니다.
    4.  `note-type: CODE` 으로 설정합니다.
    5.  `created`: `YYYY-MM-DD` 형식으로 설정합니다.
    6.  `language`: 입력받은 언어 약자로 설정합니다.
    7.  `completed: false` (기본값), `archive: false` (기본값)으로 설정합니다. (사용자 요청 시 변경 가능)
    8.  `area-reason: ""` (사용자가 특정 기술 스택이나 프로젝트 영역을 명시할 수 있도록 비워둡니다. `Note Guides.md` 참조).
    9.  **저장 폴더**: `04. Practice Notes`
    10. **기본 구조**:
        ```markdown
        ## 코드

        ### Code
        \`\`\`[language 필드값]
        # 여기에 코드를 작성하세요.
        \`\`\`

        ### 결과
        \`\`\`text
        # 코드 실행 결과를 여기에 작성하세요.
        \`\`\`

        ## 설명
        [코드에 대한 상세 설명, 주요 로직, 사용법 등을 작성합니다.]
        ```
    *   *참고: `01. Guides/Note Guides.md` - Code Notes 섹션*

---

### 🔍 Review Notes (검토 노트)

-   **AI 프롬프트**: "특정 대상에 대한 '검토 노트' 생성 요청 시 (예: '3월 프로젝트 회고 노트'):
    1.  `01. Guides/Note Guides.md`의 'Review Notes' 섹션에 명시된 frontmatter 규칙을 **엄격하게** 따릅니다.
    2.  `title`: `🔍 [제공된 검토 대상]` 형식으로 설정합니다.
    3.  `note-type: REVIEW` 으로 설정합니다.
    4.  `created`: `YYYY-MM-DD` 형식으로 설정합니다.
    5.  `completed: false` (기본값)으로 설정합니다. (사용자 요청 시 변경 가능)
    6.  **저장 폴더**: `04. Practice Notes`
    7.  **기본 구조**:
        ```markdown
        ## 분석
        - 

        ## 개선점
        - 
        ```
    *   *참고: `01. Guides/Note Guides.md` - Review Notes 섹션*

---

### 🗺️ Guide Notes (가이드 노트)

-   **AI 프롬프트**: "특정 주제에 대한 '가이드 노트' 생성 요청 시 (예: '옵시디언 초기 설정 가이드 노트'):
    1.  `01. Guides/Note Guides.md`의 'Guide Notes' 섹션에 명시된 frontmatter 규칙을 **엄격하게** 따릅니다.
    2.  `title`: `[제공된 가이드 제목]` 형식으로 설정합니다.
    3.  `note-type: GUIDE` 으로 설정합니다.
    4.  `tags`: `Guide` 를 포함합니다. (필요시 `Note Guides.md`에서 정의된 추가 태그 포함)
    5.  `created`: `YYYY-MM-DD` 형식으로 설정합니다.
    6.  **저장 폴더**: `01. Guides`
    7.  **기본 구조**:
        ```markdown
        ## [가이드 섹션 1 제목]
        - 

        ## [가이드 섹션 2 제목]
        - 
        ```
        (또는 사용자가 요청하는 구조에 따름)
    *   *참고: `01. Guides/Note Guides.md` - Guide Notes 섹션*

---

### 🏛️ MOC Notes (Map of Content 노트)

-   **AI 프롬프트**: "특정 주제에 대한 'MOC 노트' 생성 요청 시 (예: '프로그래밍 언어 MOC 노트'):
    1.  `01. Guides/Note Guides.md`의 'MOC Notes' 섹션에 명시된 frontmatter 규칙을 **엄격하게** 따릅니다.
    2.  `title`: `🏛️ [제공된 MOC 주제]` 형식으로 설정합니다.
    3.  `note-type: MOC` 으로 설정합니다.
    4.  `tags`: 해당 MOC 주제 관련 태그 및 `MOC` 를 포함합니다. (`Note Guides.md` 참조)
    5.  `created`: `YYYY-MM-DD` 형식으로 설정합니다.
    6.  `cssclasses: -dashboard` (템플릿 또는 사용자 지정에 따라 적용. `Note Guides.md`의 MOC 노트 템플릿 정의와 일치)으로 설정합니다.
    7.  **저장 폴더**: `02. MOC`
    8.  **기본 구조**:
        ```markdown
        ## [하위 주제 1 또는 링크 그룹 1]
        - [[관련 노트 링크 1]]
        - [[관련 노트 링크 2]]

        ## [하위 주제 2 또는 링크 그룹 2]
        - [[관련 노트 링크 3]]
        ```
        (MOC는 링크 중심으로 구성되며, 상세 내용은 MOC에 직접 작성하지 않습니다.)
    *   *참고: `01. Guides/Note Guides.md` 및 `01. Guides/MOC Guides.md`*

## 3. AI의 추가 관리 작업 지침

1.  **MOC 업데이트**:
    *   새로운 노트(`COMMON`, `SOLUTION`, `CODE`, `REF` 등)가 생성되면, AI는 해당 노트의 주제와 관련된 기존 MOC가 있는지 확인합니다.
    *   관련 MOC가 있다면, 해당 MOC의 적절한 위치에 새 노트로의 링크 추가를 사용자에게 제안하거나, 명시적 허용 시 자동으로 추가합니다.
    *   예: 새로운 `[[파이썬 기본 문법]]` 노트 생성 시, `[[🏛️ 프로그래밍 언어 MOC]]` 또는 `[[🏛️ Python MOC]]`에 링크 추가.

2.  **노트 상태 변경에 따른 이동 제안**:
    *   `04. Practice Notes` 폴더 내의 노트(`SOLUTION`, `COMMON`, `REVIEW`, `CODE`)의 `completed` 상태가 `true`로 변경되면, 해당 노트를 `03. Permanent Notes` 폴더로 이동할 것을 사용자에게 제안합니다.
    *   `CODE` 노트의 `archive` 상태가 `true`로 변경되면, 해당 노트를 `06. Code Notes` 폴더 (필요시 `Area` 또는 `Archive` 하위 폴더)로 이동할 것을 사용자에게 제안합니다.

3.  **콘텐츠 스타일 일관성**:
    *   노트 내용 작성 지원 시, 사용자님의 기존 노트 스타일(Callouts, 코드 블록 형식, LaTeX 수식 사용, 강조 방식 등 `분석된스타일.md` 참고)을 최대한 일관성 있게 따릅니다.

4.  **사용자 확인**:
    *   중요한 변경(파일 이동, 자동 링크 추가 등) 전에는 항상 사용자에게 확인을 받고 진행하는 것을 원칙으로 합니다. 단, 단순 반복 작업이나 명확한 규칙 기반 작업은 사용자와의 사전 협의에 따라 자동 실행 수준을 조절할 수 있습니다.

이 가이드가 AI와의 효율적인 노트 관리에 도움이 되기를 바랍니다. 필요에 따라 언제든지 이 가이드를 업데이트할 수 있습니다.
