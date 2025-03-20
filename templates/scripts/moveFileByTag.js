// moveFileByTag.js
module.exports = async function(tp, tag, targetFolder) {
    const file = tp.file; // 현재 파일 객체
    const frontmatter = tp.frontmatter; // YAML frontmatter 데이터
    const app = tp.app; // Obsidian app 객체

    // 입력값 검증
    if (!tag) {
        new window.Notice("태그가 지정되지 않았습니다.");
        return;
    }
    if (!targetFolder) {
        new window.Notice("목표 폴더가 지정되지 않았습니다.");
        return;
    }

    // 태그 정규화
    const normalizedTag = tag.startsWith("#") ? tag.slice(1) : tag;

    // 태그 확인
    const tags = frontmatter.tags || [];
    const hasTag = Array.isArray(tags) ? tags.includes(normalizedTag) : tags === normalizedTag;

    if (hasTag) {
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
    } else {
        new window.Notice(`파일에 #${normalizedTag} 태그가 없습니다.`);
    }
};