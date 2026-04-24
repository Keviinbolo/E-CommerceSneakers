export const theme = {
  colors: {
    primary: '#FF3B30', // Rojo energético para sneakers limitados
    secondary: '#1A1A1A', // Negro premium
    tertiary: '#F5F5F0', // Blanco roto elegante
    accent: '#FFD700', // Dorado para ediciones limitadas
    background: '#FFFFFF',
    surface: '#F8F9FA',
    error: '#DC2626',
    success: '#10B981',
    text: {
      primary: '#1A1A1A',
      secondary: '#6B7280',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF'
    },
    gradient: {
      start: '#FF3B30',
      end: '#FF8C42'
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
    circle: 999
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
    h2: { fontSize: 28, fontWeight: 'bold', lineHeight: 36 },
    h3: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
    body: { fontSize: 16, fontWeight: 'normal', lineHeight: 24 },
    caption: { fontSize: 14, fontWeight: 'normal', lineHeight: 20 },
    small: { fontSize: 12, fontWeight: 'normal', lineHeight: 16 }
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8
    }
  }
};