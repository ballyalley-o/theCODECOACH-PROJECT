import { useState } from "react";
import { Box, Menu, MenuItem, IconButton, InputBase, FormControl, useTheme, useMediaQuery, Select, Typography } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import { MdDarkMode, MdOutlineLightMode, MdOutlineHelp } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../state/index"
import { useNavigate } from "react-router-dom";
import { FlexBetween } from "../components/FlexBetween";
import { TbWorld } from "react-icons/tb"


  export const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(2rem, 3rem, 4rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "#4D4D4D",
              cursor: "pointer",
            },
          }}
        >
          {" <"}
          <TbWorld /> {"/>"}
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            padding=".5rem"
            borderRadius="9px"
            gap="3rem"
          >
            <InputBase placeholder="Search Bootcamps" sx={{ color: "light" }} />
            <IconButton>
              <BiSearchAlt />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop */}
      {isNonMobileScreens ? (
        <FlexBetween gap="1rem">
          <Typography
            gap="2rem"
            sx={{ fontSize: "2rem", fontFamily: "Fjalla One" }}
          >
            BOOTCAMPS
          </Typography>
          <Typography
            gap="2rem"
            sx={{ fontSize: "2rem", fontFamily: "Fjalla One" }}
          >
            COURSES
          </Typography>
          <Typography
            gap="2rem"
            sx={{ fontSize: "2rem", fontFamily: "Fjalla One" }}
          >
            CLUB
          </Typography>
          <Typography
            gap="2rem"
            sx={{ fontSize: "2rem", fontFamily: "Fjalla One" }}
          >
            FEEDBACKS
          </Typography>

          <IoNotificationsCircleSharp sx={{ fontSize: "40px" }} />
          <AiOutlineMessage sx={{ fontSize: "40px" }} />
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
                "& .MuiSelect-select:focus": { backgroundColor: neutralLight },
              }}
              input={<InputBase sx={{ color: dark }} />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
          <MdOutlineHelp sx={{ fontSize: "40px" }} />
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <MdOutlineLightMode sx={{ color: dark, fontSize: "25px" }} />
            ) : (
              <MdDarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <BsMenuButtonWideFill />
        </IconButton>
      )}

      {/* Mobile navigate menu */}
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
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              oonClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <FaWindowClose />
            </IconButton>
          </Box>

          {/* Menu */}
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
                <MdOutlineLightMode sx={{ color: dark, fontSize: "25px" }} />
              ) : (
                <MdDarkMode sx={{ fontSize: "25px" }} />
              )}
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
                input={<InputBase sx={{ color: dark }} />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem>DASHBOARD</MenuItem>
                <MenuItem>BOOTCAMPS</MenuItem>
                <MenuItem>COURSES</MenuItem>
                <MenuItem>CLUB</MenuItem>
                <MenuItem>FEEDBACKS</MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Logout
                </MenuItem>
              </Select>
            </FormControl>
            <IoNotificationsCircleSharp sx={{ fontSize: "25px" }} />
            <AiOutlineMessage sx={{ fontSize: "25px" }} />
            <MdOutlineHelp sx={{ fontSize: "30px" }} />
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

