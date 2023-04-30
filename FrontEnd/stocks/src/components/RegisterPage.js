import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const updateName = event => {
        setName(event.target.value)
    }

    const updatePassword = event => {
        setPassword(event.target.value)
    }

    const handleClick = function () {
        const requestBody = {
            name: name,
            password: password
          };
          
          axios.post('http://localhost:3005/createUser', requestBody)
            .then(response => {
              console.log(response.data);
              navigate(`/`);
            })
            .catch(error => {
              console.error(error);
            });
        
    }
    return (
        <div id='reg-form'>
            <h1>Sign Up</h1>
            <div className='name'>
                <h2 style={{ display: "inline" }}>Name: </h2>
                <div id="input" style={{ display: "inline" }} >
                    <input type="text" value={name} onChange={updateName} />
                </div>
            </div>
            <div className='password'>
                <h2 style={{ display: "inline" }}>Password: </h2>
                <div id="input" style={{ display: "inline" }} >
                    <input type="password" value={password} onChange={updatePassword} />
                </div>
            </div>
            <button onClick={handleClick}>Register</button>
        </div>
    );
};

export default RegisterPage;
