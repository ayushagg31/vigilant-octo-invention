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
  AiOutlineMail,
} from "react-icons/ai";
import {
  BsFiletypeDoc,
  BsExclamationCircleFill,
  BsGraphUpArrow,
} from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { BiUserCircle } from "react-icons/bi";
import { GiUpgrade } from "react-icons/gi";
import { MdInsights } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import style from "../../styles/NavBar.module.css";
import { LoginModal } from "../home/LoginModal";
import { useAuth } from "../../store/useAuth";
import { useRouter } from "next/router";
import YourDocs from "../home/YourDocs";
import { useCollections } from "../../store/useCollections";
import { PLUS_TIER } from "../../constants/plan.constants";
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
      />
    );
    let planText = "You're using the free plan. Upgrade for more prompts.";

    switch (currentPlan) {
      case PLUS_TIER:
        plan = <FcApproval fontSize={"16px"} cursor={"pointer"} />;
        planText = "You are subscribed to the Pro plan.";
        break;
    }
    return (
      <Box position="absolute" top="-1" right="-1">
        <Tooltip label={planText} placement="right" shouldWrapChildren>
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
      addError(error.message || "Error in Fetching collections");
    }
  }, [user?.email]);

  if (!mounted) return <></>;

  return (
    <>
      <Flex
        direction={{ base: "row", md: "column" }}
        color="white"
        bg={"#171923"}
        className={style.header}
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
            title="YourPDF.chat"
            onClick={() => router.push("/")}
          />
          {/* Logo end */}
          {/* Chat with pdf start */}
          {activePath.includes("/docinsights") ||
            (activePath.includes("/usage") && (
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
            ))}

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
          zIndex="100"
        >
          <Tooltip
            label={
              currentPlan === PLUS_TIER ? "Activity Insights" : "Upgrade to Pro"
            }
            placement="right"
            shouldWrapChildren
          >
            {currentPlan === PLUS_TIER ? (
              <MdInsights
                style={{ cursor: "pointer" }}
                className={`${style.navbarIcons}`}
                onClick={() => router.push("/usage")}
                title={"Activity Insights"}
                size="1.75rem"
              />
            ) : (
              <GiUpgrade
                style={{ cursor: "pointer", fontWeight: "bold" }}
                className={`${style.navbarIcons}`}
                onClick={() => router.push("/usage")}
                title={"Upgrade to Pro"}
                size="1.75rem"
              />
            )}
          </Tooltip>

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
                        <Avatar
                          name={user?.displayName}
                          size={"sm"}
                          src={user?.photoURL}
                        />
                      </MenuButton>
                      {renderPlan()}
                    </Box>
                    <MenuList color={"#000"} bg="#fff" maxW="300px">
                      <MenuItem bg="#fff" icon={<AiOutlineMail />}>
                        {user?.email}
                      </MenuItem>

                      <MenuDivider />
                      <MenuItem
                        _hover={{
                          backgroundColor: "#EDF2F6",
                        }}
                        bg="#fff"
                        onClick={() => router.push("/dashboard")}
                      >
                        Dashboard
                      </MenuItem>
                      <MenuItem
                        _hover={{
                          backgroundColor: "#EDF2F6",
                        }}
                        bg="#fff"
                        onClick={() => router.push("/usage")}
                      >
                        Pricing & Usage
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        _hover={{
                          backgroundColor: "#EDF2F6",
                        }}
                        bg="#fff"
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
