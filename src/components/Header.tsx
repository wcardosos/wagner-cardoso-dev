import React from 'react';
import {
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { useResponsiveness } from '../hooks/useResponsiveness';
import Nav from './Nav';
import Drawer from './Drawer';

export default function Header() {
  const isDesktopVersion = useResponsiveness('desktop');

  return (
    <Flex
      direction={isDesktopVersion ? 'row' : 'row-reverse'}
      pl={['6', '8']}
      pr={['6', '32']}
      align="center"
      h="10vh"
    >
      <Spacer />
      {isDesktopVersion ? <Nav /> : <Drawer />}
    </Flex>
  );
}
