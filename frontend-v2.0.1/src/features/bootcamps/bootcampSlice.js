import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bootcampService from './bootcampService';


const API_URL_BOOTCAMP = "http://localhost:3000/api/v1/bootcamps";


const initialState =  {
    bootcamps: [],
    bootcamp: {},
    isLoading: false,
    isError: null,
    isSuccess: false,
    message: '',
}



//create new bootcamp
export const createBootcamp = createAsyncThunk(API_URL_BOOTCAMP, async (bootcampData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await bootcampService.createBootcamp(bootcampData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});



export const bootcampSlice = createSlice({
    name: 'bootcamp',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createBootcamp.pending, (state) => {
            state.isLoading = true;
    })
        .addCase(createBootcamp.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;

    })
        .addCase(createBootcamp.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
    })
},
})


export const {reset} = bootcampSlice.actions;
export default bootcampSlice.reducer;