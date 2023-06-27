import { mockDetails, mockTopPodcast } from '../mocks';
import itunesService from './itunes';
import { PODCAST_EPISODES, TOP_PODCASTS } from './urls';

describe('itunesService', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation((url) => {
      if (url.includes(encodeURIComponent(TOP_PODCASTS()))) {
        return {
          ok: true,
          status: 200,
          json: () => ({
            feed: {
              entry: mockTopPodcast,
            },
          }),
        };
      } else if (url.includes(encodeURIComponent(PODCAST_EPISODES('123')))) {
        return {
          ok: true,
          status: 200,
          json: () => ({
            results: mockDetails,
          }),
        };
      } else {
        throw new Error(`Unhandled request: ${url}`);
      }
    });
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  test('fetches podcasts and returns the array', async () => {
    const topPodcasts = await itunesService.getTopPodcasts();
    expect(topPodcasts).toEqual(mockTopPodcast);
  });

  test('fetches details and returns it', async () => {
    const podcastEpisodes = await itunesService.getPodcastEpisodes('123');
    expect(podcastEpisodes).toEqual(mockDetails);
  });

  test('throws an error when network getTopPodcasts response is not ok', async () => {
    window.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      })
    );

    await expect(itunesService.getTopPodcasts()).rejects.toThrow(
      'Network response was not ok.'
    );
  });

  test('throws an error when network getPodcastEpisodes response is not ok', async () => {
    window.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
      })
    );

    await expect(itunesService.getPodcastEpisodes()).rejects.toThrow(
      'Network response was not ok.'
    );
  });
});
