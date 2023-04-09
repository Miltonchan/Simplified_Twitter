import React from "react";
import { useState } from "react";
import HomeIcon from "./icons/homeIcon.png";
import ExploreIcon from "./icons/exploreIcon.png";
import NotificationIcon from "./icons/notificationIcon.png";
import MessagesIcon from "./icons/messagesIcon.png";
import ProfileIcon from "./icons/profileIcon.png";
import MoreIcon from "./icons/moreIcon.png";
import Popup from "./popup";
import './menulist.css';
import './popup.css';
// import closeIcon from "..\components\icons\DeclineButton.png"; idk how import to here


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
  const [buttonPopup, setButtonPopup] = useState(false);
  const [twitter_content,setTwitter_content] = useState("");
  const [Public_content,setPublic_content] = useState("Public");
  const handleSubmit = (e) => {
    e.preventDefault();
    const twitter =[twitter_content,Public_content] //to be added account information ????

    console.log(twitter) // send to backend 
    
  }
    return(
      <div className="menulist-container">
        <ul className="sidebarlist">
          <li className="headicon">
            {" "}
            <div>icon here</div>
            {" "}
          </li>
          {menulist_component.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                id={window.location.pathname == val.link ? "active" : " "}
                onClick={() => { window.location.pathname = val.link; } }>
                {" "}
                <div id="icon">{val.icon}</div>{" "}<div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
        <button
          className="sidebarlist-button"
          onClick={() => setButtonPopup(true)}>
          Tweet
        </button>
        <main>
        <Popup trigger={buttonPopup}>
          <div className="twitter-form">
            <form onSubmit={handleSubmit}> 
              <label>
              Twitter_content:
              </label>
              <textarea
                required
                placeholder="Enter twitter here..."
                value={twitter_content}
                onChange={(e) => setTwitter_content(e.target.value)}
              />
              <label>Set to Public/ Private </label>
              <select
              value={Public_content}
              onChange={(e) => setPublic_content(e.target.value)}
              >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
              </select>
              <br />
              <button className = "send-button">Send Twitter</button>
              <button className = "close-button" onClick={ () =>setButtonPopup(false)}>
                close</button>
            </form>
          </div>
        </Popup>
        </main>
        </div>
        
    ); //head icons and button to be added, send button and clos button to be added
}
