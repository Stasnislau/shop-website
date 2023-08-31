import { useState, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../pages/_app";
import { useContext } from "react";
import { Message } from "@/types";
import { Slide, Snackbar } from "@mui/material";
import SuccessMessageComponent from "./successMessageComponent";
import ErrorMessageComponent from "./errorMessageComponent";
import { SlideProps } from "@mui/material/Slide";

const MessageComponent = observer(() => {
  const store = useContext(Context);
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current === null) return;
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setWidth(rect.width);
    }
  }, [ref]);
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
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          style={{ marginTop: index * 70 }}
        >
          {item.type === "success" ? (
            <SuccessMessageComponent message={item.message} />
          ) : (
            <ErrorMessageComponent message={item.message} />
          )}
        </Snackbar>
      ))}
    </>
  );
});

export default MessageComponent;
