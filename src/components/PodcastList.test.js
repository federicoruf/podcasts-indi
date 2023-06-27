import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { PodcastList } from './PodcastList';
import { LoadingContext } from '../LoadingContext';
import { mockPodcasts } from '../mocks';

jest.mock('../hooks/usePodcast', () => ({
  usePodcast: () => ({
    podcasts: mockPodcasts,
  }),
}));

describe('PodcastList', () => {
  test('renders podcast list', () => {
    const switchLoadingMock = jest.fn();
    const setResultsMock = jest.fn();

    act(() => {
      render(
        <LoadingContext.Provider value={{ switchLoading: switchLoadingMock }}>
          <PodcastList filter={''} setResults={setResultsMock} />
        </LoadingContext.Provider>
      );
    });
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(setResultsMock).toHaveBeenCalledWith(2);
  });
});
