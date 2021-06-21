import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../APP";
// import { Link } from "react-router-dom";
import PostJob from "./PostJob";
import PostedJob from "./PostedJob";
import Admin from "../admin/Admin";
import JobSeeker from "../jobSeeker/JobSeeker";

const Profile = () => {
  const { loggedInUser } = useContext(userContext);
  const [singleUser, setSingleUser] = useState([]);
  const { name, photoURL, email } = loggedInUser;

  useEffect(() => {
    fetch(
      `https://frozen-shelf-53269.herokuapp.com/user?email=${loggedInUser.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("user rented data ", data);
        setSingleUser(data);
      });
  }, [loggedInUser.email]);
  return (
    <div>
      <img src={photoURL} alt="" />
      <div>{name}</div>

      {/* if user is an employer */}
      {singleUser?.role === "employer" && (
        <div>
          <p>{singleUser[0].employerDetails.employerData.company_name}</p>
          <p>{singleUser[0].employerDetails.accountTypePrice[0]}</p>
          <div>
            <PostJob
              email={email}
              company={singleUser[0].employerDetails.employerData.company_name}
            />
            <PostedJob email={email} />
          </div>
        </div>
      )}

      {/* if user is seeking for job */}
      {singleUser?.role === "jobSeeker" && <JobSeeker />}

      {/* if user is an admin */}
      {singleUser?.role === "admin" && <Admin />}
    </div>
  );
};

export default Profile;
