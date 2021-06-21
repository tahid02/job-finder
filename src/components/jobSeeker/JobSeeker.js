import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const JobSeeker = () => {
  const { loggedInUser } = useContext(UserContext);
  const [appliedJob, setAppliedJob] = useState([]);
  useEffect(() => {
    fetch(
      `https://frozen-shelf-53269.herokuapp.com/jobSeekerApplied?email=${loggedInUser.email}`
    )
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
              <p>company:{applied.company}</p>
              <p>job title: {applied.job_title}</p>
            </div>
          );
        })}
    </div>
  );
};

export default JobSeeker;
