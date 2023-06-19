import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  test('renders header title', () => {
    render(
      <BrowserRouter>
        <Header />{' '}
      </BrowserRouter>
    );

    expect(screen.getByRole('link')).toHaveTextContent('Podcaster');
  });
});
