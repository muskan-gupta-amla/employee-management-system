import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Swal from "sweetalert2";
import "./sweetalert-dark.css";

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Function to return a greeting based on the time of day
  const getGreetingMessage = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return "Good Morning";
    if (hours >= 12 && hours < 16) return "Good Afternoon";
    if (hours >= 16 && hours < 20) return "Good Evening";
    return "Good Night";
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/category")
      .then((result) => {
        setCategories(result.data.Result);
      })
      .catch((err) => console.error("Error fetching categories:", err));

    axios
      .get(`http://localhost:3001/employee/detail/${id}`)
      .then((result) => {
        if (result.data[0]) {
          setEmployee(result.data[0]);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/employee_login");
        }
      });
  }, [id]);

  const handleLogout = (e) => {
    e.preventDefault();

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
          .get("http://localhost:3001/employee/logout")
          .then((result) => {
            if (result.data.Status) {
              navigate("/");
            }
          })
          .catch((err) => console.error("Error during logout:", err));
      }
    });
  };

  if (!employee || !categories.length) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h3>Loading...</h3>
      </div>
    );
  }

  const category = categories.find((cat) => cat.id === employee.category_id);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <strong>Employee Management System</strong>
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="btn btn-danger nav-link text-light"
                  onClick={handleLogout}
                >
                  Employee Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <h3 className="text-center text-capitalize mb-4">{`${getGreetingMessage()}, ${
          employee.name
        }!`}</h3>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg rounded-lg">
              <div className="card-body ">
                <img
                  src="/Images/download.png"
                  alt={`${employee.name}'s profile`}
                  className="img-fluid rounded-circle mb-3"
                  style={{ width: "150px", height: "150px" }}
                />
                <h2 className="text-capitalize mb-3">{employee.name}</h2>
                <p className="text-muted">{employee.email}</p>
                <p className="text-muted">Contact : {employee.contact}</p>
                <p className="text-muted text-capitalize">{employee.address}</p>
                <p className="text-muted text-capitalize">
                  Category: {category ? category.name : "Not Available"}
                </p>
                <p className="text-muted">
                  Date of Joining:{" "}
                  {new Date(employee.doj).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>

                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => navigate(`/employee_edit/${id}`)}
                  >
                    Edit Profile
                  </button>
                  <button className="btn btn-dark" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetail;
