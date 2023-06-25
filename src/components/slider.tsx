import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Image from "next/image";

interface SliderProps {
  gallery: string[];
}

const Slider = (props: SliderProps) => {
  const { gallery } = props;
  const [subPhotoIndex, setSubPhotoIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const handleGalleryClick = (index: number) => {
    setCurrentPhotoIndex(index);
  };

  const handleSubPhotoUpClick = () => {
    setSubPhotoIndex(
      subPhotoIndex === 0 ? gallery.length - 1 : subPhotoIndex - 1
    );
  };

  const handleSubPhotoDownClick = () => {
    setSubPhotoIndex(
      subPhotoIndex === gallery.length - 1 ? 0 : subPhotoIndex + 1
    );
  };

  const findSubPhotos = () => {
    const indexes = [] as number[];
    let numberOfDisplayed = 0;
    let tempIndex = subPhotoIndex;
    if (gallery.length <= 4) {
      gallery.forEach((photo, index) => {
        if (index !== currentPhotoIndex) {
          indexes.push(index);
        }
      });
      return indexes;
    }
    while (numberOfDisplayed < 3) {
      if (tempIndex === currentPhotoIndex) {
        tempIndex = tempIndex === gallery.length - 1 ? 0 : tempIndex + 1;
        continue;
      }
      indexes.push(tempIndex);
      tempIndex = tempIndex === gallery.length - 1 ? 0 : tempIndex + 1;
      numberOfDisplayed++;
    }
    return indexes;
  };
  const [subPhotos, setSubPhoto] = useState(findSubPhotos());
  useEffect(() => {
    setSubPhoto(findSubPhotos());
  }, [currentPhotoIndex, subPhotoIndex]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src={gallery[currentPhotoIndex]}
          alt="Product"
          width={500}
          height={500}
        />
        {gallery.length > 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            <IconButton onClick={handleSubPhotoUpClick}>
              <ArrowBackIos />
            </IconButton>
            {subPhotos.map((value, index) => (
              <IconButton
                key={gallery[value]}
                onClick={() => handleGalleryClick(value)}
                sx={{
                  paddingTop: "0",
                  height: "100%",
                  cursor: "pointer",
                  borderRadius: "0",
                  outline:
                    currentPhotoIndex + 1 + value === currentPhotoIndex
                      ? "1px solid green"
                      : "none",
                }}
              >
                <Image
                  src={gallery[value]}
                  alt="Product"
                  width={100}
                  height={100}
                />
              </IconButton>
            ))}
            {gallery.length > 3 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                }}
              >
                <IconButton onClick={handleSubPhotoDownClick}>
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Slider;
