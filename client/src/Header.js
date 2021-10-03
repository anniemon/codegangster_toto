import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Header = ({ userInfo, logoutHandler }) => {
  const history = useHistory();

  return (
    //* 로고, 계정정보, 로그아웃
    <div className="header--wrapper">
      <span className="header--todo__logo" />
      <i class="fas fa-user-circle" />
      <span className="span--Username">{userInfo.userId}님</span>
      <Link to="/" className="Link__login" style={{ textDecoration: 'none' }}>
        <button
          className="btn--logout"
          onClick={() => {
            logoutHandler();
          }}
        >
          Logout
        </button>
      </Link>
    </div>
  );
};

export default Header;
