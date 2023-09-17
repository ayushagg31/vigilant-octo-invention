"use client";
import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
import {
  Link,
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
  Tag,
  Box,
} from "@chakra-ui/react";
import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiFillDingtalkCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsFiletypeDoc } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
import { BiUserCircle } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import style from "../../styles/NavBar.module.css";
import { LoginModal } from "../home/LoginModal";
import { useAuth } from "../../store/useAuth";
import { useRouter } from "next/router";
import YourDocs from "../home/YourDocs";
import { useCollections } from "../../store/useCollections";
import { FREE_TIER, PLUS_TIER } from "../../config/plan.config";

function NavBar() {
  const router = useRouter();
  const activePath = router.pathname;

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
    let plan;
    switch (currentPlan) {
      case FREE_TIER:
        plan = <FcApproval />;
        break;

      case PLUS_TIER:
        plan = FcApproval;
        break;
      default:
        plan = "Free tier";
    }
    return <div>{plan}</div>;
  };

  const btnDrawerRef = React.useRef();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    try {
      fetchCollections();
    } catch (error) {}
  }, [user?.email]);

  if (!mounted) return <></>;

  return (
    <>
      <Flex
        direction={{ base: "row", md: "column" }}
        fontSize="3xl"
        bg="black"
        color="white"
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
                className={` ${
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

          {/* Chat with pdf end */}
        </Flex>

        <Spacer />

        <Flex
          direction={{ base: "row", md: "column" }}
          gap="20px"
          justify="center"
          align="center"
          p="4"
        >
          <Tooltip label="Support" placement="right" shouldWrapChildren>
            <Link
              href="mailto:support@docxpert.com"
              className={style.hoverLink}
            >
              <MdContactSupport className={style.navbarIcons} title="Support" />
            </Link>
          </Tooltip>

          <Box position={"relative"}>
            {renderPlan()}
            <Tooltip
              label="Settings & Plan"
              placement="right"
              shouldWrapChildren
            >
              <AiOutlineSetting
                className={`${style.navbarIcons} activePath === "/settings" ? style.activeNav : ""`}
                onClick={() => router.push("/settings")}
                title="Settings & Plan"
              />
            </Tooltip>
          </Box>
          {loadingUser ? (
            <AiOutlineLoading3Quarters className={style.loading} />
          ) : (
            <>
              {user ? (
                <>
                  <Tooltip
                    label={user?.displayName}
                    placement="right"
                    shouldWrapChildren
                  >
                    <Flex>
                      <Avatar
                        size={"sm"}
                        src={user?.photoURL}
                        className={`${style.navbarIcons} ${
                          activePath === "/profile" ? style.activeNav : ""
                        }`}
                        onClick={() => router.push("/profile")}
                      />
                    </Flex>
                  </Tooltip>

                  <Tooltip label="Logout" placement="right" shouldWrapChildren>
                    <AiOutlineLogout
                      className={`${style.navbarIcons} ${
                        activePath === "/settings" ? style.activeNav : ""
                      }`}
                      onClick={async () => {
                        router.push("/");
                        await logout(router);
                      }}
                      title="Logout"
                    />
                  </Tooltip>
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
