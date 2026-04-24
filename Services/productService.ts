import { api } from './api';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  isLimited: boolean;
  size: string[];
  stock: number;
}

class ProductService {
  async getProducts(): Promise<Product[]> {
    try {
      // Mock de productos de sneakers limitados
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Air Jordan 1 Retro High Off-White Chicago',
          brand: 'Jordan',
          price: 1899,
          image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb',
          description: 'Edición limitada colaboración Virgil Abloh',
          isLimited: true,
          size: ['7', '8', '9', '10', '11'],
          stock: 50
        },
        {
          id: '2',
          name: 'Nike Dunk Low SB Ben & Jerry\'s',
          brand: 'Nike',
          price: 1299,
          image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb',
          description: 'Colaboración icónica con Ben & Jerry\'s',
          isLimited: true,
          size: ['8', '9', '10', '12'],
          stock: 25
        },
        {
          id: '3',
          name: 'Yeezy Boost 350 V2 Zebra',
          brand: 'Adidas',
          price: 899,
          image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
          description: 'Reedición del clásico Zebra',
          isLimited: false,
          size: ['9', '10', '11'],
          stock: 100
        },
        {
          id: '4',
          name: 'Travis Scott Air Jordan 1',
          brand: 'Jordan',
          price: 1599,
          image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb',
          description: 'Cactus Jack edición limitada',
          isLimited: true,
          size: ['8', '9', '10'],
          stock: 15
        }
      ];
      
      return mockProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.id === id) || null;
  }
}

export const productService = new ProductService();