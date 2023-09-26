import React from 'react';

const headerStyle = {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: '20px', // Add padding for spacing
    fontFamily: 'Arial, sans-serif', // Choose a font
  };
  
  const Header = () => {
    return (
      <header style={headerStyle}>
        <h1>Merchandise Store</h1>
      </header>
    );
  };
export default Header;
