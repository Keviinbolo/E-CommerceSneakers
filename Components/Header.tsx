import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../Styles/theme';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightIcon?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'SNEAKERS LIMITLESS',
  showBack = false,
  onBack,
  rightIcon
}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View style={styles.header}>
        {showBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        <Text style={styles.title}>{title}</Text>
        
        {rightIcon ? (
          rightIcon
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface
  },
  title: {
    ...theme.typography.h2,
    fontSize: 20,
    fontWeight: 'bold'
  },
  backButton: {
    padding: theme.spacing.sm
  },
  placeholder: {
    width: 40
  }
});
