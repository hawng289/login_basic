// Home.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";


function Home() {
  const [users, setUsers] = useState([
    {
      email: "",
      password: ""
    }]);

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
      const response = await axios.get('http://localhost:8080/api/v1/admin');
      setUsers(response.data);
      console.log(users)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // // Hàm thêm người dùng
  const addUser = async () => {
    navigate('/add')
  }

  const editUser = async () => {
    navigate('/edit')
  }

  // // Hàm xóa người dùng
  const deleteUser = async (email) => {
    console.log(email)
    try {
      await axios.delete(`http://localhost:8080/api/v1/admin?email=${email}`);
      // Cập nhật danh sách người dùng sau khi xóa thành công
      setUsers(users.filter((user) => user.email !== email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      {Cookies.get('token') ? <div className="home-container">
        <h1>Xin chào </h1>
        <h2>Danh sách user</h2>
        <div className="user-list-container">
            <ul>
                {users.map((user) => (
                <li key={user.email} className="user-item">
                    {user.email}
                    <div className="user-actions">
                    <button onClick={() => deleteUser(user.email)}>Xóa</button>
                    <button onClick={editUser}>Sửa</button> 
                    </div>
                </li>
                ))}
            </ul>
        </div>
        <button className='add-user-button' onClick={addUser}>Thêm User</button>
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
