import React from 'react'
import "../comp_css/landing.css"
import {useNavigate} from 'react-router-dom'
import videoSrc from '../Resources/abstract bg.mp4';

const Landing = () => {
    const navigate = useNavigate()
    localStorage.clear()
  return (
    <div className='content'>
        <video autoPlay loop muted className='video'>
            <source src={videoSrc} type='video/mp4'/>
        </video>
        <h1 className='titleh1'>BlogIt!</h1>
        <h3>Sharing Simple Thoughts, One Post at a Time</h3>
        <button className="started" onClick={()=>{
            navigate("/login")
        }}>Get Started</button>
    </div>
  )
}

export default Landing
