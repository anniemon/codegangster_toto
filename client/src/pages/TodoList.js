import React, { useState, useEffect } from 'react';
import './TodoList.css';

import Header from '../Header';
import Filterbar from '../component/Filterbar';
import MakeTodo from '../component/MakeTodo';
import CountClear from '../component/CountClear';
import ContentTodo from '../component/ContentTodo';
import Footer from '../Footer';
import axios from 'axios';

const TodoList = ({ userInfo, logoutHandler }) => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .post('https://localhost:4000/getTodos', { id: userInfo.id })
      .then((res) => setDatas(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <React.Fragment>
      <div className="home__container">
        <Header userInfo={userInfo} logoutHandler={logoutHandler} />
        <Filterbar datas={datas} setDatas={setDatas} />
        <MakeTodo datas={datas} setDatas={setDatas} userInfo={userInfo} />
        <CountClear datas={datas} setDatas={setDatas} />
        <div className="listPart">
          <ContentTodo datas={datas} setDatas={setDatas} />
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default TodoList;
