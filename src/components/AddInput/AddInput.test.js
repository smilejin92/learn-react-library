import { render, screen, fireEvent } from '@testing-library/react';
import AddInput from './AddInput';

// Void function
const mockedSetTodo = jest.fn();

describe('AddInput', () => {
  test('1. 인풋 창이 표시된다.', () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText('Add a new task here...');
    expect(inputElement).toBeInTheDocument();
  });

  test('2. 입력된 텍스트가 인풋 창에 표시된다.', () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText('Add a new task here...');

    // fire event
    fireEvent.change(inputElement, {
      target: {
        value: 'Todo 1',
      },
    });

    expect(inputElement.value).toBe('Todo 1');
  });

  test('3. Add 버튼을 누르면 인풋 창의 텍스트는 빈 문자열이된다.', () => {
    render(<AddInput todos={[]} setTodos={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText('Add a new task here...');
    const buttonElement = screen.getByRole('button', { name: 'Add' });

    // fire event
    fireEvent.click(buttonElement);

    expect(inputElement.value).toBe('');
  });
});
