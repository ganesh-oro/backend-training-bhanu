import BaseException from "./baseException.ts";

class ConflictException extends BaseException{
    constructor(message?:string){
        super(409,message || "Conflict","ConflictException",true);
    }
}

export default ConflictException