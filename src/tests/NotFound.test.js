import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Not Found', () => {
  it('A página renderiza corretamente os elementos ', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByText('Page requested not found');
    const image = screen.getByRole('img');
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(title).toBeInTheDocument();
    expect(image).toHaveAttribute('src', URL);
  });
});
