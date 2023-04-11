import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login_component.css';
import '../icons/LoginBackground.png'

export default function Login_component() {

  const [loginComplete, setLoginComplete] = useState(false);
  const [animateComplete, setAnimateComplete] = useState(false);
  const [routeHome, setRouteHome] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setLoginComplete(true);
    setAnimateComplete(false);

    setTimeout(() => {
      setLoginComplete(false);
    }, 1400);

    setTimeout(() => {
      setAnimateComplete(true);
    }, 700);
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
            <h1 onClick={routeToHome}> Welcome to Sword Art Online </h1>
          </div>
          <div className={"login-form-container " + (animateComplete ? "invisible" : "")}>
            <div className="login-form-block">
              <form action="" method="post" className="login-form">
                <div className="login-form">
                  <label for="username">Username: </label>
                  <input type="text" name="username" id="username" required/>
                </div>
                <div className="login-form">
                  <label for="password">Password: </label>
                  <input type="text" name="password" id="password" required/>
                </div>
                <div className="login-form">
                  <button onClick={login}>OK</button>
                </div>
             </form>
             <Link className="register" to ='/register'> Not yet register? Sign Up now! </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
