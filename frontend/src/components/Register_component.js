import React, { useState } from 'react';
import './Register_component.css';

export default function Register_component() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passoword2, setPassword2] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!username || !password || !passoword2 || password != passoword2) {
      alert('Invalid input');
      return false;
    }

    const res1 = await fetch('http://localhost:8000/useraccounts', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "username": username,
        "password": password,
      })
    })
    .then(res => res.json());
    // console.log(res1);
    if (res1 != 'Status: success') {
      alert('Invalid input');
      return false;
    }

    const res2 = await fetch('http://localhost:8000/userinfos', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        'username': username,
        'nickname': username,
      })
    })
    .then(res => res.json());
    // console.log(res2);

    return false;
  }

  return (
    <div className="center-container">
      <div className="register-block">
        <div className="register-topicbar">
          <h1> User Register </h1>
        </div>
        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-form">
              <label for="username">Enter your username: </label>
              <input type="text" name="username" id="username" value={username}
              onChange={(event) => setUsername(event.target.value)} 
              required/>
            </div>
            <div className="register-form">
              <label for="password">Enter your password: </label>
              <input type="text" name="password" id="password" value={password}
              onChange={(event) => setPassword(event.target.value)} 
              required/>
            </div>
            <div className="register-form">
              <label for="re-enter_password">Re-enter your password: </label>
              <input type="text" name="re-enter_password" id="re-enter_password" value={passoword2}
              onChange={(event) => setPassword2(event.target.value)} 
              required/>
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
