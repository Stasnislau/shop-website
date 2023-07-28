import { Button, Stack, Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import AddedImage from "./addedImage";
interface fileObject {
  name: string;
  size: number;
  preview: string;
}
const UploadZone = () => {
  const [files, setFiles] = useState<fileObject[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
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
        <input
          hidden
          accept="image/*"
          type="file"
          {...getInputProps()}
        />
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
    </Box>
  );
};

export default UploadZone;
