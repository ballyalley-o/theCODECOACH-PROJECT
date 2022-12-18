import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { colorSettings } from './peg'


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(colorSettings(mode)), [mode]);
  // const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/profile"
              element={ <Profile />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}


export default App;
