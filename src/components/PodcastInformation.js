import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePodcast } from '../hooks/usePodcast';

export const PodcastInformation = () => {
  const { podcastId } = useParams();
  const { getPodcastDetails } = usePodcast();

  const [displayPodcast, setDisplayPodcast] = useState();

  useEffect(() => {
    setDisplayPodcast(getPodcastDetails(podcastId));
  }, []);

  return (
    <>
      {displayPodcast && (
        <div className='shadow-lg shadow-black-500/20 card flex flex-col text-xs w-64'>
          <Link to={`/podcast/${podcastId}`}>
            <img
              className='rounded-md py-4 w-96'
              src={displayPodcast.imageUrl}
              alt={`${displayPodcast.name}-image`}
            />
          </Link>
          <div className='border-t-2 py-4'>
            <Link to={`/podcast/${podcastId}`}>
              <div className='font-bold'>{displayPodcast.name}</div>
            </Link>
            <Link to={`/podcast/${podcastId}`}>
              <div className='italic'>by {displayPodcast.artist}</div>
            </Link>
          </div>
          <div className='border-t-2 py-4'>
            <div className='font-bold'>Description:</div>
            <div className='italic'>{displayPodcast.description}</div>
          </div>
        </div>
      )}
    </>
  );
};
