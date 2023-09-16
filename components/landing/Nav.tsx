"use client";
import React from "react";
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
  color,
} from "@chakra-ui/react";
import {
  AiFillDingtalkCircle,
  AiOutlineClose as CloseIcon,
  AiOutlineMenu as HamburgerIcon,
  AiFillFileAdd as AddIcon,
} from "react-icons/ai";
import { useAuth } from "../../store/useAuth";
import { LoginModal } from "../home/LoginModal";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo, useCallback } from "react";

interface Props {
  children: React.ReactNode;
}

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

  const jumpToReleventDiv = useCallback((id) => {
    const releventDiv = document.getElementById(id);
    // behavior: "smooth" parameter for smooth movement
    releventDiv.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const Links = useMemo(() => {
    return [
      { name: "How it works", fn: () => jumpToReleventDiv("how-it-works") },
      { name: "Demo", fn: () => jumpToReleventDiv("demo-section") },
      { name: "Pricing", fn: () => jumpToReleventDiv("pricing-section") },
    ];
  }, [jumpToReleventDiv]);
  const router = useRouter();

  const onLogout = async () => {
    await logout();
    router.replace("/");
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  const [mounted, setMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();

  const termConditionText = `By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.`;

  if (!mounted) return <></>;
  return (
    <>
      <Box bg={"black"} color={"#fff"} boxShadow={"lg"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box display={{ md: "none" }}>
            <Menu>
              <MenuButton rounded={"full"} cursor={"pointer"} minW={0}>
                <HamburgerIcon />
              </MenuButton>
              <MenuList color={"black"}>
                {Links.map((link) => {
                  return <MenuItem onClick={link.fn}>{link.name}</MenuItem>;
                })}
              </MenuList>
            </Menu>
          </Box>
          <Flex alignItems={"center"} gap={2}>
            <AiFillDingtalkCircle size="44px" title="Doc Xpert" />
            <Box>Doc Xpert</Box>
          </Flex>
          <HStack spacing={8} alignItems={"center"}>
            <HStack spacing={8} alignItems={"center"}>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {React.Children.toArray(
                  Links.map((link) => (
                    <Button
                      color="#fff"
                      onClick={link.fn}
                      _hover={{
                        backgroundColor: "#777",
                      }}
                      variant="ghost"
                    >
                      {link.name}
                    </Button>
                  ))
                )}
              </HStack>
            </HStack>
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
                    <Avatar size={"sm"} src={user?.photoURL} />
                  </MenuButton>
                  <MenuList color={"black"}>
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
                onClick={() => {
                  onOpenLoginModal();
                }}
              >
                Login
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>

      <LoginModal
        isOpen={isOpenLoginModal}
        onOpen={onOpenLoginModal}
        onClose={onCloseLoginModal}
        fn={() => router.push("/dashboard")}
      />
    </>
  );
}
