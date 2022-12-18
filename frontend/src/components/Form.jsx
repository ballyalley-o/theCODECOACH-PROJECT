import { useState } from "react";
import { Box, Button, TextField, Typography, useTheme, useMediaQuery } from "@mui/material";
import { TbEdit } from "react-icons/tb";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import { FlexBetween } from "./FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(6).max(20).required("Add your password"),
    location: yup.string().location().required("Add your location"),
    role: yup.enum("student", "trainer").required("First name is required"),
    picture: yup.string().picture().required()
})