/* eslint-disable no-trailing-spaces */
import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <Box px={['6', '32']}>
      <SimpleGrid
        w="100%"
        minH="80vh"
        minChildWidth="320px"
        spacing={['4', '16']}
      >
        <Flex align="center">
          <Image
            h={['256', '256', '368']}
            src="/assets/img/building-site.png"
            alt="Site em construção"
          />
        </Flex>
        <Flex align="center">
          <VStack align="flex-start" spacing="4">
            <Heading color="red.500">Site em construção</Heading>
            <Text>
              Fala meu povo! Eu sou o Wagner. Trabalho como dev. Este site além de meu portfólio, 
              também será um blog onde irei compartilhar algumas das minhas experiências neste 
              mundo fantástico da programação.
            </Text>
            <Text as="strong" color="red.500">Em breve tudo estará pronto</Text>
            <Link
              href="https://github.com/wcardosos"
              _hover={{
                textDecoration: null,
              }}
            >
              <Button
                colorScheme="red"
                bgColor="red.500"
                fontSize="sm"
              >
                Saber mais
              </Button>
            </Link>
          </VStack>
        </Flex>
      </SimpleGrid>
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
    </Box>
  );
} 
