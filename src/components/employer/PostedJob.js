import { useEffect, useState } from "react";

const PostedJob = (props) => {
  const [employerPosts, setEmployerPosts] = useState([]);
  const email = props.email;

  useEffect(() => {
    fetch(`http://localhost:5000/employerPost?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("user rented data ", data);
        setEmployerPosts(data);
        console.log("employer posted job", employerPosts);
      });
  }, []);
  return (
    <div>
      hello all from employer posted job
      {/* {
                employerPosts.map( post =>{
                    return 
                })
            } */}
    </div>
  );
};
export default PostedJob;
