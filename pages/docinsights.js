'use client'
import React, { useState } from "react";
import { Container, Box } from '@chakra-ui/react'
import { AfterUpload } from "../components/home/AfterUpload";

const DocInsights = () => {
    return (
        <>
            <Box p='4' paddingTop='0'>
                <AfterUpload />
            </Box>
        </>
    );
};

export default DocInsights;
