---
tags:
  - 전기기사
  - 접지저항
  - 측정
aliases:
  - Tagg
  - Tagg식
created: 2025-06-27
title: 📝 Tagg의 접지 저항 측정 기본 식
note-type: COMMON
level: 전문가
completed: true
archived: false
time-to-understand: 5분
last-reviewed: 2025-06-27
---


### 식
![[Excalidraw/완전 매설된 접지 저항 (draw).svg|550]]

접지봉의 접지 저항을 구하는 방법은 다음과 같다.

$$
R = \frac{\rho}{2\pi L} \ln \left( \frac{2L}{a} \right)
$$

- $a$: 접지 봉의 반지름
- $2L$: 접지봉의 유효 반경
- $L$: 접지 봉의 길이
- $\rho$: 고유 저항


조금 변형된 Tagg 식도 존재한다. 참고만 해두자.

$$
R = \frac{\rho}{2\pi L} \left( \ln \frac{4L}{a} -1\right)
$$

### 증명
[[03. Permanent Notes/Area/저항과 정전용량 관계#관계식|저항과 정전용량 관계]]에 따르면 $RC = \rho \varepsilon$ 관계가 성립함을 알 수 있다. 이것을 이용해 저항을 구하면 된다.

위와 같이 윗면이 둥근 형태의 봉인 경우 $C$는 다음과 같이 구할 수 있다.

$$
E = \frac{\lambda}{2\pi\varepsilon r}
$$
에서 V를 구하면

$$
V = \frac{\lambda}{2\pi\varepsilon} \ln r
$$

$Q = CV$식과 C의 유효 범위는 접지 표면부터 2L이라는 설정에 의해서 

$$
C = \frac{Q}{V} = \frac{2\pi\varepsilon L}{\ln \left( \frac{2L}{a} \right)}
$$

이제 $RC = \rho\varepsilon$를 적용하면

$$
R = \frac{\rho\varepsilon}{C} = \frac{\rho}{2\pi l}\ln \frac{2L}{a} 
$$



