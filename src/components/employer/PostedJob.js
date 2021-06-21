import { useEffect, useState } from "react";

const PostedJob = (props) => {
  const [employerPosts, setEmployerPosts] = useState([]);
  const email = props.email;

  useEffect(() => {
    fetch(
      `https://frozen-shelf-53269.herokuapp.com/employerPost?email=${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("user rented data ", data);
        setEmployerPosts(data);
        console.log("employer posted job", employerPosts);
      });
  }, []);
  return (
    <div>
      employer posted job
      {employerPosts.map((post) => {
        return (
          <div>
            <p>{post.job_title}</p>
            <p>{post.job_type}</p>
            <p>{post.experience_level}</p>
            <p>{post.status}</p>
          </div>
        );
      })}
    </div>
  );
};
export default PostedJob;
