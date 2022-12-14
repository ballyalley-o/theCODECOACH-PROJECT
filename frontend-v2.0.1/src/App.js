import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import CreateBootcamp from "./pages/CreateBootcamp";
import Bootcamps from "./pages/Bootcamps";
import Courses from "./pages/Courses";
import Club from "./pages/Club";
import Feedbacks from "./pages/Feedbacks";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Navbar from "./components/Navbar";
import { colorSettings } from "./peg";
import Footer from "./components/Footer";




function App() {
const mode = useSelector((state) => state.mode);
const theme = useMemo(() => createTheme(colorSettings(mode)), [mode]);

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/club" element={<PrivateRoute />} />
              <Route path="/courses" element={<Courses />} />
              <Route
                path="/bootcamps/create"
                element={
                  <PrivateRoute>
                    <CreateBootcamp />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bootcamps"
                element={
                  <PrivateRoute>
                    <Bootcamps />
                  </PrivateRoute>
                }
              />
              <Route
                path="/club"
                element={
                  <PrivateRoute>
                    <Club />
                  </PrivateRoute>
                }
              />{" "}
              <Route
                path="/feedbacks"
                element={
                  <PrivateRoute>
                    <Feedbacks />
                  </PrivateRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </ThemeProvider>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
