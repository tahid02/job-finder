import React, { useState } from "react";
import JobPostCard from "./JobPostCard";
import { FakePosts } from "../../../Fake_job_posts";
const JobPost = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  console.log(FakePosts);

  const handleJobFilter = (selectedJob) => {
    console.log("filter job", selectedJob);

    const filteredPosts = FakePosts.filter(
      (job) => job.experience_level === selectedJob // if user select all , then filteredPosts will an empty array. so ,filteredJobs.length will be false.
    );
    setFilteredJobs(filteredPosts);
  };
  return (
    <div>
      <div>
        <select
          // className={status === "Pending" ? "btn btn-danger p-0" : status === "Done" ? "btn btn-success p-0" : "btn btn-info p-0" }
          // defaultValue={status}
          style={{ padding: "0px", height: "40%", width: "" }}
          onChange={(e) => handleJobFilter(e.target.value)}
        >
          {/* <option className="  text-dark">Front end </option>
          <option className="text-dark">Back end</option>
          <option className="text-dark">Javascript</option>
          <option className=" text-dark">node.js</option>
          <option className=" text-dark">ux/ui designer</option>
          <option className=" text-dark">Digital Marketing </option>
          <option className=" text-dark">Video Editing </option> */}
          <option className="  text-dark">All</option>
          <option className="  text-dark">Mr</option>
          <option className="text-dark">Ms</option>
          <option className="text-dark">Dr</option>
          <option className=" text-dark">node.js</option>
          <option className=" text-dark">ux/ui designer</option>
          <option className=" text-dark">Digital Marketing </option>
          <option className=" text-dark">Video Editing </option>
        </select>
      </div>
      here all job post will load
      {filteredJobs.length
        ? filteredJobs.map((post) => <JobPostCard {...post} key={post.id} />)
        : FakePosts.map((post) => <JobPostCard {...post} key={post.id} />)}
    </div>
  );
};

export default JobPost;
