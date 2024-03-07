---
tags:
  - 솔루션
  - "#React"
  - "#Typescript"
aliases: 
date: 2024-03-07
title: State 로직을  Reducer로 분리하기
---
작성 날짜: 2024-03-07
작성 시간: 16:49

#미완 #솔루션 #React #Typescript 

----

## 문제 & 원인
다음과 같은 TaskContainer가 있다.

```ts
export default function TaskContainer() {
	const [tasks, setTasks] = useState(initialTasks);
	const handleAddTask = (text: string) => {
		setTasks([...tasks, { id: tasks.length, text }]);
	};

	const handleEditTask = (task: TaskState) => {
		setTasks(
			tasks.map(t => (t.id === task.id ? { ...t, text: task.text } : t))
		);
	};
	
	const handleDeleteTask = (id: number) => {
		setTasks(tasks.filter(task => task.id !== id));
	};
	
	return (
		<div className="m-4">
			<AddTask onAddTask={handleAddTask} />
			<TaskList
				tasks={tasks}
				onEditTask={handleEditTask}
				onDeleteTask={handleDeleteTask}
			/>
		</div>
	);
}
```

위의 컴포넌트 구조는 다음과 같다.

![[TaskContainer 구조(draw).svg]]

## 해결 방안
### 복잡한 컨테이너 어떻게 해야 할까
이 컴포넌트도 복잡해 보이지만 실제로는 이것보다 더 복잡한 컴포넌트들도 많다. state가 많고 이런 state를 관리하기 위한 핸들러가 많다면 이를 컨트롤하는 부모 컴포넌트의 코드량은 많아지고 이해하기 힘들어진다. React에서는 이를 reducer를 활용해서 분리할 수 있다.

### useReducer로 로직 분리하기

## 질문 & 확장

(없음)

## 출처(링크)


## 연결 노트
