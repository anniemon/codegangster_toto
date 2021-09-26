import React from 'react';
import axios from 'axios';

import { Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState, useRef } from 'react';

import Footer from '../Footer';

import './SingUp.css';

const SingUp = () => {
  const [isVerified, setIsVerified] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  
  const [isErrors, setIsErrors] = useState(true);
  
  useEffect(() => {
    if(!Object.keys(errors).length) {
      setIsErrors(false);
    } else {
      setIsErrors(true);
    }
  }, [errors])


  const onSubmit = (data) => {
    // console.log(data)
  };
  
  const handleError = (e) => {
    console.log(e.target.textContent);
  }
  

  useEffect(() => {
    setIsVerified(watch('verifyPassword') === watch('password'));
  }, [watch('verifyPassword'),  watch('password')]);

  
  return (
    <section className="loginTodolist__container">
      <div className="loginTodolist__logo">Code Gangsters TodoList Sign Up</div>
      <form onSubmit={handleSubmit(onSubmit)}>

      <div className="loginTodolist__inputField">
        <div className="loginTodolist__inputId">
          <i class="fas fa-user"></i>
            <input
              className="userId"
              type="text"
              placeholder="ID"
              name="userId"
              {...register('userId', {pattern: /^[a-z0-9_-]{4,20}$/, required : true})}
            />
        </div>
        
        <div className="loginTodolist__inputPassword">
          <i class="fas fa-unlock-alt"></i>
          <input 
            name="password"
            className="password"
             type="password" 
             placeholder="Password" 
             {...register('password', {pattern: /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/, required : true})}
             />
        </div>

        <div className="loginTodolist__verifyPassword">
          <i class="fas fa-lock"></i>
          <input
            name="verifyPassword"
            className="password"
            type="password"
            placeholder="Verify Password"
            {...register('verifyPassword', {required : true})}
          />
        </div>
        
        <div className="loginTodolist__email">
          <i class="fas fa-envelope-open-text"></i>
          <input 
            name="email"
            className="email"
            type="email" 
            placeholder="E-Mail" 
            {...register('email', 
              {pattern: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
              , required : true})}
            
            />
        </div>

        {errors.userId && (
          <div 
            name="userId_err"
            className="validation__check__msg"
            onChange={handleError}>
            * 아이디는 소문자, 숫자 4~20글자여야 합니다.
          </div>
        )}
        {errors.email && (
          <div 
            name="email_err"
            className="validation__check__msg"
            onChange={handleError}>
            * 올바른 형식의 이메일을 입력해 주세요.
          </div>
        )}
        {errors.password && (
          <div 
            name="password_err"
            className="validation__check__msg" 
            onChange={handleError}>
            * 비밀번호는 8글자 이상, 영문, 숫자 조합이어야 합니다.
          </div>
        )}
        {!isVerified ? (
          <div 
            name="passwordNotMatch_err"
            className="validation__check__msg" 
            onChange={handleError}>
            * 비밀번호가 일치하지 않습니다.
          </div>
          )
        : <div className="validation__check__msg">
          </div>}

        <div className="loginTodolist__BtnContainer">
          {!isErrors ?
                    <Link to='/login'> 
                    <button 
                      type="submit"
                      onClick={()=> {alert('회원가입이 완료되었습니다.')}} 
                      className="singUpBtn">
                      Sign Up
                    </button>
                    </Link>
          : <button 
              type="submit"
              className="singUpBtn">
              Sign Up
              </button>}
        </div>
      </div>
      </form>
      <div className="footer">
        <Footer />
      </div>
    </section>
  );
};

export default SingUp;
