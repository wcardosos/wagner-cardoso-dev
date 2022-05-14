import React from 'react';
import {
  Stack,
  Link,
} from '@chakra-ui/react';
import { useResponsiveness } from '../hooks/useResponsiveness';

export default function Nav() {
  const isDesktopVersion = useResponsiveness('desktop');

  return (
    <Stack
      data-testid="nav"
      direction={isDesktopVersion ? 'row' : 'column'}
      spacing="8"
      align="flex-start"
    >
      <Link
        href="#about"
        color="red.500"
        _hover={{
          fontWeight: 700,
        }}
      >
        Sobre
      </Link>
      <Link
        href="#stack"
        color="red.500"
        _hover={{
          fontWeight: 700,
        }}
      >
        Stack
      </Link>
      <Link
        href="#opinions"
        color="red.500"
        _hover={{
          fontWeight: 700,
        }}
      >
        Opiniões
      </Link>
      <Link
        href="#blog"
        color="red.500"
        _hover={{
          fontWeight: 700,
        }}
      >
        Blog
      </Link>
    </Stack>
  );
}
