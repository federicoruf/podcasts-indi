import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePodcast } from '../hooks/usePodcast';
import classNames from 'classnames';
import { formatDate, formatMilliseconds } from '../utlis';

export const PodcastEpisodesList = () => {
  const { podcastId } = useParams();
  const { getPodcastEpisodes } = usePodcast();
  const [podcastEpisodes, setPodcastEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const details = await getPodcastEpisodes(podcastId);
      setPodcastEpisodes(details);
    };
    fetchData();
  }, []);

  return (
    <div className='flex flex-col grow w-3/4 ml-12'>
      <div className='shadow-lg shadow-black-500/20 card flex flex-col text-lg mb-4 pb-2'>
        <div className='font-bold'> Episodes: {podcastEpisodes.length}</div>
      </div>
      <div className='shadow-lg shadow-black-500/20 card flex flex-col text-xs'>
        <table className='min-w-full text-left'>
          <thead className='bg-white font-medium border-b-gray-400 border-b-2'>
            <tr>
              <th className='py-3 pl-2'>Title</th>
              <th className='py-3 pl-2'>Date</th>
              <th className='py-3 pl-2'>Duration</th>
            </tr>
          </thead>
          <tbody>
            {podcastEpisodes.map((episode, index) => (
              <tr
                key={episode.trackId}
                className={classNames('border-b border-b-gray-400 ', {
                  'bg-slate-200': index % 2 === 0,
                  'bg-white': index % 2 === 1,
                })}
              >
                <td className='whitespace-nowrap pl-2 py-3 text-teal-500'>
                  <Link to={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                    {episode.trackName}
                  </Link>
                </td>
                <td className='whitespace-nowrap pl-2 py-3'>
                  {formatDate(episode.releaseDate)}
                </td>
                <td className='whitespace-nowrap pl-2 py-3'>
                  {episode.trackTimeMillis
                    ? formatMilliseconds(episode.trackTimeMillis)
                    : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
