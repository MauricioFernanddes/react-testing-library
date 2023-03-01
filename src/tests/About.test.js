import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('testando o componente About', () => {
  it('testa se é exibido na tela um h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const headingAbout = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(headingAbout).toBeInTheDocument();
  });

  it('testa se a página contém dois paragráfos sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const txtp1 = screen.getByText(/This application simulates/i);
    expect(txtp1).toBeInTheDocument();
    const txtp2 = screen.getByText(/One can filter Pokémon/i);
    expect(txtp2).toBeInTheDocument();
  });

  it('testa se a página contém imagem de uma Pokédex específico', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toHaveAttribute('src', src);
  });
});
