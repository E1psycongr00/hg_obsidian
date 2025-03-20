// moveMOC.js
module.exports = async function(tp) {
    const file = tp.file; // 현재 파일 객체
    const frontmatter = tp.frontmatter; // YAML frontmatter 데이터
    const targetFolder = "MOC"; // 이동할 폴더

    // 태그 확인 (단일 태그 또는 배열 형태 모두 처리)
    const tags = frontmatter.tags || [];
    const hasMOCTag = Array.isArray(tags) ? tags.includes("MOC") : tags === "MOC";

    if (hasMOCTag) {
        await tp.file.move(`${targetFolder}/${file.title}`);
        return `파일이 ${targetFolder}로 이동되었습니다.`;
    }
    return "MOC 태그가 없어 이동되지 않았습니다.";
}