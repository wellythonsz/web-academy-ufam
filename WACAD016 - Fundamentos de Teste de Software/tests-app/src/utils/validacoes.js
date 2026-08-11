/**
 * Extrai o primeiro nome de uma string de nome completo.
 */
function firstName(fullName) {
  // Correção: usar indexOf para pegar apenas o primeiro espaço
  const whitespace = fullName.indexOf(" ");

  if (whitespace === -1) return fullName;
  else return fullName.slice(0, whitespace);
}

/**
 * Verifica a disponibilidade de um produto em estoque com base no tipo e na quantidade desejada.
 */
function checkStockAvailability(productType, quantity) {
  const stock = {
    laptop: 10,
    smartphone: 20,
    headphone: 5,
    tablet: 15,
    book: 0,
  };

  const availableStock = stock[productType];
  
  if (availableStock === undefined || availableStock < quantity) return false;
  else return true;
}

/**
 * Calcula o preço total de um array de produtos em uma aplicação de e-commerce.
 */
function calculateTotalPrice(products) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].price * products[i].quantity;
  }
  return total;
}

module.exports = {
  firstName,
  checkStockAvailability,
  calculateTotalPrice,
};