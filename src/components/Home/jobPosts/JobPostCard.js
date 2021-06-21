import React from "react";

const JobPostCard = (props) => {
  // console.log("props", props);
  const { company, date_posted, email, position, experience_level } = props;
  return (
    <div style={{ backgroundColor: "yellow", margin: "10px" }}>
      <p>{company}</p>
      <p>{experience_level}</p>
      <p>{date_posted}</p>
      <p>{email}</p>
      <p>{position}</p>
    </div>
  );
};

export default JobPostCard;
