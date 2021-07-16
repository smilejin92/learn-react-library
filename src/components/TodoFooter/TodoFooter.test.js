import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TodoFooter from './TodoFooter';

/**
 * TodoFooter 컴포넌트는 내부에서 <Link /> 컴포넌트를 사용하기 때문에
 * react-router-dom의 BrowswerRouter가 필요하다. 따라서 아래와 같이
 * Wrapper 컴포넌트를 만들어 사용한다.
 */
const MockTodoFooter = ({ numberOfIncompleteTasks }) => (
  <BrowserRouter>
    <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
  </BrowserRouter>
);

test('1. 남은 Todo가 2개 이상일 때 "task"가 아닌 "tasks" 문자열을 표시한다.', () => {
  render(<MockTodoFooter numberOfIncompleteTasks={5} />);
  const paragraphElement = screen.getByText(/5 tasks left/i);
  expect(paragraphElement).toBeInTheDocument();
});

test('2. 남은 Todo가 1개일 때 "tasks"가 아닌 "task" 문자열을 표시한다.', () => {
  render(<MockTodoFooter numberOfIncompleteTasks={1} />);
  const paragraphElement = screen.getByText(/1 task left/i);
  expect(paragraphElement).toBeInTheDocument();
});

// assertion - toBeVisible (opacity: 0, display: none일 경우 fail한다.)
test('3. TodoFooter 컴포넌트를 시각적으로 확인 할 수 있다.', () => {
  render(<MockTodoFooter numberOfIncompleteTasks={1} />);
  const paragraphElement = screen.getByText(/1 task left/i);
  expect(paragraphElement).toBeVisible();
});

// assertion - toContainHTML(tagName)
test('4. TodoFooter 컴포넌트는 p 태그를 포함한다.', () => {
  render(<MockTodoFooter numberOfIncompleteTasks={1} />);
  const paragraphElement = screen.getByText(/1 task left/i);
  expect(paragraphElement).toContainHTML('p');
});

// assertion - toHaveTextContent(text)
test('5. TodoFooter 컴포넌트는 p 태그를 포함하며, 해당 요소는 "1 task left" 텍스트를 표시한다.', () => {
  render(<MockTodoFooter numberOfIncompleteTasks={1} />);
  const paragraphElement = screen.getByText(/1 task left/i);
  expect(paragraphElement).toHaveTextContent('1 task left');
});

// assertion - not.toBe...
test('6. TodoFooter 컴포넌트의 p 태그는 falsy한 value가 아니다.', () => {
  render(<MockTodoFooter numberOfIncompleteTasks={1} />);
  const paragraphElement = screen.getByText(/1 task left/i);
  expect(paragraphElement).not.toBeFalsy();
});
