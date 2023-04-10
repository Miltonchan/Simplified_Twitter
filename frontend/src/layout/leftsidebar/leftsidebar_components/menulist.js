import React from "react";
import { useState } from "react";

import mainIcon from "../../../icons/HeadIcon.jpeg";
import LoginIcon from "../../../icons/LoginButton.png";
import LoginIconHover from "../../../icons/LoginButtonHover.png";
import HomeIcon from "../../../icons/BlankButton.png";
import HomeIconHover from "../../../icons/BlankButtonHover.png";
import NotificationIcon from "../../../icons/NotificationButton.png";
import NotificationIconHover from "../../../icons/NotificationButtonHover.png";
import MessagesIcon from "../../../icons/ChatButton.png";
import MessagesIconHover from "../../../icons/ChatButtonSolidCircleHover.png";
import ProfileIcon from "../../../icons/ProfileButton.png";
import ProfileIconHover from "../../../icons/ProfileButtonSolidCircleHover.png";
import SettingIcon from "../../../icons/SettingButton.png";
import SettingIconHover from "../../../icons/SettingButtonSolidCircleHover.png";
import LogoutIcon from "../../../icons/LogoutButton.png";
import LogoutIconHover from "../../../icons/LogoutButtonHover.png";

import AlertDialog from "../../../dialogs/AlertDialog";
import './menulist.css';


const h = 23;
const w = 23;


const menulist_component = [
  {
    title:"Login",
    icon:<img src={LoginIcon} height={h} width={w}/>,
    iconhover:<img src={LoginIconHover} height={h} width={w}/>,
    link: "/login",
  },
  {
    title:"Home",
    icon:<img src={HomeIcon} height={h} width={w}/>,
    iconhover:<img src={HomeIconHover} height={h} width={w}/>,
    link: "/home",
  },{
    title:"Notifications",
    icon: <img src={NotificationIcon} height={h} width={w}/> ,
    iconhover:<img src={NotificationIconHover} height={h} width={w}/>,
    link: "/notification",
  },{
    title:"Messages",
    icon: <img src={MessagesIcon} height={h} width={w}/>,
    iconhover:<img src={MessagesIconHover} height={h} width={w}/>,
    link: "/chatroom",
  },{
    title:"Profile",
    icon: <img src={ProfileIcon} height={h} width={w}/>,
    iconhover:<img src={ProfileIconHover} height={h} width={w}/>,
    link: "/userinfo",
  },{
    title:"Setting",
    icon: <img src={SettingIcon} height={h} width={w}/>,
    iconhover:<img src={SettingIconHover} height={h} width={w}/>,
    link: "/setting",
  },
]



export default function Menulist_component() {
  const [isTwitter, setisTwitter] = useState(false);
  const [twitter_content,setTwitter_content] = useState("");
  const [hoverdetect, sethoverdetect]= useState(false);


  const [isLogoutDialogOpen, setisLogoutDialogOpen] = useState(false);
  const [isLogout, setIsLogout] = useState();
  const handleLogoutConfirm = () => {
  // Do something with the logout action, such as sending a request to the backend
    setisLogoutDialogOpen(false);
  };
  const handleLogoutCancel = () => {
    // Do something with the logout action, such as sending a request to the backend
    setisLogoutDialogOpen(false);
    };

  const handleTwitterConfirm = () => {
      const twitter =[twitter_content] //to be added account information ????

      console.log(twitter) // send to backend 
    
    };

    const handleTwitterCancel = () => {
      setisTwitter(false);
    };
  

    return(
      <div className="menulist-container">
        <ul className="sidebarlist">
          <li>
            {" "}
            <div><img className="mainicon" src={mainIcon}/></div>
          </li>
          {menulist_component.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                id={window.location.pathname == val.link ? "active" : " "}
                onClick={() => { window.location.pathname = val.link; } }
                onmouseover={() => {sethoverdetect(true);}}
                onMouseLeave={() => {sethoverdetect(false);}}
                >
                {" "}
                <div  id="icon">{window.location.pathname == val.link || hoverdetect == true ? (val.iconhover) : (val.icon)}</div>{" "}<div id="title">{val.title}</div>
              </li>
            );
          })}
          <li
                className="row"
                onClick={() => {setisLogoutDialogOpen(true)} }>
                  {" "}
                  <div id="icon"><img src={LogoutIcon} onmouseover={LogoutIconHover} height={h} width={w}>
                    </img></div>{" "}<div id="title">Logout</div>
                </li>
        </ul>
        <button
          className="sidebarlist-button"
          onClick={() => setisTwitter(true)}>
          Tweet
        </button>
        <main>
        {isTwitter && (
        <AlertDialog
         title="Twitter content"
         description={
                <textarea
                  required
                  placeholder="Enter twitter here..."
                  value={twitter_content}
                  className="twitterContent"
                  onChange={(e) => setTwitter_content(e.target.value)}
                />}
         onYes={handleTwitterConfirm}
         onNo={handleTwitterCancel}
         
        />
        )}  
        {isLogoutDialogOpen && (
        <AlertDialog
         title="Alert"
         description="Are you sure you want to logout?"
         onYes={handleLogoutConfirm}
         onNo={handleLogoutCancel}
        />
      )}
        </main>
        </div>
        
    ); //head icons and button to be added, send button and clos button to be added
}
