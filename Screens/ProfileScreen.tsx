import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Header } from '../Components/Header';
import { Button } from '../Components/Button';
import { theme } from '../Styles/theme';
import { useCart } from '../context/CartContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type ProfileScreenProps = StackScreenProps<RootStackParamList, 'Profile'>;

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { itemCount, subtotal, clearCart } = useCart();

  const handleMockLogout = () => {
    Alert.alert('Sesión cerrada', 'Has salido del modo demo.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login')
      }
    ]);
  };

  const handleClearCart = () => {
    Alert.alert('Vaciar carrito', '¿Quieres eliminar todos los productos del carrito?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      {
        text: 'Vaciar',
        style: 'destructive',
        onPress: () => clearCart()
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Header showBack onBack={() => navigation.goBack()} title="Mi perfil" />

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.name}>Usuario demo</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Resumen de carrito</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Productos:</Text>
            <Text style={styles.value}>{itemCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal:</Text>
            <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
          </View>
        </View>

        <Button title="Ir a checkout" onPress={() => navigation.navigate('Checkout')} size="large" />
        <Button title="Vaciar carrito" onPress={handleClearCart} variant="outline" size="large" />
        <Button title="Cerrar sesión (mock)" onPress={handleMockLogout} variant="secondary" size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg
  },
  name: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.xs
  },
  email: {
    ...theme.typography.body,
    color: theme.colors.text.secondary
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm
  },
  label: {
    ...theme.typography.body,
    color: theme.colors.text.secondary
  },
  value: {
    ...theme.typography.body,
    fontWeight: '700'
  }
});
