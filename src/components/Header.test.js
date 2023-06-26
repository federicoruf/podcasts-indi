import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';
import { LoadingContext } from '../LoadingContext';

describe('Header', () => {
  test('renders header title', () => {
    let loading = false;

    render(
      <LoadingContext.Provider value={{ loading }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </LoadingContext.Provider>
    );

    expect(screen.getByRole('link')).toHaveTextContent('Podcaster');
  });

  test('when loading, spinner is shown', () => {
    let loading = true;

    render(
      <LoadingContext.Provider value={{ loading }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </LoadingContext.Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
