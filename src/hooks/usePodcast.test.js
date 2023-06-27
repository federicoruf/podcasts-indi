import { renderHook, waitFor } from '@testing-library/react';
import { usePodcast } from './usePodcast';
import {
  mockDetails,
  mockPodcastEpisodes,
  mockPodcasts,
  mockTopPodcast,
} from '../mocks';
import itunesService from '../services/itunes';

jest.mock('../services/itunes', () => ({
  getTopPodcasts: jest.fn(),
  getPodcastEpisodes: jest.fn(),
}));

describe('usePodcast', () => {
  test('fetches and sets podcasts data', async () => {
    const switchLoadingMock = jest.fn();
    itunesService.getTopPodcasts.mockResolvedValue(mockTopPodcast);

    const { result } = renderHook(() => usePodcast(switchLoadingMock));

    expect(itunesService.getTopPodcasts).toBeCalled();
    await waitFor(() => {
      expect(result.current.podcasts).toHaveLength(3);
    });
  });

  test('fetches and sets podcast details', async () => {
    const switchLoadingMock = jest.fn();
    itunesService.getPodcastEpisodes.mockResolvedValue(mockPodcastEpisodes);

    const { result } = renderHook(() => usePodcast(switchLoadingMock));
    const episodes = await result.current.getPodcastEpisodes(
      mockPodcasts[0].id
    );
    expect(itunesService.getPodcastEpisodes).toBeCalledWith(mockPodcasts[0].id);
    expect(episodes).toHaveLength(2);
  });

  test('fetches and sets episode', async () => {
    const switchLoadingMock = jest.fn();
    jest.mock('../hooks/usePodcast', () => ({
      usePodcast: () => ({
        getEpisode: () => mockPodcastEpisodes[0],
      }),
    }));
    const { result } = renderHook(() => usePodcast(switchLoadingMock));
    const episode = await result.current.getEpisode(
      mockPodcasts[0].id,
      mockPodcastEpisodes[0].trackId
    );
    expect(episode.trackName).toBe(mockPodcastEpisodes[0].trackName);
  });
});
