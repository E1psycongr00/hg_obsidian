// checkFrontMatter.js
module.exports = async function(tp, conditions) {
    const frontmatter = tp.frontmatter; // YAML frontmatter 데이터

    for (const [key, expectedValue] of Object.entries(conditions)) {
        const actualValue = frontmatter[key];
        
        if (!isConditionMet(actualValue, expectedValue)) {
            return false;
        }
    }
    
    return true;
};


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

