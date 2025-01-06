// import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import "./sweetalert-dark.css"; 

const Dashboard = () => {
  axios.defaults.withCredentials = true;
const navigate = useNavigate()
  const handleLogout = () => {
     Swal.fire({
          title: "Are you sure you want to log out?",
          text: "You will be redirected to the login page.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, log me out",
          cancelButtonText: "No, stay logged in",
          reverseButtons: true,
          customClass: {
            popup: "dark-popup",
            title: "dark-title",
            confirmButton: "dark-confirm-button",
          },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("http://localhost:3001/auth/logout")
          .then((result) => {
            if (result.data.Status) {
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };


  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <FaUserShield size={60} className="text-light" />
              <h5 className="px-3 pt-4">Admin User </h5>
            </a>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link
                  to="/dashboard"
                  data-bs-toggle="collapse"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2"></i>
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/employee"
                  data-bs-toggle="collapse"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-people"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    Manage Employee
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns"></i>
                  <span className="ms-1 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person"></i>
                  <span className="ms-1 d-none d-sm-inline">Profile</span>
                </Link>
              </li> */}
              <li onClick={handleLogout}>
                <Link className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power"></i>
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Management System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
