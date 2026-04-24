import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Header } from '../Components/Header';
import { Button } from '../Components/Button';
import { productService, Product } from '../Services/productService';
import { theme } from '../Styles/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useCart } from '../context/CartContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type ProductScreenProps = StackScreenProps<RootStackParamList, 'Product'>;

export const ProductScreen = ({ route, navigation }: ProductScreenProps) => {
  const { productId } = route.params;
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    const data = await productService.getProductById(productId);
    setProduct(data);
  };

  const addToCart = () => {
    if (!product) {
      return;
    }

    if (!selectedSize) {
      Alert.alert('Error', 'Por favor selecciona una talla');
      return;
    }

    addItem(product, selectedSize, quantity);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Éxito', `${product.name} añadido al carrito`);
  };

  const handleBuyNow = () => {
    if (!product) {
      return;
    }

    if (!selectedSize) {
      Alert.alert('Error', 'Por favor selecciona una talla');
      return;
    }

    addItem(product, selectedSize, quantity);
    navigation.navigate('Checkout');
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Header showBack onBack={() => navigation.goBack()} />
        <View style={styles.centerContent}>
          <Text>Cargando...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header showBack onBack={() => navigation.goBack()} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          {product.isLimited && (
            <View style={styles.limitedOverlay}>
              <Text style={styles.limitedOverlayText}>⚡ LIMITED DROP ⚡</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toLocaleString()}</Text>
          
          <View style={styles.stockContainer}>
            <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
            <Text style={styles.stockText}>
              {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
            </Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Selecciona talla</Text>
          <View style={styles.sizesContainer}>
            {product.size.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.sizeButtonSelected
                ]}
                onPress={() => {
                  setSelectedSize(size);
                  Haptics.selectionAsync();
                }}
              >
                <Text style={[
                  styles.sizeText,
                  selectedSize === size && styles.sizeTextSelected
                ]}>US {size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>Cantidad</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Ionicons name="remove" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => quantity < product.stock && setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Añadir al carrito"
            onPress={addToCart}
            size="large"
          />
          
          <Button
            title="Comprar ahora"
            onPress={handleBuyNow}
            variant="outline"
            size="large"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover'
  },
  limitedOverlay: {
    position: 'absolute',
    top: theme.spacing.md,
    left: 0,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderTopRightRadius: theme.borderRadius.md,
    borderBottomRightRadius: theme.borderRadius.md
  },
  limitedOverlayText: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.secondary
  },
  content: {
    padding: theme.spacing.lg
  },
  brand: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  name: {
    ...theme.typography.h2,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.sm
  },
  price: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md
  },
  stockText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.xs,
    color: theme.colors.success
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
    lineHeight: 22
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl
  },
  sizeButton: {
    width: 70,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    alignItems: 'center'
  },
  sizeButtonSelected: {
    backgroundColor: theme.colors.primary
  },
  sizeText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    fontWeight: '600'
  },
  sizeTextSelected: {
    color: 'white'
  },
  quantityContainer: {
    marginBottom: theme.spacing.xl
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.circle,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantityText: {
    ...theme.typography.h3,
    minWidth: 50,
    textAlign: 'center'
  }
});