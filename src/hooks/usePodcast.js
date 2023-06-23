import { useEffect, useState } from 'react';
import itunesService from '../services/itunes';

export const usePodcast = (switchLoading) => {
  const [podcasts, setPodcasts] = useState([]);

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
      switchLoading(false);
    };
    const podcastList = localStorage.getItem('podcasts');
    if (!podcastList) {
      switchLoading(true);
      fetchData();
    } else {
      setPodcasts(JSON.parse(podcastList));
    }
  }, []);

  const getPodcastDetails = (podcastId) => {
    const podcastList = JSON.parse(localStorage.getItem('podcasts'));
    return podcastList.find((podcast) => podcast.id === podcastId);
  };

  const getPodcastEpisodes = async (podcastId) => {
    const localStoragePodcast = localStorage.getItem(podcastId);
    if (localStoragePodcast) {
      return JSON.parse(localStoragePodcast);
    }
    switchLoading(true);
    const resultService = await itunesService.getPodcastDetails(podcastId);
    localStorage.setItem(podcastId, JSON.stringify(resultService));
    switchLoading(false);
    return resultService;
  };

  const getEpisode = (podcastId, episodeId) => {
    const podcastEpisodes = JSON.parse(localStorage.getItem(podcastId));
    return podcastEpisodes.find((episode) => episode.trackId === +episodeId);
  };

  return {
    podcasts,
    getPodcastDetails,
    getPodcastEpisodes,
    getEpisode,
  };
};
