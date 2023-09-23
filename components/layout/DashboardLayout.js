("use client");
import NavBar from "./NavBar";
import { Flex, Box } from "@chakra-ui/react";

export default function DashboardLayout({ children }) {
  return (
    <Box h={{ base: '90vh', sm: '100vh' }}>
      <Flex
        w="100%"
        h="100%"
        direction={{ base: "column", md: "row" }}
        className="theme-gradient"
      >
        <NavBar />
        <div style={{ flex: 1 }}>{children}</div>
      </Flex>
    </Box>
  );
}
