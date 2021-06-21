import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import AdminCard from "./AdminCard";
const Admin = () => {
  const { allJobPost } = useContext(UserContext);

  return (
    <div>
      this is admin page
      {allJobPost.map((post) => (
        <AdminCard post={post} />
      ))}
    </div>
  );
};

export default Admin;
