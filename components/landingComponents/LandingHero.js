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
} from '@chakra-ui/react';
import { useAuth } from "../../store/useAuth";
import { useRouter } from "next/router";


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

    return (
        <>
            <Container maxW={'5xl'}>
                <Stack
                    textAlign={'center'}
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 20, md: 28 }}>
                    <div>
                        <Heading
                            fontWeight={600}
                            className='hero-heading'
                            color={'#343a40'}
                            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                            lineHeight={'110%'}>
                            Chat With Documents & Youtube Video,{''}
                            <Text className='hero-heading' as={'span'} color={'orange.400'}>
                                Save Countless Hours
                            </Text>
                        </Heading>
                    </div>

                    <Text as='samp' fontWeight={500} fontSize={{ base: 'sm', sm: 'md' }} maxW={'4xl'}>
                        Summarize your content, Ask questions and Create notes. Almost Instantly.
                    </Text>
                    <Stack spacing={6} direction={'row'}>
                        <Button
                            onClick={() => {
                                tryItHandler();
                            }}
                            rounded={'full'}
                            px={6}
                            colorScheme={'gray'}
                            bg="#343a40"
                            _hover={{ bg: '#23272b', color: '#fff', borderColor: '#1d2124', borderWidth: '1px' }}
                            color="#fff">
                            Try it for free
                        </Button>

                        <Button rounded={'full'} px={6}>
                            See how it works
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