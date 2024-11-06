let arr1 = ['a','b','c']

//console.log(arr.length)

arr1.push('d')

//console.log(arr.length)

function findmax(arr){
    let max = arr[0]
    for(let i=0;i<arr.length;i++){
        if (arr[i] > max) {
            max = arr[i];
        }

    }
    return max;
}

let arr = [2,3,1,5,3];

let res = findmax(arr);

function builtin(arr){
    return Math.max(...arr);
}

let res2 = builtin(arr)
console.log(res2);


//map

const arr22 = [1,2,3,4];

const res11 = arr22.map((num)=>{
    return num*num;
})

console.log(res11);

// filter
const arr2 = [2,4,3,6]

const res22 = arr2.filter((num)=>{
    return num%2===0;
})

console.log(res22);
 

//reduce

const red = arr2.reduce((a,b)=>{
    return a+b;
})

console.log(red);