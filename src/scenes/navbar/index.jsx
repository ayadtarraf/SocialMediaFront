import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { useState } from "react";
// import { setPost } from "state";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const token = useSelector((state) => state.token);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  const [searchQuery, setSearchQuery] = useState("");
  const handleHelpClick = () => {
    navigate("/home?query=gym");
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`?query=${searchQuery}`);
  };
  const handleCoachclick = () => {
    navigate("/home?query=coach");
  };
const handlePlayerClick = () => {
navigate("/home?query=player");
};
  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={alt}
      style={{ position: "sticky", width: "100%", top: "0", zIndex: "999" }}
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          ayad
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <form onSubmit={handleSearchSubmit}>
              <InputBase
                placeholder=" gym,coach,player..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton type="submit">
                <Search />
              </IconButton>
            </form>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={handlePlayerClick}>
            <Typography
              variant="body1"
              color={theme.palette.mode === "dark" ? "primary" : "primary"}
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Player
            </Typography>
          </IconButton>
          <IconButton onClick={handleCoachclick}>
            <Typography
              variant="body1"
              color={theme.palette.mode === "dark" ? "primary" : "primary"}
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Coach
            </Typography>
          </IconButton>
          <IconButton onClick={handleHelpClick}>
            <Typography
              variant="body1"
              color={theme.palette.mode === "dark" ? "primary" : "primary"}
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Gym
            </Typography>
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton onClick={handlePlayerClick}>
            <Typography
              variant="body1"
              color={theme.palette.mode === "dark" ? "primary" : "primary"}
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Player
            </Typography>
          </IconButton>
            <IconButton onClick={handleCoachclick}>
              <Typography
                variant="body1"
                color={theme.palette.mode === "dark" ? "primary" : "primary"}
                sx={{
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Coach
              </Typography>
            </IconButton>
            <IconButton onClick={handleHelpClick}>
            <Typography
              variant="body1"
              color={theme.palette.mode === "dark" ? "primary" : "primary"}
              sx={{
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Gym
            </Typography>
          </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;