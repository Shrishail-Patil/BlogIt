import React from 'react'
import { Link } from 'react-router-dom'
import "../comp_css/TEST.css"
const TEST = () => {
  return (
    <div className='canvas'>
    <div className='card_'>
        <div className="illustration">
        <img src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=1380&t=st=1716658185~exp=1716658785~hmac=e1d551406890db51d9132c94601211d00b8939500f1e86fdaf5c09e5490b9aad" alt="illustration" />
        </div>
        <div className="form">
            <form action="">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" placeholder='Enter your email'/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" id="password" placeholder='Enter your password'/>
                <button type="submit">LOGIN</button>
                New here ? <Link to="/signup">Sign Up</Link>
            </form>
        </div>
    </div>
    </div>
  )
}

export default TEST
