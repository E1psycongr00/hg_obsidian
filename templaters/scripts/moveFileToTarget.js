// moveFileToTarget.js
module.exports = async function (tp, targetFolder, targetFile = null) {
  const file = targetFile || tp.file; // targetFile이 없으면 tp.file 사용
  const app = tp.app; // Obsidian app 객체

  // 입력값 검증
  if (!targetFolder) {
    new window.Notice("목표 폴더가 지정되지 않았습니다.");
    return;
  }

  try {
    // 목표 폴더가 존재하는지 확인하고 없으면 생성
    const folderExists = await app.vault.adapter.exists(targetFolder);
    if (!folderExists) {
      await app.vault.createFolder(targetFolder);
      new window.Notice(`폴더 '${targetFolder}'가 생성되었습니다.`);
    }

    // 파일 이동
    await tp.file.move(`${targetFolder}/${file.title}`);
    new window.Notice(`파일이 ${targetFolder} 폴더로 이동되었습니다.`);
  } catch (error) {
    new window.Notice(`이동 실패: ${error.message}`);
  }
};
