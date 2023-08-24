/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import { Box, IconButton, Skeleton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { Context } from "@/pages/_app";

interface SliderProps {
  gallery: string[];
}

const Slider = observer((props: SliderProps) => {
  const store = useContext(Context);
  const { gallery } = props;
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
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
    if (galleryPhotos.length <= 4) {
      galleryPhotos.forEach((photo, index) => {
        if (index !== currentPhotoIndex) {
          indexes.push(index);
        }
      });
      return indexes;
    }
    while (numberOfDisplayed < 3) {
      if (tempIndex === currentPhotoIndex) {
        tempIndex = tempIndex === galleryPhotos.length - 1 ? 0 : tempIndex + 1;
        continue;
      }
      indexes.push(tempIndex);
      tempIndex = tempIndex === galleryPhotos.length - 1 ? 0 : tempIndex + 1;
      numberOfDisplayed++;
    }
    return indexes;
  };
  const [subPhotos, setSubPhoto] = useState(findSubPhotos());
  useEffect(() => {
    setSubPhoto(findSubPhotos());
  }, [currentPhotoIndex, subPhotoIndex, galleryPhotos]);

  useEffect(() => {
    if (!gallery) return;
    setGalleryPhotos(gallery);
  }, [gallery]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {!store.state.isLoading ? (
          <img
            src={galleryPhotos[currentPhotoIndex]}
            alt="Product"
            width="65%"
            height="450rem"
          />
        ) : (
          <Skeleton variant="rectangular" width="60%" height="54%" />
        )}
        {galleryPhotos.length > 1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "1rem",
              width: "65%",
            }}
          >
            {galleryPhotos.length > 4 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "10%",
                  margin: "0",
                }}
              >
                <IconButton
                  onClick={handleSubPhotoDownClick}
                  sx={{
                    padding: "0",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <ArrowBackIos />
                </IconButton>
              </Box>
            )}
            <Box sx={{ display: "flex", flexDirection: "row", width: "80%", justifyContent: "space-between" }}>
              {subPhotos.map((value, index) => (
                <IconButton
                  key={galleryPhotos[value]}
                  onClick={() => handleGalleryClick(value)}
                  sx={{
                    paddingTop: "0",
                    cursor: "pointer",
                    borderRadius: "0",
                    width: "33.3%",
                    height: "10rem",
                    outline:
                      currentPhotoIndex + 1 + value === currentPhotoIndex
                        ? "1px solid green"
                        : "none",
                  }}
                >
                  <img
                    src={galleryPhotos[value]}
                    alt="Product"
                    width="100%"
                    height="100%"
                    style={{ objectFit: "cover" }}
                  />
                </IconButton>
              ))}
            </Box>
            {galleryPhotos.length > 4 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "10%",
                  alignItems: "center",
                  margin: "0",
                }}
              >
                <IconButton
                  onClick={handleSubPhotoUpClick}
                  sx={{
                    padding: "0",
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ArrowForwardIos />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default Slider;
