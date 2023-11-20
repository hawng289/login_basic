// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([
    { id: 1, username: 'User1' },
    { id: 2, username: 'User2' }
  ]);

  // Lấy danh sách người dùng từ API khi component được tạo
  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm lấy danh sách người dùng từ API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('YOUR_BACKEND_API/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Hàm thêm người dùng
  const addUser = async () => {
    try {
      const response = await axios.post('YOUR_BACKEND_API/users', {
        // Dữ liệu của người dùng mới
      });
      // Cập nhật danh sách người dùng sau khi thêm thành công
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Hàm xóa người dùng
  const deleteUser = async (id) => {
    try {
      await axios.delete(`YOUR_BACKEND_API/users/${id}`);
      // Cập nhật danh sách người dùng sau khi xóa thành công
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Hàm sửa tên người dùng
  const editUser = async (id, newUsername, newPassword) => {
    try {
      await axios.put(`YOUR_BACKEND_API/users/${id}`, {
        username: newUsername,
        password: newPassword
      });
      // Cập nhật danh sách người dùng sau khi sửa thành công
      setUsers(users.map((user) => (user.id === id ? { ...user, username: newUsername, password: newPassword } : user)));
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (
    <div className="home-container">
        <h2>Danh sách user</h2>
        <div className="user-list-container">
            <ul>
                {users.map((user) => (
                <li key={user.id} className="user-item">
                    {user.username}
                    <div className="user-actions">
                    <button onClick={() => deleteUser(user.id)}>Xóa</button>
                    <button onClick={() => editUser(user.id, prompt('Nhập tên mới'))}>Sửa</button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
        <button className='add-user-button' onClick={addUser}>Thêm User</button>
  </div>
  );
};

export default Home;
