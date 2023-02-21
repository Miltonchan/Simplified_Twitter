
import React from 'react'

export default function Register_component() {
  return (
    <form action="" method="post" class="register-form">
      <div class="register-form">
        <label for="username">Enter your username: </label>
        <input type="text" name="username" id="username" required/>
      </div>
      <div class="register-form">
        <label for="password">Enter your password: </label>
        <input type="text" name="password" id="password" required/>
      </div>  
      <div class="register-form">
        <label for="re-enter_password">Re-enter your password: </label>
        <input type="text" name="re-enter_password" id="re-enter_password" required/>
      </div>  
      <div class="register-form">
        <label for="nickname">Enter your nickname: </label>
        <input type="text" name="nickname" id="nickname" required/>
      </div>  
      <div class="register-form">
        <input type="submit" value="Register"/> 
      </div>
    </form>

  )
}
