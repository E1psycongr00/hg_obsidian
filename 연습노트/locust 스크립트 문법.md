작성 날짜: 2023-12-01
작성 시간: 14:46

## 주제: #미완 #Locust #부하테스트 

----
## 내용(Content)

### Locust 스크립트를 알아야 하는 이유

Locust는 GUI로 테스트를 하는 것이 아니라 스크립트를 짜고 스크립트 기반으로 부하 테스트를 진행한다. python으로 스크립트를 짜기 때문에 스크립트 문법을 배우기 굉장히 쉽고, 스크립트를 통해 세부적으로 테스트 제어가 가능하다.

### 알아야 할 것

- [[User 클래스]]
- 
### Task
@task 어노테이션을 이용해 task 작업을 지정할 수 있다. 여러 태스크를 만들 수 있는데 task의 빈도수(가중치)를 지정하려면 데코레이터에 정수 인자를 넘겨주면 된다.

```python
class MyUser(User):
    wait_time = between(5, 15)

    @task(3)
    def task1(self):
        pass

    @task(6)
    def task2(self):
        pass
```


### TaskSet을 만들고 유저 클래스에서 사용하기
Task가 복잡하거나 Task를 클래스로 나누고 싶은 경우 TaskSet을 활용할 수 있다.  TaskSet을 나누고 유저에 등록하는 방법을 알아보자

#### Nested

```python
from locust import SequentialTaskSet, constant, task, HttpUser  
  
  
class MyTaskSet(HttpUser):  
    @task  
    class MyTasks(SequentialTaskSet):  
  
        @task  
        def print(self):  
            print("hello")  
  
        @task  
        def print2(self):  
            print("world")  
  
    host = "https://mecastudy.com"  
    wait_time = constant(1)  
    tasks = [MyTasks]
```


#### 따로 정의하고 주입하기

```python
from locust import SequentialTaskSet, constant, between, task, HttpUser, TaskSet  
  
  
class MyTasks(TaskSet):  
  
    @task  
    def print(self):  
        print("hello")  
  
    @task  
    def print2(self):  
        print("world")
```


#### SequentialTaskSet
순차적인 task를 정의하고 싶은 경우에 사용한다.

```python
from locust import SequentialTaskSet, constant, between, task, HttpUser  
  
  
class MyTasks(SequentialTaskSet):  
  
    @task  
    def print(self):  
        print("hello")  
  
    @task  
    def print2(self):  
        print("world")  
  
  
class MyTaskSet(HttpUser):  
    host = "https://mecastudy.com"  
    wait_time = constant(1)  
    tasks = [MyTasks]
```
## 질문 & 확장

(없음)

## 출처(링크)
- https://kim-dragon.tistory.com/133
- https://docs.locust.io/en/stable/writing-a-locustfile.html
- https://bcho.tistory.com/1369

## 연결 노트










