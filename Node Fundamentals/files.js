const fs = require('fs');

// fs.readFile('demo.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(data)
// });

// const data = 'The data which is inserted in the new file';
// fs.writeFile('produce.txt',data,(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log('File is created....');
// })


// fs.appendFile('produce.txt','Append Text',(err)=>{
//     if(err){
//         throw err;
//     }
//     console.log('Appended');
// })


// fs.open('new_file.txt','w',(err)=>{
//     if(err) throw err;
//     console.log('file created');
// })

// fs.rename('new_file.txt','old_file.txt',(err)=>{
//     if(err) throw err;
//     console.log('File is renamed');
// })

fs.unlink('old_file.txt',(err)=>{
    if(err){
        throw err;
    }
    console.log('file deleted');
})

