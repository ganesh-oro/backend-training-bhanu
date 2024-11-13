console.time()
let user = "Bhanu"

const age = 22;
console.log(user);
console.log(age);



const fs = require('fs')

fs.readFileSync('demo.txt','utf-8',(err,data)=>{
    if(err){
        console.log(err)
    }
    console.log(data)
})

console.log("File is read")

console.timeEnd()