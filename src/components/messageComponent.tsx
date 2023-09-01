import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../pages/_app";
import { useContext } from "react";
import { Message } from "@/types";
import { Snackbar, Slide, SlideProps, Box } from "@mui/material";
import SuccessMessageComponent from "./successMessageComponent";
import ErrorMessageComponent from "./errorMessageComponent";
import React from "react";

const MessageComponent = observer(() => {
  const store = useContext(Context);

  const [numberOfMessagesShown, setNumberOfMessagesShown] = useState(0);
  const [messages, setMessages] = useState<Message[]>(store.state.messages);
  useEffect(() => {
    if (store.state.messages.length > 0 && store.state.addedMessage) {
      if (numberOfMessagesShown < 3) {
        setMessages((prevMessages) => [
          ...prevMessages,
          store.state.messages[store.state.messages.length - 1],
        ]);
        setNumberOfMessagesShown((prevNumber) => prevNumber + 1);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages.slice(1),
          store.state.messages[store.state.messages.length - 1],
        ]);
      }
    }
  }, [store.state.messages, store, store.state.addedMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messages.length > 0) {
        setMessages((prevMessages) => prevMessages.slice(1));
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <>
      {messages.map((item, index) => (
        <Snackbar
          key={item.id}
          open={true}
          autoHideDuration={5000}
          onClose={() => {
            store.removeMessage(item.id);
            setNumberOfMessagesShown((prevNumber) => prevNumber - 1);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{
            marginBottom: `${index * 80}px`,
          }}
        >
          {item.type === "success" ? (
            <Box>
              <SuccessMessageComponent alert={item} />
            </Box>
          ) : (
            <Box>
              <ErrorMessageComponent alert={item} />
            </Box>
          )}
        </Snackbar>
      ))}
    </>
  );
});

export default MessageComponent;
