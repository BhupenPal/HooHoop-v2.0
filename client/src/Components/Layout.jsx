import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

function Layout(props) {
  return (
    <>
          <Header />
          <div style={{minHeight:"80vh"}}>
            {props.children}
          </div>
          <Footer />

    </>
  );
}

export default Layout;