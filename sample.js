class Animal{
    constructor(name,age){
        this.age = age;
        this.name = name;
    }

    func(age){
        age = this.name +" is a most faithful animal";
        console.log(age)
    }


}

let x = new Animal('Dog',20);

console.log(x)