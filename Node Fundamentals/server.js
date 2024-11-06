const http = require('http');
const app = http.createServer((req,res)=>{
    res.write('Server is running');
    res.end()
})

const port = 3000;
app.listen(port,()=>{
    console.log('server is running on',port);
});
