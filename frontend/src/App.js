import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { useMemo } from 'react'
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux'
import { CssBaseline } from "@mui/material";
import { colorSettings } from './peg'
import { ToastContainer } from "react-toastify";



function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(colorSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

// const toastConfiguration = {
//   autoClose: 2000,
//   // draggable: true,
//   // pauseOnHover: true
//   //etc you get the idea
// };

  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:Id"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </Router>
      <ToastContainer style={{ marginTop: 40 }} />
    </div>
  );
}


export default App;
