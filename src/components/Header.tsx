import React from 'react';
import {
  Flex,
  Image,
  // Spacer,
} from '@chakra-ui/react';
// import { useResponsiveness } from '../hooks/useResponsiveness';
// import Nav from './Nav';
// import Drawer from './Drawer';

export default function Header() {
  // const isDesktopVersion = useResponsiveness('desktop');

  return (
    <Flex
      as="header"
      // direction={isDesktopVersion ? 'row' : 'row-reverse'}
      px={['6', '32']}
      align="center"
      h="10vh"
    >
      <Image
        src="/assets/img/logo.png"
        alt="Logo"
        h="100%"
      />
      {/* <Spacer />
      {isDesktopVersion ? <Nav /> : <Drawer />} */}
    </Flex>
  );
}
