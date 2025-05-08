// moveFileToTarget.js
module.exports = async function (tp, targetFolder) {
  const file = tp.file; // 현재 파일 객체
  const app = tp.app; // Obsidian app 객체

  // 입력값 검증
  if (!targetFolder) {
    return { success: false, message: "목표 폴더가 지정되지 않았습니다." };
  }

  try {
    // 목표 폴더가 존재하는지 확인하고 없으면 생성
    const folderExists = await app.vault.adapter.exists(targetFolder);
    if (!folderExists) {
      await app.vault.createFolder(targetFolder);
    }

    // 파일 이동
    const newPath = `${targetFolder}/${file.title}`;
    await tp.file.move(newPath);
    return { success: true, path: newPath };
  } catch (error) {
    return { success: false, message: `이동 실패: ${error.message}` };
  }
};
