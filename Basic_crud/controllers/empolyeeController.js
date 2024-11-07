const Employee = require('../models/employee');
const createEmployee = async(req,res)=>{
    try{
        const {firstName,lastName,age} = req.body;
        const employee = new Employee({
            firstName,
            lastName,
            age
        });
        await employee.save();
        res.status(201).json(employee);
    }
    catch(error){
        console.log(error.message);
    }
}
const getAll = async(req,res)=>{
    try{
        let cinemas = await Employee.find();
        res.json(cinemas);
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {createEmployee,getAll};