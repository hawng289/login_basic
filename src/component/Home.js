// Home.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";


function Home() {
  const token = Cookies.get("token")
  const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
  };
  const [userData, setUserData] = useState(
    {
        email: "",
        password: ""
    }
)

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  

  // Lấy danh sách người dùng từ API khi component được tạo
  useEffect(() => {
    fetchUsers();
  }, []);

  const logout = () => {
    Cookies.remove('token')
    navigate('/')
  }

  // // Hàm lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/admin', config);
      setUsers(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // // Hàm thêm người dùng
  // const addUser = async () => {
  //   try {
  //     const response = await axios.post('YOUR_BACKEND_API/users', {
  //       // Dữ liệu của người dùng mới
  //     });
  //     // Cập nhật danh sách người dùng sau khi thêm thành công
  //     setUsers([...users, response.data]);
  //   } catch (error) {
  //     console.error('Error adding user:', error);
  //   }
  // };

  // // Hàm xóa người dùng
  // const deleteUser = async (id) => {
  //   try {
  //     await axios.delete(`YOUR_BACKEND_API/users/${id}`);
  //     // Cập nhật danh sách người dùng sau khi xóa thành công
  //     setUsers(users.filter((user) => user.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  // // Hàm sửa tên người dùng
  // const editUser = async (id, newUsername, newPassword) => {
  //   try {
  //     await axios.put(`YOUR_BACKEND_API/users/${id}`, {
  //       username: newUsername,
  //       password: newPassword
  //     });
  //     // Cập nhật danh sách người dùng sau khi sửa thành công
  //     setUsers(users.map((user) => (user.id === id ? { ...user, username: newUsername, password: newPassword } : user)));
  //   } catch (error) {
  //     console.error('Error editing user:', error);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', userData);
         // Token hết hạn sau 1 ngày
        
    } catch (error) {
        // setWrong(true)
        console.error('Login failed', error);
    }
};


  return (
    <div>
      {Cookies.get('token') ? <div className="home-container">
        <h2>Danh sách user</h2>
        <div className="user-list-container">
            <ul>
                {users.map((user) => (
                <li key={user.id} className="user-item">
                    {user.username}
                    <div className="user-actions">
                    {/* <button onClick={() => deleteUser(user.id)}>Xóa</button> */}
                    {/* <button onClick={() => editUser(user.id, prompt('Nhập tên mới'))}>Sửa</button> */}
                    <button onClick={handleLogin}>Xóa</button>
                    {/* <button>Sửa</button> */}
                    </div>
                </li>
                ))}
            </ul>
        </div>
        <button className='add-user-button'>Thêm User</button>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
    </div> : (
        <div>
          <p>You need to login to access this page.</p>
          <button onClick={logout}>Log In</button>
        </div>
      )}
    </div>
  );
};

export default Home;
