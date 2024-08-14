import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import '../comp_css/navbar.css'

const Navbar = () => {
  
  const [name, setName] = useState("");
  // const navigate = useNavigate()

  const getusername = async() =>{
    try {
      const response = await fetch("http://localhost:4000/api/auth/getdetails", {
        method: "GET",
        headers: {
          authtoken: localStorage.getItem("token"),
        },
      });
      const user = await response.json();
      setName(user.name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getusername();
  },[])

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    {/* <Link className="navbar-brand" to="/home">Navbar</Link> */}
    <Link to='/home' className="navbar-brand">Blogit!</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/myblogs">My Blogs</Link>
        </li>
      </ul>
      
        <p className='user-name'>{name}</p>
      <form className="options d-flex" role="post">
        {/* <button className='user-details' onClick={() =>{alert("hello")}}>
        <i className="fa-solid fa-user user-details"/>
        </button> */}
        <Link className="btn btn-outline-success custom-link" type="submit" to='/postblog'>Post Blog</Link>
        <Link className="btn btn-outline-danger custom-link" type="submit" to='/login' onClick={()=>{
            localStorage.clear()
        }}>Sign Out</Link>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar
