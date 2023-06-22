import { CORS, PODCAST_DETAILS, TOP_PODCASTS } from './urls';

const itunesService = {
  getTopPodcasts: async () => {
    try {
      const response = await fetch(
        `${CORS}${encodeURIComponent(TOP_PODCASTS())}`
      );
      if (response.ok) {
        const responseJson = await response.json();
        const {
          feed: { entry },
        } = responseJson;
        return entry;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      throw error;
    }
  },
  getPodcastDetails: async (id) => {
    try {
      const response = await fetch(
        `${CORS}${encodeURIComponent(PODCAST_DETAILS(id))}`
      );
      if (response.ok) {
        const responseJson = await response.json();
        const { results: details } = responseJson;
        return details;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      throw error;
    }
  },
};

export default itunesService;
