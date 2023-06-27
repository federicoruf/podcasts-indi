import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';
import { LoadingContext } from '../LoadingContext';

function renderComponent(loading) {
  render(
    <LoadingContext.Provider value={{ loading }}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </LoadingContext.Provider>
  );
}
describe('Header', () => {
  test('renders header title', () => {
    renderComponent();
    expect(screen.getByRole('link')).toHaveTextContent('Podcaster');
  });

  test('when loading, spinner is shown', () => {
    renderComponent(true);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
