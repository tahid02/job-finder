import React, { useState } from "react";
import JobPost from "./jobPosts/JobPost";
import { Link } from "react-router-dom";
// import { FakePosts } from "../../Fake_job_posts";

const Home = () => {
  return (
    <div>
      this is home page
      <Link to="/user/profile">
        <button className="btn-success">Post a job</button>
      </Link>
      <Link to="/admin/rentList" className="link">
        <div> Rent List </div>
      </Link>
      <div></div>
      <JobPost />
    </div>
  );
};

export default Home;
