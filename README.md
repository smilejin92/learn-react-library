# learn-react-testing-library

## Why TDD?

- 버그(ex. 사이드 이펙트)를 비교적 쉽게 잡아낼 수 있다.
- 작성한 코드에 대한 자신감이 증가한다.
- QA 시간을 단축 할 수 있다.
- 컴포넌트의 명세를 나타내는 문서 역할을 할 수 있다.

&nbsp;

## Test 종류

- Unit Test: 독립된(isolated) 환경에서 일부분의 코드(ex. 컴포넌트)만을 테스트
- Integration Test: 컴포넌트 간 상호작용을 테스트 (ex. 검색, 검색 결과 표시)
- E2E Test: beginning to very end of every single user flow

&nbsp;

## react-testing-library

CRA 사용 시 아래 테스팅 라이브러리가 default로 설치된다.

```json
// package.json - dependencies
{
  "@testing-library/jest-dom": "^5.11.4",
  "@testing-library/react": "^11.1.0",
  "@testing-library/user-event": "^12.1.10"
}
```

`react-scripts test` 실행 시 react-testing-library는 `*/__test__/*.test.(js | ts | tsx)` 에 해당하는 파일을 대상으로 테스트를 진행한다.

&nbsp;

## Test block

각 test block은 아래의 내용을 포함한다.

- 컴포넌트를 redner한다.
- 테스트 할 요소를 찾는다([query](https://testing-library.com/docs/queries/about)).
- 위에서 찾은 요소를 대상에 인터렉션을 발생시킨다.
- 기대하는 결과를 선언(assert)한다.

```react
import { render, screen } from '@testing-library/react';
import App from './App';

// test block
test('renders learn react link', () => {
  // 컴포넌트를 렌더한다.
  render(<App />);

  // 테스트 할 요소를 찾는다.
  const linkElement = screen.getByText(/learn react/i);

  // (클릭, 타이핑, 스크롤 등 인터렉션 발생)

  // 기대하는 결과를 선언한다.
  expect(linkElement).toBeInTheDocument();
});

```

&nbsp;

## [Query Methods](https://testing-library.com/docs/queries/about)

|              | getBy   | findBy  | queryBy | getAllBy | findAllBy | queryAllBy |
| ------------ | ------- | ------- | ------- | -------- | --------- | ---------- |
| **No Match** | error   | error   | null    | error    | error     | array      |
| **1 Match**  | element | element | element | array    | array     | array      |
| **1+ Match** | error   | error   | error   | array    | array     | array      |
| **Await**    | X       | O       | X       | X        | O         | X          |

&nbsp;

특정 요소를 검색 할 때, 최대한 많은 사용자가 접근 할 수 있는 attribute로 검색한다. 예를 들어, 특정 요소를 `data-testid` 어트리뷰트로 검색하여 테스트를 진행하는 것이 아니라 role, label, placeholder 등 사용자가 access 할 수 있는 정보로 요소를 탐색한다. 즉, attribute에도 우선 순위가 있다.

**Accessible by Everyone (top priority)**

- getByRole
- getByLabelText
- getByPlaceholderText
- getByText

**Semantic Queries**

- getByAltText
- getByTitle

**Test ID (low priority)**

- getByTestId

&nbsp;

## Testing Async Data

예를 들어, axios를 사용해 HTTP 요청을 생성하는 컴포넌트를 테스트 하기 위해서는 axios를 mock(모방)한 테스트용 axios를 만든다. 아래 예제를 살펴보자.

```react
import { useEffect, useState } from 'react';
import axios from 'axios';

function FollowersList() {
  const [followers, setFollowers] = useState([]);

  // axios로 HTTP 요청을 생성
  const fetchFollowers = async () => {
    const { data } = await axios.get('https://randomuser.me/api/?results=5');
    setFollowers(data.results);
  };

  // 마운트 시 follower 정보를 요청
  useEffect(() => {
    fetchFollowers();
  }, []);

  // Follower 목록을 render
  return (
  	<ul>
    	{followers.map(follower => (<li>{...}</li>))}
    </ul>
  );
}
```

위와 같이 작성된 컴포넌트를 테스트 할 때, HTTP 요청을 생성하여 테스트하는 것은 매우 비효율적이다. 테스트 자체에 의존성이 생기고, 요청이 느릴 수도 있으며, 요청에 대한 비용이 발생하기 때문이다. 따라서 `axios`를 모방한 mock module을 만들어서 테스트한다.

```javascript
// src/__mocks__/axios.js

const mockedData = {
  // ...
};

// 현재 테스트가 필요한 메소드는 get 뿐이다. 이후 다른 메소드가 추가되면 이 곳을 수정해야한다.
const mockedAxios = {
  get: jest.fn().mockResolvedValue({
    data: mockData,
  }),
};

export default mockedAxios;
```

`__mock__` 폴더 하위에 mock module 파일을 작성한다. `__mock__` 폴더가 포함 할 수 있는 mock module은 무엇을 모방하는지에 따라 다르다. 예를 들어, `node_modules` 중 하나를 mock하고 싶다면(ex. `axios`) `__mock__` 폴더는 `node_modules` 폴더와 같은 위치에 존재해야한다. 하지만 CRA를 사용하면 jest config의 rootDir가 `/src` 이므로 이 예제에서는 `src/__mock__` 폴더를 사용한다.

`package.json` 을 통해 jest config를 일부 override 할 수 있지만, `rootDir`, `roots`는 변경 할 수 없다.

- https://jestjs.io/docs/manual-mocks#mocking-node-modules
- https://jestjs.io/docs/configuration#rootdir-string

jest api 중 하나인 `mockResolvedValue`를 사용하여 `axios.get` 메소드를 모방하였다. resolve된 값은 실제 응답 객체와 동일한 인터페이스를 사용하여 테스트를 진행한다.

마지막으로 추가해야할 것은 `package.json`에 jest config 중 `resetMocks`를 `false`로 설정하는 것이다. CRA 디폴트는 `true`이며, 이 경우 각 테스트 실행전 mock data를 모조리 리셋 시켜버린다. mock data를 사용하기 때문에 `false`로 맞춰준다.

- https://jestjs.io/docs/configuration#resetmocks-boolean

위와 같이 작성한 mockedAxios는 테스트 시 실제 axios 대신 사용된다.
