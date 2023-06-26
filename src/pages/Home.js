import React, { useState } from 'react';
import { PodcastList } from '../components/PodcastList';

export const Home = () => {
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState();

  const onChangeFilter = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };

  return (
    <div className='flex flex-col pt-2'>
      <div className='self-end'>
        <span
          className='bg-blue-600 text-white rounded-md px-2 mr-3'
          data-testid='result-value'
        >
          {results}
        </span>
        <input
          type='text'
          placeholder='Filter podcasts...'
          value={filter}
          onChange={onChangeFilter}
        />
      </div>
      <PodcastList filter={filter} setResults={setResults} />
    </div>
  );
};
