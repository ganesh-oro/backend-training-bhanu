const express = require('express');
const mongo = require('mongoose');
const dotEnv = require('dotenv');
const app = express()
const bodyparser = require('body-parser');

const router = require('./routes/employeeRoute');

dotEnv.config()
PORT = process.env.PORT;
URI = process.env.MONGOURI
app.get('',(req,res)=>{
    res.send("Resonse has sent");
})

let dbConnection = async function(){
    try{
        let res = await mongo.connect(URI);
        if(res){
        console.log('Database is connected');
        }
    }
    catch(error){
        console.log(error.message);
    };
    
}

app.use(bodyparser.json());
app.use('/home',router);

dbConnection();

app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`);
})