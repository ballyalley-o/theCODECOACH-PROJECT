import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBootcamps } from '../features/bootcamps/bootcampSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import BootcampItem from '../components/BootcampItem'
import {
  Box,
  Paper,
} from '@mui/material'
import { styled } from "@mui/material/styles";

function Bootcamps() {
    const { bootcamps } = useSelector((state) => state.bootcamps);
    const { isLoading  } = useSelector((state) => state.bootcamps);
    const dispatch = useDispatch()

    const Grid = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      ...theme.typography.body2,
      padding: theme.spacing(1),
      paddingLeft: "3rem",
      paddingRight: "3rem",
      fontSize: "1.5rem",
      display: "flex",
      textAlign: "center",
      justifyContent: "space-between",
      color: theme.palette.text.secondary,
    }));

    // useEffect(() => {

    //     return() => {
    //         if(isSuccess) {
    //             dispatch(reset())
    //         }
    //     }
    // }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getBootcamps())

    }, [dispatch])

    if (isLoading) {
      return <Spinner />;
    }

  return (
    <>
      <div className="backButton" style={{ alignSelf: "left" }}>
        <BackButton className="backButton" url="/" sx={{ size: "1.5rem" }} />
      </div>
      <section className='heading'>
        <h1>Bootcamps</h1>
        <p className="">Certified DEV camp all over the world</p>
      </section>

      <Box className="container bootcamps">
        <Grid container spacing={1} className="bootcamp-headings">
          <div>Duration</div>
          <div>Bootcamp</div>
          <div>Location</div>
          <div>Status</div>
          <div>Website</div>
          <div className="">Rating</div>
        </Grid>
        {bootcamps.map((bootcamp) => (
              <BootcampItem key={bootcamp._id} bootcamp={bootcamp} />

          ))}
      </Box>
    </>
  );
}

export default Bootcamps