<%*
const conditionSets = [
    { conditions: { tags: "MOC", status: "completed" }, targetFolder: "Archive" },
    { conditions: { tags: "Notes", priority: "high" }, targetFolder: "PriorityNotes" }
];

for (const set of conditionSets) {
    const conditionsMet = await tp.user.checkFrontMatter(tp, set.conditions);
    if (conditionsMet) {
        await tp.user.moveFileToTarget(tp, set.targetFolder);
        break; // 파일이 이동되었으므로 더 이상 반복하지 않음
    }
}
%>