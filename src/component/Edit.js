import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
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

function Edit() {
    const [userData, setUserData] = useState(
        {
            firstname: "",
            lastname: "",
            password: "",
            role: ""
        }
    )

    const navigate = useNavigate();
    // const {userEmail} = useParams();

    // console.log('par' + userEmail)
    // useEffect(() => {
    //     // Fetch user data based on userId when the component mounts
    //     const fetchUserData = async () => {
    //       try {
    //         const response = await axios.get(`http://localhost:8080/api/v1/admin`);
    //         setUserData(userData.filter((user) => user.email !== userEmail));
    //       } catch (error) {
    //         console.error('Fetch user data failed', error.response.data);
    //       }
    //     };
    
    //     fetchUserData();
    //   }, [userId]);

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
            const response = await axios.put(`http://localhost:8080/api/v1/admin?firstname=${userData.firstname}&lastname=${userData.lastname}&email=${userEmail}&password=${userData.password}&role=${userData.role}`);
            setUserData(response.data)
            console.log(response.data)
            navigate('/home');
        } catch (error) {
            console.error('Add failed', error.response.data);
        }
    }


    return (
        <div className='login-container'>
            <form onSubmit={handleAdd}>
                <h2>Sửa tài khoản</h2>
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
                {/* <label htmlFor="email">email:</label>
                <input
                    className='email'
                    placeholder='email'
                    type='text'
                    value={userData.email}
                    onChange={handleChange}
                    name='email'
                /> */}
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
                <button type="submit">Sửa</button>
            </form>
        </div>
    )
}

export default Edit;
