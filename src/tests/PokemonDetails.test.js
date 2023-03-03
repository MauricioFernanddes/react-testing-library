import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente PokemonDetails', () => {
  it('teste se é exibido na tela um h2 com o texto <name> Details', () => {
    renderWithRouter(<App />);
    const urlLink = screen.getByText('More details');
    userEvent.click(urlLink);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pesoPickachu = screen.getByTestId('pokemon-weight');
    expect(pesoPickachu).toHaveTextContent('Average weight: 6.0 kg');
    const textDetails = screen.getByRole('heading', { level: 2, name: /Pikachu Details/i });
    expect(textDetails).toBeInTheDocument();
    const sumary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(sumary).toBeInTheDocument();
    const resumoPok = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(resumoPok).toBeVisible();
    const sessionDetails = screen.getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    expect(sessionDetails).toBeVisible();
    const imgLocal = screen.getAllByAltText('Pikachu location');
    expect(imgLocal[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocal[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const urlLinkFavorite = screen.getByText('More details');
    userEvent.click(urlLinkFavorite);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const favoritCheck = screen.getByAltText(/Pikachu is marked as favorite/i);
    userEvent.click(favoritCheck);
    const labelText = screen.getByLabelText('Pokémon favoritado?');
    expect(labelText).toBeVisible();
  });
});
