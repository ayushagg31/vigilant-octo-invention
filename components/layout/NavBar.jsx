"use client";
import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
import {
  Flex,
  Button,
  Spacer,
  useDisclosure,
  Tooltip,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
} from "@chakra-ui/react";
import {
  AiFillDingtalkCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsFiletypeDoc, BsExclamationCircleFill } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { BiUserCircle } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import style from "../../styles/NavBar.module.css";
import { LoginModal } from "../home/LoginModal";
import { useAuth } from "../../store/useAuth";
import { useRouter } from "next/router";
import YourDocs from "../home/YourDocs";
import { useCollections } from "../../store/useCollections";
import { FREE_TIER, PLUS_TIER } from "../../config/plan.config";
import { useAPIError } from "../../hooks/useApiHook";

function NavBar() {
  const router = useRouter();
  const activePath = router.pathname;
  const { addError } = useAPIError();

  const [mounted, setMounted] = useState(false);

  const { user, logout, loadingUser } = useAuth((store) => ({
    user: store.user,
    logout: store.logout,
    loadingUser: store.loadingUser,
  }));

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const { fetchCollections, currentPlan } = useCollections((store) => {
    return {
      fetchCollections: store.fetchCollections,
      currentPlan: store.currentPlan,
    };
  });

  const renderPlan = () => {
    let plan = (
      <BsExclamationCircleFill
        fontSize={"16px"}
        color={"#f9c7a4"}
        cursor={"pointer"}
        onClick={() => router.push("/settings")}
      />
    );
    let planText = "You are on free plan. Click here to upgrade";

    switch (currentPlan) {
      case PLUS_TIER:
        plan = <FcApproval fontSize={"16px"} cursor={"pointer"} />;
        planText = "You are on plus plan";
        break;
    }
    return (
      <Box position="absolute" top="-1" right="-1">
        <Tooltip
          label={planText}
          placement="right"
          shouldWrapChildren
          openDelay={500}
        >
          {plan}
        </Tooltip>
      </Box>
    );
  };

  const btnDrawerRef = React.useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      if (user) {
        fetchCollections();
      }
    } catch (error) {
      addError("Error in Fetching Collection");
    }
  }, [user?.email]);

  if (!mounted) return <></>;

  return (
    <>
      <Flex
        direction={{ base: "row", md: "column" }}
        color="white"
        bg={"rgba(0,0,0, 0.2)"}
      >
        <Flex
          direction={{ base: "row", md: "column" }}
          gap="25px"
          justify="center"
          align="center"
          p={{ base: "2", md: "4" }}
        >
          {/* Logo start */}
          <AiFillDingtalkCircle
            size="44px"
            className={style.logo}
            title="Doc Xpert"
            onClick={() => router.push("/")}
          />
          {/* Logo end */}
          {/* Chat with pdf start */}
          {activePath === "/docinsights" && (
            <Tooltip
              label="Go to dashboard"
              placement="right"
              shouldWrapChildren
            >
              <IoMdArrowRoundBack
                style={{ cursor: "pointer" }}
                className={`${style.navbarIcons} ${
                  activePath === "/dashboard" ? style.activeNav : ""
                }`}
                onClick={() => router.push("/dashboard")}
                title="Upload your doc"
              />
            </Tooltip>
          )}

          {user && (
            <Tooltip
              label="Your documents"
              placement="right"
              shouldWrapChildren
            >
              <BsFiletypeDoc
                className={style.navbarIcons}
                ref={btnDrawerRef}
                onClick={onOpenDrawer}
                cursor="pointer"
              />
            </Tooltip>
          )}
        </Flex>

        <Spacer />

        <Flex
          direction={{ base: "row", md: "column" }}
          gap="20px"
          justify="center"
          align="center"
          p="4"
        >
          {loadingUser ? (
            <AiOutlineLoading3Quarters className={style.loading} />
          ) : (
            <>
              {user ? (
                <>
                  <Menu placement="right-end">
                    <Box position="relative">
                      <MenuButton
                        as={Button}
                        rounded={"full"}
                        variant={"link"}
                        cursor={"pointer"}
                        minW={0}
                      >
                        <Avatar size={"sm"} src={user?.photoURL} />
                      </MenuButton>
                      {renderPlan()}
                    </Box>
                    <MenuList color={"black"}>
                      <MenuItem onClick={() => router.push("/dashboard")}>
                        Dashboard
                      </MenuItem>
                      <MenuItem onClick={() => router.push("/settings")}>
                        Settings & Plan
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        onClick={async () => {
                          router.push("/");
                          await logout(router);
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <Tooltip label="Login" placement="right" shouldWrapChildren>
                    <BiUserCircle
                      className={style.navbarIcons}
                      onClick={onOpen}
                      title="Login"
                    />
                  </Tooltip>
                </>
              )}
            </>
          )}
        </Flex>
      </Flex>
      <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <Drawer
        isOpen={isOpenDrawer}
        placement="left"
        onClose={onCloseDrawer}
        finalFocusRef={btnDrawerRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom={"1px"} borderColor="blackAlpha.100">
            Your Documents
          </DrawerHeader>

          <DrawerBody p={3}>
            <YourDocs closeDrawer={onCloseDrawer} />
          </DrawerBody>

          <DrawerFooter shadow={"inner"}>
            <Button variant="outline" mr={3} onClick={onCloseDrawer}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NavBar;
