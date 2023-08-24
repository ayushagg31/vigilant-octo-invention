import React from "react";
import { Box, Text, HStack, Button } from "@chakra-ui/react";
import { AiFillDingtalkCircle } from 'react-icons/ai';
import BackButton from "./BackButton";

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
            <Box>
                <BackButton />
            </Box>
        </HStack>
    );
}