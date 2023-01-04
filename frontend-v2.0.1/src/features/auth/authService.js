import axios from 'axios';


const API_URL = `http://localhost:3000/api/v1/auth/register`;
const API_URL_LOGIN = `http://localhost:3000/api/v1/auth/login`;


//register user
const register = async (userData) => {
    const response = await axios.post(API_URL,
        userData);

    if (response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data
}

//login user
const login = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//logout user
const logout = () => localStorage.removeItem('user');


const authService = {
  register,
  logout,
  login,
};


export default authService;