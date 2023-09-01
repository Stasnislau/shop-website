import { useState, useEffect, use } from "react";
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
  const upTransition = React.forwardRef(function Transition(
    props: SlideProps,
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [numberOfMessagesShown, setNumberOfMessagesShown] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(store.state.messages);
  }, [store.state.messages]);

  useEffect(() => {
    setNumberOfMessagesShown(messages.length);
  }, [messages]);

  useEffect(() => {
    if (numberOfMessagesShown > 3) {
      setMessages((prevMessages) => prevMessages.slice(1));
    }
  }, [numberOfMessagesShown]);

  useEffect(() => {
    if (messages.length > 3) {
      setMessages((prevMessages) => prevMessages.slice(1));
    }
  }, [messages]);
  return (
    <>
      {messages.map((item, index) => (
        <Snackbar
          key={item.id}
          open={true}
          autoHideDuration={5000}
          TransitionComponent={upTransition}
          onClose={() => {
            store.removeMessage(item.id);
            setNumberOfMessagesShown((prevNumber) => prevNumber - 1);
          }}
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
