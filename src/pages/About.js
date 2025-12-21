import React from 'react'
import AboutUsBG from '../assets/aboutusBG.jpg'
import '../styles/About.css'

function About() {
  return (
    <div className="about">
        <div 
          className="aboutTop" 
          style={{ backgroundImage: `url(${AboutUsBG})` }}
          role="img" 
          aria-label="Gaming Background"
        >
        </div>
        <div className="aboutBottom">
            <div className="aboutContent">
                <h1>About Us</h1>
                <p>
                  At GameXpress, we bring you the best collection of PS4 and PC game CDs 
                  at unbeatable prices. Whether you're a casual gamer or a hardcore 
                  enthusiast, we ensure a seamless shopping experience with fast 
                  delivery and genuine products. Explore our growing catalog and 
                  level up your gaming journey today!
                </p>
            </div>
        </div>
    </div>
  )
}

export default About