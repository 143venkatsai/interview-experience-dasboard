import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import Admin from "./components/Admin";
import User from "./components/User";
import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/register" />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
    </Router>
  )
}

export default App