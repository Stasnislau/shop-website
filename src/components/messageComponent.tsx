import { useState, useEffect, use } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../pages/_app";
import { useContext } from "react";
import { Message } from "@/types";
import { Snackbar, Slide, SlideProps, Box } from "@mui/material";
import SuccessMessageComponent from "./successMessageComponent";
import ErrorMessageComponent from "./errorMessageComponent";
import React from "react";
import { forEach } from "lodash";

const MessageComponent = observer(() => {
  const store = useContext(Context);
  const upTransition = React.forwardRef(function Transition(
    props: SlideProps,
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  // there should be up to 3 messages shown at a time, so we need to keep track of how many are shown
  // TODO: finish this algorithm to show up to 3 messages at a time and remove the oldest one when a new one is added

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (
      store.state.addedMessage &&
      store.state.messages.length > 0 &&
      messages.length < 3
    ) {
      store.state.messages.forEach((item) => {
        if (!messages.find((message) => message.id === item.id)) {
          setMessages((prevMessages) => [...prevMessages, item]);
        }
      });
    }
  }, [store.state.addedMessage, store.state.messages.length, messages.length]);

  useEffect(() => {
    messages.forEach((item) => {
      if (!store.state.messages.find((message) => message.id === item.id)) {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== item.id)
        );
      }
      console.log("messages", messages);
    });
  }, [store.state.messages.length, messages.length]);
  useEffect(() => {
    if (messages.length > 3) {
      setMessages((prevMessages) => prevMessages.slice(1));
    }
  }, [messages.length]);
  return (
    <>
      {messages.map((item, index) => (
        <Snackbar
          key={item.id}
          open={true}
          autoHideDuration={5000}
          TransitionComponent={upTransition}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          sx={{
            marginBottom: `${index * 70}px`,
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
