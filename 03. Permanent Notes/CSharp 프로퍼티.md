---
tags:
  - CSharp
aliases: null
title: CSharp 프로퍼티
created: 2024-10-30T00:00:00.000Z
---
작성 날짜: 2024-10-30
작성 시간: 16:56


----
## 내용(Content)

### 프로퍼티

> [!summary]
> C# 프로퍼티는 내부 속성을 get, set, init 과 같은 예약어들을 활용해서 속성 접근자를 접근하는 방법


### 기본적인 방법

```csharp
public class Person {
    private readonly string name;
    private readonly int age;

    public string Name
    {
        get => name;
        init => name = value;
    }

    public int Age
    {
        get
        {
            return age;
        }
        init
        {
            age = value;
        }
    }
}
```

```csharp
Person person = new() {
    Name="hello",
    Age=15
};


Console.WriteLine(person.Name);
```

init의 경우 {} 형태의 개체 이니셜 라이저를 활용해야 한다.

### 자동 할당 프로퍼티

```csharp
public class Person {
    public string Name { get; init; }
    public int Age { get; init; }
}
```

복잡한 로직이 없고, 간단하게 정의하는 경우 위와 같이 바디 안에 바로 정의해주면 알아서 프로퍼티를 할당한다.
## 질문 & 확장

(없음)

## 출처(링크)

- https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/using-properties

## 연결 노트










