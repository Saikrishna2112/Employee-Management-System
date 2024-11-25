import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AdminPanel from "./components/Dashboard";
import Navigation from "./components/navigation";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployeeList";
import EmployeeEdit from "./components/EditEmployee";


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<LoginPage />} />

        {/* Route for the admin dashboard */}
        <Route path="/dashboard" element={<AdminPanel />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/edit-employee/:id" element={<EmployeeEdit />} />
        


      </Routes>
    </Router>
  );
}

export default App;
