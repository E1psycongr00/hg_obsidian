---
tags:
  - 솔루션
  - JAVA
  - 유한오토마타
aliases: null
title: State Machine 구현
created: 2024-12-06T00:00:00.000Z
---
작성 날짜: 2024-12-06
작성 시간: 18:34


----

## 문제 & 원인

StateMachine 에 대해서 이해하기 위해 작성했다.

## 해결 방안

### 상태 머신 구현 및 동작 원리

상태 머신(state machine)은 시스템의 상태와 그 상태 간의 전이(transitions)를 관리하는 중요한 패턴이다. 상태 머신은 복잡한 시스템을 단순화하고, 각 상태와 상태 전환을 명확하게 정의함으로써 시스템의 예측 가능성을 높인다. 이를 통해 상태 변화에 대한 규칙을 명시적으로 정의하고, 코드의 복잡성을 줄여 유지보수를 쉽게 할 수 있다. 이번 글에서는 상태 머신을 처음 배우는 사람들을 위해, 주어진 코드를 통해 상태 머신을 어떻게 구현하는지, 그리고 그 동작 원리에 대해 설명하려고 한다. 코드 예시는 Java로 작성된 상태 머신 구현을 사용할 예정이다.

### 1. 상태 머신의 주요 구성 요소

상태 머신 구현을 위해 사용된 파일들을 살펴보면 다음과 같은 주요 구성 요소를 알 수 있다. 각 구성 요소는 상태 머신의 동작에 중요한 역할을 하며, 각기 다른 책임을 가지고 있다:

- **State (상태)**: 시스템이 가질 수 있는 모든 상태를 정의. (`State.java`, `OrderState.java`) 각 상태는 시스템의 특정 순간을 표현.
- **Event (이벤트)**: 상태를 변경하는 트리거 역할을 함. (`Event.java`, `OrderEvent.java`) 이벤트는 상태 전환을 일으키는 특정 조건이나 신호.
- **Transition (상태 전이)**: 특정 상태에서 이벤트가 발생했을 때 다른 상태로 변경되는 동작을 정의. (`Transition.java`) 전이는 상태 간의 유효한 변화 경로를 정의.
- **StateMachine (상태 머신 인터페이스)**: 상태 머신의 동작을 정의한 핵심 인터페이스. (`StateMachine.java`) 상태 머신의 기본 기능을 명시하고 구현체에서 이를 확장.
- **DefaultStateMachine (기본 상태 머신 구현체)**: 상태, 이벤트, 전이를 바탕으로 상태 머신을 구현한 클래스. (`DefaultStateMachine.java`) 상태 관리와 전이 규칙을 실제로 수행.

### 2. 상태 머신의 동작 원리

#### 2.1 상태와 이벤트의 정의
`State` 인터페이스와 `Event` 인터페이스는 각각 상태와 이벤트의 기본 구조를 정의한다. 

```java
package state_machine.core;

/**
 * 상태 기계의 상태를 나타내는 인터페이스
 */
public interface State {
    /**
     * 상태의 이름을 반환합니다.
     * 
     * @return 상태 이름
     */
    String getName();
}
```

위의 `State` 인터페이스는 각 상태가 이름을 가지도록 정의한다.

```java
package state_machine.core;

/**
 * 상태 기계의 이벤트를 나타내는 인터페이스
 */
public interface Event {
    /**
     * 이벤트의 이름을 반환합니다.
     * 
     * @return 이벤트 이름
     */
    String getName();
}
```

마찬가지로 `Event` 인터페이스는 이벤트의 이름을 반환하도록 한다.

`OrderState`와 `OrderEvent`는 이를 구체화한 구현체로, 주문의 상태와 그에 대한 가능한 이벤트를 정의한다. 예를 들어, `OrderEvent` 클래스는 주문 상태에 적용될 수 있는 이벤트인 결제(PAY), 배송(SHIP), 취소(CANCEL) 등을 정의한다.

```java
public enum OrderState implements State {
    CREATED("생성됨"),
    PAID("결제됨"),
    SHIPPED("배송중"),
    DELIVERED("배송완료"),
    CANCELLED("취소됨");

    private final String name;

    OrderState(String name) {
        this.name = name;
    }

    @Override
    public String getName() {
        return name;
    }
}
```

`OrderState`는 주문의 상태를 나타내며, 각 상태는 `getName()` 메서드를 통해 이름을 반환한다.

#### 2.2 상태 전이 정의
`Transition` 클래스는 상태 전이를 나타냅니다. 상태 전이는 세 가지 요소로 구성된다:
- 출발 상태 (`sourceState`)
- 목표 상태 (`targetState`)
- 트리거 이벤트 (`event`)

```java
package state_machine.core;

/**
 * 상태 전이를 나타내는 클래스
 */
public class Transition {
    private final State sourceState;
    private final State targetState;
    private final Event event;
    private TransitionAction action;

    public Transition(State sourceState, State targetState, Event event) {
        this.sourceState = sourceState;
        this.targetState = targetState;
        this.event = event;
    }

    public State getSourceState() {
        return sourceState;
    }

    public State getTargetState() {
        return targetState;
    }

    public Event getEvent() {
        return event;
    }

    public void setAction(TransitionAction action) {
        this.action = action;
    }

    public void executeAction() {
        if (action != null) {
            action.execute(sourceState, targetState, event);
        }
    }

    @FunctionalInterface
    public interface TransitionAction {
        void execute(State source, State target, Event event);
    }
}
```

전이 시 실행될 수 있는 액션도 정의할 수 있다. 이를 통해 상태 변화 시 특정 로직을 수행할 수 있다.

#### 2.3 기본 상태 머신의 구현
`DefaultStateMachine` 클래스는 상태 머신의 핵심 동작을 구현한다. 이 클래스는 상태 머신의 현재 상태를 추적하며, 주어진 이벤트에 따라 상태를 전이한다. 상태 전이는 `addTransition()` 메서드를 사용해 설정한다.

```java
public class DefaultStateMachine implements StateMachine {
    private State currentState;
    private final State initialState;
    private final Map<State, Map<Event, Transition>> transitions;
    private final List<StateChangeListener> listeners;
    private boolean started;

    public DefaultStateMachine(State initialState) {
        this.initialState = initialState;
        this.currentState = initialState;
        this.transitions = new HashMap<>();
        this.listeners = new ArrayList<>();
        this.started = false;
    }

    public void addTransition(State sourceState, State targetState, Event event) {
        transitions.computeIfAbsent(sourceState, k -> new HashMap<>())
                .put(event, new Transition(sourceState, targetState, event));
    }

    @Override
    public State getCurrentState() {
        return currentState;
    }

    @Override
    public boolean sendEvent(Event event) {
        if (!started) {
            throw new IllegalStateException("상태 기계가 시작되지 않았습니다.");
        }

        Map<Event, Transition> stateTransitions = transitions.get(currentState);
        if (stateTransitions == null) {
            return false;
        }

        Transition transition = stateTransitions.get(event);
        if (transition == null) {
            return false;
        }

        State oldState = currentState;
        currentState = transition.getTargetState();
        transition.executeAction();
        notifyListeners(oldState, currentState, event);
        return true;
    }

    @Override
    public void start() {
        if (!started) {
            currentState = initialState;
            started = true;
        }
    }

    @Override
    public void stop() {
        started = false;
    }
}
```

상태 머신이 시작되면 (`start()` 메서드 호출), 상태는 초기 상태(`initialState`)로 설정된다. 이후 `sendEvent()` 메서드를 통해 이벤트를 상태 머신에 전달하면, 현재 상태에 정의된 전이 정보에 따라 상태가 변경된다. 만약 유효한 전이가 존재하지 않으면 아무 일도 일어나지 않는다. 이를 통해 시스템은 특정 이벤트에 반응해 적절히 상태를 변경할 수 있다.

#### 2.4 주문 예제
`OrderExample` 클래스는 상태 머신의 예시 구현을 통해 상태 전이의 실제 동작 방식을 보여줍니다. 이를 통해 독자는 상태 머신의 동작 원리를 구체적으로 이해하고, 이를 실무에 적용하는 방법을 배울 수 있습니다. 여기서는 주문의 상태가 생성(CREATED)에서 결제됨(PAID), 배송중(SHIPPED), 배송완료(DELIVERED)로 변경되는 흐름을 관리합니다. `DefaultStateMachine` 객체에 전이 규칙을 설정하고 이벤트를 전송하여 상태가 변경되는 과정을 시뮬레이션합니다. 상태 변경 시에는 상태 변경 리스너가 등록되어 있어, 상태가 변경될 때마다 콘솔에 그 변화가 출력됩니다.

```java
public class OrderExample {
    public static void main(String[] args) {
        // 상태 기계 생성
        StateMachine orderStateMachine = new DefaultStateMachine(OrderState.CREATED);

        // 상태 전이 정의
        DefaultStateMachine machine = (DefaultStateMachine) orderStateMachine;
        machine.addTransition(OrderState.CREATED, OrderState.PAID, OrderEvent.PAY);
        machine.addTransition(OrderState.PAID, OrderState.SHIPPED, OrderEvent.SHIP);
        machine.addTransition(OrderState.SHIPPED, OrderState.DELIVERED, OrderEvent.DELIVER);
        machine.addTransition(OrderState.CREATED, OrderState.CANCELLED, OrderEvent.CANCEL);
        machine.addTransition(OrderState.PAID, OrderState.CANCELLED, OrderEvent.CANCEL);

        // 상태 변경 리스너 추가
        machine.addStateChangeListener((from, to, event) -> System.out.printf("상태 변경: %s -> %s (이벤트: %s)%n",
                from.getName(), to.getName(), event.getName()));

        // 상태 기계 시작
        machine.start();

        // 이벤트 발생
        System.out.println("현재 상태: " + machine.getCurrentState().getName());

        machine.sendEvent(OrderEvent.PAY);
        System.out.println("현재 상태: " + machine.getCurrentState().getName());

        machine.sendEvent(OrderEvent.SHIP);
        System.out.println("현재 상태: " + machine.getCurrentState().getName());

        machine.sendEvent(OrderEvent.DELIVER);
        System.out.println("현재 상태: " + machine.getCurrentState().getName());
    }
}
```

### 3. 상태 머신의 사용 시나리오
상태 머신은 복잡한 시스템의 상태를 추적하고 상태 전환을 명확하게 관리할 수 있게 해준다. 예를 들어, 주문 시스템에서 주문의 각 단계(생성, 결제, 배송 등)를 상태 머신을 통해 관리하면, 상태 간의 유효한 전이를 쉽게 정의하고 유지 보수 할 수 있다. 이와 같은 방식으로 상태 머신은 워크플로우 관리, 게임 개발의 캐릭터 상태 관리 등 다양한 곳에서 사용될 수 있다.

### 4. 결론
상태 머신은 시스템의 상태를 명확히 정의하고, 상태 전이 규칙을 관리함으로써 코드의 복잡성을 줄이고, 시스템의 예측 가능성을 높이는 유용한 설계 패턴이다. 본 예제에서 `DefaultStateMachine`을 사용해 상태와 전이를 정의하고, 이를 통해 주문 상태를 관리하는 흐름을 구현할 수 있다. 이러한 상태 머신 패턴은 복잡한 상태 전환을 요구하는 다양한 응용 프로그램에서 큰 도움이 될 수 있다.


## 질문 & 확장

(없음)

## 출처(링크)

- - [STUDY\_REFERENCE/java/study\_state\_machine at main · E1psycongr00/STUDY\_REFERENCE · GitHub](https://github.com/E1psycongr00/STUDY_REFERENCE/tree/main/java/study_state_machine)

## 연결 노트
