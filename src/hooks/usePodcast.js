import { useEffect, useState } from 'react';
import itunesService from '../services/itunes';
import { hasPassedTimeLimit } from '../utils';

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
      switchLoading(true);
      const resultService = await itunesService.getTopPodcasts();
      const list = extractPodcastData(resultService);
      const requestTime = new Date().getTime();
      localStorage.setItem('podcasts', JSON.stringify({ list, requestTime }));
      setPodcasts(list);
      switchLoading(false);
    };
    const podcastList = localStorage.getItem('podcasts');
    if (!podcastList) {
      fetchData();
    } else {
      const podcastListParsed = JSON.parse(podcastList);
      if (hasPassedTimeLimit(podcastListParsed.requestTime)) {
        fetchData();
      } else {
        setPodcasts(podcastListParsed.list);
      }
    }
  }, []);

  const getPodcastDetails = (podcastId) => {
    const { list } = JSON.parse(localStorage.getItem('podcasts'));
    return list.find((podcast) => podcast.id === podcastId);
  };

  const onRequestDetails = async (podcastId) => {
    switchLoading(true);
    const details = await itunesService.getPodcastDetails(podcastId);
    const requestTime = new Date().getTime();
    localStorage.setItem(podcastId, JSON.stringify({ details, requestTime }));
    switchLoading(false);
    return details;
  };

  const getPodcastEpisodes = async (podcastId) => {
    const localStoragePodcast = localStorage.getItem(podcastId);
    if (localStoragePodcast) {
      const parsedPodcast = JSON.parse(localStoragePodcast);
      if (hasPassedTimeLimit(parsedPodcast.requestTime)) {
        return onRequestDetails(podcastId);
      }
      return parsedPodcast.details;
    }
    return onRequestDetails(podcastId);
  };

  const getEpisode = (podcastId, episodeId) => {
    const { details } = JSON.parse(localStorage.getItem(podcastId));
    return details.find((episode) => episode.trackId === +episodeId);
  };

  return {
    podcasts,
    getPodcastDetails,
    getPodcastEpisodes,
    getEpisode,
  };
};
