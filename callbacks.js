// basic callback function
/*function mainfunc(callback){
    console.log('Loading');
    setTimeout(function(){
        callback('Operation Success');
    },3000)

}
function second(result){
    console.log('Result '+ result)
}

mainfunc(second);
*/
// Nested Callbacks
let v = 10
function first(value,callback){
    callback(value+10,false);
}
function second(value,callback){
    callback(value+10,false);
}
function third(value,callback){
    callback(value+10,false)
}

first(v,function(result1,error){
    if(!error){
        second(result1,function(result2,error){
            if(!error){
                third(result2,function(result3,error){
                    console.log("Result is "+ result3);
                })
            }
        })
    }
});