import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"

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
import AdminIcon from "../../../icons/NotificationButton.png";
import AdminIconHover from "../../../icons/NotificationButtonHover.png";

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
    title:"Messages",
    style:{'display':'none'},
    icon: <img src={MessagesIcon} height={h} width={w}/>,
    iconhover:<img src={MessagesIconHover} height={h} width={w}/>,
    link: "/chatroom",
  },{
    title:"Profile",
    style:{'display':'none'},
    icon: <img src={ProfileIcon} height={h} width={w}/>,
    iconhover:<img src={ProfileIconHover} height={h} width={w}/>,
    link: "/userinfo",
  },{
    title:"Setting",
    style:{'display':'none'},
    icon: <img src={SettingIcon} height={h} width={w}/>,
    iconhover:<img src={SettingIconHover} height={h} width={w}/>,
    link: "/setting",
  },
]


export default function Menulist_component() {
  const [isTweet, setIsTweet] = useState(false);
  const [twitter_content,setTwitter_content] = useState("");
  const [hoverdetectLogin, sethoverdetectLogin]= useState(false);
  const [hoverdetectAdmin, sethoverdetectAdmin]= useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();

  const user = JSON.parse(localStorage.getItem('user'));
  const [isAdminUser, setIsAdminUser] = useState(true);

  const [menulistComponentHover, setMenulistComponentHover] = useState([false, false, false, false, false, false]);
  const handleMouseEnter = (index) => {
    // console.log({index});
    const updatedHover = [...menulistComponentHover];
    for (let i=0; i<updatedHover.length; i++) {
      if(i===index) {
        // console.log("The index now is "+index);
      updatedHover[index] = true;
      } else {updatedHover[i] =false;}
    setMenulistComponentHover(updatedHover);
  };}

  const handleMouseLeave = (index) => {
    const updatedHover = [...menulistComponentHover];
    updatedHover[index] = false;
    setMenulistComponentHover(updatedHover);
  };

  const navigate = useNavigate();

  const [isLogoutDialogOpen, setisLogoutDialogOpen] = useState(false);
  const [isLogout, setIsLogout] = useState();
  const handleLogoutConfirm = () => {
  // Do something with the logout action, such as sending a request to the backend
    localStorage.removeItem('user');
    setisLogoutDialogOpen(false);
    navigate('/login');
    window.location.pathname = '/login';
  };
  const handleLogoutCancel = () => {
    // Do something with the logout action, such as sending a request to the backend
    setisLogoutDialogOpen(false);
    };

  const handleTweetConfirm = () => {
      const twitter =[twitter_content] //to be added account information ????
      console.log(twitter) // send to backend

    };

    const handleTweetCancel = () => {
      setIsTweet(false);
    };

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user !== null) {
        setIsLoggedIn(true);
        document.getElementById("Login").style.display = 'none';
        document.getElementById("Logout").style.display = 'flex';
        document.getElementById("Messages").style.display = 'flex';
        document.getElementById("Profile").style.display = 'flex';
        document.getElementById("Setting").style.display = 'flex';
      } else {
        setIsLoggedIn(false);
      }
    }, []);


    return(
      <div className="menulist-container">
        <ul className="sidebarlist">
          <li>
            {" "}
            <div><img className="mainicon" src={mainIcon}/></div>
          </li>
          {
          menulist_component.map((val, index) => {
            return (
              <li
                index={index}
                className={window.location.pathname == val.link ? "row active" : "row"}
                id={val.title}
                style={val.style}
                onClick={() => { window.location.pathname = val.link; } }
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                >
                {" "}
                <div  id="icon">{window.location.pathname == val.link || menulistComponentHover[index] ?
                (val.iconhover) : (val.icon)}</div>{" "}
                <div id="title">{val.title}
                </div>
              </li>
            );
          })}
          { user && user.useraccount.username === "Heathcliff" && (
            <li
                className="row"
                id="Administrator"
                onClick={() => { window.location.pathname = "/admin"; } }
                onMouseEnter={() => {sethoverdetectAdmin(true);}}
                onMouseLeave={() => {sethoverdetectAdmin(false);}}
            >
              <div  id="icon">
                {hoverdetectAdmin ?
                 <img src={AdminIconHover} height={h} width={w} /> :
                 <img src={AdminIcon} height={h} width={w} />
                }</div>{" "}
              <div id="title">
                Administrator
              </div>
            </li>
          )}
          <li
                className="row"
                id="Logout"
                style={{'display':'none'}}
                onClick={() => {setisLogoutDialogOpen(true)} }
                onMouseEnter={() => {sethoverdetectLogin(true);}}
                onMouseLeave={() => {sethoverdetectLogin(false);}}>
                  {" "}
                  <div  id="icon">{hoverdetectLogin ?
                <img src={LogoutIconHover} height={h} width={w} /> :
                <img src={LogoutIcon} height={h} width={w} />
                }</div>{" "}
                <div id="title">Logout
                </div>
                </li>
        </ul>
        <main>
        {isTweet && (

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
         onYes={handleTweetConfirm}
         onNo={handleTweetCancel}

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
