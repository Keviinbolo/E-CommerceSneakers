import { calculateSubtotal, calculateTax, calculateTotal } from '../utils/cartTotals';

describe('cartTotals', () => {
  it('calcula subtotal correctamente', () => {
    const subtotal = calculateSubtotal([
      { price: 100, quantity: 2 },
      { price: 49.99, quantity: 1 }
    ]);

    expect(subtotal).toBeCloseTo(249.99, 2);
  });

  it('calcula total con envio e IVA', () => {
    const subtotal = 200;
    const shipping = 25;
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, shipping, tax);

    expect(tax).toBe(42);
    expect(total).toBe(267);
  });
});
