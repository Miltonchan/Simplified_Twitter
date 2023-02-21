import React from 'react'
import { Link } from 'react-router-dom';

export default function Login_component() {
  return (
    <div>
      <h1> User Login </h1>
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
  )
}
