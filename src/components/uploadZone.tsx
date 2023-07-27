import { Button, Stack, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
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
            {...getInputProps()}
          />
        </Box>
      </div>
      <Box>
        {files.map((file) => (
          <Box key={file.name}>
            <Image src={file.preview} alt="preview" width="100" height="100" />
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default UploadZone;
