import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyBlogs = () => {
  const navigate = useNavigate()
  const[blog, setBlog] = useState([])

  const delBlog = async(id) =>{
    const confirmation = window.confirm('You sure bro??')
    if (confirmation){
      await fetch(`http://localhost:4000/api/home/deleteBlog/${id}`,{
      method:'DELETE',
      headers:{
        "authtoken": localStorage.getItem('token')
      }
    }
    )
    // window. location. reload(); 
    alert("Blog deleted!!");
    }
  }
  // const editBlog = async(id) =>{

  //     await fetch(`http://localhost:4000/api/home/editblog/${id}`,{
  //     method:'PUT',
  //     headers:{
  //       "authtoken": localStorage.getItem('token'),
  //       "Content-Type" : "application/json"
  //     },
  //     body:{

  //     }
  //   }
  //   )
  //   // window. location. reload(); 
  //   alert("Blog deleted!!");
    
  // }
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  useEffect(()=>{
    getMyBlogs()
  },[blog])

  const getMyBlogs = async() =>{
    const response  =await fetch('http://localhost:4000/api/home/getUserBlogs',{
      method:"GET",
      headers:{
        "authtoken":localStorage.getItem('token'),
      }
    })

    const blogs = await response.json();
    setBlog(blogs);
  }
  const navEdit = (id) =>{
    navigate('/updateblog')
    localStorage.setItem("bID",id)
  }

  return (
    <div className='feed'>
      <div className="row row-cols-1 row-cols-md-3 g-4">
      {blog.map(function(data){
        return (
          <div className="col">
          <div className="card" key={data._id}>
            <div className="blogpost">
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">{truncateText(data.blog, 200)}</p>
              <p className="card-text">
                 posted by : {data.userID}<br />
                 <small className="text-body-secondary">
                Date : {data.date.split("T")[0]} <br />Time : {data.date.split("T")[1]}
                </small>
              </p>
              <button onClick={()=> {navEdit(data._id)}} className='mx-3'>Edit blog</button> {/*--- work to be done ---*/}
              <button onClick={()=> delBlog(data._id)}>Delete blog</button>
            </div>
            </div>
            </div>
            </div>
        );
      })}
      </div>
    </div>
  )
}

export default MyBlogs
