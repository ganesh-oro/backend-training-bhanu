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

