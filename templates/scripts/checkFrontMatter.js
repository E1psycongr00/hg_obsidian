// checkFrontMatter.js
module.exports = async function(tp, conditions) {
    const frontmatter = tp.frontmatter; // YAML frontmatter 데이터

    // 입력값 검증
    if (!isValidConditions(conditions)) {
        showError("조건 객체가 올바르게 지정되지 않았습니다.");
        return false;
    }
    
    // 모든 조건이 충족되는지 확인
    if (!areAllConditionsMet(frontmatter, conditions)) {
        showError("프론트매터 조건이 모두 충족되지 않았습니다.");
        return false;
    }
    
    return true;
};

/**
 * 조건 객체의 유효성을 검사하는 함수
 * @param {Object} conditions - 검증할 조건 객체
 * @returns {boolean} 조건 객체가 유효한지 여부
 */
function isValidConditions(conditions) {
    return conditions && typeof conditions === "object";
}

/**
 * 프론트매터가 모든 조건을 충족하는지 확인하는 함수
 * @param {Object} frontmatter - 검증할 프론트매터 데이터
 * @param {Object} conditions - 충족해야 할 조건 객체
 * @returns {boolean} 모든 조건이 충족되는지 여부
 */
function areAllConditionsMet(frontmatter, conditions) {
    for (const [key, expectedValue] of Object.entries(conditions)) {
        const actualValue = frontmatter[key];
        
        if (!isConditionMet(actualValue, expectedValue)) {
            return false;
        }
    }
    return true;
}

/**
 * 개별 조건이 충족되는지 확인하는 함수
 * @param {any} actualValue - 프론트매터의 실제 값
 * @param {any} expectedValue - 기대하는 값
 * @returns {boolean} 조건이 충족되는지 여부
 */
function isConditionMet(actualValue, expectedValue) {
    if (Array.isArray(actualValue)) {
        return actualValue.includes(expectedValue);
    }
    return actualValue === expectedValue;
}

/**
 * 오류 메시지를 표시하는 함수
 * @param {string} message - 표시할 오류 메시지
 */
function showError(message) {
    new window.Notice(message);
}

