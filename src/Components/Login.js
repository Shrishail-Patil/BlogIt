import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../comp_css/login-signup.css';

const Login = ()=>{
	const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      // This prevents the user from navigating back
      navigate('/login');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

	
	const [credentials, setCredentials] = useState({email:'',password:''});
	const onChange = (e) =>{
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	  }


	// console.log(credentials)
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch(`http://localhost:4000/api/auth/login`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			email: credentials.email,
			password: credentials.password,
		  }),
		});
		const json = await response.json();
		console.log(json);
		if (json.success) {
		  //save authToken and redirect
		  localStorage.setItem("token", json.authToken);
		  navigate("/home");
		//   props.showAlert(" Logged in successfully","success")
		} else {
		//   alert("Invalid credentials");
			console.log("Invalid credentials")
		}
	  };
	

	return (
		<div className='auth'>
		<div className="wrapper signIn">
			<div className="illustration">

			</div>
			<div className="form">
				<div className="heading">LOGIN</div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">E-Mail</label>
						<input type="email" id="name" name='email' placeholder="Enter your e-mail" onChange={onChange}/>
					</div>
					<div>
						<label htmlFor="e-mail">Password</label>
						<input type="password" id="e-mail" name='password' placeholder="Enter you password" onChange={onChange}/>
					</div>
					<button type="submit">
						Submit
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/signup"> Sign Up </Link>
				</p>
			</div>
		</div>
		</div>

	);
}

export default Login