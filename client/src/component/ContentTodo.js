import React, { useState } from 'react';
import './ContentTodo.css';
import axios from 'axios';

const ContentTodo = ({ datas, setDatas }) => {
  const checkHandler = ({ target }, id) => {
    axios.put(`${process.env.REACT_APP_API_URL}/todos`, {
      id: id,
      isChecked: target.checked === true ? 1 : 0
    });
    let cpDatas = datas.slice();
    cpDatas = cpDatas.map((el) => {
      if (el.id === id) {
        el.isChecked = !el.isChecked;
      }
      return el;
    });
    setDatas(cpDatas);
  };
  const makeDDay = (startDate) => {
    const today = new Date();
    const dday = new Date(startDate);
    const gap = dday - today.getTime();
    const result = Math.ceil(gap / (1000 * 60 * 60 * 24));
    return result;
  };

  const deleteTodo = (some, deleteId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/todos`, { data: { id: deleteId } });
    const filterTodo = datas.filter((todo) => {
      return todo.id !== deleteId;
    });
    setDatas(filterTodo);
  };
  return (
    <div className="todo_Container">
      <ul className="todoLists">
        {datas.map((todo) => {
          return (
            <li className="todoList" key={todo.id}>
              {/* 각 리스트 항목들 */}
              <div className="todoMenu">
                <div className="todoDate">D - {makeDDay(todo.d_day)}</div>
                <div className="createTodo">
                  {new Date(todo.createdAt).toLocaleDateString('ko-kr')}
                </div>
                <div className="buttons">
                  <span className="todoContent_checkbox">
                    <div className="checkbox_group">
                      <input
                        type="checkbox"
                        id="check"
                        onChange={(e) => checkHandler(e, todo.id)}
                        checked={todo.isChecked}
                      />
                    </div>
                  </span>
                  <span className="todoContent_delete">
                    <button
                      className="todoContent_deleteButton"
                      onClick={() => deleteTodo(todo.content, todo.id)}
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </span>
                </div>
              </div>
              <div
                className={
                  todo.isChecked
                    ? 'todoContent checked'
                    : 'todoContent unChecked'
                }
              >
                {todo.todo}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContentTodo;
