const Employee = require('../models/employee');  // Import the Employee model

// Create an employee
exports.createEmployee = async (req, res) => {
  const { name, email, mobileNo, designation, gender, course } = req.body;

  try {
    // Create a new employee
    const newEmployee = new Employee({
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
    });

    // Save the employee to the database
    const savedEmployee = await newEmployee.save();
    res.status(201).json({ msg: 'Employee created successfully!' });  // Simplified success response
  } catch (err) {
    console.error('Error creating employee:', err.message);
    res.status(500).send('Server Error');
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);  // Return the list of employees
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Check if email already exists
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);  // Assuming you're using Mongoose to interact with MongoDB
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};



// Update an employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, mobileNo, designation, gender, course } = req.body;
  const image = req.file ? req.file.buffer : null;  // Handle new image if uploaded

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, email, mobileNo, designation, gender, course, image },
      { new: true }  // Return the updated employee
    );

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    res.json(employee);  // Return the updated employee
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    res.json({ msg: 'Employee deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
