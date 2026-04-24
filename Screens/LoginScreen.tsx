import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';
import { Header } from '../Components/Header';
import { authService } from '../Services/authService';
import { theme } from '../Styles/theme';
import * as Haptics from 'expo-haptics';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigation/AppNavigator';

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa todos los campos');
      return;
    }

    setLoading(true);
    const success = await authService.login(email, password);
    setLoading(false);

    if (success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.replace('Home');
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  const handleBiometricLogin = async () => {
    const isAvailable = await authService.setupBiometric();
    if (!isAvailable) {
      Alert.alert('No disponible', 'La biometria no esta disponible en este dispositivo');
      return;
    }

    const authenticated = await authService.authenticateWithBiometrics();
    if (authenticated) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await authService.login('user@example.com', 'password');
      navigation.replace('Home');
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', 'Autenticacion biometrica fallida');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Ingresa a tu cuenta de Sneaker Head</Text>

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="user@example.com"
          icon="mail"
        />

        <Input
          label="Contrasena"
          value={password}
          onChangeText={setPassword}
          placeholder="******"
          secureTextEntry
          icon="lock-closed"
        />

        <Button
          title="Iniciar sesion"
          onPress={handleLogin}
          loading={loading}
          size="large"
        />

        <TouchableOpacity onPress={handleBiometricLogin} style={styles.biometricButton}>
          <Text style={styles.biometricText}>Iniciar con huella digital</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>
            No tienes cuenta? <Text style={styles.linkText}>Registrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center'
  },
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.sm
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl
  },
  biometricButton: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
    padding: theme.spacing.md
  },
  biometricText: {
    ...theme.typography.body,
    color: theme.colors.primary
  },
  registerLink: {
    ...theme.typography.body,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.text.secondary
  },
  linkText: {
    color: theme.colors.primary,
    fontWeight: 'bold'
  }
});
