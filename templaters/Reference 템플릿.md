---
tags:
aliases: 
created: <% tp.date.now("YYYY-MM-DD") %>
title: <% tp.file.title %>
note-type: REF
from: <%
await tp.system.suggester(
	["Video", "Lecture", "Book", "Blog", "Paper"],
	["Video", "Lecture", "Book", "Blog", "Paper"],
	false,
	"Reference Note 유형을 선택하세요"
	);
%>
---
<%*
const targetFolder = `05. Reference Notes/${selectedType}`; // 동적 폴더 경로 설정
await tp.user.moveFileToTarget(tp, targetFolder); // 파일 이동
%>

## 출처

## 요약

## 코멘트