import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from './Spinner';
import { LoadingContext } from '../LoadingContext';

export const Header = () => {
  const { loading } = useContext(LoadingContext);
  return (
    <div className='flex flex-row align-middle justify-between border-bottom-2 border-b p-5'>
      <Link to='/' className='no-underline text-teal-500 font-semibold'>
        Podcaster
      </Link>

      {loading && <Spinner />}
    </div>
  );
};
