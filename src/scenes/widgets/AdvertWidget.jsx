import { useEffect, useState } from "react";
import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import {  useSelector } from "react-redux";


const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const token = useSelector((state) => state.token);

  const [mostLikedPost, setMostLikedPost] = useState(null);

  useEffect(() => {
    
    fetch(`${process.env.REACT_APP_ENV}/posts/most-liked`, {
  method: "GET",headers: {
    Authorization: `Bearer ${token}`,
  },
})
      .then((response) => response.json())
       .then((response) => response)
      .then((data) => {
        // console.log(data); // Console log the data here
        setMostLikedPost(data);
      })
      .catch((error) => console.log(error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      {mostLikedPost ? (
        <>
          <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight="500">
              Most liked post
            </Typography>
            {/* <Typography color={medium}>Create Ad</Typography> */}
          </FlexBetween>
          <img
            width="100%"
            height="auto"
            alt=""
            src={`${process.env.REACT_APP_ENV}/assets/${mostLikedPost.picturePath}`}
            style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
          />
          <FlexBetween>
            <Typography color={main}>{mostLikedPost.firstName}</Typography>
            {/* <Typography color={medium}>mikacosmetics.com</Typography> */}
          </FlexBetween>
          <Typography color={medium} m="0.5rem 0">
            {mostLikedPost.description}
          </Typography>
        </>
      ) : (
        <Typography color={medium}>Loading...</Typography>
      )}
    </WidgetWrapper>
  );
};

export default AdvertWidget;
