import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PodcastItem } from './PodcastItem';
import { usePodcast } from '../hooks/usePodcast';

export const PodcastList = ({ filter = '', setResults }) => {
  const [podcasts] = usePodcast();

  const [displayPodcasts, setDisplayPodcasts] = useState([]);

  useEffect(() => {
    if (podcasts.length > 0) {
      if (filter) {
        const filteredPodcast = podcasts.filter(
          ({ name, artist }) =>
            name.toLowerCase().includes(filter) ||
            artist.toLowerCase().includes(filter)
        );
        setDisplayPodcasts(filteredPodcast);
        setResults(filteredPodcast.length);
      } else {
        setDisplayPodcasts(podcasts);
        setResults(podcasts.length);
      }
    }
  }, [filter, podcasts]);

  return (
    <div className='flex flex-row flex-wrap mx-10 justify-center'>
      {displayPodcasts.map(({ id, name, artist, imageUrl }) => (
        <PodcastItem
          key={id}
          id={id}
          name={name}
          artist={artist}
          image={imageUrl}
        />
      ))}
    </div>
  );
};

PodcastList.propTypes = {
  filter: PropTypes.string,
  setResults: PropTypes.func,
};
