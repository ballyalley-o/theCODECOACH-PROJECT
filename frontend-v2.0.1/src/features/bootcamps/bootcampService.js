import axios from 'axios';


const API_URL_BOOTCAMPS = 'http://localhost:3000/api/v1/bootcamps';
const API_URL_CREATE_BOOTCAMP = 'http://localhost:3000/api/v1/bootcamps/create';

//create new bootcamp
const createBootcamp = async (bootcampData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL_CREATE_BOOTCAMP, bootcampData, config);

    return response.data;
}

//get all bootcamps
const getBootcamps = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }}

    const response = await axios.get(API_URL_BOOTCAMPS, config);

    return response.data;
}


const bootcampService = {
    createBootcamp,
    getBootcamps
}

export default bootcampService