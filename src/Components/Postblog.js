import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Postblog = () => {
  const [blog,setBlog] = useState({title:"",blog:""});
  

  const onChange = (e) =>{
    setBlog({ ...blog, [e.target.name]: e.target.value });
    // console.log(blog)
  }
  
  const navigate = useNavigate();

  const postblog = async() =>{
    const response = await fetch(`http://localhost:4000/api/home/postBlog`,{
      method:"POST",
      headers:{
        "authtoken" : localStorage.getItem('token'),
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(blog)
    });
    }
    

    const handleSubmit = () =>{
      // convertToBase64();
      postblog();
      alert("Blog posted successfully 🥳");
      navigate('/home')
  }
  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3 my-3 ">
    <label htmlFor="blog_img" className="form-label">Blog Cover Image</label>
    <input type="file" className="form-control" name="image" onChange={()=>{}} id="blog_img" accept='.jpeg, .png, .jpg' />
  </div>
  <div className="mb-3">
    <label htmlFor="blog_title" className="form-label">Title</label>
    <input required type="text" className="form-control" id="blog_title" onChange={onChange} name='title'/>
  </div>
  <div className="mb-3">
    <label htmlFor="blog_text" className="form-label">Blog</label>
    {/* <input type="text" className="form-control" id="blog_text" onChange={onChange} name='blog'/> */}
    <textarea required name="blog" className="form-control" id="blog_text" cols="30" rows="10" onChange={onChange} placeholder='Write your blog here.'></textarea>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>

</form>
  )
}

export default Postblog

