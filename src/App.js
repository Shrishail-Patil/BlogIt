import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Postblog from './Components/Postblog';
import MyBlogs from './Components/MyBlogs';
import Updateblog from './Components/Updateblog';
import TEST from './Components/TEST';
import BlogView from './Components/BlogView';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Components/Landing';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/test" element={<><TEST/></>}/>
          <Route exact path="/" element={<><Landing/></>}/>
          <Route exact path="/login" element={<><Login/></>}/>
          <Route exact path="/signup" element={<><Signup/></>}/>
          <Route exact path="/home" element={<><Navbar/><Home/></>}/>
          <Route exact path="/myblogs" element={<><Navbar/><MyBlogs/></>}/>
          <Route exact path="/blogview" element={<><Navbar/><BlogView/></>}/>
          <Route exact path="/postblog" element={<><Navbar/><Postblog/></>}/>
          <Route exact path="/updateblog" element={<><Navbar/><Updateblog/></>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App
