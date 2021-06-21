import React, { useState, useContext } from "react";
import JobPostCard from "./JobPostCard";
import { userContext } from "../../../App";

const JobPost = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { allJobPost } = useContext(userContext);
  const approvedJobPost = allJobPost.filter(
    (jobPost) => jobPost.status === "approved"
  );

  const handleJobFilter = (selectedJob) => {
    console.log("filter job", selectedJob);

    const filteredPosts = allJobPost.filter(
      (job) => job.experience_level === selectedJob // if user select all , then filteredPosts will an empty array. so ,filteredJobs.length will be false.
    );
    setFilteredJobs(filteredPosts);
  };
  return (
    <div>
      <div>
        <select
          style={{ padding: "0px", height: "40%", width: "" }}
          onChange={(e) => handleJobFilter(e.target.value)}
        >
          <option className="  text-dark">Front end </option>
          <option className="text-dark">Back end</option>
          <option className="text-dark">Javascript</option>
          <option className=" text-dark">node.js</option>
          <option className=" text-dark">ux/ui designer</option>
          <option className=" text-dark">Digital Marketing </option>
          <option className=" text-dark">Video Editing </option>
        </select>
      </div>
      here all job post will load
      {filteredJobs.length
        ? filteredJobs.map((post) => <JobPostCard {...post} key={post.id} />)
        : approvedJobPost.map((post) => (
            <JobPostCard post={post} key={post._id} />
          ))}
    </div>
  );
};

export default JobPost;
