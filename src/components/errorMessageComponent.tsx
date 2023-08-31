import { Snackbar, Box, Alert, IconButton, Typography } from "@mui/material";
import React from "react";
import { Context } from "../pages/_app";
import { observer } from "mobx-react-lite";
import Close from "@mui/icons-material/Close";

const ErrorMessageComponent = observer(({ message }: {
  message: string;
}) => {
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
            // store.hideError();
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
        {`${message}`}
      </Typography>
    </Alert>
  );
});

export default ErrorMessageComponent;
