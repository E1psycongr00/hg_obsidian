<%*
const conditionSets = [
    { conditions: { "note-type": "CODE", completed: true, archive: true }, targetFolder: "06. Code Notes/Archive" },
    { conditions: { "note-type": "SOLUTION", completed: true, archive: true }, targetFolder: "07. Solution Notes/Archive" },

];

for (const set of conditionSets) {
    const conditionsMet = await tp.user.checkFrontMatter(tp, set.conditions);
    if (conditionsMet) {
        await tp.user.moveFileToTarget(tp, set.targetFolder);
    }
}
%>