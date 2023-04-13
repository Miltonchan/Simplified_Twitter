import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import './Login_component.css';
import '../icons/LoginBackground.png';

import AlertDialog from '../dialogs/AlertDialog';

export default function Login_component() {

  const [loginComplete, setLoginComplete] = useState(false);
  const [animateComplete, setAnimateComplete] = useState(false);
  const [routeHome, setRouteHome] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const event = new Event("login");

  const handleErrorDialogConfirm = () => {
    setIsErrorDialogOpen(true);
  };

  const handleErrorDialogCancel = () => {
    setIsErrorDialogOpen(false);
  };

  const navigate = useNavigate();

  const getUseraccount = async (username, password) => {
    const useraccount = await fetch('http://localhost:8000/useraccounts/login',
    {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "username": username,
        "password": password,
      })
    })
    .then(data => data.json())
    .catch(err => err.json())

    return useraccount;
  }

  const getUserinfo = async (userId) => {
    const userinfo = await fetch(`http://localhost:8000/userinfos?userId=${userId}`,
    {
      method: 'GET',
      mode: 'cors',
    })
    .then(data => data.json());
    return userinfo;
  }

  const login = async (e) => {
    e.preventDefault();
    setLoginComplete(true);
    setAnimateComplete(false);

    setTimeout(() => {
      setLoginComplete(false);
    }, 1400);

    const useraccount = await getUseraccount(username, password);
    if (typeof useraccount === 'string') {
      setIsErrorDialogOpen(true);
      return;
    }
    const userinfo = await getUserinfo(useraccount.userId);
    localStorage.setItem('user', JSON.stringify({
      'userinfo': userinfo,
      'useraccount': useraccount,
    }));

    setTimeout(() => {
      setAnimateComplete(true);
    }, 700);

    return false;
  }

  const routeToHome = () => {
    setRouteHome(true);
    setTimeout(() => {
      navigate('/home');
      window.location.pathname = '/home';
    }, 1000);
  }

  return (
    <div className="login-container">
      <div className={"login-block " + (loginComplete ? "login-completed " : "") + (routeHome ? "route-to-home" : "")}>
        <div>
          <div className={"login-topicbar " + (animateComplete ? "invisible" : "")}>
            <h1> User Login </h1>
          </div>
          <div className={(animateComplete ? "welcome-message" : "hidden")}>
            <h1 onClick={routeToHome}> Welcome to Beitter! </h1>
          </div>
          <div className={"login-form-container " + (animateComplete ? "invisible" : "")}>
            <div className="login-form-block">
              <form action="" method="post" className="login-form" onSubmit={login}>
                <div className="login-form">
                  <label for="username">Username: </label>
                  <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="login-form">
                  <label for="password">Password: </label>
                  <input type="text" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="login-form">
                  <button type='submit'>OK</button>
                </div>
             </form>
             <Link className="register" to ='/register'> Not yet register? Sign Up now! </Link>
            </div>
          </div>
        </div>
      </div>
      {isErrorDialogOpen && (
        <AlertDialog
         title="Alert"
         description="Are you sure you want to delete your account?"
         onYes={handleErrorDialogCancel}
         onNo={handleErrorDialogCancel}
        />
      )}
    </div>
  )
}
