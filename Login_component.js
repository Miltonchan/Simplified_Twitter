import React from 'react'
import { Link } from 'react-router-dom';
import './Login_component.css';

export default function Login_component() {
  return (
    <div className="center-container">
      <div className="login-block">
        <div className="login-topicbar">
          <h1> User Login </h1>
        </div>
        <div className="login-form-container">
          <div className="login-form-block">
            <form action="" method="post" class="login-form">
              <div class="login-form">
                <label for="username">Username: </label>
                <input type="text" name="username" id="username" required/>
              </div>
              <div class="login-form">
                <label for="password">Password: </label>
                <input type="text" name="password" id="password" required/>
              </div>
           </form>
           <Link to ='/register'> Not yet register? Sign Up now! </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
