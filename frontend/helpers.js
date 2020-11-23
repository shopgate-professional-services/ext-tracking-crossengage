/**
 * @param {Object} cart cart
 * @param {boolean} useNetPrices useNetPrices
 * @returns {Object}
 */
export const getCartAttributes = (cart, useNetPrices) => ({
  total: parseFloat(useNetPrices ? cart.amount.net : cart.amount.gross),
  currency: cart.amount.currency,
  products: cart.products.map(product => ({
    sku: product.uid,
    name: product.name,
    // Net amount is not implemented for cart items in engage
    price: parseFloat(product.amount.gross),
    quantity: product.quantity,
  })),
});

/**
 * @param {Object} order order
 * @param {boolean} useNetPrices useNetPrices
 * @returns {Object}
 */
export const getCartAttributesFromOrder = (order, useNetPrices) => ({
  total: parseFloat(useNetPrices ? order.revenueNet : order.revenueGross),
  currency: order.currency,
  products: order.items.map(product => ({
    sku: product.id,
    name: product.name,
    price: parseFloat(useNetPrices ? order.priceNet : order.priceGross),
    quantity: product.quantity,
  })),
});
