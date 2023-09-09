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
  Tooltip,
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

function NavBar() {
  const { user, logout, loadingUser } = useAuth((store) => ({
    user: store.user,
    logout: store.logout,
    loadingUser: store.loadingUser,
  }));

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex direction="column" fontSize="3xl" bg="black" color="white">
        <Box p="4">
          <Flex direction="column" gap="25px" justify="center" align="center">
            {/* Logo start */}
            <Tooltip
              label="Doc Xpert"
              aria-label="Doc Xpert"
              placement="right-end"
              shouldWrapChildren
              bg="gray.300"
              color="black"
            >
              <AiFillDingtalkCircle className={style.logo} size="44px" />
            </Tooltip>
            {/* Logo end */}

            {/* Chat with pdf start */}
            <Tooltip
              label="Chat with PDF"
              aria-label="Chat with PDF"
              placement="right-end"
              shouldWrapChildren
            >
              <Link href="/dashboard">
                <BsFillChatLeftQuoteFill className={style.navbarIcons} />
              </Link>
            </Tooltip>
            {/* Chat with pdf end */}

            {/* <Tooltip
              label="Upload your doc"
              aria-label="Upload your doc"
              placement="right-end"
              shouldWrapChildren
            >
              <Link href="/dashboard">
                <BsFillCloudUploadFill className={style.navbarIcons} />
              </Link>
            </Tooltip> */}
          </Flex>
        </Box>
        <Spacer />
        <Box p="4">
          <Flex direction="column" gap="20px" justify="center" align="center">
            <Tooltip
              label="Support"
              aria-label="Support"
              placement="right-end"
              shouldWrapChildren
            >
              <Link
                href="mailto:support@docxpert.com"
                className={style.hoverLink}
              >
                <MdContactSupport className={style.navbarIcons} />
              </Link>
            </Tooltip>

            <Tooltip
              label="Settings & Plan"
              aria-label="Settings & Plan"
              placement="right-end"
              shouldWrapChildren
            >
              <AiOutlineSetting className={style.navbarIcons} />
            </Tooltip>
            {loadingUser ? (
              <AiOutlineLoading3Quarters className={style.loading} />
            ) : (
              <>
                {user ? (
                  <>
                    <Tooltip
                      label={`${user?.displayName}`}
                      aria-label="User"
                      placement="right-end"
                      shouldWrapChildren
                    >
                      <BiUserCircle className={style.navbarIcons} />
                    </Tooltip>
                    <Tooltip
                      label="Logout"
                      aria-label="Logout"
                      placement="right-end"
                      shouldWrapChildren
                    >
                      <AiOutlineLogout
                        className={style.navbarIcons}
                        onClick={logout}
                      />
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip
                      label="Login"
                      aria-label="Login"
                      placement="right-end"
                      shouldWrapChildren
                    >
                      <BiUserCircle
                        className={style.navbarIcons}
                        onClick={onOpen}
                      />
                    </Tooltip>
                  </>
                )}
              </>
            )}
          </Flex>
        </Box>
      </Flex>
      <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

export default NavBar;
