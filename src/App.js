// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import Add from './component/Add';
import Edit from './component/Edit';

function App() {
  return (
    <div className="text-secondary">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
