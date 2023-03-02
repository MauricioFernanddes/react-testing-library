import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex.js', () => {
  it('teste se a página contém um heading h2 com o texto Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    const h2 = screen.queryByRole('heading', { name: 'Encountered Pokémon', level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it('teste se é exibido um próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const getButton = screen.queryByRole('button', { name: 'Próximo Pokémon' });
    userEvent.click(getButton);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });
  it('teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnFilter = screen.getAllByTestId('pokemon-type-button');
    expect(btnFilter).toHaveLength(7);
  });
  it('teste se os botões de filtragem por tipo possuem o nome correto', () => {
    renderWithRouter(<App />);
    const all = screen.queryByRole('button', { name: 'All' });
    const electric = screen.queryByRole('button', { name: 'Electric' });
    const fire = screen.queryByRole('button', { name: 'Fire' });
    const bug = screen.queryByRole('button', { name: 'Bug' });
    const poison = screen.queryByRole('button', { name: 'Poison' });
    const psychic = screen.queryByRole('button', { name: 'Psychic' });
    const normal = screen.queryByRole('button', { name: 'Normal' });
    const dragon = screen.queryByRole('button', { name: 'Dragon' });
    expect(all).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    userEvent.click(electric);
    expect(screen.getByText('Pikachu')).toBeVisible();
    userEvent.click(fire);
    expect(screen.getByText('Charmander')).toBeVisible();
    userEvent.click(bug);
    expect(screen.getByText('Caterpie')).toBeVisible();
    userEvent.click(poison);
    expect(screen.getByText('Ekans')).toBeVisible();
    userEvent.click(psychic);
    expect(screen.getByText('Alakazam')).toBeVisible();
    userEvent.click(normal);
    expect(screen.getByText('Snorlax')).toBeVisible();
    userEvent.click(dragon);
    expect(screen.getByText('Dragonair')).toBeVisible();
    userEvent.click(all);
    expect(screen.getByText('Pikachu')).toBeVisible();
  });
  it('teste se é possível clicar no botão de filtragem All', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);
    expect(btnAll).toBeInTheDocument();
  });
});
