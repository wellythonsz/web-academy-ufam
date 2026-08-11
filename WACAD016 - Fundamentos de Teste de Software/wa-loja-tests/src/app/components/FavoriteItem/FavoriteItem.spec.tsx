import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteItem from './FavoriteItem';

// 1. Correção: usando caminho relativo em vez de @/
import { calculatePriceWithDiscount } from '../../helpers';

// 2. Correção: mock atualizado com o caminho relativo
jest.mock('../../helpers', () => ({
  calculatePriceWithDiscount: jest.fn(),
}));

// Objeto falso (mock) representando um produto para usarmos nos testes
const mockProduct = {
  id: '123',
  nome: 'Teclado Mecânico',
  descricao: 'Teclado RGB Switch Blue',
  preco: '200',
  desconto: 10,
  fotos: [{ src: '/teclado.jpg', titulo: 'Foto do Teclado' }],
  quantidade: 1 
};

describe('Componente FavoriteItem', () => {
  // Função "espiã" para simularmos o setFavorites do React
  const mockSetFavorites = jest.fn();

  beforeEach(() => {
    // Limpa o histórico das funções mockadas antes de cada teste
    jest.clearAllMocks();
  });

  it('deve renderizar as informações do produto corretamente na tabela', () => {
    // Definimos que, para esse teste, a função de desconto sempre retornará 180
    (calculatePriceWithDiscount as jest.Mock).mockReturnValue(180);

    render(
      <table>
        <tbody>
          <FavoriteItem favoriteItem={mockProduct as any} setFavorites={mockSetFavorites} />
        </tbody>
      </table>
    );

    // Conferência do layout e das informações renderizadas
    expect(screen.getByText('Teclado Mecânico')).toBeInTheDocument();
    expect(screen.getByText('Teclado RGB Switch Blue')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('R$ 180.00')).toBeInTheDocument();
    expect(screen.getByAltText('Foto do Teclado')).toBeInTheDocument();
  });

  it('deve chamar a função setFavorites e remover o item ao clicar em Remover', async () => {
    // Inicializa o simulador de interações do usuário
    const user = userEvent.setup();

    render(
      <table>
        <tbody>
          <FavoriteItem favoriteItem={mockProduct as any} setFavorites={mockSetFavorites} />
        </tbody>
      </table>
    );

    // Busca o botão de remover na interface
    const btnRemover = screen.getByRole('button', { name: /remover/i });
    
    // Simula o clique do usuário de forma realista (assíncrono)
    await user.click(btnRemover);

    // Verifica se a função de estado foi chamada 1 vez após o clique
    expect(mockSetFavorites).toHaveBeenCalledTimes(1);

    // Testa a lógica de filtragem executando a função de callback passada para o setState
    const stateUpdater = mockSetFavorites.mock.calls[0][0];
    const stateAnterior = [mockProduct, { id: '456', nome: 'Outro Produto' }];
    
    // Aplicamos o state anterior na função callback para ver o que sobra
    const novoState = stateUpdater(stateAnterior);
    
    // Deve sobrar apenas 1 item, e o ID "123" deve ter sido removido
    expect(novoState).toHaveLength(1);
    expect(novoState[0].id).toBe('456');
  });
});