<%*
  const LANGUAGES = ["JS","TS", "Python", "Java", "C++", "Ruby", "Go", "PHP", "Kotlin", "CSharp"];
  const LANGUAGES_VAL = ["js","ts", "py", "java", "cpp","c", "ruby", "go", "php", "kotlin", "cs"];
  // 현재 날짜를 YYYY-MM-DD 형식으로 가져오기
  const date = tp.date.now("YYYY-MM-DD");
  const selectedLanguage = await tp.system.suggester(
	  LANGUAGES, // 선택지 배열
	  LANGUAGES_VAL, // 값 배열
	  false, // 다중 선택 비활성화
	  "언어를 선택해 주세요"
  )
  
  // 기존 파일 제목 가져오기 (tp.file.title은 현재 파일명을 반환)
  const originalTitle = tp.file.title;
  
  // 새로운 제목 생성 (기존 제목 + 날짜)
  const newTitle = `⌨️ ${originalTitle}_${selectedLanguage} (${date})`;
  
  // frontmatter에 title 업데이트
  tR += `---
tags:
aliases: 
created: ${date}
title: ${newTitle}
note-type: CODE
language: ${selectedLanguage}
completed: false
archive: false
area-reason:
---
`;
  
  // 파일 이름도 동일하게 변경
  
  await tp.user.moveFileToTarget(tp, "04. Practice Notes");
  await tp.file.rename(newTitle);
%>

## 코드

### Code

### 결과

## 설명