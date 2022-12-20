import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { UserImg } from "../../components/UserImg";
import { FlexBetween } from "../../components/FlexBetween";
import { HandleWidgets } from "../../components/HandleWidgets";
import { useSelector } from "react-redux";
import { TbFriends } from "react-icons/tb";


export const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { palette } = useTheme();
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark
    const medium = palette.neutral.mediumMain
    const main = palette.neutral.main;


    const getUser = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoading(true);
      const data = await res.json();
      setLoading(false);
      setUser(data);
    }

    useEffect(() => {
            getUser();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
    setLoading(true);
    return null;
    }

    const {
        firstName,
        lastName,
        email,
        location,
        role,
        jobTitle,
        viewedProfile
    } = user;

    return (
      <HandleWidgets>
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${userId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImg image={picturePath} />
            <Box>
              <Typography
                variant="h5"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.main,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography color={medium}>{role}</Typography>
            </Box>
            {/* SET ICON HERE */}
          </FlexBetween>

          <Divider />

          {/* BETWEEN  */}

          <Box p="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              {/* LOCATION ICON HERE */}
              <LocationOnOutlined
                fontSize="large"
                sx={{
                  color: main,
                }}
              />
              <Typography color={medium}>{location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              {/* LOCATION ICON HERE */}
              <LocationOnOutlined
                fontSize="large"
                sx={{
                  color: main,
                }}
              />
              <Typography color={medium}>{TbFriends.length} friends</Typography>
            </Box>
          </Box>

          {/* BOTTOM */}
          <Box p="1rem 0">
            <FlexBetween mb="0.5rem">
              <Typography color={medium}>Profile views:</Typography>
              <Typography color={main} fontWeight="600">
                {viewedProfile}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={medium}>Skills:</Typography>
              <Typography color={main} fontWeight="600">
                Javascript, React, Rust, Typescript, Python, C++, C, Java, Go
              </Typography>
            </FlexBetween>
          </Box>

          {/* UNDERGROUND */}


                {/* Social media PROFILES */}
          <Box p="1rem 0">
            <Typography fontWeight="500" fontSize="1rem" mb="1rem" color={main}>
              Social Links
            </Typography>
            <FlexBetween mb="0.5rem" gap="1rem">
              <FlexBetween gap="1rem">
                <img
                  src="https://img.icons8.com/color/48/000000/linkedin.png"
                  alt="linkedin"
                />
                <Typography fontWeight="600" color={medium}>
                  LinkedIn
                </Typography>
                <img
                  src="https://img.icons8.com/color/48/000000/github.png"
                  alt="github"
                />
                <Typography fontWeight="600" color={medium}>
                  Github
                </Typography>
                <img
                  src="https://img.icons8.com/color/48/000000/instagram-new.png"
                  alt="instagram"
                />
                <Typography fontWeight="600" color={medium}>
                  Instagram
                </Typography>
              </FlexBetween>
            </FlexBetween>
            <EditOutlined sx={{ color: main }}/>
          </Box>
        </FlexBetween>
      </HandleWidgets>
    );
}