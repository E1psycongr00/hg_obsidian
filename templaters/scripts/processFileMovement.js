module.exports = async function (tp, conditionSets) {
    let message = "조건에 맞는 폴더를 찾지 못했습니다. 파일이 이동되지 않았습니다.";
    let movedSuccessfully = false;

    for (const set of conditionSets) {
        const conditionsMet = await tp.user.checkFrontMatter(tp, set.conditions);
        if (conditionsMet) {
            const moveResult = await tp.user.moveFileToTarget(tp, set.targetFolder);
            if (moveResult.success) {
                message = `파일이 '${set.targetFolder}' 폴더로 성공적으로 이동되었습니다. (경로: ${moveResult.path})`;
                movedSuccessfully = true;
                break; 
            } else {
                message = `파일 이동 시도 중 오류: ${set.targetFolder}로 이동 실패 - ${moveResult.message}`;
                // 특정 조건셋에서 이동 실패 시, 다음 조건셋으로 넘어갑니다.
                // 만약 첫 실패 시 바로 중단하고 싶다면 여기서 break; 를 추가할 수 있습니다.
            }
        }
    }

    if (!movedSuccessfully && message === "조건에 맞는 폴더를 찾지 못했습니다. 파일이 이동되지 않았습니다.") {
        // 모든 조건을 확인했지만 맞는 경우가 없었을 때의 메시지.
        // checkFrontMatter 자체가 false를 반환했을때, 위 message는 이동 실패 메시지가 아닐 수 있다.
        // 따라서 이 경우를 명시적으로 처리한다.
        let noConditionMet = true;
        for (const set of conditionSets) {
            if (await tp.user.checkFrontMatter(tp, set.conditions)) {
                noConditionMet = false;
                break;
            }
        }
        if (noConditionMet) {
             message = "프론트매터 조건에 맞는 설정이 없어 파일이 이동되지 않았습니다.";
        }
    }
    
    return message;
};
