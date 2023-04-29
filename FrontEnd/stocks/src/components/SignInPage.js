import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
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

        axios.post('http://localhost:3005/users/login', requestBody)
            .then(response => {
                if (response.data == "'Not Allowed'") {
                    alert("Login details are incorrect")
                }
                else {
                    localStorage.setItem('token', response.data.accessToken)
                    navigate(`/search`);
                }
            })
            .catch(error => {
                console.error(error);
            });

    }
    return (
        <div id='reg-form'>
            <h1>Log In</h1>
            <div className='name'>
                <h2 style={{ display: "inline" }}>Name: </h2>
                <div id="input" style={{ display: "inline" }} >
                    <input type="text" value={name} onChange={updateName} />
                </div>
            </div>
            <div className='password'>
                <h2 style={{ display: "inline" }}>Password: </h2>
                <div id="input" style={{ display: "inline" }} >
                    <input type="text" value={password} onChange={updatePassword} />
                </div>
            </div>
            <button onClick={handleClick}>Sign In</button>
            <button onClick={() => navigate('/register')}>Sign up</button>
        </div>
    );
};

export default SignInPage;
