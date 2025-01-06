import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./sweetalert-dark.css"; 

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:3001/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          console.log("Failed to fetch categories:", result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!category.trim()) {
      Swal.fire({
        title: "Warning!",
        text: "Please enter a valid category name.",
        icon: "warning",
        customClass: {
          popup: "dark-popup",
          title: "dark-title",
          confirmButton: "dark-confirm-button",
        },
      });
      return;
    }

    if (
      categories.some((c) => c.name.toLowerCase() === category.toLowerCase())
    ) {
      Swal.fire({
        title: "Error!",
        text: "Category already exists.",
        icon: "error",
        customClass: {
          popup: "dark-popup",
          title: "dark-title",
          confirmButton: "dark-confirm-button",
        },
      });
      return;
    }

    axios
      .post("http://localhost:3001/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          Swal.fire({
            title: "Success!",
            text: "Category added successfully.",
            icon: "success",
          }).then(() => {
            setCategory("");
            fetchCategories(); 
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to add category.",
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
          text: "An error occurred while adding the category.",
          icon: "error",
          customClass: {
            popup: "dark-popup",
            title: "dark-title",
            confirmButton: "dark-confirm-button",
          },
        });
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center mb-4">
        <h3>Category Management</h3>
      </div>

      <div className="mb-4">
        <div className="card shadow p-4 w-75 m-auto">
          <h5 className="text-center mb-3">Add New Category</h5>
          <form onSubmit={handleAddCategory}>
            <div className="mb-3">
              <input
                type="text"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter Category"
                className="form-control"
              />
              {error && <p className="text-danger mt-2">{error}</p>}
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                
                className="btn btn-secondary px-4"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-dark px-4">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <h5 className="text-center mb-3">Category List</h5>
        <table className="table table-striped table-hover border w-75 m-auto shadow">
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody className="text-capitalize">
            {categories.map((c, index) => (
              <tr key={index}>
                <td>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;
