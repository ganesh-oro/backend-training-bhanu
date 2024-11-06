// const express = require('express');
// const app = express()
// const port = 3000;

// app.get('/',(req,res)=>{
//     res.send('Hello I am a developer');
// })


// app.listen(port,()=>{
//     console.log('server is running');
// })


// function fetchurl(url){
//     return fetch(url)
//         .then((res)=>{
//             return res.json();
//         })
//         .then((data)=>{
//             console.log(data);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })        
// }

//console.log(fetchurl('https://dummyjson.com/products'))

fetch('https://dummyjson.com/products')
.then((res)=>{
    return res.json();
}
)
.then((data)=>{
    console.log(data);
})
.catch((error)=>{
    console.log(error);
})
