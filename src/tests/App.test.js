import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente App', () => {
  it('teste o topo da aplicação contém um conjunto fixo de links de navegação;', () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémon');
  });

  it('teste a aplicação é redirecionada para a página inicial na URL / ao clicar no link Home;', () => {
    const { history } = renderWithRouter(<App />);

    const hLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(hLink);

    expect(history.location.pathname).toBe('/');
  });

  it('teste se a aplicação é redirecionada para a página de About na URL /about, ao clicar no link About;', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });

  it('teste a aplicação é redirecionada para a página de Pokémons Favoritados na URL /favorites, ao clicar no link Favorite', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoriteLink);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/invalid-page');
    });

    const notFoundTitle = screen.getByText('Page requested not found');
    const notFoundImage = screen.getByRole('img');

    expect(history.location.pathname).toBe('/invalid-page');
    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundImage).toBeInTheDocument();
  });
});
