const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    age:{
        type: Number,
    }


})
module.exports = mongoose.model('Employee',EmployeeSchema);