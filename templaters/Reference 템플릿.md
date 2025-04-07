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
	)
%>
---
<%*
await tp.user.moveFileToTarget(tp, "05. Reference Notes");
%>

## 출처

## 요약

## 코멘트