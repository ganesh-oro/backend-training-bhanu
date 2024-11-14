import BaseException from "./baseException.ts";

class BadRequestException extends BaseException{
    constructor(message:string,errorData?:any){
        super(400,message,"badRequestException",true,errorData)
    }
}

export default BadRequestException;