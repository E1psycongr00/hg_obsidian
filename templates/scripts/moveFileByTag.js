// moveFileByTag.js
module.exports = async function(tp) {
    const file = tp.file; // 현재 파일 객체
    const frontmatter = tp.frontmatter; // YAML frontmatter 데이터

    // 사용자에게 태그 입력 요청
    const tagInput = await tp.system.prompt("이동할 태그를 입력하세요 (예: MOC):");
    if (!tagInput) return "태그가 입력되지 않았습니다.";

    // 태그는 # 없이 입력받았다고 가정하고 정규화
    const tag = tagInput.startsWith("#") ? tagInput.slice(1) : tagInput;
    const targetFolder = tag; // 폴더 이름 = 태그 이름

    // 태그 확인 (배열 또는 단일 문자열 처리)
    const tags = frontmatter.tags || [];
    const hasTag = Array.isArray(tags) ? tags.includes(tag) : tags === tag;

    if (hasTag) {
        try {
            await tp.file.move(`${targetFolder}/${file.title}`);
            return `파일이 ${targetFolder} 폴더로 이동되었습니다.`;
        } catch (error) {
            return `이동 실패: ${error.message}`;
        }
    }
    return `파일에 #${tag} 태그가 없습니다.`;
}