<%*
  // 현재 날짜를 YYYY-MM-DD 형식으로 가져오기
  const date = tp.date.now("YYYY-MM-DD");
  
  // 기존 파일 제목 가져오기 (tp.file.title은 현재 파일명을 반환)
  const originalTitle = tp.file.title;
  
  // 새로운 제목 생성 (기존 제목 + 날짜)
  const newTitle = `🏛️ ${originalTitle}`;
  
  // frontmatter에 title 업데이트
  tR += `---
tags:
aliases: 
created: ${date}
title: ${newTitle}
note-type: MOC
cssclasses:
  - dashboard
`;
  
  // 파일 이름도 동일하게 변경
  await tp.user.moveFileToTarget(tp, "02. MOC");
  await tp.file.rename(newTitle);
%>