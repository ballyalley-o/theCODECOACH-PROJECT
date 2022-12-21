import axios from 'axios';


const API_UR_BOOTCAMPS = 'http://localhost:5000/api/v1/bootcamps';

//create new bootcamp
const createBootcamp = async (bootcampData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_UR_BOOTCAMPS, bootcampData, config);

    return response.data;
}


const bootcampService = {
    createBootcamp,
}

export default bootcampService