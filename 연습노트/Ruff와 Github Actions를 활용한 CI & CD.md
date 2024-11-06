---
tags:
  - 미완
  - 솔루션
  - Python
  - Ruff
  - Github
aliases: 
date: 2024-11-06
title: Ruff와 Github Actions를 활용한 CI & CD
---
작성 날짜: 2024-11-06
작성 시간: 13:45


----

## 문제 & 원인



## 해결 방안

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
    - name: Lint with Ruff
      run: |
        poetry run ruff check .
    - name: Run tests
      run: |
        poetry run python -m unittest discover -v -p "*_test.py" tests
  

  code-format:
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
    - name: Run code format
      run: |
        poetry run ruff format .

```

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
