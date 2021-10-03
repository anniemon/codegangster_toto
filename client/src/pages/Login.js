import React from 'react';
import { useState } from 'react';

import { Link } from 'react-router-dom';

import Footer from '../Footer';

import './Login.css';
import axios from 'axios';

const Login = ({ loginHandler }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.className === 'userId') {
      setUserId(e.target.value);
    }
    if (e.target.className === 'password') {
      setPassword(e.target.value);
    }
  };

  const userLogin = () => {
    axios
      .post(
        'https://localhost:4000/login',
        { userId: userId, password: password },
        { withCredentials: true }
      )
      .then((res) => loginHandler(res.data))
      .catch((err) => alert('ID와 Password를 확인해 주세요!'));
  };

  return (
    <section className="loginTodolist__container">
      <div className="loginTodolist__logo">Code Gangsters TodoList</div>
      <div className="loginTodolist__inputField">
        <div className="loginTodolist__inputId">
          <i class="fas fa-user"></i>
          <input className="userId" type="text" onChange={handleChange} />
        </div>
        <div className="loginTodolist__inputPassword">
          <i class="fas fa-unlock-alt"></i>
          <input className="password" type="password" onChange={handleChange} />
        </div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="loginTodolist__BtnContainer">
            <button type="submit" className="loginBtn" onClick={userLogin}>
              Login
            </button>
          </div>
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <div className="loginTodolist__BtnContainer">
            <button className="singUpBtn">Sign Up</button>
          </div>
        </Link>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </section>
  );
};
export default Login;
