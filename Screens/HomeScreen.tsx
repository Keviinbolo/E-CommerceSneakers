import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { ProductCard } from '../Components/ProductCard';
import { Header } from '../Components/Header';
import { productService, Product } from '../Services/productService';
import { theme } from '../Styles/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('Todos');

  const brands = ['Todos', 'Nike', 'Jordan', 'Adidas'];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await productService.getProducts();
    setProducts(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const filteredProducts = selectedBrand === 'Todos'
    ? products
    : products.filter(p => p.brand === selectedBrand);

  const limitedEditionCount = products.filter(p => p.isLimited).length;

  return (
    <View style={styles.container}>
      <Header 
        rightIcon={
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={28} color={theme.colors.text.primary} />
          </TouchableOpacity>
        }
      />
      
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>DROP ZONE</Text>
        <Text style={styles.heroSubtitle}>
          🔥 {limitedEditionCount} ediciones limitadas disponibles
        </Text>
      </View>

      <View style={styles.brandsContainer}>
        <FlatList
          horizontal
          data={brands}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.brandChip,
                selectedBrand === item && styles.brandChipActive
              ]}
              onPress={() => {
                setSelectedBrand(item);
                Haptics.selectionAsync();
              }}
            >
              <Text style={[
                styles.brandText,
                selectedBrand === item && styles.brandTextActive
              ]}>{item}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.brandsList}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.navigate('Product', { productId: item.id });
            }}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  hero: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.lg,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center'
  },
  heroTitle: {
    ...theme.typography.h1,
    color: theme.colors.accent,
    fontSize: 28
  },
  heroSubtitle: {
    ...theme.typography.body,
    color: theme.colors.text.inverse,
    marginTop: theme.spacing.sm
  },
  brandsContainer: {
    marginBottom: theme.spacing.md
  },
  brandsList: {
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm
  },
  brandChip: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.circle,
    backgroundColor: theme.colors.surface,
    marginRight: theme.spacing.sm
  },
  brandChipActive: {
    backgroundColor: theme.colors.primary
  },
  brandText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary
  },
  brandTextActive: {
    color: theme.colors.text.inverse,
    fontWeight: 'bold'
  },
  productList: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl
  },
  productRow: {
    justifyContent: 'space-between'
  }
});