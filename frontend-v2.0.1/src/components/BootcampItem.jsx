import { Link }from 'react-router-dom'
import { Box, Typography, Grid, Item, Paper } from '@mui/material'

function BootcampItem({bootcamp}) {
  return (
    <Box className='bootcamp'>
    <div className="">{bootcamp.duration}</div>
    <div className="">{bootcamp.name}</div>
    <div className="">{bootcamp.location}</div>
    <div className={`status status-${bootcamp.status}`}>
    {bootcamp.status}
    </div>
    <Link to={`/bootcamp/${bootcamp._id}`} className='btn btn-reverse btn-sm'>View</Link>
    <div className="">{bootcamp.website}</div>
    </Box>
  )
}

export default BootcampItem