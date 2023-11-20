import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


function Login() {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [userData, setUserData] = useState(
        {
            username: '',
            password: ''
        }
    )
    const [wrong, setWrong] = useState(false);
    const navigate = useNavigate();


    function handleChange(e) {
        return setUserData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault(); 

        // try {
        //     const response = await axios.post('/api/auth/login', { username, password });
        //     navigate('/home');
        // } catch (error) {
        //     console.error('Login failed', error);
        // }
        axios
            .post('/api/auth/login', { userData })
            .then(res => {
                const user = res.data
                setUserData({user})
            })
            .catch(err => {
                setWrong(true);
                console.log('Login failed', err)
            })

    };

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <label htmlFor="username">Username:</label>
                <input
                    className='username'
                    placeholder='username'
                    type='text'
                    value={userData.username}
                    onChange={handleChange}
                    name='username'
                />
                <label htmlFor="password">Password:</label>
                <input
                    className='password'
                    placeholder='password'
                    type='password'
                    value={userData.password}
                    onChange={handleChange}
                    name='password'
                />
                <button type="submit">Login</button>
                {/* <Link to='/register' className='register' >
                    Register
                </Link> */}
                {wrong && (
                    <div className="login-page-wrong">
                        <p>Login failed</p>
                    </div> )}
            </form>
        </div>
    );
}

export default Login;
