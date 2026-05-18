import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
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

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contrasenas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contrasena debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    const success = await authService.register(name, email, password);
    setLoading(false);

    if (success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.replace('Home');
    } else {
      Alert.alert('Error', 'No se pudo completar el registro');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header showBack onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Unete a la comunidad Sneaker Head</Text>

        <Input
          label="Nombre completo"
          value={name}
          onChangeText={setName}
          placeholder="Tu nombre"
          icon="person"
        />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="tusneakers@example.com"
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

        <Input
          label="Confirmar contrasena"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="******"
          secureTextEntry
          icon="lock-closed"
        />

        <Button
          title="Registrarse"
          onPress={handleRegister}
          loading={loading}
          size="large"
        />

        <Text style={styles.loginLink}>
          Ya tienes cuenta?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
            Inicia sesion
          </Text>
        </Text>
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
  loginLink: {
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
