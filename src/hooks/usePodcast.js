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

  const extractEpisodeData = (episodes) =>
    episodes.map((episode) => {
      const {
        description,
        episodeUrl,
        kind,
        releaseDate,
        trackId,
        trackName,
        trackTimeMillis,
      } = episode;
      return {
        description,
        episodeUrl,
        kind,
        releaseDate,
        trackId,
        trackName,
        trackTimeMillis,
      };
    });

  const onRequestDetails = async (podcastId) => {
    switchLoading(true);
    const details = await itunesService.getPodcastEpisodes(podcastId);
    const formattedEpisodes = extractEpisodeData(details);
    const requestTime = new Date().getTime();
    const episodes = formattedEpisodes.filter(
      (item) => item.kind === 'podcast-episode'
    );
    localStorage.setItem(podcastId, JSON.stringify({ episodes, requestTime }));
    switchLoading(false);
    return episodes;
  };

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

  const getPodcastEpisodes = async (podcastId) => {
    const localStoragePodcast = localStorage.getItem(podcastId);
    if (localStoragePodcast) {
      const parsedPodcast = JSON.parse(localStoragePodcast);
      if (hasPassedTimeLimit(parsedPodcast.requestTime)) {
        return onRequestDetails(podcastId);
      }
      return parsedPodcast.episodes;
    }
    return onRequestDetails(podcastId);
  };

  const getEpisode = (podcastId, episodeId) => {
    const { episodes } = JSON.parse(localStorage.getItem(podcastId));
    return episodes.find((episode) => episode.trackId === +episodeId);
  };

  return {
    podcasts,
    getPodcastDetails,
    getPodcastEpisodes,
    getEpisode,
  };
};
