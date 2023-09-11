"use client";
import React from "react";
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
} from "@chakra-ui/react";
import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiFillDingtalkCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import {
  BsFillChatLeftQuoteFill,
  BsCode,
  BsFillCloudUploadFill,
} from "react-icons/bs";
import style from "../../styles/NavBar.module.css";
import { LoginModal } from "../home/LoginModal";
import { useAuth } from "../../store/useAuth";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();
  const activePath = router.pathname;

  const { user, logout, loadingUser } = useAuth((store) => ({
    user: store.user,
    logout: store.logout,
    loadingUser: store.loadingUser,
  }));

  const { isOpen, onOpen, onClose } = useDisclosure();
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

          <BsFillCloudUploadFill
            className={`${style.navbarIcons} ${
              activePath === "/dashboard" ? style.activeNav : ""
            }`}
            onClick={() => router.push("/dashboard")}
            title="Upload your doc"
          />

          {/* Chat with pdf start */}
          <BsFillChatLeftQuoteFill
            className={`${style.navbarIcons} ${
              activePath === "/docinsights" ? style.activeNav : ""
            }`}
            onClick={() => router.push("/docinsights")}
            title="Chat with PDF"
          />
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
          <Link href="mailto:support@docxpert.com" className={style.hoverLink}>
            <MdContactSupport className={style.navbarIcons} title="Support" />
          </Link>

          <AiOutlineSetting
            className={`${style.navbarIcons} activePath === "/settings" ? style.activeNav : ""`}
            onClick={() => router.push("/settings")}
            title="Settings & Plan"
          />
          {loadingUser ? (
            <AiOutlineLoading3Quarters className={style.loading} />
          ) : (
            <>
              {user ? (
                <>
                  <BiUserCircle
                    className={`${style.navbarIcons} ${
                      activePath === "/profile" ? style.activeNav : ""
                    }`}
                    onClick={() => router.push("/profile")}
                    title={`${user?.displayName}`}
                  />

                  <AiOutlineLogout
                    className={`${style.navbarIcons} ${
                      activePath === "/settings" ? style.activeNav : ""
                    }`}
                    onClick={logout}
                    title="Logout"
                  />
                </>
              ) : (
                <>
                  <BiUserCircle
                    className={style.navbarIcons}
                    onClick={onOpen}
                    title="Login"
                  />
                </>
              )}
            </>
          )}
        </Flex>
      </Flex>
      <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

export default NavBar;
