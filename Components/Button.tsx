import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated
} from 'react-native';
import { theme } from '../Styles/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  const getButtonStyle = () => {
    let style = [styles.button];
    
    if (variant === 'primary') style.push(styles.primary);
    if (variant === 'secondary') style.push(styles.secondary);
    if (variant === 'outline') style.push(styles.outline);
    if (size === 'small') style.push(styles.small);
    if (size === 'large') style.push(styles.large);
    if (disabled) style.push(styles.disabled);
    
    return style;
  };

  const getTextStyle = () => {
    let style = [styles.text];
    if (variant === 'outline') style.push(styles.outlineText);
    if (size === 'small') style.push(styles.smallText);
    if (size === 'large') style.push(styles.largeText);
    if (disabled) style.push(styles.disabledText);
    return style;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPress={onPress}
        onPressOut={handlePressOut}
        style={getButtonStyle()}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {icon && <>{icon}</>}
        {loading ? (
          <ActivityIndicator color={variant === 'outline' ? theme.colors.primary : 'white'} />
        ) : (
          <Text style={getTextStyle()}>{title}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.spacing.sm
  },
  primary: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.small
  },
  secondary: {
    backgroundColor: theme.colors.secondary
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary
  },
  small: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md
  },
  medium: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg
  },
  large: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl
  },
  text: {
    color: 'white',
    fontWeight: '600'
  },
  outlineText: {
    color: theme.colors.primary
  },
  smallText: theme.typography.caption,
  largeText: theme.typography.h3,
  disabled: {
    opacity: 0.5
  },
  disabledText: {
    opacity: 0.5
  }
});