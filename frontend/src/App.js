import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './style.css';
import './common.css';

import './fonts/SAOUIRegular.otf';
import backgroundImage from './Kirito.png';
import Layout from './layout/layout';

import Login from './components/Login_component';
import Home from './components/Home_component';
import Register from './components/Register_component';
import Userinfo from './components/Userinfo_component';
import Setting from './components/Setting_component';
import Notification from './components/Notification_component';
import ChatroomList from './components/ChatroomList_component';
import Chatroom from './components/Chatroom_component';
import Admin from './components/Admin_component';
import OtherUserinfo from './components/OtherUserinfo_component';

function App() {
  return (
    <div 
      style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh' 
    }}>
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login/*" element = {<Login/>} />
          <Route path="/register/*" element = {<Register/>} />
          <Route path="/home/*" element = {<Home/>} />
          <Route path="/userinfo/*" element = {<Userinfo/>} />
          <Route path="/setting/*" element = {<Setting/>} />
          <Route path="/notification/*" element = {<Notification/>} />
          <Route path="/chatroom/*" element = {<ChatroomList/>} />
          <Route path="/chatroom/chat/*" element = {<Chatroom/>} />
          <Route path="/admin/*" element = {<Admin/>} />
          <Route path="/otheruserinfo/*" element = {<OtherUserinfo/>} />
        </Routes>
      </BrowserRouter>
    </Layout>
    </div>
  );
}

export default App;
