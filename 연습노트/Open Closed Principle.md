---
tags:
  - 미완
  - 객체지향
aliases: 
date: 2024-10-24
title: Open Closed Principle
---
작성 날짜: 2024-10-24
작성 시간: 12:10


----
## 내용(Content)

### Open Closed Principal

>[!summary]
>소프트웨어 구성 요소는 확장에 대해서 개방(Open)되어야 하지만, 변경에 대해서는 폐쇠(Closed)되어야 한다. 

OCP는 쉽게 의미하면 코드의 변경은 최소화하고 확장(새로운 코드를 추가)하는 방식으로 구성되어야 한다.

코드를 수정하면, 결합되어 있는 모듈 간의 사이드 이펙트를 발생할 가능성이 높아진다. 그렇기 떄문에 버전이 높아질수록 이전 코드와는 호환되지 않을 가능성이 높아진다는 의미가 된다. 확장은 기능을 새로운 파일에 추가하는 식으로 확장하기 떄문에 변경에 닫혀있고, 사이드 이펙트 가능성이 낮아진다.

>[!caution]
>소프트웨어 구성 요소란 Component, Class, Module, Function 등을 의미한다. 

### OCP를 적용하는 방법

OCP를 적용하는 방법은 다양한 방법이 있지만 주요 방법들은 다음과 같다.

1. 추상화와 다형성 적용
2. 의존성 주입(DI)
3. 전략 패턴과 같은 디자인 패턴 사용


### OCP에 위배된 코드 예제

```java
import java.util.HashMap;
import java.util.Map;

public class Animal {
    private final String name;
    private final int age;
    private final String species;
    private static final Map<String, Integer> defaultSpeed;

    static {
        defaultSpeed = new HashMap<>();
        defaultSpeed.put("cheetah", 120);
        defaultSpeed.put("rabbit", 60);
        defaultSpeed.put("turtle", 5);
        defaultSpeed.put("snake", 4);
        defaultSpeed.put("human", 10);
    }
    public Animal(String name, int age, String species) {
        this.name = name;
        this.age = age;
        this.species = species;
    }

    public int run() {
        // 4발 동물은 + 10
        // 2발 동물은 + 5
        // 나머지는 기본 속도
        int speed = defaultSpeed.getOrDefault(species, 0);
        if (species.equals("cheetah") || species.equals("rabbit")) {
            return speed + 10;
        } else if (species.equals("turtle") || species.equals("snake")) {
            return speed + 5;
        }
        return speed;
    }

}
```

위 코드는 Animal이라는 클래스가 있고, Species라는 타입을 만들고 defaultSpeed Map을 활용해 기본 스피드를 지정해주고 있다. 그리고 run() 메서드는 4발 동물 또는 2발 동물에 따라 속도가 다르며 나머지는 기본 속도를 가진다.

그런데 이 코드의 문제점은 무엇일까?

새로운 동물이 추가될 때마다, run 메서드, defaultSpeed를 매번 업데이트해줘야 하고, if 분기문도 매우 복잡해진다. 또한 동물이 4발인지, 2발인지 실수할 가능성도 생긴다.

즉, 매번 기능이 추가될 때마다 코드를 수정해야 하므로, 변경에는 열려있고, 확장에는 닫혀있는 OCP 원칙과는 완전히 반대의 구조로 설계되어 있다.

### 추상 클래스와 상속을 이용해서 해결해보기



## 질문 & 확장

(없음)

## 출처(링크)

- https://dublin-java.tistory.com/48
- 
## 연결 노트










