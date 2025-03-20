<%*
const tagFolderPairs = [
    { tag: "MOC", folder: "02. MOC" },
    { tag: "Notes", folder: "Notes" }
];

for (const pair of tagFolderPairs) {
    await tp.user.moveFileByTag(tp, pair.tag, pair.folder);
}
%>