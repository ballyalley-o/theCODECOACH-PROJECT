import  { createSlice, createAsyncThunk }  from  '@reduxjs/toolkit' ;
import  authService  from  './authService' ;

// Path: frontend-v2.0.1/src/features/auth/authSlice.js
// Compare this snippet from frontend-v2.0.1/src/pages/Login.jsx:

const API_URL_REG = "http://localhost:3000/api/v1/auth/register/"
const API_URL_LOGIN = "http://localhost:3000/api/v1/auth/login/";

//Get user from the local storage
const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//register user
export const register = createAsyncThunk(API_URL_REG, async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//login user
export const login = createAsyncThunk(API_URL_LOGIN,
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);

    } catch (error) {
      const message = (
        error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('/api/v1/auth/logout', async () => {
    await authService.logout();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = "null";
          })
          .addCase(login.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
          })
          .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = "null";
          })
          .addCase(logout.fulfilled, (state) => {
            state.user = null;
          });

}})
export const { reset } = authSlice.actions
export default authSlice.reducer