import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './Navigation/AppNavigator';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </SafeAreaProvider>
  );
}