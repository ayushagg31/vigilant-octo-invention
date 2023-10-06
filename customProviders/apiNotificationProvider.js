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
                position: 'top',
                description: error.message,
                status: error.type ? error.type : 'error',
                duration: 200000,
                onCloseComplete: removeError,
                isClosable: true,
                containerStyle: {  }
            })
        }
    }, [error?.message])
    return (
        <>
        </>

    );
}

export default APIErrorNotificationProvider;
