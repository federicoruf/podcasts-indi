import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingContext } from '../LoadingContext';
import { mockPodcasts } from '../mocks';
import { PodcastInformation } from './PodcastInformation';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    podcastId: mockPodcasts[0].id,
  }),
}));

jest.mock('../hooks/usePodcast', () => ({
  usePodcast: () => ({
    getPodcastDetails: () => mockPodcasts[0],
  }),
}));

describe('PodcastInformation', () => {
  test('renders podcast information', async () => {
    let loading = false;
    const [podcast] = mockPodcasts;
    await act(
      async () =>
        await render(
          <LoadingContext.Provider value={{ loading }}>
            <BrowserRouter>
              <PodcastInformation />
            </BrowserRouter>
          </LoadingContext.Provider>
        )
    );
    expect(screen.getByAltText(`${podcast.name}-image`)).toBeInTheDocument();
    expect(screen.getByText(podcast.name)).toBeInTheDocument();
    expect(screen.getByText(podcast.artist)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });
});
