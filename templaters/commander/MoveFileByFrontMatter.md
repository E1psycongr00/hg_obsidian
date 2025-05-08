<%*
const conditionSets = [
    { conditions: { "note-type": "MOC" }, targetFolder: "02. MOC" },
    { conditions: { "note-type": "COMMON", completed: true }, targetFolder: "03. Permanent Notes" },
    { conditions: { "note-type": "REVIEW", completed: true }, targetFolder: "03. Permanent Notes" },
    { conditions: { "note-type": "CODE", completed: true, archive: true }, targetFolder: "06. Code Notes/Archive" },
    { conditions: { "note-type": "SOLUTION", completed: true, archive: true }, targetFolder: "07. Solution Notes/Archive" },
    { conditions: { "note-type": "SOLUTION", completed: true, archive: false}, targetFolder: "07. Solution Notes/Area" },

];

const message = await tp.user.processFileMovement(tp, conditionSets);
new window.Notice(message);
%>