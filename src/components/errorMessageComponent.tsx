import { Snackbar, Box, Alert, IconButton, Typography } from "@mui/material";
import React from "react";
import { Context } from "../pages/_app";
import { observer } from "mobx-react-lite";
import Close from "@mui/icons-material/Close";
import { Message } from "@/types";

const ErrorMessageComponent = observer(({ alert }: { alert: Message }) => {
  const store = React.useContext(Context);
  return (
    <Alert
      sx={{
        width: "100%",
        margin: "auto",
        overflowWrap: "break-word",
      }}
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            store.removeMessage(alert.id);
          }}
        >
          <Close fontSize="inherit" />
        </IconButton>
      }
    >
      <Typography
        variant="body1"
        sx={{
          display: "inline",
          marginRight: "auto",
          width: "80%",
        }}
      >
        {`${alert.message}`}
      </Typography>
    </Alert>
  );
});

export default ErrorMessageComponent;
