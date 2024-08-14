import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../comp_css/login-signup.css'

const Signup = (props) =>{
  const [credentials, setCredentials] = useState({name:'',email:'',password:''});
  const navigate = useNavigate();
  const handleSubmit = async(e) =>{
    try {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch("http://localhost:4000/api/auth/signup",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          name:name,
          email:email,
          password:password
      })
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      localStorage.setItem("token", json.authToken)
      navigate("/")
    }
    else{
      console.log("Error occured!")
    }

    } catch (error) {
      
    }
  }

  const onChange = (e) =>{
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  
  return (
    <div className="auth">
  <form onSubmit={handleSubmit}>
  <div className="wrapper signUp">
    <div className="illustration">
      <img src="https://source.unsplash.com/random" alt="illustration" />
    </div>
    <div className="form">
      <div className="heading">CREATE AN ACCOUNT</div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" onChange={onChange}/>
        </div>
        <div>
          <label htmlFor="name">E-Mail</label>
          <input type="text" id="email" name="email" placeholder="Enter your mail" onChange={onChange}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Enter you password"
            onChange={onChange}
          />
        </div>
        <button type="submit">Submit</button>

        <h2 align="center" className="or">
          OR
        </h2>
      <p>
        Have an account ? <Link to="/login"> Login </Link>
      </p>
    </div>

  </div>
  </form>
  </div>)
}


export default Signup


