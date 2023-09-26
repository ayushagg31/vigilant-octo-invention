import React from "react";
import { Button, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io"

export default function BackButton() {

    let router = useRouter()
    let pathName = router.pathname;
    const showBackButton = pathName === "docinsights"
    return (
        showBackButton && <Tooltip label='Go back to dashboard'><Button onClick={() => router.push('/dashboard')} leftIcon={<IoIosArrowBack />} variant='solid'>
        </Button></Tooltip >

    );
}