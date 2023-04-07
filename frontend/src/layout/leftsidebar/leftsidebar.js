import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";

import React from "react";
import MenuList from './leftsidebar_components/menulist';

class LeftSideBar extends React.Component {
  render() {
    return(
      <leftsidebar>
        <Router>
          <Routes>
          <Route path="/" element={MenuList}/>
          <Route path="/main" element={MenuList}/>
          </Routes>
        </Router>
      </leftsidebar>
    );
  }
}
export default LeftSideBar;
