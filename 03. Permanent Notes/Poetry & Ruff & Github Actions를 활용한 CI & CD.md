---
tags:
  - 완성
  - 솔루션
  - Python
  - Ruff
  - Github
  - Poetry
aliases: 
date: 2024-11-06
title: Poetry & Ruff & Github Actions를 활용한 CI & CD
---
작성 날짜: 2024-11-06
작성 시간: 13:45


----

## 문제 & 원인

Poetry를 이용해서 Project를 진행하는 경우, 의존성이나, Ruff 관련 설정 정보를 `project.toml`에 보관한다. 그래서 실제 CI를 진행하더라도, 동일한 Python verson과 함께 Poetry 기반으로 linter와 format 테스트를 진행해야 한다.

## 해결 방안

#### python 설정하기

```yaml
steps:
- uses: actions/checkout@v4
- name: Set up Python 3.12
  uses: actions/setup-python@v4
  with:
    python-version: "3.12"
```

#### Poetry 설치하기

```yaml
- name: Install Poetry
  run: |
    curl -sSL https://install.python-poetry.org | python3 -
    echo "$HOME/.local/bin" >> $GITHUB_PATH
- name: Install dependencies
  run: |
    poetry install --only dev
```

poetry 공식 홈페이지에서 설치 방식대로, ubuntu os에 설치한다. 그리고 poetry install 명령어를 통해 project.toml에 저장된 의존성 패키지를 설치한다.

>[!tip]
>poetry install --only dev를 사용한 이유는 ruff는 dev에 설치되어 있기 때문에 dev만 설치할 경우, 빠르게 Github Actions를 수행할 수 있다. 실제 테스트 때문에 의존성이 필요한 경우엔 그냥 poetry install로 의존성 패키지를 설치한다.

#### linter와 format 실행하기

```yaml
- name: Lint with Ruff
  run: |
    poetry run ruff check .
- name: Run code format
  run: |
    poetry run ruff format --check .
```

정적 분석과 포맷 스타일 분석을 하는 명령어


#### Full Code

```yaml
name: Python application

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Set up Python 3.12
      uses: actions/setup-python@v4
      with:
        python-version: "3.12"
    - name: Install Poetry
      run: |
        curl -sSL https://install.python-poetry.org | python3 -
        echo "$HOME/.local/bin" >> $GITHUB_PATH
    - name: Install dependencies
      run: |
        poetry install
    - name: Run tests
      run: |
        poetry run python -m unittest discover -v -p "*_test.py" tests
  

  code-lint-and-format-check:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Set up Python 3.12
      uses: actions/setup-python@v4
      with:
        python-version: "3.12"
    - name: Install Poetry
      run: |
        curl -sSL https://install.python-poetry.org | python3 -
        echo "$HOME/.local/bin" >> $GITHUB_PATH
    - name: Install dependencies
      run: |
        poetry install --only dev
    - name: Lint with Ruff
      run: |
        poetry run ruff check .
    - name: Run code format
      run: |
        poetry run ruff format --check .


```


## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
