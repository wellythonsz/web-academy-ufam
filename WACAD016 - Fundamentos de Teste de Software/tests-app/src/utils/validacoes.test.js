const { firstName, checkStockAvailability, calculateTotalPrice } = require('./validacoes');

describe('Função firstName', () => {
  it('deve retornar apenas o primeiro nome quando houver nome e sobrenomes', () => {
    expect(firstName('Wellython Salmo De Souza Sá')).toBe('Wellython');
  });

  it('deve retornar o próprio nome quando não houver espaços', () => {
    expect(firstName('Wellython')).toBe('Wellython');
  });
});

describe('Função checkStockAvailability', () => {
  it('deve retornar true quando há estoque suficiente do produto', () => {
    expect(checkStockAvailability('laptop', 5)).toBe(true);
  });

  it('deve retornar false quando a quantidade pedida é maior que o estoque disponível', () => {
    expect(checkStockAvailability('laptop', 15)).toBe(false);
  });

  it('deve retornar false quando o estoque do produto é zero', () => {
    expect(checkStockAvailability('book', 1)).toBe(false);
  });

  it('deve retornar false quando o produto pesquisado não existe no catálogo', () => {
    expect(checkStockAvailability('mouse', 2)).toBe(false);
  });
});

describe('Função calculateTotalPrice', () => {
  it('deve calcular o total corretamente multiplicando o preço pela quantidade de cada produto', () => {
    const carrinho = [
      { name: 'Product 1', price: 10, quantity: 2 }, // 20
      { name: 'Product 2', price: 15, quantity: 2 }, // 30
      { name: 'Product 3', price: 20, quantity: 1 }  // 20 -> Total: 70
    ];
    expect(calculateTotalPrice(carrinho)).toBe(70);
  });

  it('deve retornar 0 se o array de produtos estiver vazio', () => {
    expect(calculateTotalPrice([])).toBe(0);
  });
});