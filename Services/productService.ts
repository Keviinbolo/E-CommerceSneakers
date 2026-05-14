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
      const response = await api.get<Product[]>('/products');


      return response.data;
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