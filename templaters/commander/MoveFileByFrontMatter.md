<%*
// 설정 로드
const conditionSets = await tp.user.app.plugins.plugins['templater-obsidian'].templater.parse_templates_wrapper(
    "templaters/config/conditionsConfig.js"
);

// 메인 로직 처리 스크립트 호출
const processFileMovement = await tp.user.app.plugins.plugins['templater-obsidian'].templater.parse_templates_wrapper(
    "templaters/scripts/processFileMovement.js"
);

// 결과 메시지 생성
const message = await processFileMovement(tp, conditionSets);

// 사용자에게 알림
new window.Notice(message);
%>