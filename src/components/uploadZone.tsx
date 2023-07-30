import { Button, Stack, Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import AddedImage from "./addedImage";
import { FiveK } from "@mui/icons-material";
interface fileObject {
  name: string;
  size: number;
  preview: string;
}

const UploadZone = () => {
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
              throw new Error("do not include same photos");
            }
            return null;
          });
          uniqueFiles.push(element);
        });

        setFiles([...files, ...uniqueFiles]);
      } catch (error: any) {
        setErrorMessage(error.message as string);
      }
    },
  });
  const onDelete = (source: string) => {
    setFiles([...files.filter((file) => file.preview !== source)]);
  };

  return (
    <Box display="flex" flexDirection="column" flexGrow="1" height="100%">
      <Box
        {...getRootProps()}
        sx={{
          width: "100%",
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          margin: "0",
          flex: "1",
        }}
      >
        <Typography fontSize="1rem">Drop photos or click to upload</Typography>
        <input hidden accept="image/*" type="file" {...getInputProps()} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "5%",
        }}
      >
        {files.map((file) => (
          <Box key={file.name}>
            <AddedImage source={file.preview} onDelete={onDelete} />
          </Box>
        ))}
      </Box>
      {errorMessage && <Typography color="red">{errorMessage}</Typography>}
    </Box>
  );
};

export default UploadZone;
