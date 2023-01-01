import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TbWorld } from "react-icons/tb";
import { IoLogInOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { InputLabel, TextField, MenuItem, FormControl, Select } from "@mui/material";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  // const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    password: "",
    password2: "",
    email: "",
    role: "",
  });

  const {
    firstName,
    lastName,
    location,
    password,
    password2,
    email,
    role
    }
    =formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   //redirect if logged in
  //   if (isSuccess || user) {
  //     navigate("/");
  //   }

  //   dispatch(reset());
  // }, [isError, isSuccess, message, user, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleChange = (event) => {
  //   setRole(event.target.value);
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords needs to match");
    } else
    {
      const userData = {
        firstName,
        lastName,
        role,
        location,
        email,
        password,
      };

      dispatch(register(userData))
        .unwrap()
        .then((user) => {

          toast.success(`Successfully Registered, Welcome!`);
          navigate("/");
        })
        .catch(toast.error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          {"<"}
          <TbWorld />
          {"/>"} REGISTER
        </h1>
        <p>Create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <FormControl
              sx={{ mb: 2, minWidth: 200, gridColumn: "span 2" }}
              size="small"
            >
              <InputLabel sx={{ fontSize: "1.5rem" }}>Role</InputLabel>
              <Select name="role" value={role} label="Role" sx={{ fontSize: "1.3rem"}} onChange={onChange}>
                <MenuItem value={"student"}>Student</MenuItem>
                <MenuItem value={"trainer"}>Trainer</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name :</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="firstName"
              value={firstName}
              onChange={onChange}
              placeholder="First Name"
              sx={{ alignItems: "center", mt: "2rem", display: "flex" }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name :</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="lastName"
              value={lastName}
              onChange={onChange}
              placeholder="Last name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location :</label>
            <input
              type="location"
              className="form-control"
              id="name"
              name="location"
              value={location}
              onChange={onChange}
              placeholder="Location"
              required
            />
          </div>

          {/* <select
              type="select"
              className="form-control"
              id="name"
              size="2"
              name="role"
              value={role}
              onChange={onChange}
              placeholder="Enter your role"
              required
            >
              <option value="student">Student</option>
              <option value="trainer">Trainer</option>
            </select> */}

          <div className="form-group">
            <label htmlFor="Email">Email Address :</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Password :</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password :</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="form-group" sx={{ m: "2rem" }}>
            <button className="btn btn-block">SUBMIT</button>
          </div>
          <div className="form-group" sx={{ mt: "2rem" }}>
            <Link to="/login" sx={{ textAlign: "center" }}>
              <h2 className="register-login">
                <IoLogInOutline /> Already a member?, LOG-IN instead.
              </h2>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}



export default Register;
