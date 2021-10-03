import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TodoList from './pages/TodoList';
import Login from './pages/Login';
import SingUp from './pages/SingUp';
import axios from 'axios';

import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const issueTokens = (token) => {
    axios
      .get('https://localhost:4000/tokenrequest', {
        headers: { authorization: `Bearer ${token}` },
        withCredentials: true
      })
      .then((res) => {
        setUserInfo(res.data.data.userInfo);
        setIsLogin(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    issueTokens();
  }, []);

  const loginHandler = (token) => {
    issueTokens(token.data);
  };

  const logoutHandler = () => {
    axios
      .get('https://localhost:4000/logout', { withCredentials: true })
      .then((res) => {
        setUserInfo({});
        setIsLogin(false);
      });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {isLogin ? (
            <Route exact path="/">
              <TodoList userInfo={userInfo} logoutHandler={logoutHandler} />
            </Route>
          ) : (
            <main>
              <section className="features">
                <Route exact path="/">
                  <Login loginHandler={loginHandler} setIsLogin={setIsLogin} />
                </Route>
                <Route path="/signup">
                  <SingUp />
                </Route>
              </section>
            </main>
          )}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
