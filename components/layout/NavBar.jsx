"use client";
import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
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
} from "@chakra-ui/react";
import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiFillDingtalkCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { SiReadthedocs } from "react-icons/si";
import { BiUserCircle } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import { BsFillChatLeftQuoteFill, BsFillCloudUploadFill } from "react-icons/bs";
import style from "../../styles/NavBar.module.css";
import { LoginModal } from "../home/LoginModal";
import { useAuth } from "../../store/useAuth";
import { useRouter } from "next/router";
import YourDocs from "../home/YourDocs";

function NavBar() {
  const router = useRouter();
  const activePath = router.pathname;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
  const btnDrawerRef = React.useRef();

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
          />
          {/* Logo end */}

          {user && (
            <Tooltip
              label="Your documents"
              placement="right"
              shouldWrapChildren
            >
              <SiReadthedocs
                ref={btnDrawerRef}
                onClick={onOpenDrawer}
                cursor="pointer"
              />
            </Tooltip>
          )}
          <Tooltip label="Upload your doc" placement="right" shouldWrapChildren>
            <BsFillCloudUploadFill
              className={`${style.navbarIcons} ${
                activePath === "/dashboard" ? style.activeNav : ""
              }`}
              onClick={() => router.push("/dashboard")}
              title="Upload your doc"
            />
          </Tooltip>

          {/* Chat with pdf start */}
          <Tooltip label="Chat with PDF" placement="right" shouldWrapChildren>
            <BsFillChatLeftQuoteFill
              className={`${style.navbarIcons} ${
                activePath === "/docinsights" ? style.activeNav : ""
              }`}
              onClick={() => router.push("/docinsights")}
              title="Chat with PDF"
            />
          </Tooltip>
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

          <Tooltip label="Settings & Plan" placement="right" shouldWrapChildren>
            <AiOutlineSetting
              className={`${style.navbarIcons} activePath === "/settings" ? style.activeNav : ""`}
              onClick={() => router.push("/settings")}
              title="Settings & Plan"
            />
          </Tooltip>
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
                    <BiUserCircle
                      className={`${style.navbarIcons} ${
                        activePath === "/profile" ? style.activeNav : ""
                      }`}
                      onClick={() => router.push("/profile")}
                      title={`${user?.displayName}`}
                    />
                  </Tooltip>

                  <Tooltip label="Logout" placement="right" shouldWrapChildren>
                    <AiOutlineLogout
                      className={`${style.navbarIcons} ${
                        activePath === "/settings" ? style.activeNav : ""
                      }`}
                      onClick={logout}
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
            <YourDocs />
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
