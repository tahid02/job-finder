import React, { useState } from "react";

const AdminCard = (props) => {
  const [status, setStatus] = useState(props.post.status);

  const handleStatusChange = (jobStatus) => {
    console.log(jobStatus);
    setStatus(jobStatus);

    fetch(
      `https://frozen-shelf-53269.herokuapp.com/statusUpdate/${props.post._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobStatus }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result) {
          console.log(" status updated successfully");
        }
      })
      .catch((err) => console.log("status error", err));
  };
  return (
    <div>
      <p>{props.post.job_title}</p>

      <select
        className={
          status === "Pending"
            ? "btn btn-danger p-0"
            : status === "Done"
            ? "btn btn-success p-0"
            : "btn btn-info p-0"
        }
        defaultValue={status}
        style={{ padding: "0px", height: "40%", width: "" }}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option className="bg-danger  text-dark">Pending</option>
        <option className="bg-info  text-dark">On going</option>
        <option className="bg-success  text-dark">Done</option>
      </select>
    </div>
  );
};

export default AdminCard;
