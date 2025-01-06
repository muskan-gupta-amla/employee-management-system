import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { FaUserTie } from "react-icons/fa";

const EmployeeLogin = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let emailError = "";
    let passwordError = "";

    if (!values.email) {
      emailError = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      emailError = "Invalid email format.";
    }

    if (!values.password) {
      passwordError = "Password is required.";
    }

    setErrors({ email: emailError, password: passwordError });

    return !(emailError || passwordError);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    axios
      .post("http://localhost:3001/employee/employee_login", values)
      .then((res) => {
        setLoading(false);
        if (res.data.loginStatus) {
          navigate("/employee_detail/" + res.data.id);
        } else {
          setError(res.data.Error || "Login failed. Please try again.");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Employee Management System
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/adminlogin">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-center ps-5 align-items-center vh-100 loginPage">
        <div className="p-3 rounded border border-dark bg-light shadow-lg mb-5 adminloginForm">
          {error && <div className="alert alert-danger">{error}</div>}
          <FaUserTie size={80} className="text-dark" />
          <h4 className="my-2">Employee</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your Email"
                onChange={(e) => {
                  setErrors({ ...errors, email: "" });
                  setValues({ ...values, email: e.target.value });
                }}
                className="form-control"
                disabled={loading}
              />
              {errors.email && (
                <small className="text-danger ps-2">{errors.email}</small>
              )}
            </div>
            <div className="mb-3 text-start">
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                onChange={(e) => {
                  setErrors({ ...errors, password: "" });
                  setValues({ ...values, password: e.target.value });
                }}
                className="form-control"
                disabled={loading}
              />
              {errors.password && (
                <small className="text-danger ps-2">{errors.password}</small>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-dark w-100 mb-2"
              disabled={loading}
            >
              Log in
            </button>
          </form>
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

export default EmployeeLogin;
