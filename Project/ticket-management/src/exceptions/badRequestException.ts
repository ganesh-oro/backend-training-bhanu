import BaseException from "./baseException.ts";

class BadRequestException extends BaseException{
    constructor(message:string,errorData?:any){
        super(message,400,"badRequestException",true)
    }
}

export default BadRequestException;