import { Button, Stack, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import React, { useState } from "react";
import Image from "next/image";
import { number } from "yup";
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

  const images = files.map((file) => (
    <div key={file.name}>
      <Image src={file.preview} alt="preview" />
    </div>
  ));
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept="image/*"
          multiple
          type="file"
          {...getInputProps}
        />
      </Button>
      <Box>{images}</Box>
    </Stack>
  );
};

export default UploadZone;
