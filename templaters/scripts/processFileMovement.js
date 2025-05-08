module.exports = async function (tp, conditionSets) {
  for (const {conditions, targetFolder} of conditionSets) {
    const conditionsMet = await tp.user.checkFrontMatter(tp, conditions);
    if (conditionsMet) {
      const moveResult = await tp.user.moveFileToTarget(tp, targetFolder);
      if (moveResult.success) {
        return `파일이 ${targetFolder} 폴더로 이동되었습니다.`;
      }
    }
  }
  return "프론트매터 조건에 맞는 설정이 없어 파일이 이동되지 않았습니다.";
};