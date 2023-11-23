import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

axios.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

function Add() {
    const [userData, setUserData] = useState(
        {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            role: ""
        }
    )

    const navigate = useNavigate();

    function handleChange(e) {
        return setUserData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
        
    }

    const handleAdd = async (e) => {
        console.log(userData)
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/admin?firstname=${userData.firstname}&lastname=${userData.lastname}&email=${userData.email}&password=${userData.password}&role=${userData.role}`);
            navigate('/home');
        } catch (error) {
            console.error('Add failed', error.response.data);
        }
    }


    return (
        <div className='login-container'>
            <form onSubmit={handleAdd}>
                <h2>Thêm tài khoản</h2>
                <label htmlFor="firstname">firstname:</label>
                <input
                    className='firstname'
                    placeholder='firstname'
                    type='text'
                    value={userData.firstname}
                    onChange={handleChange}
                    name='firstname'
                />
                <label htmlFor="lastname">lastname:</label>
                <input
                    className='lastname'
                    placeholder='lastname'
                    type='text'
                    value={userData.lastname}
                    onChange={handleChange}
                    name='lastname'
                />
                <label htmlFor="email">email:</label>
                <input
                    className='email'
                    placeholder='email'
                    type='text'
                    value={userData.email}
                    onChange={handleChange}
                    name='email'
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
                <label htmlFor="role">role:</label>
                <input
                    className='role'
                    placeholder='role'
                    type='text'
                    value={userData.role}
                    onChange={handleChange}
                    name='role'
                />
                <button type="submit">Thêm</button>
            </form>
        </div>
    )
}

export default Add;
