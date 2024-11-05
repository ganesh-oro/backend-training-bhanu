let value = 10

function first(val){
    return new Promise((Resolve,Reject)=>{
        Resolve(val+10);
    })
}

function second(val){
    return new Promise((Resolve,Reject)=>{
        Resolve(val+10);
    })
}
function final(val){
    return new Promise((Resolve,Reject)=>{
        Resolve(val+10);
    })
}

first(value)
    .then(result1 => second(result1))
    .then(result2 => final(result2))
    .then(result3 =>{
        console.log(result3)
    })
    .catch(error=>{
        console.log(error);
    })    

