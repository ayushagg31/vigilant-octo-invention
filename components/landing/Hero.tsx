'use client'

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
  useDisclosure,
  Highlight,
} from '@chakra-ui/react';
import { useAuth } from "../../store/useAuth";
import { useRouter } from "next/router";
import { IoMdArrowForward } from "react-icons/io";


import { LoginModal } from "../home/LoginModal";

export default function Hero() {
  let router = useRouter()

  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal
  } = useDisclosure()

  const { user, loadingUser, logout } = useAuth((store) => ({
    user: store.user,
    loadingUser: store.loadingUser,
    logout: store.logout,
  }));


  const gotoDashboard = () => router.push('/dashboard');
  const tryItHandler = () => {
    if (user) {
      gotoDashboard()
    } else {
      onOpenLoginModal()
    }
  }

  const demoHandler = () => {
    const url = '/docinsights?id=f5fa43d2-4497-49f4-afd4-8770af911c6f';
    router.push(url)
  }


  // method to jump to the desired element by using the element's id
  const jumpToReleventDiv = (id) => {
    const releventDiv = document.getElementById(id);
    // behavior: "smooth" parameter for smooth movement
    releventDiv.scrollIntoView({ behavior: "smooth", block: 'center' });
  }

  return (
    <>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 4, md: 5 }}
          py={{ base: 20, md: 28 }}>
          <div>
            <Heading
              fontWeight={800}
              className='hero-heading'
              color={'#343a40'}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
              lineHeight={'110%'}>
              <Highlight query='Save countless hours'
                styles={{ px: '1', py: '1', bg: 'black', color: '#fff', fontFamily: 'Inconsolata' }}>
                Chat With Documents & Youtube Videos Save countless hours
              </Highlight>
            </Heading>
          </div>
          <Text as='b' className='hero-heading' fontWeight={600} fontSize={{ base: 'md', sm: 'lg' }} maxW={'4xl'}>
            Summarize your content, Ask questions and Create notes. Almost Instantly.
          </Text>
          <Stack spacing={6} direction={'row'}>
            <Button
              rightIcon={<IoMdArrowForward />}
              onClick={() => {
                tryItHandler();
              }}
              rounded={'full'}
              px={6}
              colorScheme={'gray'}
              bg="#343a40"
              _hover={{ bg: '#23272b', color: '#fff', borderColor: '#1d2124', borderWidth: '1px' }}
              color="#fff">
              Start for free
            </Button>

            <Button onClick={() => demoHandler()} rounded={'full'} px={6}>See it in action
            </Button>
          </Stack>
          <Flex w={'full'}>
            {/* <Illustration height={{ sm: '24rem', lg: '28rem' }} mt={{ base: 12, sm: 16 }} /> */}
          </Flex>
        </Stack>
      </Container >
      <LoginModal isOpen={isOpenLoginModal} onOpen={onOpenLoginModal} onClose={onCloseLoginModal} fn={gotoDashboard} />
    </>

  )
}