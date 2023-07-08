import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import pic2 from './pic2.png'

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: '100px', width: '100px' }} >
                <div className="Tilt-inner">
                    <img style={{ paddingTop: '15px' }} alt="logo" src={pic2} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;