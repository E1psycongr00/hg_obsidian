---
tags:
  - Guide
aliases: 
created: 2025-04-07
title: Folder Guides
note-type: GUIDE
---


---

## Folder Guide

Obsidian 볼트의 폴더 구조와 각 폴더의 역할을 명확히 하여 일관성 있는 노트 관리를 목표로 합니다.

### System (시스템 폴더)

- **attachments**: 노트에 첨부되는 이미지, PDF, 음성, 동영상 등 모든 외부 파일을 저장합니다. 노트 작성 시 파일을 첨부하면 자동으로 이 폴더 하위에 저장되도록 설정하는 것을 권장합니다.
- **excalidraw**: Excalidraw 플러그인을 사용하여 생성한 손그림, 다이어그램 파일(.excalidraw, .svg, .png 등)이 저장됩니다.
- **templates**: 노트 작성 시 사용하는 모든 일반 마크다운 템플릿 파일(.md)을 모아두는 곳입니다. Obsidian의 '템플릿' 핵심 플러그인 또는 'Templater' 커뮤니티 플러그인 설정에서 이 폴더를 템플릿 폴더로 지정하여 사용합니다. (참고: `templaters` 폴더는 별도의 자동화 스크립트나 고급 템플릿 관련 파일을 위한 폴더일 수 있습니다.)

### My Notes (개인 노트 폴더)

- **`01. Guides`**: 이 `Folder Guides.md`나 `Note Guides.md`처럼 Obsidian 사용법, 노트 작성 규칙 등 각종 가이드 문서를 보관합니다. (`note-type: GUIDE`)

- **`02. MOC`**: Map of Content (MOC) 노트들을 모아두는 폴더입니다. `MOC 템플릿` 사용 시 노트가 자동으로 이 폴더로 이동됩니다. (`note-type: MOC`)

- **`03. Permanent Notes` (영구 노트)**:
    - 내용 작성이 완료되어 더 이상 큰 수정이 필요 없는, 잘 정제된 영구 보관용 노트들이 위치합니다.
    - 주로 `04. Practice Notes`에서 작성되던 노트들 중, 완성도가 높아지고 최종본으로 판단되는 경우 이 폴더로 **수동 이동**하여 관리합니다.
    - 예시:
        - `Solution 노트`가 문제 해결이 완료되어 `completed: true` 상태가 된 경우.
        - `Common 노트`의 학습 내용이 충분히 정리되어 더 이상 업데이트가 불필요하다고 판단될 경우.
        - 중요한 `Review 노트`의 검토 및 개선점 도출이 완료된 경우.

- **`04. Practice Notes` (연습 노트 / 작업중 노트)**:
    - 아이디어를 발전시키거나, 내용을 작성 중이거나, 아직 정리가 덜 된 노트들이 주로 저장되는 작업 공간입니다.
    - 다음 템플릿 사용 시 기본적으로 노트가 이 폴더에 생성됩니다:
        - `Solution 템플릿` (`note-type: SOLUTION`)
        - `Code 템플릿` (`note-type: CODE`)
        - `Review 템플릿` (`note-type: REVIEW`)
        - `Common 템플릿` (`note-type: COMMON`)
    - 이 폴더의 노트들은 주기적으로 검토하여 `03. Permanent Notes`로 옮기거나, 불필요한 경우 삭제 또는 아카이브합니다.

- **`05. Reference Notes` (참고 노트)**:
    - 외부 자료(인터넷, 신문, 블로그, 논문, 책, 강의, 비디오 등)에서 발췌하거나 요약한 참고용 노트들을 보관합니다.
    - `Reference 템플릿` 사용 시, frontmatter의 `from:` 필드에 선택된 자료 유형(VIDEO, Lecture, Book, Blog, Paper, Web)에 따라 자동으로 해당 이름의 하위 폴더가 생성되고 노트가 저장됩니다.
    - 예: `05. Reference Notes/Book/아토믹 해비츠.md`

- **`06. Code Notes` (코드 노트 아카이브)**:
    - 특정 프로젝트에 종속되지 않고 범용적으로 재사용 가능하거나, 중요하다고 판단되는 코드 스니펫, 설정 파일, 라이브러리 사용법 등을 장기적으로 아카이빙하는 공간입니다.
    - `Code 템플릿`을 통해 `04. Practice Notes`에 생성된 코드 노트 중, 학습이 완료되었거나, 잘 정리되어 보관 가치가 있다고 판단되는 노트를 이 폴더로 **수동 이동**합니다.
    - 하위 폴더로 `Area` (주요 관심 기술 분야별)와 `Archive` (덜 사용하지만 보존 가치가 있는 코드)를 두어 관리할 수 있습니다.
        - **`Area`**: 현재 자주 사용하거나 주요 관심 분야의 코드를 모읍니다. (예: `06. Code Notes/Area/Python`, `06. Code Notes/Area/Javascript`)
        - **`Archive`**: 당장은 사용하지 않지만 나중에 참고할 가능성이 있는 코드나 오래된 버전의 코드 등을 보관합니다.
    - 노트의 frontmatter 필드(`archive: true/false`, `area-reason: [분야명]`)와 연계하여 분류 기준을 적용할 수 있습니다.

- **`07. Solution Notes` (솔루션 노트 아카이브 - 현재 워크플로우 검토)**:
    - `Folder Guides.md` 원본에는 "여전히 유효한"이라는 설명이 있었으나, 현재 `Solution 템플릿`은 노트를 `04. Practice Notes`에 생성시키고, 완성된 Solution 노트는 `03. Permanent Notes`로 이동하는 흐름을 주로 사용하고 있습니다.
    - 따라서 이 `07. Solution Notes` 폴더는 과거에 사용되었거나, 특정 목적의 솔루션 노트를 별도로 아카이빙하는 경우가 아니라면 현재 주요 워크플로우에서는 사용 빈도가 낮을 수 있습니다. 폴더 사용 여부를 주기적으로 검토하는 것이 좋습니다.
 
    -