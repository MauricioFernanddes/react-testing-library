import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testando o componente Pokemon', () => {
  it('teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const { name, type, averageWeight, image } = pokemonList[0];
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  it('teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    const { id } = pokemonList[0];

    expect(buttonDetails).toBeInTheDocument();
    expect(buttonDetails).toHaveAttribute('href', `/pokemon/${id}`);
    userEvent.click(buttonDetails);
    expect(history.location.pathname).toBe(`/pokemon/${id}`);
  });

  it('teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const isFavorite = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(isFavorite).toBeInTheDocument();
    expect(isFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
