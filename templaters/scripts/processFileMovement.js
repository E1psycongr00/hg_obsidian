module.exports = async function (tp, conditionSets) {
  for (const [conditions, targetFolder] of conditionSets) {
    const conditionsMet = await checkFrontMatter(tp, conditions);
    console.log(conditionsMet);
    if (conditionsMet) {
      const moveResult = await moveFileToTarget(tp, targetFolder);
      if (moveResult.success) {
        return moveResult.path;
      }
    } else {
      return "프론트매터 조건에 맞는 설정이 없어 파일이 이동되지 않았습니다.";
    }
  }
};