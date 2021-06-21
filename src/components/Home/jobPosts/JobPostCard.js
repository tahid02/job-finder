import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../App";
const JobPostCard = ({ post }) => {
  const { loggedInUser } = useContext(UserContext);
  const { company, experience_level, date_posted, email, position } = post;
  const handleJobApply = () => {
    axios
      .post("https://frozen-shelf-53269.herokuapp.com/addToApplied", {
        ...post,
        jobSeekerEmail: loggedInUser.email,
      })
      .then((res) => {
        console.log("employerInfoWithEmail", res);
      })
      .catch((error) => console.log("error employerInfoWithEmail", error));
  };
  return (
    <div style={{ backgroundColor: "yellow", margin: "10px" }}>
      <p>{company}</p>
      <p>{experience_level}</p>
      <p>{date_posted}</p>
      <p>{email}</p>
      <p>{position}</p>
      <Link to="/user/profile">
        <button onClick={() => handleJobApply()}>Apply</button>
      </Link>
    </div>
  );
};

export default JobPostCard;
