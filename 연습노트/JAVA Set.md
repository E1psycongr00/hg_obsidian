---
tags:
  - JAVA
  - 자료구조
aliases:
  - Set
  - set
date: 2024-05-13
title: JAVA Set
---
작성 날짜: 2024-05-13
작성 시간: 12:55

#미완 #JAVA #자료구조 

----
## 내용(Content)

### Set

>[!summary]
>Set은 Unique하게 내부 데이터를 유지하는 자료구조이다.

Set을 활용하면 중복되지 않고 유일한 데이터 값들을 저장할 수 있다. Set 구현체에 따라 여러 용도로 Set 인터페이스를 사용가능하다.

자주 많이 사용하는 Set 구현체의 종류로는 HashSet, TreeSet, LinkedHashSet이 있다.

### TreeSet

>[!summary]
>TreeSet은 이진 트리 구조로 이루어진 자료구조이다.

TreeSet은 내부적으로 이진 트리 구조로 되어 있다. 그래서 TreeSet에 사용될 클래스는 Comparable을 구현해야 한다. 

>[!caution]
>Comparable을 구현해야 class는 비교 가능해진다. 내부적으로 값들의 크기를 비교하고 이진트리를 구성하기위해서는 비교 가능한 class여야 한다.

### HashSet

>[!summary]
>HashCode를 활용해 유일성을 판단하고 값들을 저장한다. 이 때 데이터들의 입력 순서나 정렬은 보장하지 않는다.

HashSet은 기본적으로 Hash Code를 활용한다. 왠만한 Collection의 클래스는 Equals/HashCode가 이미 구현되어 있기 때문에 쉽게 사용할 수 있다. 커스텀 클래스(Value Object)를 만들어 활용하는 경우 Equals/HashCode를 따로 구현해서 사용해주면 된다. 

### LinkedHashSet

>[!summary]
>HashCode를 활용하는 것은 HashSet과 같지만 입력한 값들의 저장 순서를 보장한다.

일반적으로 HashSet을 사용하지만, 입력한 순서를 보장해야 하는 경우 LinkedHashSet을 사용하면 된다. 

### TreeSet vs HashSet vs LinkedHashSet

TreeSet과 HashSet, 그리고 LinkedHashSet를 [[JMH|Java MicroBenchmark Harness]] 를 이용해서 성능 비교를 해보자.



## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트










