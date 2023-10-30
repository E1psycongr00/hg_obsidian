
작성 날짜: 2023-10-26
작성 시간: 22:29

## 주제: #미완

----
## 원문

MapStruct 1.5.5 Final을 기준으로 사용 방법을 알아보자


### MapStruct를 사용하는 이유

비즈니스 로직을 짜다 보면 특정 data class가 필요한 경우가 생길 수 있다. 예를 들면 MVC 패턴으로 코드를 짤 때 컨트롤러에서는 DTO를 사용한다. 단순 데이터를 전달하는 목적으로 사용하므로, 만약 domain 영역에서 사용하려면 dto가 아닌 엔티티도 변환해야 할 일이 생긴다. 

### build.gradle
```kotlin
dependencies {
	implementation("org.mapstruct:mapstruct:1.5.5.Final")
	annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")
}
```




## 질문 & 확장

(없음)

## 출처(링크)
- https://mapstruct.org/documentation/installation/

## 연결 노트










