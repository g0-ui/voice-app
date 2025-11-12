import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#ffe0f0',
      100: '#ffc3e0',
      200: '#ff99cc',
      300: '#ff6bb8',
      400: '#ff4da3',
      500: '#ff6b9d', // メインカラー
      600: '#e6005f',
      700: '#b3004a',
      800: '#800036',
      900: '#4d0020',
    },
    pink: {
      50: '#ffe0f0',
      100: '#ffc3e0',
      200: '#ff99cc',
      300: '#ff6bb8',
      400: '#ff4da3',
      500: '#ff6b9d',
      600: '#e6005f',
      700: '#b3004a',
      800: '#800036',
      900: '#4d0020',
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'full',
      },
      variants: {
        solid: (props: { colorScheme: string }) => ({
          bg:
            props.colorScheme === 'pink'
              ? 'linear-gradient(135deg, #ff6b9d 0%, #ffc3e0 100%)'
              : undefined,
          color: 'white',
          _hover: {
            transform: 'scale(1.05)',
            boxShadow: '0 5px 15px rgba(255, 107, 157, 0.4)',
          },
          _active: {
            transform: 'scale(0.95)',
          },
          transition: 'all 0.2s',
        }),
      },
    },
    Card: {
      baseStyle: (props: { colorMode: string }) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
          borderRadius: '20px',
          boxShadow:
            props.colorMode === 'dark'
              ? '0 10px 40px rgba(0, 0, 0, 0.5)'
              : '0 10px 40px rgba(0, 0, 0, 0.2)',
        },
      }),
    },
  },
  fonts: {
    heading: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    body: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

export default theme;
