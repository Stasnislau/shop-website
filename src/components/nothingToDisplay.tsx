import React from "react";
import { Box, Typography, SvgIcon } from "@mui/material";

import EmptyShelfI from "public/emptyShelf.svg";
import Image from "next/image";

const NothingToDisplay: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h5" align="center" mt={3}>
        Oops! Looks like there is nothing to display here.
      </Typography>
      <Typography variant="body1" align="center">
        Check back later or explore other categories.
      </Typography>
      <Image src={EmptyShelfI} alt="Empty shelf" />
    </Box>
  );
};

export default NothingToDisplay;
