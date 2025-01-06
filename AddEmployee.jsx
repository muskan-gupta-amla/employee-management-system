import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    doj: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
    contact: "",
  });

  const [category, setCategory] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const validate = () => {
    const errors = {};
    if (!employee.name) errors.name = "Name is required";
    if (!employee.email || !/\S+@\S+\.\S+/.test(employee.email))
      errors.email = "Valid email is required";
    if (!employee.password || employee.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!employee.salary || isNaN(employee.salary))
      errors.salary = "Salary must be a valid number";
    if (!employee.doj) errors.doj = "Date of Joining is required";
    if (!employee.address) errors.address = "Address is required";
    if (!employee.category_id) errors.category_id = "Category is required";
    if (!employee.contact || !/^\d{10}$/.test(employee.contact))
      errors.contact = "Contact must be a valid 10-digit number";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      axios
        .post("http://localhost:3001/auth/add_employee", employee)
        .then((result) => {
          if (result.data.Status) {
            navigate("/dashboard/employee");
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex flex-column align-items-center py-4 ">
      <h2>Add Employee</h2>
      <form className="row g-2 w-50 text-start mt-2" onSubmit={handleSubmit}>
        <div className="col-6 pe-3 ">
          <label htmlFor="inputName" className="form-label ">
            Name
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control shadow-sm"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => {
              setErrors({ ...errors, name: "" });
              setEmployee({ ...employee, name: e.target.value });
            }}
          />
          {errors.name && <p className="text-danger mb-0">{errors.name}</p>}
        </div>
        <div className="col-6 pe-3 ">
          <label htmlFor="inputEmail" className="form-label">
            Email
            <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control shadow-sm"
            id="inputEmail"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => {
              setErrors({ ...errors, email: "" });
              setEmployee({ ...employee, email: e.target.value });
            }}
          />
          {errors.email && <p className="text-danger mb-0">{errors.email}</p>}
        </div>
        <div className="col-6 pe-3 ">
          <label htmlFor="inputPassword" className="form-label">
            Password
            <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control shadow-sm"
            id="inputPassword"
            placeholder="Enter Password"
            onChange={(e) => {
              setErrors({ ...errors, password: "" });
              setEmployee({ ...employee, password: e.target.value });
            }}
          />
          {errors.password && (
            <p className="text-danger mb-0">{errors.password}</p>
          )}
        </div>
        <div className="col-6 pe-3">
          <label htmlFor="inputDOJ" className="form-label">
            Date of Joining
            <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className="form-control shadow-sm"
            id="inputDOJ"
            autoComplete="off"
            onChange={(e) => {
              const selectedDate = e.target.value;
              setErrors({ ...errors, doj: "" });
              setEmployee({ ...employee, doj: selectedDate });
            }}
          />
          {errors.doj && <p className="text-danger mb-0">{errors.doj}</p>}
        </div>

        <div className="col-6 pe-3">
          <label htmlFor="inputSalary" className="form-label">
            Salary ( in $)
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control  shadow-sm"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            onChange={(e) => {
              setErrors({ ...errors, salary: "" });
              setEmployee({ ...employee, salary: e.target.value });
            }}
          />
          {errors.salary && <p className="text-danger mb-0">{errors.salary}</p>}
        </div>
        <div className="col-6 pe-3 ">
          <label htmlFor="inputAddress" className="form-label">
            Address
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control shadow-sm"
            id="inputAddress"
            placeholder="Enter Address"
            autoComplete="off"
            onChange={(e) => {
              setErrors({ ...errors, address: "" });
              setEmployee({ ...employee, address: e.target.value });
            }}
          />
          {errors.address && (
            <p className="text-danger mb-0">{errors.address}</p>
          )}
        </div>
        <div className="col-6 pe-3">
          <label htmlFor="inputContact" className="form-label">
            Contact
            <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control shadow-sm"
            id="inputContact"
            placeholder="Enter Contact"
            maxLength="10"
            autoComplete="off"
            value={employee.contact} 
            onChange={(e) => {
              const value = e.target.value;

              
              if (/^\d*$/.test(value) && value.length <= 10) {
                setErrors({ ...errors, contact: "" });
                setEmployee({ ...employee, contact: value });
              }
            }}
          />

          {errors.contact && (
            <p className="text-danger mb-0">{errors.contact}</p>
          )}
        </div>
        <div className="col-6 pe-3">
          <label htmlFor="category" className="form-label">
            Category
            <span className="text-danger">*</span>
          </label>
          <select
            name="category"
            id="category"
            className="form-select shadow-sm"
            onChange={(e) => {
              setErrors({ ...errors, category_id: "" });
              setEmployee({ ...employee, category_id: e.target.value });
            }}
          >
            <option value="">Select Category</option>
            {category.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-danger mb-0">{errors.category_id}</p>
          )}
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-dark mt-2 shadow me-2">
            Create
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-2 shadow "
            onClick={() => navigate("/dashboard/employee")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
