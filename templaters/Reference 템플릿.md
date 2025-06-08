<%*
  const FROM = ["VIDEO", "Lecture", "Book", "Blog", "Paper", "Web"];
  // 현재 날짜를 YYYY-MM-DD 형식으로 가져오기
  const date = tp.date.now("YYYY-MM-DD");
  const from = await tp.system.suggester(
	  FROM, // 선택지 배열
	  FROM, // 값 배열
	  false, // 다중 선택 비활성화
	  "어떤 형식인지 선택하세요"
  )
  
  // 기존 파일 제목 가져오기 (tp.file.title은 현재 파일명을 반환)
  const originalTitle = tp.file.title;
  
  // 새로운 제목 생성 (기존 제목 + 날짜)
  const newTitle = `📚 ${originalTitle}`;
  
  // frontmatter에 title 업데이트
  tR += `---
tags:
aliases: 
created: ${date}
title: ${newTitle}
note-type: REF
from: ${from}
---
`;
  
  // 파일 이름도 동일하게 변경
  
  await tp.user.moveFileToTarget(tp, `05. Reference Notes/${from}`);
  await tp.file.rename(newTitle);
%>
## 출처

## 요약

## 추가 인용

## 코멘트