import React, { useEffect, useState } from "react";
import '../comp_css/feed.css';
import { useNavigate } from "react-router";

const Feed = () => {
  const navigate = useNavigate();
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    getFeed();
  }, []); // Empty dependency array to avoid infinite loop

  const getFeed = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/home/feed", {
        method: "GET",
        headers: {
          authtoken: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const blogs = await response.json();
      setFeed(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const openBlog = (id) => {
    localStorage.setItem("bID", id);
    navigate('/blogview');
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="feed">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {feed.map((data) => (
          // <button onClick={() => { openBlog(data._id) }} key={data._id}>
            <div className="col" key={data._id}>
              <div className="card">
                <div className="blogpost" onClick={() => { openBlog(data._id) }}>
                  <div className="card-body">
                    <h3 className="card-title">{data.title}</h3>
                    <hr />
                    <p className="card-text">
                      {truncateText(data.blog, 200)} {/* Adjust maxLength to control how much content to show */}
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">posted by: {data.userID}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          // </button>
        ))}
      </div>
    </div>
  );
};

export default Feed;