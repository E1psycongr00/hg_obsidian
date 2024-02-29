---
tags:
  - ast
  - SyntaxTree
aliases:
---
작성 날짜: 2024-02-28
작성 시간: 15:04

#미완 #솔루션 #ast #SyntaxTree 

----

## 문제 & 원인
블로그를 이전하거나 또는 Publishing 할 때 기존의 에디터에서 제공하지 않는 Markdown 문법을 사용하면 Html로 렌더링되지 않아 문제가 발생한 일이 있을 것이다.

예를 들면 Github에서 새로 제공하는 markdown-alert라는 기능일 것이다.  이것은 Obsidian에서 콜아웃처럼 동작하는데 문제는 기본 마크 다운 문법에는 없다는 것이며, 에디터마다 문법이 서로 조금씩 다르다.

### Github Alert

![](Pasted%20image%2020240228153619.png)

그 중 Note가 어떤 HTML을 생성했는지 살펴보면 다음과 같다.

![](Pasted%20image%2020240228153825.png)

div 내에 2개의 p 태그를 정의하는 데 하나는 title을 정의하고 다른 하나는 단순 p태그로 이루어져 있고 Block문에 메인 컨텐츠를 담고 있다.

문서를 살펴보면 Github Alert는 중첩이 허용되지 않는다고 한다.

### Obsidian Callout
Obsidian의 콜아웃은 더 많은 기능을 지원한다. 
- 중첩 사용 가능
- Obsidian title 사용가능
- 콜아웃을 접었다 폈다 할 수 있음

간단하게 어떻게 HTML로 렌더링 됬는지 살펴보자

![](Pasted%20image%2020240228154426.png)

![](Pasted%20image%2020240228154608.png)

Obsidian callout의 경우  callout 클래스 div가 존재한다.
그리고 그 내부엔 callout-title과 callout- content 2개의 div 태그로 나뉘어 진다.

callout-title을 더 파고 들면
![](Pasted%20image%2020240228154758.png)

callout-icon과 callout-title-inner가 정의되어 있음을 알 수 있다.
만약 callout title에 text가 없다면 callout-title-inner는 생성되지 않는다.


## 해결 방안
### 해결 전략
Obsidian 방식은  많은 기능을 지원하고 처음 markdown 문법을 조작하고자하는 나에겐 어려웠다. 그래서 상대적으로 쉬운 GIthub Alert 방식으로 html이 렌더링 되게 만들고 싶었다.

그 전에 markdown으로 html로 렌더링하기 위해서 unified, remark, rehype을 사용했다.

[unified & remark & rehype 동작 과정](unified%20&%20remark%20&%20rehype%20동작%20과정.md) 을 살펴보면 parsing 자체를 조작하는 것보다 중간에 ast를 조작하는 것이 우리 목표를 달성하기 더 쉽다. 

ast 를 중간에 조작해서 github-alert 문법을 호환하고 html로 렌더링 할 수 있도록 해보자



>[!info] unified
>unified는 [unist](unist.md) 트리에 대한 프로세서라 할 수 있다. unified는 소스를 파싱에 적절한 ast를 만들고 트랜스포머로 순회하면서 ast를 조작한 후에 컴파일러로 결과를 출력한다. 파이프라인 패턴으로 Plugin을 붙이며 사용한다.

>[!info] remark
>mdast(markdown을  ast로 표현 ) 기반으로 동작하는  플러그인이라 할 수 있다.   mdast 트리 를 제어하고 트랜스포머로 조작할 수 있다.
>

>[!note] rehype
>rehype은 hast(html을 ast로 표현) 기반으로 동작하는 플러그인이다. hast를 제어하고 트랜스 포머를 활용해 트리를 조작 가능하다.

### 문제 해결하기
#### remark를 이용해 backquote 문을 원하는 type으로 바꾸기

```
>[!note]
>hello world
```

위와 같은 markdown을 파싱하면 다음과 같은 mdast를 얻을 수 있다.


```
{
  type: 'root',
  children: [
    {
      type: 'blockquote',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: '[!note]\r\nhello world',
              position: {
                start: { line: 1, column: 2, offset: 1 },
                end: { line: 2, column: 13, offset: 22 }
              }
            }
          ],
          position: {
            start: { line: 1, column: 2, offset: 1 },
            end: { line: 2, column: 13, offset: 22 }
          }
        }
      ],
      position: {
        start: { line: 1, column: 1, offset: 0 },
        end: { line: 2, column: 13, offset: 22 }
      }
    }
  ],
  position: {
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 2, column: 13, offset: 22 }
  }
}
```

mdast를 분석하면 blockquote 타입으로 생성되고 내부에 paragraph 타입이 생성되었다. paragraph 내부에는 text 타입이 존재한다.

쉽게 설명하면 html로 렌더링 되는 태그는 다음과 같다.

- blockquote => blockquote
- paragraph => p
- text => 태그 안에 정보 ex) `<p>{text}</p>`

Github Alert로 만들기 위해서는 
- blockquote => 클래스 네임이 들어간 div 태그로 바꿔야 하며
- class => github-alert github-alert-${alertType} 로 바뀌어야 한다.
- 내부의 p 태그는 2개의 p 태그가 존재해야 하며 첫 p 태그는 github-alert-title로 정의된다
## 질문 & 확장

(없음)

## 출처(링크)
- https://help.obsidian.md/Editing+and+formatting/Callouts
- https://docs.github.com/ko/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
- [Markdown이 약간 부족할 때 - sorto.me](https://sorto.me/posts/2022-02-20--markdown)
## 연결 노트
- [unist](unist.md)









