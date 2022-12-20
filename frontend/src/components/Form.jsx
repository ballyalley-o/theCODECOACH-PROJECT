import { useState } from "react";
import {
  Box,
  InputLabel,
  Select,
  InputBase,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { TbEdit } from "react-icons/tb";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import { FlexBetween } from "./FlexBetween";
import { toast } from "react-toastify";


//Schema for registration validation
    const registerSchema = yup.object().shape({
    firstName: yup
                .string()
                .required("First name is required"),
    lastName: yup
                .string()
                .required("Last name is required"),
    email: yup
                .string()
                .email("Invalid Credentials")
                .required("Email is required"),
    password: yup
                .string()
                .min(6)
                .max(20)
                .required("Add your password"),
    location: yup
                .string()
                .required("Add your location"),
    role: yup
                .mixed()
                .oneOf(["student", "trainer"])
                .required("user Role is required"),
    picture: yup.string()
                .required("required")
})

//Schema for login validation
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Credentials")
    .required("Email is required"),
  password: yup
    .string()
    .min(6)
    .max(20)
    .required("Invalid Credentials"),
});

//form empty values registration
const formValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    role: "",
    picture: "",
}

//form empty values login
const formValuesLogin = {
    email: "",
    password: "",
}

// FORM FIELDS

export const Form = () => {
    const [pageType, setPageType] = useState("login");
    const [role, setRole] = useState('');
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";


    const register = async (values, onSubmitProps) => {

      const formData = new FormData();

      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append("picturePath", values.picture.name);

        const regRes = await fetch(
          "http://localhost:3000/api/v1/auth/register",  {
            method: "POST",
            body: formData,
          }
        );
        const regData = await regRes.json({
          success: true,
          mesage: "User registered successfully",
        });
        onSubmitProps.resetForm();

        if (regData) {
          setPageType("login");
        }

  }


    const login = async (values, onSubmitProps) => {

    const logRes = await fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loginData = await logRes.json();
    onSubmitProps.resetForm();

    if (loginData) {
      dispatch(
        setLogin({
          user: loginData.user,
          token: loginData.token,
        })
      );
      navigate("/home");
    }
  };

   const handleFormSubmit = async (values, onSubmitProps) => {
     if (isLogin) await login(values, onSubmitProps);
     if (isRegister) await register(values, onSubmitProps);
   };


   const handleRoleChange = (event) => {
    setRole(event.target.value)
  }


    return (
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? formValuesLogin : formValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          resetForm,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Typography
              fontSize={{ xs: "1.5rem", sm: "2rem" }}
              fontWeight="600"
              sx={{ m: "4rem 6%" }}
              variant="h1"
              color={palette.neutral.dark}
            >
              {isLogin ? "Login" : "Register"}
            </Typography>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="first name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName || ""}
                    defaultValue=""
                    name="firstName"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{
                      gridColumn: "span 2",
                    }}
                  />
                  <TextField
                    label="Last name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName || ""}
                    name="lastName"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{
                      gridColumn: "span 2",
                    }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location || ""}
                    defaultValue=""
                    name="location"
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{
                      gridColumn: "span 2",
                    }}
                  />

                  <FormControl
                    label="Role"
                    required
                    sx={{ gridColumn: "span 2" }}
                  >
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={role || ""}
                      label="Role *"
                      onChange={handleRoleChange}
                    >
                      <MenuItem value={"student"}>Student</MenuItem>
                      <MenuItem value={"trainer"}>Trainer</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                  {/* <TextField
                    label="Role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                    name="role"
                    error={touched.role && Boolean(errors.role)}
                    helperText={touched.role && errors.role}
                    sx={{
                      gridColumn: "span 2",
                    }}
                  /> */}

                  {/* Image drop zone */}
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    color={`${palette.neutral.light}`}
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg, .jpeg, .png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px solid ${palette.neutral.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input defaultValue="" {...getInputProps()} />
                          {!values.picture ? (
                            <Typography fontSize="2rem" textAlign="center">
                              ADD YOUR PHOTO HERE
                            </Typography>
                          ) : (
                            <FlexBetween>
                              <Typography defaultValue="">
                                {values.picture.name}
                              </Typography>
                              <TbEdit />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              {/* EMAIL */}
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email || ""}
                name="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: "span 2",
                }}
              />

              {/* PASSWORD */}
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password || ""}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  fontSize: "3rem",
                  gridColumn: "span 2",
                }}
              />
            </Box>

            {/* SUBMIT BUTTON */}

            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  mt: "3rem",
                  m: "2rem 0",
                  p: "1rem",
                  fontSize: "1.5rem",
                  backgroundColor: palette.neutral.dark,
                  color: palette.primary.main,
                  "&:hover": { color: palette.primary.dark },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  color: palette.neutral.dark,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.dark,
                  },
                }}
              >
                {isLogin
                  ? "Not a member, Sign up here"
                  : "Already a member, Login here"}
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    );
  };
