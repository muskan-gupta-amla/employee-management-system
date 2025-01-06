import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./assets/Components/Login";
import Dashboard from "./assets/Components/dashboard";
import Home from "./assets/Components/Home";
import Employee from "./assets/Components/Employee";
import Profile from "./assets/Components/Profile";
import Category from "./assets/Components/Category";
import AddCategory from "./assets/Components/AddCategory";
import AddEmployee from "./assets/Components/AddEmployee";
import EditEmployee from "./assets/Components/EditEmployee";
import Start from "./assets/Components/start";
import EmployeeLogin from "./assets/Components/EmployeeLogin";
import EmployeeDetail from "./assets/Components/EmployeeDetail";
import Emplooyee_edit from "./assets/Components/Emplooyee_edit";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>

        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/employee_detail/:id" element={<EmployeeDetail />}></Route>
        <Route path="/employee_edit/:id" element={<Emplooyee_edit/>}></Route>


        <Route path="/employee_login" element={<EmployeeLogin />}></Route>
        
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route
            path="/dashboard/add_category"
            element={<AddCategory />}
          ></Route>
          <Route
            path="/dashboard/add_employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          ></Route>
        </Route>
        <Route path="" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
