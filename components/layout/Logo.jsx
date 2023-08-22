import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { AiFillDingtalkCircle } from 'react-icons/ai';

export default function Logo(props) {
    return (

        <HStack spacing='24px'>
            <Box>
                <AiFillDingtalkCircle size='30px' />
            </Box>
            <Box >
                <Text fontSize="lg" fontWeight="bold">
                    Doc Xpert
                </Text>
            </Box>
        </HStack>
    );
}