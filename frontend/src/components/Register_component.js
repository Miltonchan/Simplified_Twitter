import React, { useState, useEffect, useRef } from 'react';
import './Register_component.css';

export default function Register_component() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passoword2, setPassword2] = useState('');

  const [selectedImagePreview, setSelectedImagePreview] = useState();

  const wrapperRef = useRef(null);


  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!username || !password || !passoword2 || password != passoword2) {
      alert('Invalid input');
      return false;
    }

    const res = await fetch('http://localhost:8000/useraccounts', {
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "username": username,
        "password": password,
        "nickname": username,
        "icon": selectedImagePreview,
      })
    })
    .then(res => res.json());
    // console.log(res1);
    if (res !== 'Status: success') {
      alert('Invalid input');
      return false;
    }

    return false;
  }

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent) => {
        const src = fileLoadedEvent.target.result;
        setSelectedImagePreview(src); // to change the selected image
        //console.log(src);
      }
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeSelectedImagePreview = () => {
    setSelectedImagePreview();
  };

  return (
      <div className="register-page">
        <div className="register-topicbar">
          <h1> User Register </h1>
        </div>
        <div className="register-form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-section">
              <label for="username">Enter your username: </label>
              <input type="text" name="username" id="username" value={username} className="register-input"
              onChange={(event) => setUsername(event.target.value)}
              required/>
            </div>
            {selectedImagePreview && <img
              className="icon"
              src={selectedImagePreview}
              alt="icon"
            />}
            {
             !selectedImagePreview ?
              (
                <div
                  ref={wrapperRef}
                  className="drop-file-input"
                  onDragEnter={onDragEnter}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}>
                  <div className="drop-file-input__label">
                    <p>Drag/ Drop your image here</p>
                  </div>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => {
                    imageChange(e);
                    }}
                  />
                </div>
              )
              : 
              (
              <button className="delete-button" onClick={removeSelectedImagePreview}>
                Remove This Image
              </button>
              )
            }
            <div className="register-section">
              <label for="password">Enter your password: </label>
              <input type="password" name="password" id="password" value={password} className="register-input"
              onChange={(event) => setPassword(event.target.value)}
              required/>
            </div>
            <div className="register-section">
              <label for="re-enter_password">Re-enter your password: </label>
              <input type="password" name="re-enter_password" id="re-enter_password" value={passoword2} className="register-input"
              onChange={(event) => setPassword2(event.target.value)}
              required/>
            </div>
            <div className="register-section">
              <button type="submit" className="register-submit-btn">Register</button>
            </div>
          </form>
        </div>
      </div>
  )
}
