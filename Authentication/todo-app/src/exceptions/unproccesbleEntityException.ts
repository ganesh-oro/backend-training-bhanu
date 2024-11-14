import BaseException from "./baseException.ts";

class UnproccesableEntityException extends BaseException{
    constructor(message:string,errorData:any){
        super(422,message,"UnproccesableEntityException",true,errorData);
    }
}

export default UnproccesableEntityException;