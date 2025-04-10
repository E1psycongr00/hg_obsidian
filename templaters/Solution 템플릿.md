<%*
  // 현재 날짜를 YYYY-MM-DD 형식으로 가져오기
  const date = tp.date.now("YYYY-MM-DD");
  // 기존 파일 제목 가져오기 (tp.file.title은 현재 파일명을 반환)
  const originalTitle = tp.file.title;
  // 새로운 제목 생성 (기존 제목 + 날짜)
  const newTitle = `🔬${originalTitle}`;
  
  // frontmatter에 title 업데이트
  tR += `---
tags:
aliases: 
created: ${date}
title: ${newTitle}
note-type: SOLUTION
completed: false
archive: false
---
`;
  
  // 파일 이름도 동일하게 변경
  
  await tp.user.moveFileToTarget(tp, "04. Practice Notes");
  await tp.file.rename(newTitle);
%>

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