import React from "react";
import HomeIcon from "./icons/homeIcon.png";
import ExploreIcon from "./icons/exploreIcon.png";
import NotificationIcon from "./icons/notificationIcon.png";
import MessagesIcon from "./icons/messagesIcon.png";
import ProfileIcon from "./icons/profileIcon.png";
import MoreIcon from "./icons/moreIcon.png";

import './menulist.css';

const h = 23;
const w = 23;

const menulist_component = [
  {
    title:"Home",
    icon:<img src={HomeIcon} height={h} width={w}/>,
    link: "/home",
  },
  {
    title:"Explore",
    icon: <img src={ExploreIcon} height={h} width={w}/>,
    link: "/explore",
  },{
    title:"Notifications",
    icon: <img src={NotificationIcon} height={h} width={w}/> ,
    link: "/notification",
  },{
    title:"Messages",
    icon: <img src={MessagesIcon} height={h} width={w}/>,
    link: "/chatroom",
  },{
    title:"Profile",
    icon: <img src={ProfileIcon} height={h} width={w}/>,
    link: "/userinfo",
  },{
    title:"Setting",
    icon: <img src={MoreIcon} height={h} width={w}/>,
    link: "/setting",
  },
]

export default function Menulist_component() {
    return(
      <div className="menulist-container">
        <ul className="sidebarlist">
        <li className="headicon">
              {" "}
              <div>icon here</div>
              {" "}
            </li>
        {menulist_component.map((val, key) =>{
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname == val.link ? "active" : " "}
              onClick={() => {window.location.pathname = val.link}}>
              {" "}
              <div id="icon">{val.icon}</div>{" "}<div id="title">{val.title}</div>
            </li>
          )
        })}
        </ul>
        <button className="sidebarlist-button">
        Tweet
        </button>
      </div>

    ); //head icons and button to be added
}
