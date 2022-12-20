import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { TbWorld } from 'react-icons/tb';
import { Form } from '../components/Form';

export const Login = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  return (
    <>
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.neutral.mediumMain}
          p="1rem 6%"
          textAlign="left"
        >
          <Typography fontWeight="bold" fontSize="42px" color="primary">
            {" <"}
            <TbWorld /> {"/>"}
          </Typography>
        </Box>
        <Box
          width={isNonMobileScreens ? "50%" : "94%"}
          p="2rem"
          m="2rem auto"
          borderRadius="2rem"
          backgroundColor="transparent"
        >
          <Form />
        </Box>
      </Box>
    </>
  );
};
