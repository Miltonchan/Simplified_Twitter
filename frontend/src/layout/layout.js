import React from "react"
import Header from "./header/header"
import Footer from "./footer/footer"
import LeftSideBar from "./leftsidebar/leftsidebar"
import RightSideBar from "./rightsidebar/rightsidebar"
import './layout.css';

class Layout extends React.Component {
  render(){
    return (
      <>
        <Header />
          <div className="layout-content-wrapper">
            <div className="layout-left-sidebar">
              <LeftSideBar/>
            </div>
            <div className="layout-content">
              <main>{this.props.children}</main>
            </div>
            <div className="layout-right-sidebar">
              <RightSideBar/>
            </div>
          </div>
        <Footer />
      </>
    )
  }
}

export default Layout;
