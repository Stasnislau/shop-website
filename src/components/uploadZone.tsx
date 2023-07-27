import { Button, Stack, Box } from "@mui/material";
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
    <Stack direction="row" alignItems="center" spacing={2}>
      <div {...getRootProps()}>
        <Box component="label" width="100%">
          Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            width="100%"
            {...getInputProps()}
          />
        </Box>
      </div>
      <Box>
        {files.map((file) => (
          <Box key={file.name}>
            <AddedImage source={file.preview} onDelete={onDelete} />
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default UploadZone;
