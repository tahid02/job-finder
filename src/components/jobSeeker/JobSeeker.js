import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const JobSeeker = () => {
  const { loggedInUser } = useContext(UserContext);
  const [appliedJob, setAppliedJob] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/jobSeekerApplied?email=${loggedInUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("user rented data ", data);
        setAppliedJob(data);
        console.log("employer posted job", appliedJob);
      });
  }, []);
  return (
    <div>
      you applied these jobs
      {appliedJob.length &&
        appliedJob.map((applied) => {
          return (
            <div>
              {applied.company}
              {applied.job_title}
            </div>
          );
        })}
    </div>
  );
};

export default JobSeeker;
