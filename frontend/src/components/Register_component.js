import React from 'react';
import './Register_component.css';

export default function Register_component() {
  return (
    <div className="center-container">
      <div className="register-block">
        <div className="register-topicbar">
          <h1> User Register </h1>
        </div>
        <div className="register-form-container">
          <form action="" method="post" className="register-form">
            <div className="register-form">
              <label for="username">Enter your username: </label>
              <input type="text" name="username" id="username" required/>
            </div>
            <div className="register-form">
              <label for="password">Enter your password: </label>
              <input type="text" name="password" id="password" required/>
            </div>
            <div className="register-form">
              <label for="re-enter_password">Re-enter your password: </label>
              <input type="text" name="re-enter_password" id="re-enter_password" required/>
            </div>
            <div className="register-form">
              <label for="nickname">Enter your nickname: </label>
              <input type="text" name="nickname" id="nickname" required/>
            </div>
            <div className="register-form">
              <input type="submit" value="Register"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
