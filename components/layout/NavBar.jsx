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
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();
  const activePath = router.pathname;
  console.log(activePath);
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
              <AiFillDingtalkCircle size="44px" className={style.logo} />
            </Tooltip>
            {/* Logo end */}

            <div className={activePath === "/dashboard" ? style.activeNav : ""}>
              <Tooltip
                label="Upload your doc"
                aria-label="Upload your doc"
                placement="right-end"
                shouldWrapChildren
              >
                <BsFillCloudUploadFill
                  className={style.navbarIcons}
                  onClick={() => router.push("/dashboard")}
                />
              </Tooltip>
            </div>

            {/* Chat with pdf start */}
            <div
              className={activePath === "/docinsights" ? style.activeNav : ""}
            >
              <Tooltip
                label="Chat with PDF"
                aria-label="Chat with PDF"
                placement="right-end"
                shouldWrapChildren
              >
                <BsFillChatLeftQuoteFill
                  className={style.navbarIcons}
                  onClick={() => router.push("/docinsights")}
                />
              </Tooltip>
            </div>
            {/* Chat with pdf end */}
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

            <div className={activePath === "/settings" ? style.activeNav : ""}>
              <Tooltip
                label="Settings & Plan"
                aria-label="Settings & Plan"
                placement="right-end"
                shouldWrapChildren
              >
                <AiOutlineSetting
                  className={style.navbarIcons}
                  onClick={() => router.push("/settings")}
                />
              </Tooltip>
            </div>
            {loadingUser ? (
              <AiOutlineLoading3Quarters className={style.loading} />
            ) : (
              <>
                {user ? (
                  <>
                    <div
                      className={
                        activePath === "/profile" ? style.activeNav : ""
                      }
                    >
                      <Tooltip
                        label={`${user?.displayName}`}
                        aria-label="User"
                        placement="right-end"
                        shouldWrapChildren
                      >
                        <BiUserCircle
                          className={style.navbarIcons}
                          onClick={() => router.push("/profile")}
                        />
                      </Tooltip>
                    </div>

                    <div
                      className={
                        activePath === "/settings" ? style.activeNav : ""
                      }
                    >
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
                    </div>
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
