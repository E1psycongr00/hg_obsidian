module.exports = async function (tp, conditionSets) {
  for (const [conditions, targetFolder] of conditionSets) {
    const conditionsMet = await tp.user.checkFrontMatter(tp, conditions);
};
