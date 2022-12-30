import axios from 'axios';


const API_URL_BOOTCAMPS = 'http://localhost:3000/api/v1/bootcamps';

//create new bootcamp
const createBootcamp = async (bootcampData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL_BOOTCAMPS, bootcampData, config);

    return response.data;
}


const bootcampService = {
    createBootcamp,
}

export default bootcampService