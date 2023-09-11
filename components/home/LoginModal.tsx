import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Container,
  Grid,
  GridItem,
  Image,
  Box,
  Center,
  Text,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
// import { useModal } from "../../store/useModal";
import { useAuth } from "../../store/useAuth";

export function LoginModal({ isOpen, onOpen, onClose }) {
  const termConditionText = `By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.`;
  const { googleLogin } = useAuth((store) => ({
    googleLogin: store.googleLogin,
  }));

  const handleSignInClick = () => {
    googleLogin(onClose);
  };

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const LoginContent = () => {
    return (
      <>
        <Container>
          <Box>
            <Center h="100px">
              <Button
                size="md"
                height="48px"
                width="200px"
                border="2px"
                variant="outline"
                leftIcon={<FaGoogle />}
                onClick={handleSignInClick}
              >
                Sign in with Google
              </Button>
            </Center>
          </Box>
          <Box>
            <Text fontSize="xs">{termConditionText}</Text>
          </Box>
        </Container>
      </>
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <OverlayTwo />
        <ModalContent>
          <ModalHeader>
            <Center>
              {" "}
              <Text fontSize="lg">Sign in to doc chat</Text>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginContent />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
