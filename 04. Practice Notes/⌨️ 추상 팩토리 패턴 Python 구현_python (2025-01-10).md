---
tags:
  - 객체지향
  - 디자인패턴
  - Python
  - GoF
  - 추상팩토리
aliases:
  - Abstract Factory Python Implementation
  - 추상 팩토리 파이썬 구현
created: 2025-01-10
title: ⌨️ 추상 팩토리 패턴 Python 구현_python (2025-01-10)
note-type: CODE
language: python
environment: Python 3.8+
completed: false
archive: false
area-reason: 디자인 패턴 구현 예제
---

## 코드

### Code

```python
from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable
import platform


# AbstractProduct 프로토콜들 - 제품군의 각 제품 타입을 정의
@runtime_checkable
class Button(Protocol):
    """버튼 컴포넌트의 인터페이스를 정의하는 프로토콜"""
    
    def render(self) -> None:
        """버튼을 화면에 렌더링한다"""
        ...
    
    def on_click(self) -> None:
        """버튼 클릭 이벤트를 처리한다"""
        ...


@runtime_checkable
class TextField(Protocol):
    """텍스트 필드 컴포넌트의 인터페이스를 정의하는 프로토콜"""
    
    def render(self) -> None:
        """텍스트 필드를 화면에 렌더링한다"""
        ...
    
    def set_text(self, text: str) -> None:
        """텍스트 필드에 텍스트를 설정한다"""
        ...
    
    def get_text(self) -> str:
        """텍스트 필드의 텍스트를 반환한다"""
        ...


@runtime_checkable
class CheckBox(Protocol):
    """체크박스 컴포넌트의 인터페이스를 정의하는 프로토콜"""
    
    def render(self) -> None:
        """체크박스를 화면에 렌더링한다"""
        ...
    
    def set_checked(self, checked: bool) -> None:
        """체크박스의 체크 상태를 설정한다"""
        ...
    
    def is_checked(self) -> bool:
        """체크박스의 체크 상태를 반환한다"""
        ...


# Windows 플랫폼용 ConcreteProduct 구현들
class WindowsButton:
    """Windows 스타일 버튼 구현"""
    
    def render(self) -> None:
        print("Windows 스타일 버튼을 렌더링합니다.")
    
    def on_click(self) -> None:
        print("Windows 버튼이 클릭되었습니다.")


class WindowsTextField:
    """Windows 스타일 텍스트 필드 구현"""
    
    def __init__(self) -> None:
        self._text: str = ""
    
    def render(self) -> None:
        print("Windows 스타일 텍스트 필드를 렌더링합니다.")
    
    def set_text(self, text: str) -> None:
        self._text = text
        print(f"Windows 텍스트 필드에 '{text}'를 설정했습니다.")
    
    def get_text(self) -> str:
        return self._text


class WindowsCheckBox:
    """Windows 스타일 체크박스 구현"""
    
    def __init__(self) -> None:
        self._checked: bool = False
    
    def render(self) -> None:
        print("Windows 스타일 체크박스를 렌더링합니다.")
    
    def set_checked(self, checked: bool) -> None:
        self._checked = checked
        status = "체크" if checked else "해제"
        print(f"Windows 체크박스가 {status}되었습니다.")
    
    def is_checked(self) -> bool:
        return self._checked


# Mac 플랫폼용 ConcreteProduct 구현들
class MacButton:
    """Mac 스타일 버튼 구현"""
    
    def render(self) -> None:
        print("Mac 스타일 버튼을 렌더링합니다.")
    
    def on_click(self) -> None:
        print("Mac 버튼이 클릭되었습니다.")


class MacTextField:
    """Mac 스타일 텍스트 필드 구현"""
    
    def __init__(self) -> None:
        self._text: str = ""
    
    def render(self) -> None:
        print("Mac 스타일 텍스트 필드를 렌더링합니다.")
    
    def set_text(self, text: str) -> None:
        self._text = text
        print(f"Mac 텍스트 필드에 '{text}'를 설정했습니다.")
    
    def get_text(self) -> str:
        return self._text


class MacCheckBox:
    """Mac 스타일 체크박스 구현"""
    
    def __init__(self) -> None:
        self._checked: bool = False
    
    def render(self) -> None:
        print("Mac 스타일 체크박스를 렌더링합니다.")
    
    def set_checked(self, checked: bool) -> None:
        self._checked = checked
        status = "체크" if checked else "해제"
        print(f"Mac 체크박스가 {status}되었습니다.")
    
    def is_checked(self) -> bool:
        return self._checked


# AbstractFactory 추상 클래스 - 제품군 생성을 위한 추상 인터페이스
class GUIFactory(ABC):
    """GUI 컴포넌트 제품군을 생성하는 추상 팩토리"""
    
    @abstractmethod
    def create_button(self) -> Button:
        """버튼을 생성한다"""
        pass
    
    @abstractmethod
    def create_text_field(self) -> TextField:
        """텍스트 필드를 생성한다"""
        pass
    
    @abstractmethod
    def create_check_box(self) -> CheckBox:
        """체크박스를 생성한다"""
        pass


# ConcreteFactory 구현들 - 특정 플랫폼의 제품군을 생성
class WindowsFactory(GUIFactory):
    """Windows 플랫폼용 GUI 컴포넌트 팩토리"""
    
    def create_button(self) -> Button:
        return WindowsButton()
    
    def create_text_field(self) -> TextField:
        return WindowsTextField()
    
    def create_check_box(self) -> CheckBox:
        return WindowsCheckBox()


class MacFactory(GUIFactory):
    """Mac 플랫폼용 GUI 컴포넌트 팩토리"""
    
    def create_button(self) -> Button:
        return MacButton()
    
    def create_text_field(self) -> TextField:
        return MacTextField()
    
    def create_check_box(self) -> CheckBox:
        return MacCheckBox()


# 클라이언트 코드 - 추상 팩토리를 사용하는 애플리케이션
class Application:
    """추상 팩토리를 사용하는 GUI 애플리케이션"""
    
    def __init__(self, factory: GUIFactory) -> None:
        """
        팩토리를 통해 GUI 컴포넌트들을 생성한다
        
        Args:
            factory: GUI 컴포넌트를 생성할 팩토리
        """
        self.button = factory.create_button()
        self.text_field = factory.create_text_field()
        self.check_box = factory.create_check_box()
    
    def create_ui(self) -> None:
        """UI를 생성하고 렌더링한다"""
        print("=== UI 생성 시작 ===")
        self.button.render()
        self.text_field.render()
        self.check_box.render()
        print("=== UI 생성 완료 ===\n")
    
    def interact_with_ui(self) -> None:
        """UI 컴포넌트들과 상호작용한다"""
        print("=== UI 상호작용 시작 ===")
        self.button.on_click()
        self.text_field.set_text("Hello, Abstract Factory!")
        self.check_box.set_checked(True)
        
        print(f"텍스트 필드 내용: {self.text_field.get_text()}")
        print(f"체크박스 상태: {self.check_box.is_checked()}")
        print("=== UI 상호작용 완료 ===\n")


# 팩토리 생성을 위한 헬퍼 함수들
def get_factory(os_type: str) -> GUIFactory:
    """
    OS 타입에 따라 적절한 팩토리를 반환한다
    
    Args:
        os_type: 운영체제 타입 ('windows' 또는 'mac')
    
    Returns:
        해당 OS용 GUI 팩토리
    
    Raises:
        ValueError: 지원하지 않는 OS 타입인 경우
    """
    factories = {
        'windows': WindowsFactory,
        'mac': MacFactory
    }
    
    factory_class = factories.get(os_type.lower())
    if factory_class is None:
        raise ValueError(f"지원하지 않는 OS 타입: {os_type}")
    
    return factory_class()


def detect_current_os() -> str:
    """
    현재 실행 중인 운영체제를 감지한다
    
    Returns:
        감지된 OS 타입 ('windows' 또는 'mac')
    """
    system = platform.system().lower()
    if 'windows' in system:
        return 'windows'
    elif 'darwin' in system:  # macOS
        return 'mac'
    else:
        # 기본값으로 windows 반환
        return 'windows'


# 메인 실행 코드
def main() -> None:
    """추상 팩토리 패턴 사용 예제를 실행한다"""
    print("=== 추상 팩토리 패턴 Python 예제 ===\n")
    
    # Windows 애플리케이션 생성 및 실행
    print("Windows 애플리케이션:")
    windows_factory = get_factory("windows")
    windows_app = Application(windows_factory)
    windows_app.create_ui()
    windows_app.interact_with_ui()
    
    # Mac 애플리케이션 생성 및 실행
    print("Mac 애플리케이션:")
    mac_factory = get_factory("mac")
    mac_app = Application(mac_factory)
    mac_app.create_ui()
    mac_app.interact_with_ui()
    
    # 런타임에 플랫폼 결정 예제
    print("런타임 플랫폼 결정 예제:")
    current_os = detect_current_os()
    print(f"감지된 OS: {current_os}")
    
    dynamic_factory = get_factory(current_os)
    dynamic_app = Application(dynamic_factory)
    dynamic_app.create_ui()


if __name__ == "__main__":
    main()
```

### 결과

```text
=== 추상 팩토리 패턴 Python 예제 ===

Windows 애플리케이션:
=== UI 생성 시작 ===
Windows 스타일 버튼을 렌더링합니다.
Windows 스타일 텍스트 필드를 렌더링합니다.
Windows 스타일 체크박스를 렌더링합니다.
=== UI 생성 완료 ===

=== UI 상호작용 시작 ===
Windows 버튼이 클릭되었습니다.
Windows 텍스트 필드에 'Hello, Abstract Factory!'를 설정했습니다.
Windows 체크박스가 체크되었습니다.
텍스트 필드 내용: Hello, Abstract Factory!
체크박스 상태: True
=== UI 상호작용 완료 ===

Mac 애플리케이션:
=== UI 생성 시작 ===
Mac 스타일 버튼을 렌더링합니다.
Mac 스타일 텍스트 필드를 렌더링합니다.
Mac 스타일 체크박스를 렌더링합니다.
=== UI 생성 완료 ===

=== UI 상호작용 시작 ===
Mac 버튼이 클릭되었습니다.
Mac 텍스트 필드에 'Hello, Abstract Factory!'를 설정했습니다.
Mac 체크박스가 체크되었습니다.
텍스트 필드 내용: Hello, Abstract Factory!
체크박스 상태: True
=== UI 상호작용 완료 ===

런타임 플랫폼 결정 예제:
감지된 OS: windows
=== UI 생성 시작 ===
Windows 스타일 버튼을 렌더링합니다.
Windows 스타일 텍스트 필드를 렌더링합니다.
Windows 스타일 체크박스를 렌더링합니다.
=== UI 생성 완료 ===
```

## 설명

### Python 구현의 특징

이 Python 구현은 [[04. Practice Notes/⌨️ 추상 팩토리 패턴 Java 구현_java (2025-01-10).md|Java 구현]]과 동일한 패턴을 보여주지만, Python의 특성을 활용한다.

#### Python다운 특징들

1. **Protocol 사용**: Java의 interface 대신 `typing.Protocol` 사용
2. **ABC 모듈**: 추상 클래스 정의를 위한 `abc.ABC` 활용
3. **타입 힌트**: Python 3.8+ 스타일의 타입 어노테이션
4. **Snake_case**: Python 명명 규칙 준수
5. **Docstring**: 함수와 클래스에 대한 상세한 문서화

### Java vs Python 구현 비교

| 구분 | Java | Python |
|------|------|--------|
| **인터페이스** | `interface` 키워드 | `Protocol` 또는 `ABC` |
| **추상 클래스** | `abstract class` | `ABC` 상속 |
| **명명 규칙** | camelCase | snake_case |
| **타입 시스템** | 정적 타입 | 동적 타입 + 타입 힌트 |
| **문서화** | Javadoc | Docstring |
| **예외 처리** | checked exception | ValueError 등 |

### Python 구현의 장점

1. **간결성**: 보일러플레이트 코드가 적다
2. **유연성**: 덕 타이핑으로 인한 높은 유연성
3. **가독성**: Python의 직관적인 문법
4. **함수형 지원**: 헬퍼 함수들의 자연스러운 활용

### 패턴의 핵심은 동일

언어가 다르더라도 추상 팩토리 패턴의 핵심 개념은 동일하다:
- **제품군 생성**: 관련된 객체들의 집합을 일관되게 생성
- **플랫폼 독립성**: 클라이언트 코드는 구체적인 구현을 알 필요 없음
- **확장성**: 새로운 제품군 추가가 용이함 