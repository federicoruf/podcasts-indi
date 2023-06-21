import React from 'react';
import PropTypes from 'prop-types';

export const PodcastItem = ({ name, artist, image }) => {
  return (
    <div className='shadow-lg shadow-black-500/20 card flex flex-col my-16 w-60'>
      <div className='self-center relative -top-16'>
        <img className='rounded-full h-36' src={image} alt='label' />
      </div>
      <div className='relative -top-12'>
        <div className='font-bold text-sm'>{name.toUpperCase()}</div>
        <div className='text-sm'>Author: {artist}</div>
      </div>
    </div>
  );
};

PodcastItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  artist: PropTypes.string,
  image: PropTypes.string,
};
