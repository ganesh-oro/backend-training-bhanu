let v = 10;

function first(val){
    return new Promise((Resolve,Reject)=>{
        Resolve(val+10);
        Reject('error occured!')
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
async function calculate(v){
    try{
        const res1 = await first(v);
        const res2 = await second(res1);
        const res3 = await final(res2);
        console.log(res3);
    }
    catch(error){
        console.error(error);

    }
}
calculate(v)