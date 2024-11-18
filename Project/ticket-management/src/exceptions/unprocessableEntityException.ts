import BaseException from "./baseException.ts";

class UnproccesableEntityException extends BaseException{
    constructor(message:string,errorData:any){
        super(message,422,"UnproccesableEntityException",true,errorData);
    }
}

export default UnproccesableEntityException;