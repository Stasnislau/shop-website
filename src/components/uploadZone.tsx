import { Button, Stack, Box, Typography, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import AddedImage from "./addedImage";
import { FiveK, Close } from "@mui/icons-material";

interface fileObject {
  name: string;
  size: number;
  preview: string;
}

const UploadZone = ({ onChange, name }: { onChange: any; name: string }) => {
  const [files, setFiles] = useState<fileObject[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxFiles: 10,
    maxSize: 10000000,
    onDrop: (acceptedFiles) => {
      try {
        const fileObjects = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ) as fileObject[];
        const uniqueFiles = [] as fileObject[];
        fileObjects.forEach((element) => {
          files.forEach((file) => {
            if (file.size === element.size) {
              throw new Error("There should be no duplicates");
            }
            return null;
          });
          uniqueFiles.push(element);
        });

        setFiles([...files, ...uniqueFiles]);
        setErrorMessage(null);
      } catch (error: any) {
        setErrorMessage(error.message as string);
      }
    },
  });
  const onDelete = (source: string) => {
    setFiles([...files.filter((file) => file.preview !== source)]);
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <Box display="flex" flexDirection="column" flexGrow="1" height="100%">
      <Box
        {...getRootProps()}
        sx={{
          width: "100%",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          margin: "0",
          flex: "1",
          minHeight: "150px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        <Typography
          fontSize="1.2rem"
          color="#777"
          sx={{
            fontFamily: "Arial, sans-serif",
          }}
        >
          Drag and drop photos here or click to upload
        </Typography>
        <input
          name={name}
          hidden
          accept="image/*"
          type="file"
          {...getInputProps()}
          onChange={onChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {files.map((file) => (
          <Box
            key={file.name}
            sx={{
              overflow: "hidden",
            }}
          >
            <AddedImage source={file.preview} onDelete={onDelete} />
          </Box>
        ))}
      </Box>
      {errorMessage && (
        <Box
          sx={{
            backgroundColor: "#ffcccc",
            color: "#ff0000",
            padding: "0.5rem",
            borderRadius: "8px",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{errorMessage}</Typography>
          <IconButton
            onClick={clearError}
            color="inherit"
            size="small"
            sx={{ marginLeft: "0.5rem" }}
          >
            <Close />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default UploadZone;
