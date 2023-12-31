import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Center,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  useColorModeValue,
  Container,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AiOutlineDown as ChevronDownIcon } from "react-icons/ai";

const termConditionText = `By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.`;

export default function FAQComponent({ isOpen, onOpen, onClose, fn = null }) {
  const OverlayTwo = () => (
    <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
  );

  const QuestionAnswers = [
    {
      question: "Is YourPDF.chat free?",
      answer:
        "YourPDF.chat offers a free plan that allows you to work with up to 5 PDFs per month, each containing up to 10 pages. If you require more capacity, you can upgrade to the Pro plan.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Rest assured, YourPDF.chat takes security seriously. Your files are stored on a secure cloud storage platform and can be deleted at your discretion.",
    },
    {
      question: "How can I delete a PDF or videos from YourPDF.chat?",
      answer:
        "Deleting files is straightforward. Just navigate to the document toggle on your dashboard and use the provided delete button to remove the documents or videos you no longer need.",
    },
    {
      question: "How does YourPDF.chat function?",
      answer:
        "YourPDF.chat operates through a two-step process. It initially creates a semantic index over all the paragraphs within a Document. When you pose a question, YourPDF.chat identifies the most relevant paragraphs from the Document and utilizes the OpenAI API to generate a response.",
    },
    {
      question: "Can YourPDF.chat interpret images and tables in PDFs?",
      answer:
        "No, YourPDF.chat is designed to work exclusively with text and cannot interpret images or tables within PDF documents.",
    },
    {
      question: "Is YourPDF.chat powered by GPT-4?",
      answer:
        "Currently, YourPDF.chat utilizes GPT 3.5, which is equivalent to ChatGPT. However, we plan to upgrade to GPT-4 in the near future.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "You have the flexibility to cancel your Pro subscription at any time. If you do cancel, you will retain access to your pro plan until the end of the current billing period.",
    },
    {
      question: "Where can I submit feature requests or report bugs?",
      answer:
        "Feel free to share your feature requests or report any bugs by emailing us at sellifyappshq@gmail.com. We value your feedback and will address your inquiries promptly.",
    },
  ];

  const FAQcontentModal = () => {
    return (
      <>
        <Flex
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Container>
            <Accordion allowMultiple width="100%" maxW="lg" rounded="lg">
              {QuestionAnswers.map((el) => (
                <>
                  <AccordionItem>
                    <AccordionButton
                      display="flex"
                      justifyContent="space-between"
                      p={4}
                    >
                      <Text textAlign={"left"} fontSize="md">
                        {el.question}
                      </Text>
                      <ChevronDownIcon fontSize="24px" />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Text>{el.answer}</Text>
                    </AccordionPanel>
                  </AccordionItem>
                </>
              ))}
            </Accordion>
          </Container>
        </Flex>
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
              <Text fontSize="lg">Frequently asked questions</Text>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FAQcontentModal />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
