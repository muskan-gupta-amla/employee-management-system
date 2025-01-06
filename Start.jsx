import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./start.css";
import { FaUserTie, FaUserShield } from "react-icons/fa";

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/verify")
      .then((result) => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/employee_detail/" + result.data.id);
          }
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid  ">
          <Link className="navbar-brand" to="/">
            Employee Management System
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/employee_login">
                  Employee Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/adminlogin">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-center align-items-center vh-100 loginPage pb-5  ">
       
          <div className="p-3 rounded border border-dark shadow loginForm">
            <h2 className="text-center my-1">Login As</h2>
            <div className="d-flex justify-content-around p-4">
             
              <div
                className="text-center cursor-pointer px-5"
                onClick={() => navigate("/employee_login")}
              >
                <FaUserTie size={120} className="text-light" />
                <h5 className="mt-2">Employee</h5>
              </div>
             
              <div
                className="text-center cursor-pointer px-5"
                onClick={() => navigate("/adminlogin")}
              >
                <FaUserShield size={120} className="text-light" />
                <h5 className="mt-2">Admin</h5>
              </div>
            </div>
          
        </div>
      </div>
      <footer className="bg-dark text-light text-center py-3">
        <p className="mb-0">
          © {new Date().getFullYear()} Employee Management System. All rights
          reserved.
        </p>
      </footer>
    </>
  );
};

export default Start;
