const express = require('express');
const router = express.Router();
const auth = require('../middelware/authMiddleware');  // Ensure the path is correct for your middleware

const {
  createEmployee,
  getAllEmployees,
 getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// Route to create a new employee
router.post('/', auth, createEmployee);  // Apply authentication middleware

// Route to get all employees
router.get('/all', auth, getAllEmployees);

// Route to get a specific employee by ID
// Route to get a specific employee by ID
router.get('/:id', auth, getEmployeeById);


// Route to update an employee
router.put('/:id', auth, updateEmployee);

// Route to delete an employee by ID
router.delete('/:id', auth, deleteEmployee);

module.exports = router;
