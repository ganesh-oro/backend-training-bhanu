import BaseException from "./baseException.ts";

class ConflictException extends BaseException{
    constructor(message?:string){
        super(message || "Conflict",409,"ConflictException",true);
    }
}

export default ConflictException