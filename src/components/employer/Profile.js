import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../APP";
// import { Link } from "react-router-dom";
import PostJob from "./PostJob";
const Profile = () => {
  const { loggedInUser } = useContext(userContext);
  const [singleUser, setSingleUser] = useState([]);
  const { name, photoURL, email } = loggedInUser;

  useEffect(() => {
    fetch(`http://localhost:5000/user?email=${loggedInUser.email}`)
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
      {singleUser.length && (
        <div>
          <p>{singleUser[0].employerDetails.employerData.company_name}</p>
          <p>{singleUser[0].employerDetails.accountTypePrice[0]}</p>
          <div>
            <PostJob
              email={email}
              company={singleUser[0].employerDetails.employerData.company_name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
