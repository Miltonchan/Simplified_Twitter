import React from "react"
import Header from "./header/header"
import Footer from "./footer/footer"
import LeftSideBar from "./leftsidebar/leftsidebar"
import RightSideBar from "./rightsidebar/rightsidebar"

class Layout extends React.Component {
  render(){
    return (
      <>
        <Header />
          <LeftSideBar/>
            <main>{this.props.children}</main>
          <RightSideBar/>
        <Footer />
      </>
    )
  }
}

export default Layout;
