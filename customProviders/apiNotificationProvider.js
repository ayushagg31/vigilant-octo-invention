import React, { useEffect } from "react";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    Center,
    Container,
    useToast
} from '@chakra-ui/react'
import { useAPIError } from "../hooks/useApiHook";

function APIErrorNotificationProvider() {

    const { error, removeError } = useAPIError();
    const toast = useToast()

    useEffect(() => {
        if (error?.message !== undefined) {
            toast({
                title: '',
                description: error.message,
                status: 'error',
                duration: 9000,
                onCloseComplete: removeError,
                isClosable: true,
            })
        }
    }, [error])
    return (
        <>
        </>

    );
}

export default APIErrorNotificationProvider;
