// let value = 10

// function first(val){
//     return new Promise((Resolve,Reject)=>{
//         Resolve(val+10);
//     })
// }

// function second(val){
//     return new Promise((Resolve,Reject)=>{
//         Resolve(val+10);
//     })
// }
// function final(val){
//     return new Promise((Resolve,Reject)=>{
//         Resolve(val+10);
//     })
// }

// first(value)
//     .then(result1 => second(result1))
//     .then(result2 => final(result2))
//     .then(result3 =>{
//         console.log(result3)
//     })
//     .catch(error=>{
//         console.log(error);
//     })    


// let prom = new Promise((res,rej)=>{
//     let val = false;
//     if(!val){
//         res('Resolved');
//     }
   
//     rej('rejected')
// })

// prom.then((mes)=>{
//     console.log(mes);
// })
// .catch((error)=>{
//     console.log(error);
// })

let first = new Promise((res,rej)=>{
    setTimeout(()=>{
        res('First-Promies resolved');
    },1000);
})

let second = first.then((mes)=>{
    console.log(mes);
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res('Second Promise is resolved');
        },2000);
    })
})

let third = second.then((msg)=>{
    console.log(msg);
    return new Promise((res)=>{
        setTimeout(()=>{
            res('Third Promise is resolved');
        },1000)
    })
})

third.then((msg)=>{
    console.log(msg);
})

