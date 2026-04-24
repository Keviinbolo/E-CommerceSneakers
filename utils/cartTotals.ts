export interface TotalsItem {
  price: number;
  quantity: number;
}

export const calculateSubtotal = (items: TotalsItem[]) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

export const calculateTax = (subtotal: number) => subtotal * 0.21;

export const calculateTotal = (subtotal: number, shipping: number, tax: number) =>
  subtotal + shipping + tax;
