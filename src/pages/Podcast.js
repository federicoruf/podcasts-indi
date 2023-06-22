import React from 'react';
import { PodcastInformation } from '../components/PodcastInformation';
import { PodcastEpisodesList } from '../components/PodcastEpisodesList';

export const Podcast = () => {
  return (
    <div className='flex flex-row mt-5'>
      <PodcastInformation />
      <PodcastEpisodesList />
    </div>
  );
};
