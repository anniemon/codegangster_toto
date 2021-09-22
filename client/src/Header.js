import React from 'react';
import './Header.css';

const Header = () => {

  return (
    //* 로고, 계정정보, 로그아웃
      <div className="header--wrapper">
        <span className="header--todo__logo" />
        <i class="fas fa-user-circle" />
        <span className="span--Username">Admin</span>
        <button className="btn--logout">Logout</button>
      </div>
    )
}

export default Header;
