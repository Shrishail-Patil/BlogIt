import React, { useEffect, useState } from 'react'
import "../comp_css/blogview.css"
const BlogView = () => {
    const [blog, setBlog] = useState([]);

    const getBlog = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/home/blogview`, {
            method: "GET",
            headers: {
              authtoken: localStorage.getItem("token"),
              bID: localStorage.getItem("bID")
            },
          });
          const gotblog= await response.json();
          setBlog(gotblog);
          console.log(blog);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        getBlog()
      },[])
      const likeBlog = () =>{
        
      }

  return (
    <div>
      <div className="blog-col">
          <div className="blog" key={blog._id}>
            <div className="blogpost">
            <div className="blog-body">
              <h1 className="blog-title">{blog.title}</h1><hr />
              <h5 className="blog-text">{blog.blog}</h5>
              <h7 className="blog-text">
                 posted by : {blog.userID}<br />
              </h7>
            </div>
            </div>
            </div>
            </div>
      <button onClick={()=>{alert("This option will be available soon...")}}>Like ❤️</button>
    </div>
  )
}

export default BlogView
