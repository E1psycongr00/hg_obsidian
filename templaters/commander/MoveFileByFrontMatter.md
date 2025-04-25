<%*
const conditionSets = [
    { conditions: { "note-type": "MOC" }, targetFolder: "02. MOC" },
    { conditions: { "note-type": "COMMON", completed: true }, targetFolder: "03. Permanent Notes" },
    { conditions: { "note-type": "REVIEW", completed: true }, targetFolder: "03. Permanent Notes" },
    { conditions: { "note-type": "CODE", completed: true }, targetFolder: "06. Code Notes/Area" },
    { conditions: { "note-type": "SOLUTION", completed: true }, targetFolder: "07. Solution Notes/Area" },
];

for (const set of conditionSets) {
    const conditionsMet = await tp.user.checkFrontMatter(tp, set.conditions);
    if (conditionsMet) {
        await tp.user.moveFileToTarget(tp, set.targetFolder);
    }
}
%>