import React, { useState, useEffect } from 'react';
import '../css/employeeList.css';
import Navigation from './navigation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);  // State to store employee data
  const [searchTerm, setSearchTerm] = useState('');  // State for search input
  const navigate = useNavigate();

  // Fetch employees from the backend when the component is mounted
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees/all', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          }
        });
        setEmployees(response.data);  // Store fetched employees in state
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle "Create Employee" button click
  const handleCreateEmployeeClick = () => {
    navigate('/create-employee');
  };

  // Handle "Edit Employee" button click
  const handleEditEmployeeClick = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  // Handle "Delete Employee" button click
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
      });
      // Remove deleted employee from the state
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="employee-list">
        <header className="header">
          <h1>Employee List</h1>
          <div className="actions">
            <span>Total Count: {filteredEmployees.length}</span>
            <button className="create-employee" onClick={handleCreateEmployeeClick}>
              Create Employee
            </button>
            <input
              type="text"
              placeholder="Enter Search Keyword"
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </header>
        <table>
          <thead>
            <tr>
              <th>Unique ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>
                  <img src={employee.image || '/path-to-image'} alt="Profile" className="employee-image" />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender === 'M' ? 'Male' : 'Female'}</td>
                <td>{employee.course.join(', ')}</td>
                <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                <td>
                  <button className="action-btn" onClick={() => handleEditEmployeeClick(employee._id)}>
                    Edit
                  </button>
                  <button className="action-btn" onClick={() => handleDeleteEmployee(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeList;
