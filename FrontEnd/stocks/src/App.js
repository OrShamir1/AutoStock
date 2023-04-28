import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import StockPage from './components/StockPage';
import RegisterPage from './components/RegisterPage';
import SignInPage from './components/SignInPage';

const App = () => {
  return (
  <div>
    <Router>
      <h1>AutoStock</h1>
      <Navbar />
      <Routes>
        <Route path='/Stock/:symbol' Component={StockPage} />
        <Route path='/search' element={<LandingPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<SignInPage />} />
      </Routes>
    </Router>
  </div>
  )
};

export default App;
