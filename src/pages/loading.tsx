import LoadingComponent from "@/components/loadingComponent";
import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        
      }}
    >
      <LoadingComponent />
    </Box>
  );
};

export default Loading;
