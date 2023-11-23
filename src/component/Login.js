import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import instance from '../axiosConfig';


function Login() {
    const [userData, setUserData] = useState(
        {
            email: "",
            password: ""
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

    // Thêm token vào cookie sau khi đăng nhập thành công
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/login', userData);
            const token = response.data.access_token;
            Cookies.set('token', token, { expires: 1 }); // Token hết hạn sau 1 ngày
            navigate('/home');
        } catch (error) {
            setWrong(true)
            console.error('Login failed', error);
        }
    };

    // Trích xuất token từ cookie trước mỗi yêu cầu đã xác thực
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

    return (
        <div className='login-container'>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
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
