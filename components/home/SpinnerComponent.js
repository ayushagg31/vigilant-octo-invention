import React from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
const SpinnerComponent = () => {
    return (
        <>
            <div
            >
                <Center>
                    <Box transform="translateY(-50%, -50%)">
                        <Spinner
                            size='xl' />
                    </Box>
                </Center>

            </div>
        </>
    );
};
export default SpinnerComponent;