import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login_component.css';
import '../icons/LoginButton.png'

export default function Login_component() {

  const [loginComplete, setLoginComplete] = useState('');

  const login = () => {
    setLoginComplete('login-completed')
  }

  return (
    <div className="login-container">
      <div className={`login-block ${loginComplete}`}>
        <div className="login-topicbar">
          <h1> User Login </h1>
        </div>
        <div className="login-form-container">
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
  )
}
