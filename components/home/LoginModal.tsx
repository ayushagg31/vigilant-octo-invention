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
import { useAuth } from "../../store/useAuth";
import { useAPIError } from "../../hooks/useApiHook";

const termConditionText = `By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.`;

export function LoginModal({ isOpen, onOpen, onClose, fn = null }) {
  const { googleLogin, loadingUser } = useAuth((store) => ({
    googleLogin: store.googleLogin,
    loadingUser: store.loadingUser
  }));
  const { addError } = useAPIError();
  const handleSignInClick = () => {
    try {
      googleLogin(onClose, fn);
    } catch (error) {
      addError('Error in successfully loggin in')
    }

  };

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
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
                isLoading={loadingUser}
                loadingText="Loading user..."
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
        <ModalContent bg="#171923">
          <ModalHeader>
            <Center>
              <Text fontSize="lg">Sign in to YourPDF.chat</Text>
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
