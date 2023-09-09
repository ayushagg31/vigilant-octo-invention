'use client'
import React, { useState } from "react";
import Home from "../../components/home/Home";
import { Container } from '@chakra-ui/react'
import DashboardLayout from "../../components/layout/DashboardLayout";


const FileUploader = () => {
    return (
        <>
            <Container maxW='4xl'>
                <Home />
            </Container>
        </>
    );
};

export default FileUploader;


FileUploader.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};


