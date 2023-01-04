import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bootcampReducer from '../features/bootcamps/bootcampSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    bootcamps: bootcampReducer,
  },
});
