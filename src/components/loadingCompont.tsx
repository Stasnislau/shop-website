import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
const LoadingComponent = () => {
  const styles = {
    loader: {
      width: "96px",
      boxSizing: "content-box",
      height: "48px",
      background: "#FFF",
      borderColor: "#de3500",
      borderStyle: "solid",
      borderWidth: "2px 2px 50px 2px",
      borderRadius: "100%",
      position: "relative",
      animation: "3s yinYang linear infinite",
    },
    inner: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    yinYang: {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "0",
      background: "#FFF",
      border: "18px solid #de3500",
      borderRadius: "100%",
      width: "12px",
      height: "12px",
      boxSizing: "content-box",
    },
    yin: {
      background: "#de3500",
      border: "18px solid #FFF",
    },
    yang: {
      background: "#FFF",
      border: "18px solid #de3500",
    },
  };

  return (
    <Box class={styles.loader}>
      <Box class={styles.inner}>
        <Box style={{ ...styles.yinYang, ...styles.yin }}></Box>
        <Box style={{ ...styles.yinYang, ...styles.yang }}></Box>
      </Box>
    </Box>
  );
};
