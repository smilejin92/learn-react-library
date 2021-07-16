import { render, screen } from '@testing-library/react';
import Header from '../Header';

/**
 * Using getByText
 */
test('1. GetBy - prop.title로 전달된 문자열을 렌더한다.', () => {
  render(<Header title="My Header" />);
  const headingElement = screen.getByText(/my header/i);
  expect(headingElement).toBeInTheDocument();
});

// test('heading 태그를 사용한다.', () => {
//   render(<Header title="My Header" />);
//   const headingElement = screen.getByRole('heading');
//   expect(headingElement).toBeInTheDocument();
// });

/**
 * Using getByRole
 * 만약 Header 컴포넌트에 2개 이상의 heading 태그가 있다면 위 테스트는 fail한다.
 * 따라서 요소를 조금 더 구체적으로 query 할 필요가 있다.
 * 위 테스트에서 사용된 getByRole을 아래와 같이 작성 할 수 있다.
 */
test('2. GetBy - heading 태그를 사용한다.', () => {
  render(<Header title="My Header" />);
  /**
   * 주의: getByRole options 객체의 name 프로퍼티는 accessible name을 뜻한다.
   * 만약 요소의 text와 title attribute의 값이 같다면, title attribute로 query된다.
   */
  const headingElement = screen.getByRole('heading', { name: 'My Header' });
  expect(headingElement).toBeInTheDocument();
});

/**
 * Using semantics query - getByTitle
 */
test('3. GetBy - title 어트리뷰트의 값은 header이다', () => {
  render(<Header title="My Header" />);
  const headingElement = screen.getByTitle('Header');
  expect(headingElement).toBeInTheDocument();
});

/**
 * Using test id - getByTestId (not recommended)
 */
test('4. GetBy - testid의 값은 header-1이다.', () => {
  render(<Header title="My Header" />);
  const headingElement = screen.getByTestId('header-1');
  expect(headingElement).toBeInTheDocument();
});

/**
 * Using findBy (promise)
 */
test('5. FindBy - prop.title로 전달된 문자열을 렌더한다.', async () => {
  render(<Header title="My Header" />);
  const headingElement = await screen.findByText(/my header/i);
  expect(headingElement).toBeInTheDocument();
});

/**
 * Using queryBy
 */
test('6. queryBy - dogs 문자열은 문서에 존재하지 않는다.', () => {
  render(<Header title="My Header" />);
  const headingElement = screen.queryByText(/dogs/i); // null
  expect(headingElement).not.toBeInTheDocument();
});

/**
 * Using getAllBy
 */
test('7. getAllBy - heading 요소가 2개이다.', () => {
  render(<Header title="My Header" />);
  const headingElement = screen.getAllByRole('heading'); // Element[]
  expect(headingElement.length).toBe(2);
});
