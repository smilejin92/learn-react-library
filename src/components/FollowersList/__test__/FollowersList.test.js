import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';

const MockFollowersList = () => (
  <BrowserRouter>
    <FollowersList />
  </BrowserRouter>
);

describe('FollowersList', () => {
  /**
   * https://jestjs.io/docs/api#afterallfn-timeout
   * hook: beforeEach, afterEach, beforeAll, afterAll
   * 이곳에 사용된 hook은 이 describe 블록 안에서만 적용됨
   */

  beforeEach(() => {
    console.log('before each test');
  });

  beforeAll(() => {
    console.log('before all tests in this test block');
  });

  test('1. 팔로워 목록 중 첫 번째 아이템이 표시된다.', async () => {
    render(<MockFollowersList />);
    const followerDivElem = await screen.findByTestId('follower-item-0');
    expect(followerDivElem).toBeInTheDocument();
  });

  test('2. 팔로워 목록 아이템이 모두 표시된다.', async () => {
    render(<MockFollowersList />);
    const followerDivElems = await screen.findAllByTestId(/follower-item/i);
    expect(followerDivElems.length).toBe(5);
  });

  afterEach(() => {
    console.log('after each test');
  });

  afterAll(() => {
    console.log('after all tests in this test block');
  });
});
