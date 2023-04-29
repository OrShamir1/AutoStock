import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Navbar = () => {


    return (
        <ul className="navbar">
        <li className="nav">
        <Link to="/favstock" style={{ textDecoration: "none"}}>Saved Stocks</Link>
        </li>
        <li className="nav">
            <Link to="/search" style={{ textDecoration: "none"}}>Search</Link>
        </li>
    </ul>
    );
};

export default Navbar;
