import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { AiFillDingtalkCircle } from "react-icons/ai";
import { useAuth } from "../../store/useAuth";
import { LoginModal } from "../home/LoginModal";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { user, loadingUser, logout } = useAuth((store) => ({
    user: store.user,
    loadingUser: store.loadingUser,
    logout: store.logout,
  }));

  const router = useRouter();

  const onLogout = async () => {
    await logout();
    router.replace("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const termConditionText = `By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.`;

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <AiFillDingtalkCircle size="44px" title="Doc Xpert" />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            ></HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {loadingUser ? (
              "Loading..."
            ) : user ? (
              <>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={user.photoURL} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => router.push("/dashboard")}>
                      Dashboard
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => onLogout()}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Box
                as="a"
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                onClick={() => {
                  onOpen();
                }}
              >
                Login
              </Box>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
