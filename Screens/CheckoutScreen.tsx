import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Header } from '../Components/Header';
import { Button } from '../Components/Button';
import { Input } from '../Components/Input';
import { theme } from '../Styles/theme';
import * as Haptics from 'expo-haptics';
import { useCart } from '../context/CartContext';
import { calculateTax, calculateTotal } from '../utils/cartTotals';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type CheckoutScreenProps = StackScreenProps<RootStackParamList, 'Checkout'>;

export const CheckoutScreen = ({ navigation }: CheckoutScreenProps) => {
  const { items, subtotal, clearCart } = useCart();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePurchase = async () => {
    if (!cardNumber || !expiryDate || !cvv || !address) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!items.length) {
      Alert.alert('Carrito vacio', 'Anade productos antes de confirmar la compra');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      clearCart();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(
        'Compra exitosa',
        'Tu pedido ha sido confirmado. Recibiras un correo con los detalles.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    }, 2000);
  };

  const shipping = subtotal > 0 ? 25 : 0;
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, shipping, tax);

  return (
    <View style={styles.container}>
      <Header showBack onBack={() => navigation.goBack()} title="Checkout" />

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Productos ({items.length})</Text>
          {!items.length ? (
            <Text style={styles.emptyText}>No hay productos en el carrito.</Text>
          ) : (
            items.map((item) => (
              <View key={`${item.productId}-${item.size}`} style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  {item.name} x{item.quantity} (US {item.size})
                </Text>
                <Text style={styles.summaryValue}>${(item.price * item.quantity).toFixed(2)}</Text>
              </View>
            ))
          )}
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen del pedido</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Envio</Text>
            <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>IVA (21%)</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Informacion de envio</Text>
        <Input
          label="Direccion"
          value={address}
          onChangeText={setAddress}
          placeholder="Tu direccion completa"
          icon="location"
        />

        <Text style={styles.sectionTitle}>Informacion de pago</Text>
        <Input
          label="Numero de tarjeta"
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="1234 5678 9012 3456"
          icon="card"
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Input
              label="Fecha expiracion"
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="MM/YY"
            />
          </View>
          <View style={styles.halfInput}>
            <Input
              label="CVV"
              value={cvv}
              onChangeText={setCvv}
              placeholder="123"
              secureTextEntry
            />
          </View>
        </View>

        <Button
          title={processing ? 'Procesando...' : 'Confirmar compra'}
          onPress={handlePurchase}
          loading={processing}
          size="large"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    padding: theme.spacing.lg
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl
  },
  summaryTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
    gap: theme.spacing.sm
  },
  summaryLabel: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    flex: 1
  },
  summaryValue: {
    ...theme.typography.body,
    fontWeight: '600'
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary
  },
  totalRow: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.text.tertiary
  },
  totalLabel: {
    ...theme.typography.h3,
    fontWeight: 'bold'
  },
  totalValue: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md
  },
  halfInput: {
    flex: 1
  }
});
