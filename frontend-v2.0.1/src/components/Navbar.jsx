import { useState } from "react";
import {
        Box,
        Menu,
        MenuItem,
        IconButton,
        Button,
        InputBase,
        FormControl,
        useTheme,
        useMediaQuery,
        Select,
        Typography,
        Badge
      } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import { MdDarkMode, MdOutlineLightMode, MdOutlineHelp } from "react-icons/md";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FlexBetween } from "../components/FlexBetween";
import { TbWorld } from "react-icons/tb"
import { logout, reset } from "../features/auth/authSlice";

  const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const open = Boolean(anchorEl);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const alt = theme.palette.background.alt;

  let fullName;

  fullName = `${"user.firstName"} ${"user.lastName"}`;


  const handleClick = (event) => {
    console.log(event.target);

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(2rem, 3rem, 4rem)"
          color="main"
          onClick={() => navigate("/")}
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
          <div>
            <Button
              id="basic-button-bootcamp"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                fontSize: "1.2rem",
                fontFamily: "Fjalla One",
                color: dark,
                "&:hover": {
                  border: "2px solid black",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                },
                "&:focus": {
                  fontSize: "1.4rem",
                },
              }}
            >
              BOOTCAMPS
            </Button>
            <Menu
              id="basic-bootcamp"
              anchorEl={anchorEl}
              open={open && anchorEl.id === "basic-button-bootcamp"}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-bootcamp",
              }}
            >
              <MenuItem onClick={() => navigate("/bootcamps")}>
                Bootcamps
              </MenuItem>
              <MenuItem onClick={() => navigate("/bootcamps/create")}>
                Create Bootcamp
              </MenuItem>
            </Menu>
          </div>
          {/* <Link to={"/bootcamps"}>
            <Typography
              gap="1.5rem"
              sx={{
                fontSize: "1.2rem",
                fontFamily: "Fjalla One",
                "&:hover": {
                  color: "#4D4D4D",
                  cursor: "pointer",
                  fontSize: "1.4rem",
                },
              }}
            >
              BOOTCAMPS
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Age</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="Age"
                  onClick={() => navigate("/bootcamps")}
                >
                  <MenuItem onClick={() => navigate("/bootcamps")}>
                    Bootcamps
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/create")}>
                    Create Bootcamp
                  </MenuItem>
                </Select>
              </FormControl>
            </Typography>
          </Link> */}
          <div>
            <Button
              id="basic-button-course"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
                fontSize: "1.2rem",
                fontFamily: "Fjalla One",
                color: dark,
                "&:hover": {
                  border: "2px solid black",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                },
                "&:focus": {
                  fontSize: "1.4rem",
                },
              }}
            >
              COURSES
            </Button>
            <Menu
              id="basic-course"
              anchorEl={anchorEl}
              open={open && anchorEl.id === "basic-button-course"}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-course",
              }}
            >
              <MenuItem onClick={() => navigate("/courses")}>Courses</MenuItem>
              <MenuItem onClick={() => navigate("/courses/create")}>
                Create Course
              </MenuItem>
            </Menu>
          </div>
          <Link to={"/club"}>
            <Typography
              gap="2rem"
              sx={{
                fontSize: "1.2rem",
                fontFamily: "Fjalla One",
                "&:hover": {
                  color: "#4D4D4D",
                  cursor: "pointer",
                  fontSize: "1.4rem",
                },
              }}
            >
              CLUB
            </Typography>
          </Link>
          <Link to={"/feedbacks"}>
            <Typography
              gap="2rem"
              sx={{
                fontSize: "1.2rem",
                fontFamily: "Fjalla One",
                "&:hover": {
                  color: "#4D4D4D",
                  cursor: "pointer",
                  fontSize: "1.4rem",
                  backgroundColor: "#FFFFF",
                },
              }}
            >
              FEEDBACKS
            </Typography>
          </Link>
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
              <MenuItem value={fullName || ""}>
                <Typography>{!user ? "LOGIN" : fullName}</Typography>
              </MenuItem>

              <MenuItem onClick={user ? onLogout : null}>
                {user ? "LOGOUT" : null}
              </MenuItem>
            </Select>
          </FormControl>
          <Badge badgeContent={4} color="error">
            <IoNotificationsCircleSharp style={{ fontSize: "2rem" }} />
          </Badge>
          <Badge badgeContent={1} color="error">
            <AiOutlineMessage style={{ fontSize: "2rem" }} />
          </Badge>

          <MdOutlineHelp style={{ fontSize: "2rem" }} />
          {/* onClick={() => dispatch(setMode())} */}
          <IconButton>
            {theme.palette.mode === "dark" ? (
              <MdOutlineLightMode style={{ color: dark, fontSize: "2rem" }} />
            ) : (
              <MdDarkMode style={{ fontSize: "2rem" }} />
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
            {/* onClick={() => dispatch(setMode())} */}
            <IconButton sx={{ fontSize: "25px" }}>
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
                {/* onClick={() => dispatch(setLogout())} */}
                <MenuItem>Logout</MenuItem>
              </Select>
            </FormControl>
            <Badge badgeContent={4} color="error">
              <IoNotificationsCircleSharp sx={{ fontSize: "25px" }} />
            </Badge>
            <AiOutlineMessage sx={{ fontSize: "25px" }} />
            <MdOutlineHelp sx={{ fontSize: "30px" }} />
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};


export default Navbar