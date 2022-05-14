import { extendTheme } from '@chakra-ui/react';

const fonts = {
  body: 'Montserrat, sans-serif',
  heading: 'Montserrat, sans-serif',
};

const styles = {
  global: {
    'html, body': {
      bgColor: 'gray.800',
      color: 'gray.50',
    },
  },
};

const theme = extendTheme({
  fonts,
  styles,
});

export default theme;
