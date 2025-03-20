---
tags:
  - VSCode
  - JAVA
aliases: null
title: java-vscode-setting-json
created: 2024-10-31T00:00:00.000Z
---
작성 날짜: 2024-10-31
작성 시간: 19:27


----
## 내용(Content)

### 핵심 플러그인

- Java Extension Pack
- Gradle Extension Pack
- Spring Boot Extension Pack

![[Pasted image 20241031193037.png]]

### Editor setting.json 설정

Java JDK 인식 및 Check for Java와 Formatter 자동화를 위한 Java 설정

```json
{
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "editor.codeActionsOnSave": {
        "source.organizeImports": "explicit",
        "source.fixAll": "always"
    },
    "files.autoSave": "afterDelay",
    "workbench.iconTheme": "material-icon-theme",

    // Java 관련 설정
    "java.jdt.ls.java.home": "C:\\Users\\marri\\.jdks\\graalvm-jdk-21.0.4",
    "java.format.settings.url": "https://raw.githubusercontent.com/google/styleguide/gh-pages/eclipse-java-google-style.xml",
    "java.saveActions.organizeImports": true,
    "java.compile.nullAnalysis.mode": "automatic",
    "java.jdt.ls.vmargs": "-XX:+UseParallelGC -XX:GCTimeRatio=4 -XX:AdaptiveSizePolicyWeight=90 -Dsun.zip.disableMemoryMapping=true -Xmx1G -Xms100m",
    "[java]": {
        "editor.defaultFormatter": "redhat.java"
    },

    // 개발 도구 설정
    "maven.terminal.useJavaHome": true,
    "boot-java.rewrite.reconcile": true,
    "redhat.telemetry.enabled": true,

    // Java 관련 도구들의 Java 홈 설정
    "java.import.gradle.java.home": "C:\\Users\\marri\\.jdks\\graalvm-jdk-21.0.4",
    "xml.java.home": "C:\\Users\\marri\\.jdks\\graalvm-jdk-21.0.4",
    "sonarlint.ls.javaHome": "C:\\Users\\marri\\.jdks\\graalvm-jdk-21.0.4",
    "spring-boot.ls.java.home": "C:\\Users\\marri\\.jdks\\graalvm-jdk-21.0.4",

    // GitHub 이슈 관련 설정
    "githubIssues.queries": [
        {
            "label": "My Issues",
            "query": "is:open assignee:${user} repo:${owner}/${repository}",
            "groupBy": ["milestone"]
        },
        {
            "label": "Created Issues",
            "query": "author:${user} state:open repo:${owner}/${repository} sort:created-desc"
        },
        {
            "label": "Recent Issues",
            "query": "state:open repo:${owner}/${repository} sort:updated-desc"
        }
    ]
}
```


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










