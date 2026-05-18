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
      const response = await api.get('/products');
      const raw = response.data;

      if (!Array.isArray(raw)) return [];

      // Normalize server shape to local `Product` interface
      return raw.map((p: any) => ({
        id: p.id ?? p._id ?? String(p._id ?? ''),
        name: p.name,
        brand: p.brand,
        price: Number(p.price ?? 0),
        image: p.image ?? p.img ?? '',
        description: p.description ?? p.desc ?? '',
        isLimited: !!(p.isLimited || p.limited || p.is_limited),
        size: p.size ?? p.sizes ?? p.availableSizes ?? [],
        stock: Number(p.stock ?? p.quantity ?? 0)
      } as Product));
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await api.get(`/products/${id}`);
      const p = response.data;
      if (!p) return null;

      return {
        id: p.id ?? p._id ?? String(p._id ?? ''),
        name: p.name,
        brand: p.brand,
        price: Number(p.price ?? 0),
        image: p.image ?? p.img ?? '',
        description: p.description ?? p.desc ?? '',
        isLimited: !!(p.isLimited || p.limited || p.is_limited),
        size: p.size ?? p.sizes ?? p.availableSizes ?? [],
        stock: Number(p.stock ?? p.quantity ?? 0)
      } as Product;
    } catch (error) {
      console.error('Error fetching product by id:', error);
      return null;
    }
  }
}

export const productService = new ProductService();