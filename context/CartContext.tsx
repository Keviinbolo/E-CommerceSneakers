import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../Services/productService';

const CART_STORAGE_KEY = '@sneakers_cart_v1';

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
  stock: number;
}

interface CartContextValue {
  items: CartItem[];
  loading: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, size: string, quantity: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const raw = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch (error) {
        console.warn('No se pudo cargar el carrito', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    if (loading) {
      return;
    }

    AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items)).catch((error) => {
      console.warn('No se pudo guardar el carrito', error);
    });
  }, [items, loading]);

  const addItem = (product: Product, size: string, quantity: number) => {
    setItems((previousItems) => {
      const existingIndex = previousItems.findIndex(
        (item) => item.productId === product.id && item.size === size
      );

      if (existingIndex >= 0) {
        const next = [...previousItems];
        const current = next[existingIndex];
        const nextQuantity = Math.min(current.quantity + quantity, current.stock);
        next[existingIndex] = {
          ...current,
          quantity: nextQuantity
        };
        return next;
      }

      return [
        ...previousItems,
        {
          productId: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price: product.price,
          size,
          quantity,
          stock: product.stock
        }
      ];
    });
  };

  const removeItem = (productId: string, size: string) => {
    setItems((previousItems) =>
      previousItems.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size);
      return;
    }

    setItems((previousItems) =>
      previousItems.map((item) => {
        if (item.productId !== productId || item.size !== size) {
          return item;
        }

        return {
          ...item,
          quantity: Math.min(quantity, item.stock)
        };
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      loading,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }),
    [items, loading, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};
