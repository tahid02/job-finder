import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PostJob = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    let job_post = {
      ...data,
      job_post_date: new Date().toLocaleDateString(),
      job_post_status: "pending",
    };
    console.log(job_post);
    uploadPost();
  };

  const uploadPost = () => {};
  // const employee = (e) => {
  //   console.log(e.target.value);
  //   if (e.target.value === "Internship") {
  //     setShow(true);
  //   }
  // };
  return (
    <div>
      <div>post job here</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("job_title", { required: true })}
          placeholder="Job Title"
        />
        {errors.job_title && (
          <span className="error">service type is required</span>
        )}

        <input
          {...register("company", { required: true })}
          placeholder="Job Title"
        />
        {errors.company && (
          <span className="error">company name is required</span>
        )}

        <input
          type="number"
          {...register("salary", { required: true, min: 15000, max: 80000 })}
          placeholder="enter salary"
        />
        {errors.salary && (
          <span className="error">
            price is required and must be between 15000 to 80000
          </span>
        )}
        <input
          type="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        {/* {errors.email && errors.email.message} */}
        {errors.email && <span className="error">email is required</span>}

        <input
          {...register("requirements", { required: true })}
          placeholder="job requirements"
        />
        {errors.requirements && (
          <span className="error">job requirements is required</span>
        )}

        <select
          {...register("job_type", { required: true })}
          // onChange={() => employee()}
        >
          <option value="fullTime">Full Time</option>
          <option value="partTime">Part Time</option>
          <option value="internship">Internship</option>
        </select>
        {errors.job_type && <span className="error">job type is required</span>}

        <select {...register("experience_level", { required: true })}>
          <option value="Entry">entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior </option>
        </select>
        {errors.experience_level && (
          <span className="error">experience level is required</span>
        )}

        <input type="submit" value="post job" />
      </form>
      {show && <div>it will show if internship ins called</div>}
    </div>
  );
};
export default PostJob;
