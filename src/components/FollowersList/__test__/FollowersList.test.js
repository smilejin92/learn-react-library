import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FollowersList from '../FollowersList';

const MockFollowersList = () => (
  <BrowserRouter>
    <FollowersList />
  </BrowserRouter>
);

describe('FollowersList', () => {
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
});
