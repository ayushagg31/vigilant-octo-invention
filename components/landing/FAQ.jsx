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
    ModalCloseButton
} from "@chakra-ui/react";
import {
    AiOutlineDown as ChevronDownIcon,
} from "react-icons/ai";

const termConditionText = `By creating an account you agree with our Terms of Service, Privacy Policy, and our default Notification Settings.`;

export default function FAQComponent({ isOpen, onOpen, onClose, fn = null }) {

    const OverlayTwo = () => (
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="2px" />
    );

    const QuestionAnswers = [
        {
            question: "Is Yourpdf.chat Free?",
            answer: "Yourpdf.chat offers a free plan that allows you to work with up to 5 PDFs per month, each containing up to 10 pages. If you require more capacity, you can upgrade to the Pro plan."
        },
        {
            question: "Is My Data Secure?",
            answer: "Rest assured, Yourpdf.chat takes security seriously. Your files are stored on a secure cloud storage platform and can be deleted at your discretion."
        },
        {
            question: "How Can I Delete a PDF or Videos from Yourpdf.chat?",
            answer: "Deleting files is straightforward. Just navigate to the document toggle on your dashboard and use the provided delete button to remove the documents or videos you no longer need."
        },
        {
            question: "How Does Yourpdf.chat Function?",
            answer: "Yourpdf.chat operates through a two-step process. It initially creates a semantic index over all the paragraphs within a PDF. When you pose a question, Yourpdf.chat identifies the most relevant paragraphs from the PDF and utilizes the ChatGPT API from OpenAI to generate a response."
        },
        {
            question: "Can Yourpdf.chat Interpret Images and Tables in PDFs?",
            answer: "No, Yourpdf.chat is designed to work exclusively with text and cannot interpret images or tables within PDF documents."
        },
        {
            question: "Is Yourpdf.chat Powered by GPT-4?",
            answer: "Currently, Yourpdf.chat utilizes GPT 3.5, which is equivalent to ChatGPT. However, we plan to upgrade to GPT-4 in the near future."
        },
        {
            question: "What Is the Cancellation Policy?",
            answer: "You have the flexibility to cancel your Pro subscription at any time. If you do cancel, you will retain access to your Plus plan until the end of the current 30-day billing period."
        },
        {
            question: "Where Can I Submit Feature Requests or Report Bugs?",
            answer: "Feel free to share your feature requests or report any bugs by emailing us at sellifyappshq@gmail.com. We value your feedback and will address your inquiries promptly."
        }
    ];






    const FAQcontentModal = () => {
        return (
            <>
                <Flex
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Container>
                        <Accordion allowMultiple width="100%" maxW="lg" rounded="lg">
                            {
                                QuestionAnswers.map((el) => (
                                    <>
                                        <AccordionItem>

                                            <AccordionButton
                                                display="flex"
                                                justifyContent="space-between"
                                                p={4}>
                                                <Text fontSize="md">{el.question}</Text>
                                                <ChevronDownIcon fontSize="24px" />
                                            </AccordionButton>
                                            <AccordionPanel pb={4}>
                                                <Text>
                                                    {el.answer}
                                                </Text>
                                            </AccordionPanel>
                                        </AccordionItem>
                                    </>
                                ))
                            }
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
