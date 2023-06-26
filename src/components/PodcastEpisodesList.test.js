import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoadingContext } from '../LoadingContext';
import { mockPodcastEpisodes, mockPodcasts } from '../mocks';
import { PodcastEpisodesList } from './PodcastEpisodesList';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    podcastId: mockPodcasts[0].id,
  }),
}));

jest.mock('../hooks/usePodcast', () => ({
  usePodcast: () => ({
    getPodcastEpisodes: () => mockPodcastEpisodes,
  }),
}));

describe('PodcastEpisodesList', () => {
  test('renders podcast episodes', async () => {
    let loading = false;

    await act(
      async () =>
        await render(
          <LoadingContext.Provider value={{ loading }}>
            <BrowserRouter>
              <PodcastEpisodesList />
            </BrowserRouter>
          </LoadingContext.Provider>
        )
    );

    const rows = within(screen.getByTestId('podcastEpisodes')).getAllByRole(
      'row'
    );
    expect(rows).toHaveLength(mockPodcastEpisodes.length);
    for (let episode of mockPodcastEpisodes) {
      const trackName = screen.getByRole('cell', { name: episode.trackName });
      expect(trackName).toBeInTheDocument();
    }
  });
  test('on selecting a podcast episodes, user is redirected', async () => {
    let loading = false;

    await act(
      async () =>
        await render(
          <LoadingContext.Provider value={{ loading }}>
            <BrowserRouter>
              <PodcastEpisodesList />
            </BrowserRouter>
          </LoadingContext.Provider>
        )
    );

    const { trackName, trackId } = mockPodcastEpisodes[0];
    const { id } = mockPodcasts[0];

    const links = screen.getAllByRole('link', {
      name: trackName,
    });
    fireEvent.click(links[0]);
    expect(window.location.pathname).toBe(`/podcast/${id}/episode/${trackId}`);
  });
});
