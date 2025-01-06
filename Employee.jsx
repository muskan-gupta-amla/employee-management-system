import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sweetalert-dark.css"; // Import custom CSS for SweetAlert dark theme

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    axios
      .get("http://localhost:3001/auth/category")
      .then((result) => {
        if (result.data.Status) {
          const categoryMap = result.data.Result.reduce((acc, category) => {
            acc[category.id] = category.name;
            return acc;
          }, {});
          setCategories(categoryMap);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the employee permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "dark-popup",
        title: "dark-title",
        confirmButton: "dark-confirm-button",
        cancelButton: "dark-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3001/auth/delete_employee/${id}`)
          .then((response) => {
            if (response.data.Status) {
              Swal.fire({
                title: "Deleted!",
                text: "The employee has been deleted.",
                icon: "success",
                customClass: {
                  popup: "dark-popup",
                  title: "dark-title",
                  confirmButton: "dark-confirm-button",
                },
              });
              setEmployee(employee.filter((e) => e.id !== id));
            } else {
              Swal.fire({
                title: "Error!",
                text: response.data.Error,
                icon: "error",
                customClass: {
                  popup: "dark-popup",
                  title: "dark-title",
                  confirmButton: "dark-confirm-button",
                },
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting.",
              icon: "error",
              customClass: {
                popup: "dark-popup",
                title: "dark-title",
                confirmButton: "dark-confirm-button",
              },
            });
          });
      }
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Employee List</h3>
        <Link
          to="/dashboard/add_employee"
          className="btn btn-dark btn-lg rounded-pill"
        >
          <i className="fas fa-plus me-2"></i> Add Employee
        </Link>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <table className="table table-striped table-hover border shadow">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date of Joining</th>
                <th>Address</th>
                <th>Category</th>
                <th>Salary</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((e) => (
                <tr key={e.id}>
                  <td className="text-capitalize">{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.formatDate}</td>
                  <td className="text-capitalize">{e.address}</td>
                  <td className="text-capitalize">
                    {categories[e.category_id] || "Unknown"}
                  </td>
                  <td>${e.salary}</td>
                  <td>{e.contact}</td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/${e.id}`}
                      className="btn btn-sm me-2"
                      title="Edit Employee"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleDelete(e.id)}
                      title="Delete Employee"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {employee.length === 0 && (
            <div className="text-center mt-4">
              <p className="text-muted">No employees found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Employee;
