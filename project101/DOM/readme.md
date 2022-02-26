# Big Picture

## Top tree : Window

### Second tree : DOM / BOM / Javascript

- **DOM : Document Object Module**

  - html 문서내에 존재하는 Object 를 소환

- **BOM : Browser Object Module**

  - 브라우저가 제공하는 Object 모듈
  - window.navigator / .location / .fetch / .storage ...

- **JavaScript : DOM과 BOM을 활용할 수 있도록 도와주는 언어**
  - Array / Map / Date ...

### CSSOM

**: CSS Object Model**

> CSSOM 이란?
> ㄴ DOM + CSS = CSSOM

- CSS 구성요소

  - external ( 외부 CSS 요소 )
  - embeded ( html 내부 css태그 요소 )
  - inline ( html inline css )
  - user-agent stylesheet ( 브라우저 또는 운영체제가 갖는 스타일 )

- CSSOM
  - 위의 CSS요소들이 모두 계산되어짐
  - 이때 Cascading 되어 위에 있는 요소가 자식 요소에 모두 적용됨

### 브라우저의 작동방식

1. DOM을 불러온다
2. CSSOM을 불러온다
3. 둘을 합한다
4. 최종적으로 Render Tree 가 생성되며 브라우저에 뿌려준다

### 성능이 좋은 브라우저 만들기!

> request/response -> loading -> scripting -> rendering -> layout -> painting

- Construct : DOM부터 render Tree 까지
  - 웹을 구현하는데 필요한 DOM, CSSOM, RenderTree 구성까지 하는 것을 의미
- Operation : 만들어진 RenderTree를 브라우저에 뿌려주는 과정
  - layout(브라우저에 위치잡기) -> paint (레이어를 잡아줌 - 동적요소를 효과적으로 구현 - 포토샵 레이어 기능 ) -> composition ( 레이어를 순서대로 브라우저 위에 그립니다 )

**1. Construct 단계 성능 개선**

- 요소를 최대한 작게 쪼갠다
- 내부에 내부에 내부 요소를 만들어서 RenderTree를 복잡하게 만들면 속도가 느려짐

**2. Operation 단계 성능 개선**

- paint, layout이 자주 일어나지 않게 만들어라
- ex) translate -> 레이어 위치가 바뀌도록 함
- 만약 박스의 위치 자체가 바뀌게 되면 다른 모든 요소의 위치가 변화해야하기 때문에 성능이 매우 안좋아짐
- animation을 넣기 위해 layout 단계를 다시 불러와야 한다면 성능 고려가 필요함. 정말 이 animation이 필요할까..?

### 성과측정하기

- 브라우저에서 Performance탭 활용
  - response를 실행하는 과정 중, 어떤 부분에서 가장 많은 시간이 딜레이되는지 분석할 수 있음
  - 삼초마을의 경우 RenderTree를 만드는 Scripting에서 가장 많은 시간을 잡아먹음
  - 태그를 효과적으로 배치해도 시간이 확 달라질 듯!

### DOM조작?

- 과거 : getElementById 등등
- 최신 : **querySelector, querySelectorAll로 모두 가능**

### innerHTML vs element

- 한 번에 요소를 추가해버리는 경우 : innerHTML이 깔끔
- 특정 요소를 지웠다 뺐다 계속 반복하는 경우 : element를 조작하여 createElem, removeElem 진행
