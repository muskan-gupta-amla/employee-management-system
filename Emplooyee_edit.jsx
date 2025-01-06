import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Employee_edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    doj: "",
    address: "",
    contact: "",
    category_id: "",
  });
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [errors,setErrors] = useState();
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

    axios
      .get("http://localhost:3001/auth/employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          doj: result.data.Result[0].doj.split("T")[0],
          salary: result.data.Result[0].salary,
          contact: result.data.Result[0].contact,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/auth/edit_employee/" + id, employee)
      .then((result) => {
        if (result.data.Status) {
          navigate("/employee_detail/" + id);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };
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
            </ul>
          </div>
        </div>
      </nav>
      <div className="text-center pt-4  ">
        <h2>Edit Employee</h2>
        <form
          className="row g-2 w-50 text-start m-auto p-4"
          onSubmit={handleSubmit}
        >
          <div className="col-6 pe-3">
            <label htmlFor="inputName" className="form-label ">
              Name
            </label>
            <input
              type="text"
              className="form-control shadow"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-6 pe-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control shadow"
              id="inputEmail="
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-6 pe-3">
            <label htmlFor="inputDOJ" className="form-label">
              Date of Joining
            </label>
            <input
              type="date"
              className="form-control shadow"
              id="inputDOJ"
              placeholder="Enter Date of Joining"
              autoComplete="off"
              value={employee.doj}
              onChange={(e) =>
                setEmployee({ ...employee, doj: e.target.value })
              }
            />
          </div>
          <div className="col-6 pe-3">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control shadow"
              id="inputAddress"
              placeholder="Nagpur"
              autoComplete="off"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-6 pe-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              autoComplete="off"
              className="form-select shadow"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
              value={employee.category_id}
            >
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-6 pe-3">
            <label htmlFor="inputContact" className="form-label">
              Contact
            </label>
            <input
              type="text"
              className="form-control shadow-sm"
              id="inputContact"
              placeholder="Enter Contact"
              maxLength="10"
              autoComplete="off"
              value={employee.contact} // Ensure the value is controlled
              onChange={(e) => {
                const value = e.target.value;

                // Allow only numbers using regex and limit the length to 10
                if (/^\d*$/.test(value) && value.length <= 10) {
                  setErrors({ ...errors, contact: "" });
                  setEmployee({ ...employee, contact: value });
                }
              }}
            />
          </div>
          <div className=" col-12 text-end mb-2">
            <button type="submit" className="btn btn-dark mt-2 shadow">
              Save
            </button>
          </div>
        </form>
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

export default Employee_edit;
