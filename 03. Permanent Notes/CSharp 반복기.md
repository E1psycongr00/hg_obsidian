---
tags:
  - 완성
  - CSharp
aliases:
  - CSharp Iterator
title: CSharp 반복기
created: 2024-10-30T00:00:00.000Z
---
작성 날짜: 2024-10-30
작성 시간: 16:04


----
## 내용(Content)

### 반복기

>[!summary]
>반복기(Iterator)는 컬렉션의 요소를 순차적으로 접근하게 해주는 강력한 기능이다. foreach와 함께 많이 사용된다.

배열, 리스트, 열거자 등을 foreach를 통해서 순차적으로 쉽게 접근 가능하게 해준다. 열거자의 경우 yield return을 활용해서 지연 평가(Lazy Evaluation)이 가능하기 때문에 메모리 효율이 좋다.


### 메서드 반복기

메서드를 이용하면 쉽게 IEnumerable한 객체를 만들어서 foreach를 만들 수 있다.

```csharp
using System.Collections;

IEnumerable SomeNumbers()
{
    yield return 3;
    yield return 5;
    yield return 8;
}

foreach(int number in SomeNumbers())
{
    Console.Write(number.ToString() + " ");
    // 3 5 8
}
```

### 컬랙션 클래스 반복기

IEnumerable 인터페이스를 상속 받아 구현한다.

```csharp
using System.Collections;

class DayOfWeek : IEnumerable
{
     private string[] days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    public IEnumerator GetEnumerator()
    {
        for (int index = 0; index < days.Length; index++) {
            yield return days[index];
        }
    }
}
```

GetEnumerator를 yieldReturn을 통해 구현하면, IEnumerator를 반환하며, DayOfWeek을 만든 커스텀 클래스는 foreach로 순회가 가능해진다. 이 때 내부 로직은 GetEnumerator()에 따라 달라진다.

### 복잡하게 응용하기

```csharp
using System.Collections;

public class Zoo : IEnumerable
{
    // Private members.
    private List<Animal> animals = new();

    public void AddMammal(string name) {
        animals.Add(new Animal(){Name=name, Type=Animal.TypeEnum.Mammal});
    }

    public void AddBird(string name)
    {
        animals.Add(new Animal { Name = name, Type = Animal.TypeEnum.Bird });
    }

    public IEnumerator GetEnumerator()
    {
        foreach (Animal theAnimal in animals)
        {
            yield return theAnimal.Name;
        }
    }

    // Public members.
    public IEnumerable Mammals
    {
        get { return AnimalsForType(Animal.TypeEnum.Mammal); }
    }

    public IEnumerable Birds
    {
        get { return AnimalsForType(Animal.TypeEnum.Bird); }
    }

        // Private methods.
    private IEnumerable AnimalsForType(Animal.TypeEnum type)
    {
        foreach (Animal theAnimal in animals)
        {
            if (theAnimal.Type == type)
            {
                yield return theAnimal.Name;
            }
        }
    }

    // Private class.
    private class Animal
    {
        public enum TypeEnum { Bird, Mammal }

        public string Name { get; set; }
        public TypeEnum Type { get; set; }
    }
}
```

Zoo의 경우 IEnumerator를 리턴하는 GetEnumerator()를 통해 Zoo의 기본 foreach문에 대한 로직을 리턴하고, Birds나 Mammals 프로퍼티를 IEnumerable로 리턴하여 Zoo 내부 객체를 커스텀하게 yield 하도록 짤 수 있다.

위 코드의 경우 Zoo.Birds는 Birds 정보만 리턴하고, Zoo.Mammals는 Mammals 정보만 리턴한다.

## 질문 & 확장

반복기를 사용할 때는 다음을 알아두자

- `IEnumerable`타입을 구현하는 경우 -> `GetEnumerator()` 메서드 구현
- `IEnumerable`타입을 리턴하는 메서드나 프로퍼티를 통해 커스텀 반복기 구현
- 모두 반환은 `yield return`을 사용

## 출처(링크)

- https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/concepts/iterators#technical-implementation

## 연결 노트










