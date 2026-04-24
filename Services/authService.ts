import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export interface User {
  id: string;
  email: string;
  name: string;
}

class AuthService {
  private readonly TOKEN_KEY = '@auth_token';
  private readonly USER_KEY = '@user_data';

  async login(email: string, password: string): Promise<boolean> {
    // Simulación de login
    if (email === 'user@example.com' && password === 'password') {
      const token = 'fake_jwt_token_' + Date.now();
      const user: User = {
        id: '1',
        email: email,
        name: 'Sneaker Enthusiast'
      };
      
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  async register(name: string, email: string, password: string): Promise<boolean> {
    // Simulación de registro
    const token = 'fake_jwt_token_' + Date.now();
    const user: User = {
      id: Date.now().toString(),
      email: email,
      name: name
    };
    
    await AsyncStorage.setItem(this.TOKEN_KEY, token);
    await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return true;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(this.TOKEN_KEY);
    await AsyncStorage.removeItem(this.USER_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    const userJson = await AsyncStorage.getItem(this.USER_KEY);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  async setupBiometric(): Promise<boolean> {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) return false;
    
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) return false;
    
    return true;
  }

  async authenticateWithBiometrics(): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentícate para acceder a tu cuenta',
        fallbackLabel: 'Usar contraseña'
      });
      return result.success;
    } catch (error) {
      console.error('Biometric error:', error);
      return false;
    }
  }
}

export const authService = new AuthService();