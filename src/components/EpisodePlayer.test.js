import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingContext } from '../LoadingContext';
import { mockPodcastEpisodes, mockPodcasts } from '../mocks';
import { EpisodePlayer } from './EpisodePlayer';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    podcastId: mockPodcasts[0].id,
    episodeId: mockPodcastEpisodes[0].trackId,
  }),
}));

jest.mock('../hooks/usePodcast', () => ({
  usePodcast: () => ({
    getEpisode: () => mockPodcastEpisodes[0],
  }),
}));

describe('EpisodePlayer', () => {
  test('renders episode', () => {
    const switchLoadingMock = jest.fn();
    const episode = mockPodcastEpisodes[0];
    render(
      <LoadingContext.Provider value={{ switchLoading: switchLoadingMock }}>
        <EpisodePlayer />
      </LoadingContext.Provider>
    );

    expect(screen.getByText(episode.trackName)).toBeInTheDocument();

    const regex = new RegExp(episode.description.substring(0, 50));
    expect(screen.getByText(regex)).toBeInTheDocument();

    const episodePlayer = screen.getByTestId('episode-player');
    const [source] = episodePlayer.querySelectorAll('source');
    const [mockedUrl] = episode.episodeUrl.split('?');
    expect(source.getAttribute('src')).toBe(mockedUrl);
  });
});
