import { Box, IconButton } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import Image from "next/image";

interface ComponentProps {
  source: string;
  onDelete: () => void;
}

const AddedImage = ({ source, onDelete }: ComponentProps) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Image src={source} alt="item" width={100} height={100} />
      <IconButton
        sx={{
          padding: "0",
          position: "absolute",
          top: "0.5%",
          right: "0.5%",
        }}
        onClick={onDelete}
      >
        <Cancel />
      </IconButton>
    </Box>
  );
};

export default AddedImage;
