<%*
const conditionSets = [
    { conditions: { tags: "MOC" }, targetFolder: "02. MOC" },
    { conditions: { completed: "true" }, targetFolder: "03. Permanent Notes" }
];

for (const set of conditionSets) {
    const conditionsMet = await tp.user.checkFrontMatter(tp, set.conditions);
    if (conditionsMet) {
        await tp.user.moveFileToTarget(tp, set.targetFolder);
    }
}
%>