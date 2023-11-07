/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./viewPage.css";
import { useParams } from "react-router-dom";
export default function ViewPage() {
  const { id } = useParams();
  const [viewdata, setViewdata] = useState([]);
  const [bloglike, setBloglike] = useState(0);
  const [ viewlike,setViewlike] = useState("")

  useEffect(() => {
    console.log("View data", viewdata);
  }, [viewdata]);
  useEffect(() => {
    fetch(`http://localhost:2004/blogview/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setViewdata(data);
      })
      .catch((error) => {
        console.log(error, " failed to fetch");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inside your BlogPage component
  const handleLikeClick = (id) => {
    fetch(`http://localhost:2004/like/${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        setBloglike(data.BlogLike);
        console.log("Data", data);
      })
      .catch((error) => {
        console.error("Failed to like the blog post:", error);
      });
  };

  
  useEffect(() => {
    console.log("view likedata", viewlike);
  }, [viewlike]);
  useEffect(() => {
    fetch(`http://localhost:2004/displaylike/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("like data", data);
        setViewlike(data);
      })
      .catch((error) => {
        console.log(error, " failed to fetch");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="viewPage-main">
      <div className="viewPage-sub1">
        <div className="img-div">
          <img className="viewPage-img" src={viewdata.Blogimg} alt="img" />
        </div>
        <div className="viewPage-divimg">
          <div className="viewpage-label">
            <h1 style={{ margin: "0" }} className="ViewPage-h1">
              {viewdata.BlogName}
              {" :-"}
            </h1>
          </div>
          <p className="ViewPage-para">{viewdata.BlogContent}</p>
        </div>
      </div>
      <div className="ViewPage-btn-div">
        <div className="ViewPage-like">
          <button className="like-btn" onClick={() => handleLikeClick(id)}>
            Like{viewlike.BlogLike}
          </button>
        </div>
        <div className="viewPage-comment">
          <button className="comment-btn">Comment</button>
        </div>
      </div>
    </div>
  );
}
