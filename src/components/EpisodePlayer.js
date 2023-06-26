import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { usePodcast } from '../hooks/usePodcast';

export const EpisodePlayer = () => {
  const { episodeId } = useParams();
  const { podcastId } = useParams();
  const { getEpisode } = usePodcast();
  const [displayEpisode, setDisplayEpisode] = useState();

  useEffect(() => {
    setDisplayEpisode(getEpisode(podcastId, episodeId));
  }, []);

  const formatURL = () => {
    return displayEpisode.episodeUrl.split('?')[0];
  };

  return (
    <div className='flex flex-col grow w-3/4'>
      {displayEpisode && (
        <div className='shadow-lg shadow-black-500/20 card text-xs'>
          <div className='font-bold text-lg pb-3'>
            {displayEpisode.trackName}
          </div>
          <div
            className='pb-3'
            dangerouslySetInnerHTML={{ __html: displayEpisode.description }}
          />
          <audio controls className='pb-3 w-full' data-testid='episode-player'>
            <source
              src={formatURL(displayEpisode.previewUrl)}
              type='audio/mp3'
            />
          </audio>
        </div>
      )}
    </div>
  );
};
