'use client'

import {
    Box,
    chakra,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
    StatHelpText,
    StatArrow,
    StatGroup,
    Card,
    CardBody,
    CardHeader,
    Heading,
    CardFooter,
    Button
} from '@chakra-ui/react'




export const StatsContainer = () => {
    return (
        <Box boxShadow={'md'}>
            <Card variant={"outline"}>
                <CardBody>
                    <StatGroup>
                        <Stat>
                            <StatLabel>PDFs Uploaded</StatLabel>
                            <StatNumber>345</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Videos Uploaded</StatLabel>
                            <StatNumber>345</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Questions Asked</StatLabel>
                            <StatNumber>45</StatNumber>
                        </Stat>

                        <Stat>
                            <StatLabel>Limit Left</StatLabel>
                            <StatNumber>45</StatNumber>
                        </Stat>

                    </StatGroup>
                </CardBody>
            </Card>

        </Box>
    )
}