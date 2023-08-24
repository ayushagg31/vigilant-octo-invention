'use client'
import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Spinner } from '@chakra-ui/react'
import { useRouter } from "next/router";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";
import axios from "axios";

export default function ChatWidget() {
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    query: { collectionId },
  } = useRouter();
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

    // Send user question and history to API
    const header = {
      "Content-Type": "application/json",
    };
    const response = await axios.post("/api/chat", {
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
      <main className={styles.main}>
        <div className={styles.cloud}>
          <div ref={messageListRef} className={styles.messagelist}>
            {messages.map((message, index) => {
              return (
                // The latest message sent by the user will be animated while waiting for a response
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
                  {/* Display the correct icon depending on the message type */}
                  {message.type === "apiMessage" ? (
                    <Image
                      src="/parroticon.png"
                      alt="AI"
                      width="30"
                      height="30"
                      className={styles.boticon}
                      priority={true}
                    />
                  ) : (
                    <Image
                      src="/usericon.png"
                      alt="Me"
                      width="30"
                      height="30"
                      className={styles.usericon}
                      priority={true}
                    />
                  )}
                  <div className={styles.markdownanswer}>
                    {/* Messages are being rendered in Markdown format */}
                    <ReactMarkdown linkTarget={"_blank"}>
                      {message.message}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.center}>
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
                  <div className={styles.loadingwheel}>
                    <Spinner
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='blue.500'
                      size='xl'
                    />
                  </div>
                ) : (
                  // Send icon SVG in input field
                  <svg
                    viewBox="0 0 20 20"
                    className={styles.svgicon}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                )}
              </button>
            </form>
          </div>
          <div className={styles.footer}>Powered by Bois 💖</div>
        </div>
      </main>
    </>
  );
}
