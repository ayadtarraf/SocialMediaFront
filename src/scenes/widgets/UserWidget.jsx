import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Facebook,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false); // Added state for edit mode
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [refresh, setRefresh] = useState(false);

  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_ENV}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log("ress",response);
      const data = await response.json();
      setUser(data);
      // console.log("data user",data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    } catch (error) {
      // console.log(error); 
    }
  };

  useEffect(() => {
    getUser();
  }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    console.log(firstName, lastName);
    try {
      if (!firstName || !lastName) {
        console.log("Error: First name and last name are required.");
        return;
      }
  
      const response = await fetch(`${process.env.REACT_APP_ENV}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }), // Stringify the request body
      });
      console.log("first",firstName);
      console.log("last",lastName);
  
      const data = await response.json();
  
      console.log("Response status:", response.status);
      console.log("Response data:", data);
  
      if (response.ok) {
        // Update user data and exit edit mode
        // setUser(data);
        setRefresh(!refresh)
        setEditMode(false);
      } else {
        // Handle error scenario
        console.log("Error:", data.error); // Replace with your error handling logic
      }
    } catch (error) {
      console.log("Error:", error); // Replace with your error handling logic
    }
  };
  if (!user) {
    return null;
  }

  const {
    firstName: userFirstName,
    lastName: userLastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    facebook,
    twitter,
    linkedin,
  } = user;

  const handleFacebookClick = () => {
    window.open(facebook, "_blank");
  };

  const handleTwitterClick = () => {
    window.open(twitter, "_blank");
  };

  const handleLinkedInClick = () => {
    window.open(linkedin, "_blank");
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            {!editMode ? ( // Render user name or editable input fields based on edit mode
              <>
                <Typography
                  variant="h4"
                  color={dark}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: primary,
                      cursor: "pointer",
                    },
                  }}
                >
                  {userFirstName} {userLastName}
                </Typography>
                <Typography color={medium}>{friends.length} friends</Typography>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
          </Box>
        </FlexBetween>
        {!editMode ? ( // Render edit icon or save icon based on edit mode
          <ManageAccountsOutlined onClick={() => setEditMode(true)} />
        ) : (
          <EditOutlined onClick={handleSave} />
        )}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {facebook && (
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem" onClick={handleFacebookClick}>
              <Facebook sx={{ color: main }} />
              <Box>
                <Typography
                  color={main}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: primary,
                      cursor: "pointer",
                    },
                  }}
                >
                  Facebook
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        )}

        {twitter && (
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem" onClick={handleTwitterClick}>
              <Twitter sx={{ color: main }} />
              <Box>
                <Typography
                  color={main}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: primary,
                      cursor: "pointer",
                    },
                  }}
                >
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        )}

        {linkedin && (
          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem" onClick={handleLinkedInClick}>
              <LinkedIn sx={{ color: main }} />
              <Box>
                <Typography
                  color={main}
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: primary,
                      cursor: "pointer",
                    },
                  }}
                >
                  LinkedIn
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
