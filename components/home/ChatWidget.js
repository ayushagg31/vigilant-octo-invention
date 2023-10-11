"use client";
import { useState, Children, useRef, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import {
  Box,
  Avatar,
  Stack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  DrawerFooter,
  DrawerCloseButton,
  useDisclosure,
  Tooltip
} from "@chakra-ui/react";
import {
  AiFillDingtalkCircle,
  AiOutlineSend,
  AiFillCopy,
  AiFillThunderbolt,
} from "react-icons/ai";
import { chatApi } from "../../services/client.service";
import { useAuth } from "../../store/useAuth";

import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "../../config/googleAuth.config";
import { FLAST_QUERY, USER_CHAT } from "../../constants/analytics.constants";
import useLocalStorageState from "use-local-storage-state";
import { useFlashQuery } from "../../store/useFlashQuery";

let analytics;

const initalMessage = [
  {
    message:
      "It's great to see you here! What questions do you have about this document?",
    type: "apiMessage",
  },
];
export default function ChatWidget({ id }) {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    query: { id: collectionId, name, yt },
  } = router;
  let youtubeUrl =
    yt !== undefined && !Array.isArray(yt) ? window.atob(yt) : null;
  const existingMessages = JSON.parse(localStorage.getItem(id || collectionId));

  const [history, setHistory] = useState(existingMessages?.slice(-4) || []);
  const [messages, setMessages] = useLocalStorageState(id || collectionId, {
    defaultValue: existingMessages || [...initalMessage],
  });

  const { user } = useAuth((store) => ({
    user: store.user,
  }));

  const { queries, fetchQuery } = useFlashQuery();
  let pageType = 'pdf';
  if (youtubeUrl) {
    pageType = 'video';
  }
  const filteredQueries = queries.filter(query => query.type === pageType);

  const messageListRef = useRef(null);
  const textAreaRef = useRef(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    messageList.scrollTop = messageList.scrollHeight;
  }, [messages]);

  // Focus on text field on load
  useEffect(() => {
    analytics = getAnalytics(app);
    textAreaRef.current.focus();
  }, []);

  // Handle errors
  const handleError = (error) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message:
          error?.message ||
          "Oops! There seems to be an error. Please try again.",
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
    logEvent(analytics, USER_CHAT, { user: user?.email });
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: userInput, type: "userMessage" },
    ]);

    const query = userInput;

    try {
      const response = await chatApi({
        question: userInput,
        history: history.slice(-4),
        collectionId,
      });
      setUserInput("");
      const data = await response.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: data.message, type: "apiMessage" },
      ]);
      setLoading(false);
      setUserInput("");
      setHistory((prevHistory) => [...prevHistory, query, data.message]);
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
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


  const fetchFlashQuery = async (query) => {
    setLoading(true);
    logEvent(analytics, FLAST_QUERY, { query: query.question });
    onClose();
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: query.question, type: "userMessage" },
    ]);
    try {
      const data = await fetchQuery(query.id, collectionId);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: data.message, type: "apiMessage" },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message:
            error?.message ||
            "Oops! There seems to be an error. Please try again.",
          type: "apiMessage",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className={styles.cloud}>
        <div ref={messageListRef} className={styles.messagelist}>
          {Children.toArray(
            messages.map((message, index) => {
              return (
                <div id="chat-conatiner" className={styles.chatBubbleContainer}>
                  <Stack direction="row">
                    {message.type === "apiMessage" ? (
                      <Avatar
                        bg="black"
                        style={{ marginTop: "0.5rem" }}
                        icon={<AiFillDingtalkCircle fontSize="3rem" />}
                      />
                    ) : (
                      <Avatar
                        name={user?.displayName}
                        src={user?.photoURL}
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
                        {message.type === "apiMessage" && (
                          <div style={{ float: "right" }}>
                            <IconButton
                              variant={"ghost"}
                              aria-label="copy-btn"
                              onClick={() =>
                                navigator.clipboard.writeText(message.message)
                              }
                              icon={<AiFillCopy />}
                            />
                          </div>
                        )}
                        <ReactMarkdown linkTarget={"_blank"}>
                          {message.message}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </Stack>
                </div>
              );
            })
          )}
        </div>
      </Box>
      <div>
        <div className={styles.cloudform}>
          <form onSubmit={handleSubmit}>
            {/*  style={{ display: 'flex', alignItems: "center", gap: '5px'}} */}
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
              className={`${styles.textarea} ${filteredQueries.length > 0 ? styles.hasLeftIcon : null}`}
            />
            <Button
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
            </Button>
            {
              filteredQueries.length > 0 && (
                <Tooltip label='Use flash queries' >
                  <Box
                    onClick={() => {
                      if (!loading) {
                        onOpen()
                      }
                    }}
                    p="2"
                    className={styles.flashQuery}
                  >
                    <AiFillThunderbolt />
                  </Box>
                </Tooltip>

              )}
          </form>
        </div>
      </div>
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Quick query</DrawerHeader>
          <DrawerBody>

            {
              filteredQueries.map((query) => {
                return (
                  <Button onClick={() => fetchFlashQuery(query)} size="xs" mr="2" mb="3">
                    <Box>{query.question}</Box>
                  </Button>
                )
              })
            }
          </DrawerBody>
          <DrawerFooter shadow={"inner"}>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
