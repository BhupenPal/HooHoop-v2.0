import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import SideBar from './Sidebar.jsx';

function Layout(props) {
  return (
    <>
          <Header />
          <SideBar>
          <div style={{minHeight:"80vh"}}>
            {props.children}
          </div>
          </SideBar>
          <Footer />

    </>
  );
}

export default Layout;