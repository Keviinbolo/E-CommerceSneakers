import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import { theme } from '../Styles/theme';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  isLimited: boolean;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true
    }).start();
    onPress();
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.card}>
          {product.isLimited && (
            <View style={styles.limitedBadge}>
              <Text style={styles.limitedText}>LIMITED EDITION</Text>
            </View>
          )}
          <Image source={{ uri: product.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
            <Text style={styles.price}>${product.price.toLocaleString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: theme.spacing.md
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.medium
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  info: {
    padding: theme.spacing.md
  },
  brand: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  name: {
    ...theme.typography.body,
    fontWeight: '600',
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.sm
  },
  price: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    fontWeight: 'bold'
  },
  limitedBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    zIndex: 1
  },
  limitedText: {
    ...theme.typography.small,
    color: theme.colors.secondary,
    fontWeight: 'bold'
  }
});
