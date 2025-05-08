<%*
const conditionSets = [
    { conditions: { "note-type": "MOC" }, targetFolder: "02. MOC" },
    { conditions: { "note-type": "COMMON", completed: true }, targetFolder: "03. Permanent Notes" },
    { conditions: { "note-type": "REVIEW", completed: true }, targetFolder: "03. Permanent Notes" },
    { conditions: { "note-type": "CODE", completed: true }, targetFolder: "06. Code Notes/Archive" },
    { conditions: { "note-type": "SOLUTION", completed: true }, targetFolder: "07. Solution Notes/Archive" },
];

let moved = false;
let message = "조건에 맞는 폴더를 찾지 못했거나 파일 이동에 실패했습니다.";

for (const set of conditionSets) {
    const conditionsMet = await tp.user.checkFrontMatter(tp, set.conditions);
    if (conditionsMet) {
        const moveResult = await tp.user.moveFileToTarget(tp, set.targetFolder);
        if (moveResult === true) {
            message = `파일이 '${set.targetFolder}' 폴더로 성공적으로 이동되었습니다.`;
            moved = true;
            break; // 성공 시 루프 종료
        } else {
            // 이동 실패 시 moveResult는 오류 메시지 문자열을 포함
            message = `파일 이동 실패: ${set.targetFolder}로 이동 중 오류 발생 - ${moveResult}`;
            // 실패해도 다음 조건 세트를 시도할 수 있으므로 여기서는 break하지 않음
            // 만약 첫 번째 실패 시 바로 중단하고 싶다면 break; 추가
        }
    }
}

new window.Notice(message);
%>