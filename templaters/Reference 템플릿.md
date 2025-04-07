---
tags:
aliases: 
created: <% tp.date.now("YYYY-MM-DD") %>
title: <% tp.file.title %>
note-type: REF
from: <%*
const selectedType = await tp.system.suggester(
	["Video", "Lecture", "Book", "Blog", "Paper"],
	["Video", "Lecture", "Book", "Blog", "Paper"],
	false,
	"Reference Note 유형을 선택하세요"
	);
tp.config.selectedType = selectedType.toLowerCase();
tR += selectedType;
%>
---
<%*
const targetFolder = `05. Reference Notes/${selectedType}`;
await tp.user.moveFileToTarget(tp, targetFolder); // 파일 이동
%>
## 출처

## 요약

## 코멘트