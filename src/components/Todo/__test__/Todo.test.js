import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Todo from '../Todo';

const MockTodo = () => (
  <BrowserRouter>
    <Todo />
  </BrowserRouter>
);

// 공통으로 사용 할 이벤트
const addTask = tasks => {
  const inputElement = screen.getByPlaceholderText('Add a new task here...');
  const buttonElement = screen.getByRole('button', { name: 'Add' });

  tasks.forEach(task => {
    fireEvent.change(inputElement, {
      target: {
        value: task,
      },
    });
    fireEvent.click(buttonElement);
  });
};

// Integration test
describe('Todo', () => {
  test('1. Todo 입력 후 Add 버튼을 누르면 입력된 Todo가 리스트에 노출된다.', () => {
    render(<MockTodo />);
    const inputElement = screen.getByPlaceholderText('Add a new task here...');
    const buttonElement = screen.getByRole('button', { name: 'Add' });

    // Todo 작성
    fireEvent.change(inputElement, {
      target: {
        value: 'Todo 1',
      },
    });

    // Add 버튼 클릭
    fireEvent.click(buttonElement);

    // Todo elem
    const todoElement = screen.getByText('Todo 1');

    expect(todoElement).toBeInTheDocument();
  });

  test('2. Todo 입력 후 Add 버튼을 누르면 입력된 Todo가 리스트에 노출된다. (2회 이상)', () => {
    render(<MockTodo />);

    addTask(['Todo 1', 'Todo 2', 'Todo 3']);

    // Todo elems
    const todoElements = screen.getAllByTestId('task-container');
    expect(todoElements.length).toBe(3);
  });

  test('3. 새롭게 추가된 todo는 todo-item-active 클래스를 갖지 않는다.', () => {
    render(<MockTodo />);

    addTask(['new todo']);

    // Todo elem
    const todoElement = screen.getByText('new todo');
    expect(todoElement).not.toHaveClass('todo-item-active');
  });

  test('4. 새롭게 추가된 todo를 클릭하면 todo-item-active 클래스가 추가된다.', () => {
    render(<MockTodo />);

    addTask(['new todo']);

    // Todo elem
    const todoElement = screen.getByText('new todo');
    fireEvent.click(todoElement);

    expect(todoElement).toHaveClass('todo-item-active');
  });
});
