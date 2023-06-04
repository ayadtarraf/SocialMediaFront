import { Box, useMediaQuery , Button,InputBase,IconButton} from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Search} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";



const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [showAdvert, setShowAdvert] = useState(false);
  const navigate = useNavigate();
  // const neutralLight = theme.palette.neutral.light;
  // const theme = useTheme();


  const handleToggleAdvert = () => {
    setShowAdvert(!showAdvert);
  };
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`?query=${searchQuery}`);
  };

  return (
    <Box>
      <Navbar />
      <div style={{  position:"sticky",top:"30px",zIndex:"999",display:"flex",justifyContent:"center",width: '100%', borderRadius: '5px' }}>
  {!isNonMobileScreens && (
    <form style={{display:"flex",flexDirection:"row",width:"40%",borderRadius:"20px",background:"#FF0010"}}onSubmit={handleSearchSubmit}>
      <InputBase
        placeholder="gym, coach, player..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '100%', borderRadius: '5px', padding: '8px' }}
      />
      <IconButton type="submit">
        <Search />
      </IconButton>
    </form>
  )}
</div>
     <div style={{display:"flex",justifyContent:"center",flexDirection:"column"}}> {!isNonMobileScreens && (
        <>
          <Button onClick={handleToggleAdvert} >
            {showAdvert ? 'Hide Most Liked Post' : 'Show Most LIked Post'}
          </Button>
          {showAdvert && <AdvertWidget />}
        </>
      )}</div>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;