import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";

import React from "react";
import MenuList from './leftsidebar_components/menulist';

class LeftSideBar extends React.Component {
  render() {
    return(
      <leftsidebar>
        <Router>
          <Routes>
          <Route index element={<MenuList />} />
          <Route path="/*" element = {<MenuList/>} />
          </Routes>
        </Router>
      </leftsidebar>
    );
  }
}
export default LeftSideBar;
