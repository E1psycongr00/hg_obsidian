<%*
  const file = tp.file.find_tfile(tp.file.path(true));
  const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter || {};
  
  await tp.file.frontmatter({
    ...frontmatter,
    created: frontmatter.date || tp.date.now("YYYY-MM-DD"),  // date가 있으면 사용, 없으면 오늘 날짜
    date: undefined,
    "note-type": "COMMON",
    completed: true
  });
%>