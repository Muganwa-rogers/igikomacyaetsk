import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SparePart from './components/SparePart';
import StockIn from './components/StockIn';
import StockOut from './components/StockOut';
import Reports from './components/Reports';
import Logout from './components/Logout';

export const AuthContext = React.createContext();

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={token ? <Navigate to="/sparepart" /> : <Navigate to="/login" />}
          />
          <Route
            path="/sparepart"
            element={token ? <SparePart /> : <Navigate to="/login" />}
          />
          <Route
            path="/stockin"
            element={token ? <StockIn /> : <Navigate to="/login" />}
          />
          <Route
            path="/stockout"
            element={token ? <StockOut /> : <Navigate to="/login" />}
          />
          <Route
            path="/reports"
            element={token ? <Reports /> : <Navigate to="/login" />}
          />
          <Route
            path="/logout"
            element={token ? <Logout /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
