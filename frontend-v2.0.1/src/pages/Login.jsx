import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TbWorld } from "react-icons/tb";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector(
      (state) => state.auth
    );

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

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
  };

  dispatch(login(userData))
        .unwrap()
        .then((user) => {

          toast.success('Successfully Logged-in');
          navigate("/");
        })
        .catch(toast.error);
    }

    if (isLoading) {
      return <Spinner />;
    }


  return (
    <>
      <section className="heading">
        <h1>
          {"<"}
          <TbWorld />
          {"/>"} LOGIN
        </h1>
        <p>WELCOME</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>

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
            <label htmlFor="email">Email Address :</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              className="form-group"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">SUBMIT</button>
          </div>
          <div className="form-group" sx={{ mt: "2rem" }}>
            <Link to="/register" sx={{ textAlign: "center" }}>
              <h2 className="register-login">
                <MdOutlineFeaturedPlayList /> Not a member?, Register instead.
              </h2>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login