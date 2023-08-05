import { Snackbar, Box, Alert, IconButton, Typography } from "@mui/material";
import React from "react";
import { Context } from "../pages/_app";
import { observer } from "mobx-react-lite";
import Close from "@mui/icons-material/Close";

const ErrorMessageComponent = observer(() => {
  const store = React.useContext(Context);
  return (
    <Snackbar
      open={store.state.isErrorDisplayed}
      autoHideDuration={60000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={() => {
        store.hideError();
      }}
      sx={{
        maxWidth: "60%",
        maxHeight: "10%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        transform: "translate(-50%, 0)",
        zIndex: 2,
      }}
    >
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
              store.hideError();
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <Typography variant="body1" sx={
          {
            display: "inline",
            marginRight: "auto",
            width: "80%",
          }

        }>
          {`Error: ${store.state.errorMessage}`}
        </Typography>
        
      </Alert>
    </Snackbar>
  );
});

export default ErrorMessageComponent;
