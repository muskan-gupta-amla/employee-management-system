import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./sweetalert-dark.css"; // Import custom dark theme CSS

const AddCategory = () => {
  const [category, setCategory] = useState("");
  const [existingCategories, setExistingCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/categories")
      .then((result) => {
        if (result.data.Status) {
          setExistingCategories(
            result.data.Result.map((c) => c.name.toLowerCase())
          );
        } else {
          console.log("Failed to fetch categories:", result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (existingCategories.includes(category.toLowerCase())) {
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

    if (category) {
      axios
        .post("http://localhost:3001/auth/add_category", { category })
        .then((result) => {
          if (result.data.Status) {
            Swal.fire({
              title: "Success!",
              text: "Category added successfully.",
              icon: "success",
              customClass: {
                popup: "dark-popup",
                title: "dark-title",
                confirmButton: "dark-confirm-button",
              },
            }).then(() => {
              navigate("/dashboard/category");
            });
          } else {
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
    } else {
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
      setError("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 pb-5">
      <div className="p-4 w-25 rounded shadow-lg">
        <h3 className="text-center mb-4" style={{ fontWeight: "bold" }}>
          Add Category
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            />
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => navigate("/dashboard/category")}
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
  );
};

export default AddCategory;
