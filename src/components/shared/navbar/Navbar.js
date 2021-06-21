import React from "react";
import logo from "../../../images/job finde logo.jpg";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-expand-md  navbar-light bg-light">
        <div className="container-fluid ">
          <Link className="navbar-brand w-25">
            <img
              src={logo}
              alt=""
              className="img-fluid "
              style={{ width: "40%" }}
            />
          </Link>

          <div className=" d-flex justify-content-end">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              <Link className="nav-link" to="/">
                Features
              </Link>
              <Link className="nav-link" to="/">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
