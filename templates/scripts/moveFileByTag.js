// moveFileByTag.js
module.exports = async function(tp) {
    const file = tp.file; // 현재 파일 객체
    const frontmatter = tp.frontmatter; // YAML frontmatter 데이터
    const { Notice } = tp.app.plugins.plugins["obsidian"]; // Obsidian의 Notice 가져오기

    // 사용자에게 태그 입력 요청
    const tagInput = await tp.system.prompt("이동할 태그를 입력하세요 (예: MOC):");
    if (!tagInput) {
        new Notice("태그가 입력되지 않았습니다.");
        return;
    }

    // 태그 정규화
    const tag = tagInput.startsWith("#") ? tagInput.slice(1) : tagInput;
    const targetFolder = tag; // 폴더 이름 = 태그 이름

    // 태그 확인
    const tags = frontmatter.tags || [];
    const hasTag = Array.isArray(tags) ? tags.includes(tag) : tags === tag;

    if (hasTag) {
        try {
            await tp.file.move(`${targetFolder}/${file.title}`);
            new Notice(`파일이 ${targetFolder} 폴더로 이동되었습니다.`);
        } catch (error) {
            new Notice(`이동 실패: ${error.message}`);
        }
    } else {
        new Notice(`파일에 #${tag} 태그가 없습니다.`);
    }
};