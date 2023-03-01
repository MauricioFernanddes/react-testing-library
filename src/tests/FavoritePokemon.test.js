import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Favorite Pokémon', () => {
  it('É exibida na tela uma mensagem caso a pessoa não tenha Pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemon />);

    const message = screen.getByText('No favorite Pokémon found');
    expect(message).toBeInTheDocument();
  });

  it('Se são exibidos na tela os Pokémon Favoritados', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: 'Poison' });
    userEvent.click(btn);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);

    const isChecked = screen.getByRole('checkbox');
    userEvent.click(isChecked);

    const isFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(isFavorite);

    const pokemonFavorite = screen.getByText('Ekans');
    expect(pokemonFavorite).toBeInTheDocument();
  });
});
