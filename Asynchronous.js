// first_one
console.log('Its loading')
setTimeout(function(){
    console.log('Im ready');},100);
console.log('Im on tyme');



//second_one

function Display(callback){
    setTimeout(callback,4000);
}

function show(){
    console.log('Im Ready');
}

Display(show);

//3

function Display(){
    return new Promise((resolve,reject)=>{
        let data = false;
        if(!data){
            resolve('Success')
        }
        else{
            reject('Failed');
        }
    })
}
console.log(Display());

