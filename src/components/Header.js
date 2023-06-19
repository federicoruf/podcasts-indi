import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className='flex flex-row align-middle justify-between border-bottom-2 border-b border-4 p-5'>
      <Link to='/' className='no-underline text-teal-500 font-semibold'>
        Podcaster
      </Link>
    </div>
  );
};
