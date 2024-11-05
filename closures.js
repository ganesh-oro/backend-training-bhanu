function outer(){
    let name = "Bhanu";
    function inner(){
        console.log(name);
    }
    return inner;

}
const x = outer();

x();