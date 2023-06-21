import { useEffect, useState } from 'react';
import itunesService from '../services/itunes';

export const usePodcast = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [fetching, setFetching] = useState(false);

  const extractPodcastData = (podcasts) =>
    podcasts.map((podcast) => {
      const {
        id: {
          attributes: { 'im:id': id },
        },
        'im:name': { label: name = '' },
        'im:artist': { label: artist = '' },
        summary: { label: description = '' },
      } = podcast;
      const { 'im:image': images } = podcast;
      const { label: imageUrl } = images[images.length - 1];
      return { id, name, artist, description, imageUrl };
    });

  useEffect(() => {
    const fetchData = async () => {
      const resultService = await itunesService.getTopPodcasts();
      const formattedPodcasts = extractPodcastData(resultService);
      localStorage.setItem('podcasts', JSON.stringify(formattedPodcasts));
      setPodcasts(formattedPodcasts);
      setFetching(false);
    };
    const podcastList = localStorage.getItem('podcasts');
    if (!podcastList && !fetching) {
      setFetching(true);
      fetchData();
    } else {
      setPodcasts(JSON.parse(podcastList));
    }
  }, []);

  return [podcasts];
};
