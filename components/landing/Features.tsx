'use client'

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactElement } from 'react';
import { FiUploadCloud, } from 'react-icons/fi'
import { BsFillChatLeftTextFill, } from 'react-icons/bs'

interface FeatureProps {
  text: string
  iconBg: string
  icon?: ReactElement
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function SplitWithImage() {
  return (
    <div id="how-it-works">
      <Container maxW={'5xl'} py={12}>
        <div className='demo-video'>
          <Stack spacing={2}>
            <Text as='b' fontSize={'xl'}>
              Get insights in 2 simple steps
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
              }>
              <Feature
                icon={<Icon as={FiUploadCloud} w={5} h={5} />}
                iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                text={'Upload or link your PDFs and videos.'}
              />
              <Feature
                icon={<Icon as={BsFillChatLeftTextFill} w={5} h={5} />}
                iconBg={useColorModeValue('green.100', 'green.900')}
                text={'Chat with our AI-powered chatbot.'}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              boxShadow={'xl'}
              border={'1px'}
              rounded={'md'}
              alt={'feature image'}
              src={'/sitegpt.gif'}
              objectFit={'scale-down'}
            />
          </Flex>
        </div>
      </Container>
    </div>

  )
}