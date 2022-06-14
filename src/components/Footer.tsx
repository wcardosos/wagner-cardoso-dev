import React from 'react';
import {
  Center,
  HStack,
  Icon,
  Link,
} from '@chakra-ui/react';
import {
  SiGmail,
  SiGithub,
  SiLinkedin,
} from 'react-icons/si';

export default function Footer() {
  return (
    <Center py={['8', '8', '0']}>
      <HStack spacing={['4', '8']}>
        <Link
          href="mailto:wagnerdev01@gmail.com"
          target="_blank"
        >
          <Icon
            data-testid="gmail-icon"
            as={SiGmail}
            fontSize={['16', '32']}
            color="red.500"
          />
        </Link>
        <Link
          href="https://linkedin.com/in/wagner-cardoso-dev"
          target="_blank"
        >
          <Icon
            data-testid="linkedin-icon"
            as={SiLinkedin}
            fontSize={['16', '32']}
            color="red.500"
          />
        </Link>
        <Link
          href="https://github.com/wcardosos"
          target="_blank"
        >
          <Icon
            data-testid="github-icon"
            as={SiGithub}
            fontSize={['16', '32']}
            color="red.500"
          />
        </Link>
      </HStack>
    </Center>
  );
}
