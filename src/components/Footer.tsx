import React from 'react';
import {
  Center,
  HStack,
  Image,
  Link,
} from '@chakra-ui/react';

export default function Footer() {
  return (
    <Center py={['8', '8', '0']}>
      <HStack spacing={['4', '8']}>
        <Link
          href="mailto:wagnerdev01@gmail.com"
          target="_blank"
        >
          <Image
            src="/assets/img/gmail-icon.png"
            alt="Contato Gmail"
            h={['6', '8']}
          />
        </Link>
        <Link
          href="https://linkedin.com/in/wagner-cardoso-dev"
          target="_blank"
        >
          <Image
            src="/assets/img/linkedin-icon.png"
            alt="Contato LinkedIn"
            h={['6', '8']}
          />
        </Link>
        <Link
          href="https://github.com/wcardosos"
          target="_blank"
        >
          <Image
            src="/assets/img/github-icon.png"
            alt="Contato Github"
            h={['6', '8']}
          />
        </Link>
      </HStack>
    </Center>
  );
}
