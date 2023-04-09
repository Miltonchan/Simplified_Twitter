import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";

import React from "react";
import {menulist_component} from './leftsidebar_components/menulist';
import './leftsidebar.css'; // changed name ./leftsidebar.css from ./menulist.css


function LeftSideBar() {
    return(
      <div className="leftsidebar">
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
        <button className="button">
        Tweet
        </button> 
      </div>
      
    ); //head icons and button to be added
  }
export default LeftSideBar;
