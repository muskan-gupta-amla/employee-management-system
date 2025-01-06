import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is included

const Home = () => {
  const [adminTotal, setAdminTotal] = useState();
  const [employeeTotal, setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, []);

  const adminRecords = () => {
    axios.get("http://localhost:3001/auth/admin_records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        alert(result.data.Error);
      }
    });
  };

  const adminCount = () => {
    axios.get("http://localhost:3001/auth/admin_count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    });
  };

  const employeeCount = () => {
    axios.get("http://localhost:3001/auth/employee_count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    });
  };

  const salaryCount = () => {
    axios.get("http://localhost:3001/auth/salary_count").then((result) => {
      if (result.data.Status) {
        setSalaryTotal(result.data.Result[0].salary);
      }
    });
  };

  return (
    <div className="container mt-5">
   
      <div className="row mb-4 text-center">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Admin</h5>
              <hr />
              <h6>Total: {adminTotal}</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Employee</h5>
              <hr />
              <h6>Total: {employeeTotal}</h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="card-title">Salary</h5>
              <hr />
              <h6>Total: ${salaryTotal}</h6>
            </div>
          </div>
        </div>
      </div>

    
      <div className="my-4">
        <h3 className="py-3">List of Admins</h3>
        <table className="table table-striped table-bordered w-50 m-auto shadow-sm text-start">
          <thead className="thead-dark">
            <tr>
              <th>Email</th>
              
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.email}>
                <td >{a.email}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
