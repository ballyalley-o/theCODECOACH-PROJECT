import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bootcampService from './bootcampService';
import extractErrorMessage from '../../utilities/extractErrMessage';

const API_URL_BOOTCAMPS = "/api/v1/bootcamps";
const API_URL_CREATE_BOOTCAMP = "/api/v1/bootcamps/create";


const initialState = {
  bootcamps: null,
  bootcamp: null,
  // isLoading: false,
};

//create bootcamps
export const createBootcamp = createAsyncThunk(API_URL_CREATE_BOOTCAMP, async (bootcampData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await bootcampService.createBootcamp(bootcampData, token);
  } catch (error) {

    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

//create new bootcamp
export const getBootcamps = createAsyncThunk(API_URL_BOOTCAMPS, async (_, thunkAPI) => {
  try {

    const token = thunkAPI.getState().auth.user.token;
    return await bootcampService.getBootcamps(token);

  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});


export const bootcampSlice = createSlice({
    name: 'bootcamp',
    initialState,
    extraReducers: (builder) => {
        builder
          .addCase(getBootcamps.pending, (state) => {
            // state.isLoading = true;
            state.bootcamp = null;
          })
          .addCase(getBootcamps.fulfilled, (state, action) => {
            // state.isLoading = false;
            state.bootcamps = action.payload;
          })
},
})


export const {reset} = bootcampSlice.actions;
export default bootcampSlice.reducer;