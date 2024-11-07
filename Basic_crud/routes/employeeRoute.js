const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/empolyeeController');
const Employee = require('../models/employee');


router.post('/add-employee',employeeController.createEmployee);
router.get('/getall',employeeController.getAll)
module.exports = router;


