import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './style.css';
import './common.css';

import './fonts/SAOUIRegular.otf';

import Layout from './layout/layout';

import Login from './components/Login_component';
import Home from './components/Home_component';
import Register from './components/Register_component';
import Userinfo from './components/Userinfo_component';
import Setting from './components/Setting_component';
import Notification from './components/Notification_component';
import Chatroom from './components/Chatroom_component';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route index element={<Notification />} />
          <Route path="/login/*" element = {<Login/>} />
          <Route path="/register/*" element = {<Register/>} />
          <Route path="/home/*" element = {<Home/>} />
          <Route path="/userinfo/*" element = {<Userinfo/>} />
          <Route path="/setting/*" element = {<Setting/>} />
          <Route path="/notification/*" element = {<Notification/>} />
          <Route path="/chatroom/*" element = {<Chatroom/>} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
