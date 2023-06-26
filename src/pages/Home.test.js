import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoadingContext } from '../LoadingContext';
import { mockPodcasts } from '../mocks';
import { Home } from './Home';

jest.mock('../hooks/usePodcast', () => ({
  usePodcast: () => ({
    podcasts: mockPodcasts,
  }),
}));

describe('Home', () => {
  test('renders home page', async () => {
    let loading = false;
    const switchLoadingMock = jest.fn();

    await act(
      async () =>
        await render(
          <LoadingContext.Provider
            value={{ loading, switchLoading: switchLoadingMock }}
          >
            <BrowserRouter>
              <Home />
            </BrowserRouter>
          </LoadingContext.Provider>
        )
    );
    expect(
      screen.getByText(mockPodcasts[0].name.toUpperCase())
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockPodcasts[1].name.toUpperCase())
    ).toBeInTheDocument();
  });

  test('on changing filter value, podcast list result changes', async () => {
    let loading = false;
    const switchLoadingMock = jest.fn();

    await act(
      async () =>
        await render(
          <LoadingContext.Provider
            value={{ loading, switchLoading: switchLoadingMock }}
          >
            <BrowserRouter>
              <Home />
            </BrowserRouter>
          </LoadingContext.Provider>
        )
    );

    const filterInput = screen.getByPlaceholderText('Filter podcasts...');
    expect(filterInput).toBeInTheDocument();

    const resultValue = screen.getByTestId('result-value');
    expect(resultValue).toHaveTextContent('2');

    fireEvent.change(filterInput, { target: { value: 'joe' } });
    expect(resultValue).toHaveTextContent('1');

    fireEvent.change(filterInput, { target: { value: 'missing' } });
    expect(resultValue).toHaveTextContent('0');
  });
});
