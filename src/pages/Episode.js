import React from 'react';
import { PodcastInformation } from '../components/PodcastInformation';
import { EpisodePlayer } from '../components/EpisodePlayer';

export const Episode = () => {
  return (
    <div className='flex flex-row mt-5'>
      <PodcastInformation />
      <EpisodePlayer />
    </div>
  );
};
