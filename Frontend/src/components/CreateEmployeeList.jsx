import React, { useState } from 'react';
import '../css/createemployeelist.css';
import Navigation from './navigation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmployeeCreate() {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: [],
  });
  
  const [message, setMessage] = useState('');  // For success/failure messages
  const [loading, setLoading] = useState(false); // For disabling submit button while loading
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Handle input changes (for text, email, mobileNo, designation)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      // Handle adding/removing courses from the array
      setEmployeeData((prevData) => {
        const newCourses = checked
          ? [...prevData.course, value]   // Add course if checked
          : prevData.course.filter(course => course !== value); // Remove course if unchecked
        return {
          ...prevData,
          course: newCourses
        };
      });
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled in
    const { name, email, mobileNo, designation } = employeeData;
    if (!name || !email || !mobileNo || !designation) {
      setMessage('Please fill in all the required fields.');
      return;
    }

    // Disable the submit button while submitting the form
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/employees', employeeData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        }
      });
    
      if (response.status === 201) {
        setMessage('Employee created successfully!');
        setTimeout(() => {
          navigate('/employeelist');  // Navigate to the employee list page after success
        }, 2000);  // Wait for 2 seconds before redirecting
      } else {
        setMessage('Error creating employee.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg); // Display the duplicate email error message
      } else {
        setMessage('Server error. Please try again.');
      }
    }
    
     finally {
      setLoading(false); // Enable submit button after form submission attempt
    }
  };

  return (
    <>
      <Navigation />
      <div className="employee-create">
        <h2>Create Employee</h2>
        
        {/* Display message */}
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={employeeData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={employeeData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="mobileNo">Mobile No:</label>
            <input type="tel" id="mobileNo" name="mobileNo" value={employeeData.mobileNo} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="designation">Designation:</label>
            <select id="designation" name="designation" value={employeeData.designation} onChange={handleChange} required>
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="M"
                checked={employeeData.gender === 'M'}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="F"
                checked={employeeData.gender === 'F'}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="course">Course:</label>
            <input type="checkbox" id="mca" name="course" value="MCA" checked={employeeData.course.includes('MCA')} onChange={handleChange} />
            <label htmlFor="mca">MCA</label>
            <input type="checkbox" id="bca" name="course" value="BCA" checked={employeeData.course.includes('BCA')} onChange={handleChange} />
            <label htmlFor="bca">BCA</label>
            <input type="checkbox" id="btech" name="course" value="BTech" checked={employeeData.course.includes('BTech')} onChange={handleChange} />
            <label htmlFor="btech">BTech</label>
          </div>

          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>
    </>
  );
}

export default EmployeeCreate;
