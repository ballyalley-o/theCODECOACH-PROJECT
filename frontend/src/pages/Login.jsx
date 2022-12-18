import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { TbWorld } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");
  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      backgroundColor={theme.pallete.background.alt}
      p="1rem 6%"
      textAlign="center"
    >
      <Box>
        {" "}
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          {" <"}
          <TbWorld /> {"/>"}
        </Typography>
      </Box>
      <Box
      width={isNonMobileScreens ? "50%" : "94%"}
      p="2rem"
      m="2rem auto"
      borderRadius="2rem"
      backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" sx={{ mb: "2rem"}} variant="h4" >
          Login
        </Typography>
      </Box>
    </Box>
  );
};
