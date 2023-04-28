import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Navbar = () => {


    return (
        <ul className="navbar">
        <li className="nav">
        <Link to="/" style={{ textDecoration: "none"}}>Saved Stocks</Link>
        </li>
        <li className="nav">
            <Link to="/addTransaction" style={{ textDecoration: "none"}}>Friends</Link>
        </li>
        <li className="nav">
            <Link to="/BrakeDown" style={{ textDecoration: "none"}}>Search</Link>
        </li>
    </ul>
    );
};

export default Navbar;
