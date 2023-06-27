import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingContext } from '../LoadingContext';
import { PodcastItem } from './PodcastItem';
import { mockPodcasts } from '../mocks';

function renderComponent() {
  let loading = false;
  const [podcast] = mockPodcasts;
  render(
    <LoadingContext.Provider value={{ loading }}>
      <BrowserRouter>
        <PodcastItem
          id={podcast.id}
          artist={podcast.artist}
          name={podcast.name}
          image={podcast.imageUrl}
        />
      </BrowserRouter>
    </LoadingContext.Provider>
  );
  return podcast;
}
describe('PodcastItem', () => {
  test('renders item', () => {
    const podcast = renderComponent();

    expect(screen.getByText(podcast.artist.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(`Author: ${podcast.artist}`)).toBeInTheDocument();
    expect(screen.getByAltText(`${podcast.artist}-image`)).toBeInTheDocument();
  });

  test('when item is clicked, navigation change', () => {
    const podcast = renderComponent();
    const item = screen.getByText(podcast.artist.toUpperCase());
    fireEvent.click(item);
    expect(window.location.pathname).toBe(`/podcast/${podcast.id}`);
  });
});
