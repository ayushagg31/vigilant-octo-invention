"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import { Box, Avatar, Stack } from "@chakra-ui/react";
import { AiOutlineRobot, AiOutlineSend } from "react-icons/ai";
import { chatApi } from "../../services/client.service";

export default function ChatWidget() {
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    query: { id: collectionId },
  } = router;

  const [messages, setMessages] = useState([
    {
      message: "Hi, what would you like to learn about this document?",
      type: "apiMessage",
    },
  ]);

  const messageListRef = useRef(null);
  const textAreaRef = useRef(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  // Focus on text field on load
  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  // Handle errors
  const handleError = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message: "Oops! There seems to be an error. Please try again.",
        type: "apiMessage",
      },
    ]);
    setLoading(false);
    setUserInput("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      return;
    }

    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userInput, type: "userMessage" },
    ]);

    const query = new HumanChatMessage(userInput);

    const response = await chatApi({
      question: userInput,
      history: history.slice(-4),
      collectionId,
    });

    if (!response.statusText === "OK") {
      handleError();
      return;
    }

    // Reset user input
    setUserInput("");
    const data = await response.data;

    if (data.error) {
      handleError();
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { message: data.message, type: "apiMessage" },
    ]);

    setHistory((prevHistory) => [
      ...prevHistory,
      query,
      new AIChatMessage(data.message),
    ]);

    setLoading(false);
  };

  // Prevent blank submissions and allow for multiline input
  const handleEnter = (e) => {
    if (e.key === "Enter" && userInput) {
      if (!e.shiftKey && userInput) {
        handleSubmit(e);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <Box h="100%" w="full">
        <div className={styles.cloud}>
          <div ref={messageListRef} className={styles.messagelist}>
            {messages.map((message, index) => {
              return (
                <div id="chat-conatiner" className={styles.chatBubbleContainer}>
                  <Stack direction="row">
                    {message.type === "apiMessage" ? (
                      <Avatar
                        bg="black"
                        style={{ marginTop: "0.5rem" }}
                        icon={<AiOutlineRobot fontSize="1.5rem" />}
                      />
                    ) : (
                      <Avatar
                        name="Dan Abrahmov"
                        src="https://bit.ly/dan-abramov"
                        style={{ marginTop: "0.5rem" }}
                      />
                    )}

                    <div
                      key={index}
                      className={
                        message.type === "userMessage" &&
                        loading &&
                        index === messages.length - 1
                          ? styles.usermessagewaiting
                          : message.type === "apiMessage"
                          ? styles.apimessage
                          : styles.usermessage
                      }
                    >
                      <div className={styles.markdownanswer}>
                        <ReactMarkdown linkTarget={"_blank"}>
                          {message.message}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </Stack>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className={styles.cloudform}>
            <form onSubmit={handleSubmit}>
              <textarea
                disabled={loading}
                onKeyDown={handleEnter}
                ref={textAreaRef}
                autoFocus={false}
                rows={1}
                maxLength={512}
                type="text"
                id="userInput"
                name="userInput"
                placeholder={
                  loading ? "Waiting for response..." : "Type your question..."
                }
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={styles.textarea}
              />
              <button
                type="submit"
                disabled={loading}
                className={styles.generatebutton}
              >
                {loading ? (
                  <div className={styles.typingLoader}></div>
                ) : (
                  // Send icon SVG in input field
                  <AiOutlineSend fontSize="1.5rem" />
                )}
              </button>
            </form>
          </div>
        </div>
      </Box>
    </>
  );
}
