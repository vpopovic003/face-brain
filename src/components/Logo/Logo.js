import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className='tilt center'>
        <div style={{ height: '150px', backgroundColor: 'white' }}>
          <img style={{paddingTop: '25px'}} src={brain} alt='logo'/>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo