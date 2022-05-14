import React, { useRef } from 'react';
import {
  Box,
  Drawer as DrawerChakra,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { RiMenuFill as MenuIcon } from 'react-icons/ri';
import Nav from './Nav';

export default function Drawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuButtonRef = useRef();

  return (
    <>
      <Box
        as="button"
        data-testid="open-drawer-button"
        color="red.500"
        ref={menuButtonRef}
        onClick={onOpen}
      >
        <MenuIcon fontSize="24" />
      </Box>
      <DrawerChakra
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={menuButtonRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="gray.800" color="red.500">
          <DrawerCloseButton data-testid="close-drawer-button" />
          {/* {<DrawerHeader fontWeight={400} py="8">
          </DrawerHeader>} */}
          <DrawerBody onClick={onClose}>
            <Nav />
          </DrawerBody>
        </DrawerContent>
      </DrawerChakra>
    </>
  );
}
