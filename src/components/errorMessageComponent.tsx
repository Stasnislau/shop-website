import { Snackbar, Box, Alert } from "@mui/material";
import React from "react";
import { Context } from "../pages/_app";
import { observer } from "mobx-react-lite";

const ErrorMessageComponent = observer(() => {
  const store = React.useContext(Context);
  return (
    <Snackbar
      open={store.state.isErrorDisplayed}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => {
        store.hideError();
      }}
    >
      <Alert
        sx={{
          width: "30%",
          margin: "auto",
          overflowWrap: "break-word",
        }}
        severity="error"
      >
        Error: {store.state.errorMessage}
      </Alert>
    </Snackbar>
  );
});

export default ErrorMessageComponent;
