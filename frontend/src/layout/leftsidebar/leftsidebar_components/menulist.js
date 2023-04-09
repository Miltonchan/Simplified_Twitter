import React from "react";
import HomeIcon from "./icons/homeIcon.png";
import ExploreIcon from "./icons/exploreIcon.png";
import NotificationIcon from "./icons/notificationIcon.png";
import MessagesIcon from "./icons/messagesIcon.png";
import ProfileIcon from "./icons/profileIcon.png";
import MoreIcon from "./icons/moreIcon.png";

const h = 23;
const w = 23;

export const menulist_component = [
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
    link: "/notifications",
  },{
    title:"Messages",
    icon: <img src={MessagesIcon} height={h} width={w}/>,
    link: "/messages",
  },{
    title:"Profile",
    icon: <img src={ProfileIcon} height={h} width={w}/>,
    link: "/profile",
  },{
    title:"More",
    icon: <img src={MoreIcon} height={h} width={w}/>,
    link: "/more",
  },
]


