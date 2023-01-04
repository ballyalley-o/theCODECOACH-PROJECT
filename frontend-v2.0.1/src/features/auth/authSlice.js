import  { createSlice, createAsyncThunk, createAction }  from  '@reduxjs/toolkit' ;
import  authService  from  './authService' ;
import extractErrorMessage  from  '../../utilities/extractErrMessage' ;

// Path: frontend-v2.0.1/src/features/auth/authSlice.js
// Compare this snippet from frontend-v2.0.1/src/pages/Login.jsx:

const API_URL_REG = "/api/v1/auth/register"
const API_URL_LOGIN = "/api/v1/auth/login";

//Get user from the local storage
const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
    user: user ? user : null,
    isLoading: false
}

//register user
export const register = createAsyncThunk("/api/v1/auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
   return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

//login user
export const login = createAsyncThunk("/api/v1/auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);

    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
});

export const logout = createAction('/api/v1/auth/logout', () => {
    authService.logout();
    return {}
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    reset: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer