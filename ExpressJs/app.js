const dotEnv = require('dotenv');
const express = require('express');

const app = express()
const port = 3000;


app.use((req,res,next)=>{
    if(10>3){
        next();
    }
})

app.get('/users/products/:12',(req,res)=>{
    res.send(req.params);
})

app.get('/home',(req,res)=>{
    res.send('Home page is called');
})

app.listen(port,()=>{
    console.log('sever started');
})

// dotEnv.config();
// console.log(process.env.PORT);