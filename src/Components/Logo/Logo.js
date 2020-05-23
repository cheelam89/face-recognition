import React from "react";
import Tilt from "react-tilt";
import './Logo.css';
import cat from './icons8-cat-100.png'

function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 50 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa4"> <img style={{paddingTop:"5px"}} src={cat} alt="cat.png" /> </div>
      </Tilt>
    </div>
  );
}

export default Logo;