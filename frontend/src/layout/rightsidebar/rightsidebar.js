import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";

import React from "react";
import Search from './rightsidebar_components/search';

class RightSideBar extends React.Component {
  render() {
    return(
      <rightsidebar>
        <Router>
          <Routes>
          <Route index element={<Search />} />
          <Route path="/*" element = {<Search/>} />
          </Routes>
        </Router>
      </rightsidebar>
    );
  }
}
export default RightSideBar;
