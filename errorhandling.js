//first 

function valid_age(age){
    if(age<18){
        throw new Error('Not Eligible to Vote');
    }
    console.log('You can Vote now');
}

try{
    valid_age(12);
}
catch(error){
    console.log(error.message)
}

//second

const obj = {name:"bhanuchandar",age:22};

try{
    let x = undefined;
    console.log(x.property)
}
catch(error){
    if(error instanceof TypeError){
        console.log('Its a Type Error');
    }
    else{
        throw error;
    }
}

//Write a JavaScript function that accepts two numbers as parameters and throws a custom 'Error' if the second number is zero.

function third(a,b){
    if(b === 0){
        throw new Error('The second is Zero');
    }
    return a/b;
}
try{
    console.log(third(3,1));
}
catch(error){
    console.log('The Error is ',error.message);
}


//multiple catch blocks to handle different types of errors separately.

function division(x,y){
    try{
        if (typeof x != 'number' || typeof y != 'number'){
            throw new Error('Inputs are must be numbers');
        }
        if (y === 0){
            throw new Error('y must not be a zero');
        }
        const res = x/y;
        console.log(res);
     }
    catch(error){
        if(error instanceof TypeError){
            console.log('Its a Type error')
        }
        else{
            console.log(error.message);
        }
    }
}

//console.log(division(3,1));

//try-catch block to catch and handle a 'SyntaxError' when parsing an invalid JSON string.

function ParseData(data){
    try{
        const parseddata = JSON.parse(data)
        console.log(parseddata);
    }
    catch(error){
        if(error instanceof SyntaxError){
            console.log(error.message);
        }
        else{
            console.log(error.message);
        }
    }
}

let d = '{"name":"Bhanu","age":22}';

ParseData(d);